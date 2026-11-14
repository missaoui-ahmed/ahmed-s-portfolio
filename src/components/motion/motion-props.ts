import { useLayoutEffect, type CSSProperties } from "react";

/*
 * Attribute helpers for the CSS-only motion in styles.css ("Motion" section).
 * They only add data attributes and custom properties; every rule that uses them is gated on
 * html.motion (added by the inline script in __root.tsx), so server HTML stays fully visible.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Scroll-driven reveal for one element. `index` staggers siblings that enter together
 * (cards in a row); CSS caps the stagger at 5 steps, so long lists stay quick.
 */
export function reveal(index = 0, kind: "rise" | "clip" = "rise") {
  return { "data-reveal": kind, style: { "--i": index } as Vars };
}

/** Time-based hero entrance: start delay after page start, rise distance and duration. */
export function heroIn(delayMs: number, risePx = 16, durationMs = 700): Vars {
  return {
    "--hero-delay": `${delayMs}ms`,
    "--hero-y": `${risePx}px`,
    "--hero-dur": `${durationMs}ms`,
  };
}

// Module scope: survives client-side route changes, resets on every full page load.
let heroShown = false;

/**
 * The hero intro plays once per page load. When the hero mounts again after a client-side visit
 * to another route, `hero-seen` on <html> cancels its animations before the first paint. It can
 * only remove animations, never hide anything. A hero counts as shown only after it has been
 * mounted for 200ms, so React StrictMode's immediate dev remount does not suppress the first intro.
 */
export function useHeroOncePerPageLoad() {
  useLayoutEffect(() => {
    const mountedAt = performance.now();
    if (heroShown) document.documentElement.classList.add("hero-seen");
    return () => {
      if (performance.now() - mountedAt > 200) heroShown = true;
    };
  }, []);
}
