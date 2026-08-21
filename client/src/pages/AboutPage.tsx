/**
 * AboutPage
 * ────────────────────────────────────────────────────────────────
 * Phase-1 placeholder. Phase 2 will replace this with a
 * dedicated route rendering the full About section (bio +
 * languages + core strengths + outside-code interests + resume
 * download CTA) without mounting every section of the
 * portfolio. For now, the route exists only so the router
 * wiring can be verified end to end.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-3" data-testid="about-page-placeholder">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Phase 1 placeholder
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold">
          About page
        </h1>
        <p className="text-muted-foreground">
          Routing is wired up — full About page lands in Phase 2.
          You can verify this route directly by visiting
          <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
            /about
          </code>
          on the deployed site.
        </p>
      </div>
    </div>
  );
}
