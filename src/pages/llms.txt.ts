import type { APIRoute } from "astro";
import data from "../data";
import { keyFacts, pricing, process } from "../data/site-facts";

const siteUrl = "https://amine-triki.tn";
const contactUrl = `${siteUrl}/contact/`;
const profileLinks = [
  ["GitHub", "https://github.com/Amine-Triki"],
  ["YouTube", "https://www.youtube.com/@aminetrikitv"],
  ["LinkedIn", "https://www.linkedin.com/in/amine-triki-tn/"],
] as const;
const pageLinks = [
  ["Services", "/services/", "services, starting prices, process and FAQ."],
  ["Projects", "/projects/", "featured web apps, tools and mobile apps with stack and links."],
  ["Resume", "/resume/", "experience, skills and downloadable CV."],
  ["Contact", "/contact/", "project request form and contact details."],
  ["Blog", "/blog/", "video tutorials with written steps."],
] as const;
const pricingLabels = {
  landing: "landing page",
  business: "business website",
  ecommerce: "e-commerce website",
  webapp: "web application",
  mobile: "simple Android app",
} as const;
const optionalArticleSlugs = new Set([
  "orange-fixbox-change-password-wi-fi-name",
  "create-ovhcloud-professional-email",
  "connection-lost-saving-has-been-disabled-until-youre-reconnected",
  "les-fonctions-logiques-algebre-de-boole",
]);

const absoluteUrl = (path: string) => `${siteUrl}${path}`;
const articleLine = (post: (typeof data)[number]) =>
  `- [${post.title}](${absoluteUrl(`/blog/${post.slug}/`)}): ${post.description}`;

export const GET: APIRoute = () => {
  const developmentArticles = data.filter(
    (post) => post.category === "web-development" && !optionalArticleSlugs.has(post.slug),
  );
  const optionalArticles = data.filter((post) => optionalArticleSlugs.has(post.slug));
  const lines = [
    "# Amine Triki",
    "",
    "> Tunisian full-stack developer (React, Next.js, Laravel, Flutter) building websites, landing pages, e-commerce stores, web apps and Android apps for businesses and projects, working in English, French and Arabic.",
    "> Based in [Sfax], Tunisia. Serves clients in Tunisia and remotely.",
    "",
    "## About",
    "",
    `- Amine Triki is a Tunisian full-stack developer based in [Sfax], Tunisia, working in English, French and Arabic. Contact: [project request form](${contactUrl}).`,
    "",
    "## Key facts",
    "",
    ...pricing.items
      .filter((item): item is typeof item & { from: number } => item.from !== null && item.key in pricingLabels)
      .map((item) => `- Starting price for ${pricingLabels[item.key as keyof typeof pricingLabels]}: ${item.from.toLocaleString("en-US")} TND.`),
    `- ${keyFacts.clientAccounts}`,
    `- ${keyFacts.codeOwnership}`,
    `- ${process.revisionRounds} revision rounds included; ${keyFacts.maintenance.toLowerCase()}`,
    `- ${keyFacts.delivery}`,
    `- Last updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Main pages",
    "",
    ...pageLinks.map(([label, path, description]) => `- [${label}](${absoluteUrl(path)}): ${description}`),
    "",
    "## Articles",
    "",
    ...developmentArticles.map(articleLine),
    "",
    "## Optional",
    "",
    ...optionalArticles.map(articleLine),
    `- [Accueil en français](${absoluteUrl("/fr/")}): French version of the home page.`,
    `- [Services en français](${absoluteUrl("/fr/services/")}): French version of the services page.`,
    `- [الصفحة الرئيسية بالعربية](${absoluteUrl("/ar/")}): Arabic version of the home page.`,
    `- [الخدمات بالعربية](${absoluteUrl("/ar/services/")}): Arabic version of the services page.`,
    "",
    "## Profiles",
    "",
    ...profileLinks.map(([label, url]) => `- [${label}](${url}): Amine Triki's ${label} profile.`),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
