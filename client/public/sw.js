/* ── Service worker for Waheed Aslam portfolio ──────────────────────
 * Tiny, self-contained cache. Strategy:
 *   • On install: pre-cache the static shell so the offline page
 *     can still render.
 *   • On fetch:  try cache first for same-origin static assets; fall
 *     back to network. Skip non-GET and cross-origin requests so
 *     we don't break runtime data (resume PDF, OG image, GitHub
 *     stats API).
 *   • Bumps the cache name when the shell changes — old caches are
 *     reclaimed on `activate`.
 * ─────────────────────────────────────────────────────────────────── */

const CACHE_NAME = "waheed-portfolio-v2";
const SHELL_ASSETS = [
  "/",
  "/Waheed-Aslam-Resume.pdf",
  "/og-image.png",
  "/manifest.webmanifest",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
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
            .filter((k) => k.startsWith("waheed-portfolio-") && k !== CACHE_NAME)
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

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/"));
    }),
  );
});
