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
  },
  esbuild: {
    minifyIdentifiers: false,
  },
  optimizeDeps: {
    exclude: ["@namada/sdk-multicore"],
    include: [
      "@protobufjs/float",
      "@protobufjs/inquire",
      "@protobufjs/pool",
      "@protobufjs/utf8",
      "@zondax/ledger-namada",
      "semver",
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
