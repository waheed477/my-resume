import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ──────────────────────────────────────────────────────────────────
//  Vite configuration
// ──────────────────────────────────────────────────────────────────
//
//  Hosting target: Netlify (recommended) or any static host that
//  serves the site from the domain root.
//
//  - `base: '/'`           : assets are emitted as /assets/* (no
//                            prefix), so the bundle works on
//                            waheed-aslam.netlify.app or any custom
//                            domain pointed at the root.
//  - `root: './client'`    : the index.html lives in ./client (this
//                            matches the existing repo layout — do
//                            not change).
//  - `outDir: '../dist'`   : the build output is one level up at
//                            ./dist, which is what Netlify's
//                            publish directory expects.
//  - `emptyOutDir: true`   : cleans stale assets on every build so
//                            a delete in src really removes the
//                            chunk from dist.
//  - `alias '@' -> client/src` : so component imports like
//                            '@/components/...' keep working
//                            after we reorganise files.
//
//  If you ever move the site BACK to GitHub Pages and want to serve
//  it under https://<user>.github.io/my-resume/, change `base` back
//  to '/my-resume/' and search for the few absolute path strings
//  in client/index.html, client/public/manifest.webmanifest,
//  client/public/sw.js, and HeroSection/ProjectsSection. The
//  manifest and SW are explicitly written as absolute URLs to keep
//  them stable under either host.
// ──────────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  root: "./client",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
