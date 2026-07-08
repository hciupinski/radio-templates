import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.VITE_BASE_PATH?.trim() || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    VitePWA({
      base: basePath,
      injectRegister: false,
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Atlas opisów radiologicznych",
        short_name: "Atlas opisów",
        description: "Biblioteka szablonów opisów radiologicznych z wyszukiwarką i trybem offline.",
        lang: "pl",
        start_url: basePath,
        scope: basePath,
        display: "standalone",
        background_color: "#f5f7fa",
        theme_color: "#0f8b8d",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,json}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith("/content-manifest.json"),
            handler: "NetworkFirst",
            options: {
              cacheName: "content-manifest",
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: ({ url }) => /\/content-[a-f0-9]{12}\.json$/u.test(url.pathname),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "content-bundles",
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker", "font", "image"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-assets",
              cacheableResponse: {
                statuses: [200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        app: "index.html",
        pdf: "pdf.html"
      }
    }
  }
});
