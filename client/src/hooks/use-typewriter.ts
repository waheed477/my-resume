import { useEffect, useState } from "react";

export interface TypewriterOptions {
  /** Milliseconds per character when typing */
  typeMs?: number;
  /** Milliseconds per character when erasing */
  eraseMs?: number;
  /** How long to keep the full text on screen before erasing */
  holdMs?: number;
  /** How long to remain empty between two strings */
  gapMs?: number;
}

type Phase = "typing" | "erasing" | "pausing";

/**
 * useTypewriter
 * ────────────────────────────────────────────────────────────────
 * Cycles through a list of strings by typing each one
 * character-by-character, holding, then erasing, then moving to
 * the next string. Returns just the currently-visible text — the
 * caller is expected to render their own blinking cursor.
 *
 * Honors `prefers-reduced-motion`: when motion is reduced the
 * first string in the list is shown statically and no animation
 * runs.
 *
 *   const phrase = useTypewriter(
 *     ['Full-Stack MERN', 'AI / LLM Integration', '...', 'SaaS Architect'],
 *     { typeMs: 60, eraseMs: 30, holdMs: 1500, gapMs: 300 },
 *   );
 */
export function useTypewriter(
  texts: string[],
  options: TypewriterOptions = {},
): { text: string; index: number } {
  const {
    typeMs = 60,
    eraseMs = 30,
    holdMs = 1500,
    gapMs = 300,
  } = options;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  // Reduced-motion friendly: no animation, just the first string.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(texts[0] ?? "");
      return;
    }

    if (texts.length === 0) return;
    const current = texts[index] ?? "";

    let timeoutId: number | undefined;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeoutId = window.setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, typeMs);
      } else {
        // fully typed — pause before erasing
        timeoutId = window.setTimeout(() => setPhase("erasing"), holdMs);
      }
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timeoutId = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, eraseMs);
      } else {
        // fully erased — short pause before next string
        timeoutId = window.setTimeout(() => {
          setPhase("pausing");
        }, gapMs);
      }
    } else if (phase === "pausing") {
      setIndex((prev) => (prev + 1) % texts.length);
      setPhase("typing");
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [
    texts,
    index,
    text,
    phase,
    typeMs,
    eraseMs,
    holdMs,
    gapMs,
    prefersReducedMotion,
  ]);

  return { text, index };
}
