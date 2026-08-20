import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTopButton
 * ────────────────────────────────────────────────────────────────
 * Floating action button that appears after the user has scrolled
 * past one viewport height. Smooth-scrolls back to the top.
 *
 * Honors `prefers-reduced-motion` to avoid bounced animations.
 */
export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        })
      }
      className={`fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg border border-primary-border transition-all duration-300 hover-elevate active-elevate-2 print:hidden ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3"
      }`}
      data-testid="button-back-to-top"
    >
      <ArrowUp className="h-5 w-5 mx-auto" aria-hidden="true" />
    </button>
  );
}
