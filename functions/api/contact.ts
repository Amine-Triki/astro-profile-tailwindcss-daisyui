interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

const json = (body: object, status = 200) => Response.json(body, { status });
const clean = (value: string) => value.replace(/[\r\n]+/g, " ");
const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const projectTypeLabels = {
  landing: "Landing page",
  business: "Business website",
  ecommerce: "E-commerce website",
  webapp: "Web application",
  mobile: "Mobile application",
  unsure: "Not sure yet",
  other: "Other",
} as const;
const featureLabels = {
  "contact-form": "Contact form",
  languages: "Multiple languages",
  blog: "Blog",
  gallery: "Photo or video gallery",
  search: "Search and filters",
  catalog: "Product catalog and cart",
  payment: "Online payment (for example D17, Flouci, Paymee)",
  delivery: "Delivery or order tracking",
  reviews: "Reviews or testimonials",
  accounts: "User accounts and login",
  roles: "Different user roles",
  admin: "Admin dashboard",
  booking: "Booking or orders",
  reports: "Reports and statistics",
  "import-export": "Import and export (Excel, CSV, PDF)",
  notifications: "Notifications (email or push)",
  chat: "Chat",
  maps: "Maps or GPS",
} as const;
const languageLabels = { ar: "Arabic", fr: "French", en: "English" } as const;
const contentLabels = { ready: "I have the text, images and logo ready", part: "I have part of the content", help: "I need help with the content" } as const;
const hostingLabels = { both: "I have a domain and hosting", domain: "I have a domain only", neither: "I have neither, I need advice" } as const;
const budgetLabels = { "under-800": "Less than 800 TND", "800-1500": "800 to 1,500 TND", "1500-3000": "1,500 to 3,000 TND", "3000-6000": "3,000 to 6,000 TND", "over-6000": "More than 6,000 TND", unsure: "Not sure yet" } as const;
const timelineLabels = { asap: "As soon as possible", month: "Within 1 month", "three-months": "1 to 3 months", none: "No fixed date" } as const;
const allowedValue = <T extends Record<string, string>>(value: string, options: T): keyof T | undefined =>
  Object.prototype.hasOwnProperty.call(options, value) ? (value as keyof T) : undefined;
const allowedValues = <T extends Record<string, string>>(values: string[], options: T): Array<keyof T> =>
  [...new Set(values)].flatMap((value) => {
    const allowed = allowedValue(value, options);
    return allowed ? [allowed] : [];
  });

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
    const projectGoal = clean(get("projectGoal"));
    const examples = clean(get("examples"));
    const otherFeatures = clean(get("otherFeatures"));
    const projectType = allowedValue(get("projectType"), projectTypeLabels);
    const selectedFeatures = allowedValues(form.getAll("features").map((value) => clean(value.toString())), featureLabels);
    const selectedLanguages = allowedValues(form.getAll("languages").map((value) => clean(value.toString())), languageLabels);
    const content = allowedValue(get("content"), contentLabels);
    const hosting = allowedValue(get("hosting"), hostingLabels);
    const budget = allowedValue(get("budget"), budgetLabels);
    const timeline = allowedValue(get("timeline"), timelineLabels);

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
      message.length > 5000 ||
      projectGoal.length > 600 ||
      examples.length > 300 ||
      otherFeatures.length > 200
    ) {
      return json({ ok: false, error: "Input too long" }, 400);
    }

    const escapedOtherFeatures = escapeText(otherFeatures);
    const projectDetails = [
      projectType && `Project type: ${projectTypeLabels[projectType]}`,
      projectGoal && `Goal and audience: ${projectGoal}`,
      selectedFeatures.length > 0 && `Features: ${selectedFeatures.map((value) => featureLabels[value]).join(", ")}`,
      otherFeatures && `Other features: ${escapedOtherFeatures}`,
      selectedLanguages.length > 0 && `Languages needed: ${selectedLanguages.map((value) => languageLabels[value]).join(", ")}`,
      content && `Content: ${contentLabels[content]}`,
      hosting && `Domain and hosting: ${hostingLabels[hosting]}`,
      budget && `Approximate budget: ${budgetLabels[budget]}`,
      timeline && `Timeline: ${timelineLabels[timeline]}`,
      examples && `Examples: ${examples}`,
    ].filter((value): value is string => Boolean(value));
    const hasProjectDetails = projectDetails.length > 0;
    const emailSubject = hasProjectDetails && projectType
      ? `New project inquiry: ${projectTypeLabels[projectType]} - ${firstName} ${lastName}`
      : `[Contact] ${subject}`;

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
        subject: emailSubject,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}${hasProjectDetails ? `\n\nProject details\n${projectDetails.join("\n")}` : ""}`,
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
