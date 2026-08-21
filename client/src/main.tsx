import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // BrowserRouter wraps the entire app so any component can use
  // react-router hooks (Link, useLocation, useNavigate, useParams).
  // Phase-1 wiring: enables the /about placeholder route without
  // changing anything else about the rendered tree.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// ── Register service worker for PWA / offline support ──────────────
// Disabled in dev (Vite HMR + service workers don't mix well).
if (
  "serviceWorker" in navigator &&
  import.meta.env.PROD
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) =>
        console.warn("[SW] registration skipped:", err.message),
      );
  });
}
