/**
 * SkipToMainContent
 * ────────────────────────────────────────────────────────────────
 * Standard accessibility utility — a hidden-by-default link that
 * becomes visible on focus and jumps the user past the navigation,
 * straight to the <main> element. Critical for keyboard / screen-
 * reader users on a one-page portfolio, where the nav can otherwise
 * be a surprising tabbing wall.
 *
 * Pure CSS handles visibility — no state needed.
 */

export default function SkipToMainContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring print:hidden"
      data-testid="link-skip-to-main"
    >
      Skip to main content
    </a>
  );
}
