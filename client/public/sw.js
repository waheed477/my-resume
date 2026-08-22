/* ── Service worker for Waheed Aslam portfolio ──────────────────────
 *
 * Changelog
 * ────────────────────────────────────────────────────────────────
 * v3 — Netlify-deploy fix. Two changes that matter:
 *
 *   1. Cache name bumped to "waheed-portfolio-v3". On the very
 *      next page load, the activate handler will purge every
 *      older cache (v1, v2, ...) so the browser cannot serve a
 *      stale JS/CSS bundle that no longer matches the deployed
 *      HTML. This is the canonical fix for "PWA deploys but
 *      site is blank because old SW serves old assets".
 *
 *   2. Strategy switched to network-first for every same-origin
 *      GET that returns HTML or is a hashed asset (anything
 *      under /assets/ or with /index.html semantics). Cache
 *      still pre-caches the static shell (resume PDF, manifest,
 *      icons, og image) so the page renders offline, but the
 *      bundle and HTML always come from the live Netlify deploy.
 *
 * Cross-origin GETs (Google Fonts CSS, GitHub stats API,
 * Dev.to API) are left untouched.
 * ─────────────────────────────────────────────────────────────────── */

const CACHE_NAME = "waheed-portfolio-v3";
const SHELL_ASSETS = [
  "/",
  "/Waheed-Aslam-Resume.pdf",
  "/og-image.png",
  "/manifest.webmanifest",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
];

/* Anything that should ALWAYS come from the network on a
 * cached page so we don't serve a stale bundle. */
const NETWORK_FIRST_PATTERNS = [
  /\/assets\//, // Vite hashed bundles (JS / CSS)
  /\/sw\.js$/, // the SW itself
  /\/(?:about|experience|projects|skills|how-i-work|education|writing|contact)$/,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            // Reclaim ANY old portfolio cache, not just ones with
            // the same prefix — guard against future renames too.
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for hashed bundles and HTML routes so a fresh
  // deploy shows the new build on the very next reload.
  if (NETWORK_FIRST_PATTERNS.some((re) => re.test(url.pathname))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          // If we are truly offline and the request is for a
          // route, fall back to the cached shell so the page can
          // render offline (best-effort).
          caches.match(request).then((c) => c || caches.match("/")),
        ),
    );
    return;
  }

  // Cache-first for the rest of the static shell.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/"));
    }),
  );
});
