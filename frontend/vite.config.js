import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(),  
    // viteCompression()
  ],
  server: {
    proxy: {
      '/api':"http://170.187.238.118",    
      // '/api':"http://localhost:8000",    
    },
  },
});
