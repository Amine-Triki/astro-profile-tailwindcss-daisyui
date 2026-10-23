// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://amine-triki.tn",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "ar"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/offline"),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", fr: "fr-FR", ar: "ar-TN" },
      },
    }),
  ],
});