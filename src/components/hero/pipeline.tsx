import { useEffect, useRef, type CSSProperties } from "react";
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from "motion/react";
import { glyphFor } from "./pipeline-glyphs";

/*
 * The server renders the finished diagram. A tiny inline script in __root.tsx adds
 * `pipeline-anim` to <html> before first paint (only when motion is allowed), which hides
 * the animated parts; this component then plays one timeline and removes the class.
 * If this component never mounts, the inline script removes the class after 4s.
 */

const ANIM_CLASS = "pipeline-anim";
const READY_ATTR = "data-pipeline-ready";
const DESKTOP_QUERY = "(min-width: 1024px)";
// Start time of each stage in seconds; anything past the 8th stage follows on at 0.4s.
const STAGE_START = [0, 0.4, 0.8, 1.2, 1.6, 2.1, 2.6, 3.0];
const startOf = (i: number) => STAGE_START[i] ?? 3.0 + (i - 7) * 0.4;

function PipelineGlyph({ index }: { index: number }) {
  const { Svg } = glyphFor(index);
  return (
    <svg viewBox="0 0 120 80" className="pipeline-svg" aria-hidden="true" focusable="false">
      <Svg />
    </svg>
  );
}

function buildTimeline(count: number, desktop: boolean): AnimationSequence {
  const sequence: AnimationSequence = [];
  for (let i = 0; i < count; i++) {
    const stage = `[data-stage="${i}"]`;
    const at = startOf(i);
    sequence.push(
      [`${stage} .pipeline-dot`, { opacity: [0, 1], scale: [0, 1] }, { at, duration: 0.2 }],
      [`${stage} .pipeline-num`, { opacity: [0.35, 1] }, { at, duration: 0.25 }],
      [`${stage} .pipeline-label`, { opacity: [0.45, 1] }, { at, duration: 0.25 }],
      ...glyphFor(i).timeline(stage, at),
    );
    if (i < count - 1) {
      sequence.push([
        `${stage} .pipeline-seg`,
        desktop ? { scaleX: [0, 1] } : { scaleY: [0, 1] },
        { at: at + 0.1, duration: startOf(i + 1) - at, ease: "linear" },
      ]);
    }
  }
  return sequence;
}

export function Pipeline({
  steps,
  label,
  caption,
}: {
  steps: readonly string[];
  label: string;
  caption: string;
}) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const mode = useRef<"pending" | "desktop" | "mobile" | "done">("pending");

  const settle = () => {
    mode.current = "done";
    document.documentElement.classList.remove(ANIM_CLASS);
  };

  const play = (desktop: boolean) => {
    mode.current = "done";
    const controls = animate(buildTimeline(steps.length, desktop));
    controls.then(() => document.documentElement.classList.remove(ANIM_CLASS));
  };

  // Decide once, on mount, how (or whether) the sequence plays.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute(READY_ATTR, "");
    if (mode.current !== "pending") return;
    if (reduceMotion || !root.classList.contains(ANIM_CLASS) || !scope.current) {
      settle();
      return;
    }
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (!desktop) {
      mode.current = "mobile"; // waits for the figure to scroll into view
      return;
    }
    const box = scope.current.getBoundingClientRect();
    const visible = box.top < window.innerHeight && box.bottom > 0;
    if (visible) play(true);
    else settle(); // opened deep-linked further down the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView && mode.current === "mobile") play(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <figure ref={scope} className="hero-pipeline" aria-label={label}>
      <ol className="pipeline-list" style={{ "--stages": steps.length } as CSSProperties}>
        {steps.map((step, i) => (
          <li key={step} data-stage={i} className="pipeline-step">
            <div className="pipeline-glyph">
              <PipelineGlyph index={i} />
            </div>
            <div className="pipeline-rail" aria-hidden="true">
              <span className="pipeline-dot" />
              {i < steps.length - 1 && <span className="pipeline-seg" />}
            </div>
            <p className="pipeline-text">
              <span className="pipeline-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pipeline-label">{step}</span>
            </p>
          </li>
        ))}
      </ol>
      <figcaption className="pipeline-caption">{caption}</figcaption>
    </figure>
  );
}
