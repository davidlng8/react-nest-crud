import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env from the *monorepo root*
  const env = loadEnv(mode, resolve(__dirname, "../../"), "");

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.FRONTEND_PORT || "3110"),
      proxy: {
        "/api": `http://localhost:${env.BACKEND_PORT || "3011"}`,
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
