import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import path from "path";

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
      plugins: [
        {
          name: "worker-helpers",
          setup(build) {
            build.onResolve(
              { filter: /@namada\/sdk-multicore\/wasm\/src\/sdk"/ },
              (args) => {
                const importerDir = path.dirname(args.importer);
                const absolutePath = path.resolve(importerDir, args.path);

                if (args.path === "../../..") {
                  // Special case for the root path
                  return { path: `${absolutePath}/index.js`, external: true };
                }

                return { path: absolutePath, external: true };
              },
            );
          },
        },
      ],
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
