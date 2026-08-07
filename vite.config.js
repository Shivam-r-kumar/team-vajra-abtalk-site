import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile, mkdir } from "node:fs/promises";

const cloudflareWorker = {
  name: "abtalks-cloudflare-worker",
  async closeBundle() {
    await mkdir(new URL("./dist/server/", import.meta.url), { recursive: true });
    await copyFile(
      new URL("./worker/index.js", import.meta.url),
      new URL("./dist/server/index.js", import.meta.url)
    );
  }
};

export default defineConfig({
  plugins: [react(), cloudflareWorker],
  build: {
    outDir: "dist/client",
    emptyOutDir: true
  }
});
