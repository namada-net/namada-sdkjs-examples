import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
  },
  plugins: [react(), nodePolyfills()],
  worker: {
    format: "es",
    // rollupOptions: {
    //   output: {
    //     preserveModules: true,
    //   },
    // },
  },
  esbuild: {
    minifyIdentifiers: false,
  },
  optimizeDeps: {
    exclude: ["workerHelpers.js"],
  },
});
