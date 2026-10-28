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
  redirects: {
    "/blog/les-fonction-logiques-algbre-de-boole/": {
      status: 301,
      destination: "/blog/les-fonctions-logiques-algebre-de-boole/",
    },
    "/fr/blog/les-fonction-logiques-algbre-de-boole/": {
      status: 301,
      destination: "/fr/blog/les-fonctions-logiques-algebre-de-boole/",
    },
    "/ar/blog/les-fonction-logiques-algbre-de-boole/": {
      status: 301,
      destination: "/ar/blog/les-fonctions-logiques-algebre-de-boole/",
    },
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