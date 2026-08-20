import { Gauge } from "lucide-react";
import { LIGHTHOUSE_SCORES, hasLighthouseScores } from "@/config/lighthouse";

/**
 * LighthouseBadgeStrip
 * ────────────────────────────────────────────────────────────────
 * Tiny footer-quality strip that only renders after the user has
 * populated real Lighthouse scores in `client/src/config/lighthouse.ts`.
 *
 * While the values are `null`, nothing is rendered — there is no
 * "Claim 100 / 100" trap, and the footer stays clean.
 */
export default function LighthouseBadgeStrip() {
  if (!hasLighthouseScores()) return null;

  const items = [
    { key: "performance", label: "Performance", score: LIGHTHOUSE_SCORES.performance },
    {
      key: "accessibility",
      label: "Accessibility",
      score: LIGHTHOUSE_SCORES.accessibility,
    },
    {
      key: "bestPractices",
      label: "Best Practices",
      score: LIGHTHOUSE_SCORES.bestPractices,
    },
    { key: "seo", label: "SEO", score: LIGHTHOUSE_SCORES.seo },
  ];

  const tone = (score: number) =>
    score >= 95
      ? "text-emerald-500 bg-emerald-500/10"
      : score >= 85
      ? "text-primary bg-primary/10"
      : score >= 70
      ? "text-amber-500 bg-amber-500/10"
      : "text-red-500 bg-red-500/10";

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 py-4 border-t border-border text-xs text-muted-foreground"
      data-testid="lighthouse-strip"
    >
      <Gauge className="h-4 w-4" aria-hidden="true" />
      <span className="font-medium uppercase tracking-wider">Lighthouse</span>
      {items.map((item) => (
        <span
          key={item.key}
          className={`px-2 py-0.5 rounded-md font-semibold ${tone(item.score ?? 0)}`}
          data-testid={`lighthouse-${item.key}`}
        >
          {(item.score ?? 0).toString()} / 100
        </span>
      ))}
    </div>
  );
}
