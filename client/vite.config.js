import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://help-desk-api-topaz.vercel.app",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
