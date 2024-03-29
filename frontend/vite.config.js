import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), viteCompression()],
  server: {
    proxy: {
      // '/api':"http://localhost:8000",
      // '/socket.io': {
      //   target: 'http://localhost:8000',
      //   ws: true
      // }
      // "/api": "https://stonks-api.webdrip.in"
      "/api": "https://api-6tyd64odzq-uc.a.run.app"
    }
  }
});
