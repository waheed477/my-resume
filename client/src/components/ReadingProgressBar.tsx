import { useEffect, useState } from "react";

/**
 * ReadingProgressBar
 * ────────────────────────────────────────────────────────────────
 * Thin horizontal bar pinned just under the navbar that fills the
 * full width as the user scrolls down the page. A subtle signal
 * that the page is longform content — common in polished portfolios,
 * blogs, and long docs.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight =
        (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      const pct =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
          : 0;
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none print:hidden"
      data-testid="reading-progress"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
