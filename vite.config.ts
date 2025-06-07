import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
// import path from "path";

export default defineConfig({
  base: "/banka/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Banka",
        short_name: "Banka",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#ffe7ff",
        background_color: "#ffe7ff",
        display: "standalone",
      },
    }),
    checker({ typescript: true, stylelint: false }),
  ],
  // resolve: {
  //   alias: {
  //     src: path.resolve(__dirname, "src"),
  //   },
  // },
});
