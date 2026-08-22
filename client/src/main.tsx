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
//  Service worker registration
// ──────────────────────────────────────────────────────────────────
//
//  Intentionally minimal. The previous version of this file
//  had a controllerchange listener that reloaded the page on
//  every SW controller swap, which combined with the new SW's
//  clients.claim() produced an infinite reload loop on the
//  live site. Fix: do not reload the page from SW events. Let
//  the browser manage the SW lifecycle:
//
//    1. On first visit the SW installs, caches the static
//       shell, and our sw.js' skipWaiting() + clients.claim()
//       activate it immediately.
//    2. On subsequent visits the SW intercepts /assets/*
//       network-first so a fresh deploy is served on the next
//       navigation. Old caches get wiped on activate (by the
//       SW itself). The HTML that was served still loads —
//       the page works fine without a reload.
//    3. On a NEW SW bytes being pushed (a new deploy), the
//       browser detects the byte diff, runs install, calls
//       skipWaiting + clients.claim() — and on the NEXT user
//       navigation the new SW is in effect.
//    4. We DO NOT reload the page automatically. A reload
//       re-hydrates React against the same DOM the user is
//       already reading, which is what produces the visible
//       "blink" on the live site.
//
//  Disabled in dev (Vite HMR + service workers don't mix well).
// ──────────────────────────────────────────────────────────────────

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) =>
        console.warn(
          "[SW] registration skipped:",
          err && err.message ? err.message : err,
        ),
      );
  });
}
