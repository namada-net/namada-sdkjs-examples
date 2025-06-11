import { defineConfig } from "vite";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crossOriginIsolation(), nodePolyfills()],
});
