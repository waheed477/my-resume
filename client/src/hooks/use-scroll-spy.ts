import { useEffect, useState } from "react";

/**
 * useScrollSpy
 * ────────────────────────────────────────────────────────────────
 * Returns the id of the section currently most visible in the viewport.
 * Use it to highlight the matching item in a sticky nav.
 *
 * Includes the navbar offset so activation happens after the section
 * has scrolled past the top bar instead of disappearing underneath it.
 *
 * @param sectionIds   ordered list of section ids to observe
 * @param offsetPx     how far from the top of the viewport the
 *                     activation line sits (defaults to navbar height)
 */
export function useScrollSpy(
  sectionIds: string[],
  offsetPx = 100
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is currently intersecting
        // (and not below the fold), preferring entries above the threshold.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Activation band: a thin strip just below the navbar.
        rootMargin: `-${offsetPx}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offsetPx]);

  return activeId;
}
