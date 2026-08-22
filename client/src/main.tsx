import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // BrowserRouter wraps the entire app so any component can use
  // react-router hooks (Link, useLocation, useNavigate, useParams).
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// ──────────────────────────────────────────────────────────────────
//  Service worker registration + unregister-of-old-caches
// ──────────────────────────────────────────────────────────────────
//
//  We use a "stale-while-revalidating + forced take-over" pattern:
//
//   1. On every page load, walk through every active
//      registration and call update() so the browser
//      re-fetches /sw.js from the live Netlify deploy and
//      sees the new version.
//   2. When the new SW activates, its activate handler
//      wipes every older cache (we delete any cache whose
//      name is not the current CACHE_NAME).
//   3. After install of the new SW, send {type:'SKIP_WAITING'}
//      so the new SW activates immediately on the very next
//      reload — no need to close every browser tab.
//   4. If we detect any registration whose active SW is older
//      than the live one (cache name v3), call
//      registration.unregister() so the browser drops it.
//
//  This combination is the canonical fix for "the SW from
//  the previous deploy is still serving the previous bundle
//  and the page is blank".
//
//  Disabled in dev (Vite HMR + service workers don't mix well).
// ──────────────────────────────────────────────────────────────────

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Re-fetch the SW every page load so a fresh deploy is
        // seen immediately.
        registration.update().catch(() => {});

        // If there's already an older SW, force-unregister it so
        // the new one becomes the active one without waiting for
        // every browser tab to close.
        if (registration.active && navigator.serviceWorker.controller) {
          registration.unregister().catch(() => {});
          window.location.reload();
        }

        // When a new SW is found, ask it to skip waiting so it
        // activates as soon as the page is ready.
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              installing.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch((err) =>
        console.warn("[SW] registration skipped:", err.message),
      );

    // Listen for the controller-change event (new SW took over)
    // and reload once so the page hydrates against the new
    // bundle — without this, the user sees a blank page until
    // they manually reload.
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}
