import { Fragment, type CSSProperties, type ReactNode } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * One word of the hero headline inside its own clip mask, split at render time.
 * Masks are inline-blocks on the text baseline, so line breaks and spacing match plain text.
 */
export function MaskWord({ index, children }: { index: number; children: ReactNode }) {
  return (
    <span className="mask-word" style={{ "--w": index } as Vars}>
      <span className="mask-word-in">{children}</span>
    </span>
  );
}

/**
 * Paragraphs split into word spans at render time (server and client render the same markup).
 * Each word knows its position across all paragraphs (--wf, 0 to 1) so the reveal can sweep
 * through the whole block as one scroll-driven timeline.
 */
export function WordReveal({ paragraphs }: { paragraphs: { text: string; className?: string }[] }) {
  const words = paragraphs.map((p) => p.text.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  let k = 0;
  return (
    <>
      {paragraphs.map((p, pi) => (
        <p key={pi} className={p.className}>
          {words[pi]!.map((word, wi) => {
            const fraction = total > 1 ? k++ / (total - 1) : 0;
            return (
              <Fragment key={wi}>
                <span className="reveal-word" style={{ "--wf": fraction.toFixed(4) } as Vars}>
                  {word}
                </span>
                {wi < words[pi]!.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </p>
      ))}
    </>
  );
}

/**
 * A stat number that counts up. The real value is always plain DOM text; the counting digits
 * are a CSS-generated, aria-hidden overlay that only exists while html.motion is set and ends
 * by handing back to the real text.
 */
export function StatCount({ value }: { value: string | undefined }) {
  if (value === undefined) return null;
  const target = Number.parseInt(value, 10);
  if (!Number.isFinite(target)) return <>{value}</>;
  return (
    <>
      <span className="stat-real">{value}</span>
      <span aria-hidden="true" className="stat-anim" style={{ "--to": target } as Vars} />
    </>
  );
}
