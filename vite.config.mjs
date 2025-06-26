import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [react()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 4173,
    host: "0.0.0.0"
  }
});