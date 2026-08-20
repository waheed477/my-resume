import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ── Register service worker for PWA / offline support ──────────────
// Disabled in dev (Vite HMR + service workers don't mix well).
if (
  "serviceWorker" in navigator &&
  import.meta.env.PROD
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/my-resume/sw.js", { scope: "/my-resume/" })
      .catch((err) =>
        console.warn("[SW] registration skipped:", err.message),
      );
  });
}
