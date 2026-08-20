// ──────────────────────────────────────────────────────────────────
//  Lighthouse scores
// ──────────────────────────────────────────────────────────────────
//
//  Populate these four numbers ONLY after you've actually run a
//  Lighthouse audit on the deployed portfolio and verified them.
//  Update them when you re-audit (e.g. monthly, or after major UI
//  changes).
//
//  How to audit:
//    • Open the deployed site in Chrome
//    • DevTools → Lighthouse tab → "Analyze page load"
//    • Pick Performance · Accessibility · Best Practices · SEO
//    • Copy the four integer scores below
//
// ──────────────────────────────────────────────────────────────────

export const LIGHTHOUSE_SCORES = {
  performance: null as number | null,
  accessibility: null as number | null,
  bestPractices: null as number | null,
  seo: null as number | null,
};

export function hasLighthouseScores() {
  return Object.values(LIGHTHOUSE_SCORES).every((v) => typeof v === "number");
}
