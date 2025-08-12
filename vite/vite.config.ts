import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import { sdkMulticoreWorkerHelpers } from "@namada/sdkjs-esbuild-plugin";

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
  },
  esbuild: {
    minifyIdentifiers: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Need to use the custom plugin to handle the SDK multicore worker helpers
      plugins: [sdkMulticoreWorkerHelpers()],
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
