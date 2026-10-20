interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();

  // honeypot
  if (form.get("website")) return Response.json({ ok: true });

  const get = (k: string) => form.get(k)?.toString().trim() ?? "";
  const firstName = get("firstName");
  const lastName = get("lastName");
  const email = get("email");
  const subject = get("subject");
  const message = get("message");

  if (!firstName || !lastName || !email || !subject || !message) {
    return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
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

  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 500 });
};