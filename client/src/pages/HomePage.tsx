/**
 * HomePage
 * ────────────────────────────────────────────────────────────────
 * Phase-1 placeholder that calls the existing Portfolio page.
 * Phase 2 will refactor this so the home route renders only
 * the hero + a hub of page-cards pointing to the other
 * dedicated routes. For now it MUST keep the existing
 * landing-page behaviour so users navigating to "/" see what
 * they have always seen — and we can verify the route wiring
 * without touching the signed-off visual.
 */
import Portfolio from "./Portfolio";

export default function HomePage() {
  return <Portfolio />;
}
