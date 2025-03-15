import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components/"),
      "@/fonts": path.resolve(__dirname, "./src/fonts/"),
      "@/layout": path.resolve(__dirname, "./src/layout/"),
      "@/routes": path.resolve(__dirname, "./src/routes/"),
      "@/styles": path.resolve(__dirname, "./src/styles/"),
      "@/pages": path.resolve(__dirname, "./src/pages/"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8888,
  },
});
