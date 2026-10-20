interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

const json = (body: object, status = 200) => Response.json(body, { status });
const clean = (value: string) => value.replace(/[\r\n]+/g, " ");

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const form = await request.formData();

    if (form.get("website")) return json({ ok: true });

    const origin = request.headers.get("Origin");
    if (origin && origin !== new URL(request.url).origin) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const token = form.get("cf-turnstile-response")?.toString();
    if (!token) return json({ ok: false, error: "Captcha missing" }, 400);

    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
        }),
      },
    );
    let verifyData: { success?: boolean } = {};
    try {
      verifyData = (await verify.json()) as { success?: boolean };
    } catch (error) {
      console.error("Turnstile returned an invalid response", error);
      return json({ ok: false, error: "Captcha verification failed" }, 502);
    }
    if (!verifyData.success) {
      return json({ ok: false, error: "Captcha failed" }, 400);
    }

    const get = (key: string) => form.get(key)?.toString().trim() ?? "";
    const firstName = clean(get("firstName"));
    const lastName = clean(get("lastName"));
    const email = clean(get("email"));
    const subject = clean(get("subject"));
    const message = get("message");

    if (!firstName || !lastName || !email || !subject || !message) {
      return json({ ok: false, error: "Missing fields" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "Invalid email" }, 400);
    }
    if (
      firstName.length > 100 ||
      lastName.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return json({ ok: false, error: "Input too long" }, 400);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <contact@amine-triki.tn>",
        to: ["amine.triki@live.com"],
        reply_to: email,
        subject: `[Contact] ${subject}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected contact email", {
        status: res.status,
        body: await res.text().catch(() => ""),
      });
      return json({ ok: false, error: "Unable to send your message." }, 500);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("Contact function error", error);
    return json({ ok: false, error: "Server error" }, 500);
  }
};
