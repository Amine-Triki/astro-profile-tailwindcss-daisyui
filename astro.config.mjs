// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://astro-profile-daisyui.netlify.app",
  integrations: [
    sitemap(),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ['favicon.svg', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: "Amine Triki Portfolio",
        short_name: "Amine Triki",
        description: "Junior front end developer portfolio",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff,woff2}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});