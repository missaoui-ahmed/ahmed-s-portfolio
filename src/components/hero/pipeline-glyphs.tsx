import { stagger, type AnimationSequence } from "motion/react";

/*
 * One small SVG per pipeline stage, matched to projects[0].architecture by position.
 * Every animated part carries data-a so CSS can hide it before the client timeline runs.
 * Without JavaScript (or with reduced motion) the SVGs render in their final state.
 */

type Glyph = {
  Svg: () => React.JSX.Element;
  timeline: (stage: string, at: number) => AnimationSequence;
};

const ease = [0.22, 1, 0.36, 1] as const;

function pageParts(draw = false) {
  return (
    <>
      <path
        data-a="page"
        d="M34 6 H76 L88 18 V74 H34 Z"
        pathLength={draw ? 1 : undefined}
        strokeDasharray={draw ? 1 : undefined}
        className="pipeline-stroke"
      />
      <path data-a="fold" d="M76 6 V18 H88" className="pipeline-stroke" />
      {[30, 40, 50, 60].map((y, i) => (
        <line
          key={y}
          data-a="line"
          x1="42"
          x2={i === 3 ? 66 : 80}
          y1={y}
          y2={y}
          className="pipeline-stroke"
        />
      ))}
    </>
  );
}

const scatter = [
  [30, 22],
  [44, 56],
  [56, 30],
  [70, 62],
  [80, 20],
  [92, 44],
  [40, 38],
  [66, 44],
] as const;
const selected = new Set([2, 5, 7]);

const documents: Glyph = {
  Svg: () => <>{pageParts(true)}</>,
  timeline: (s, at) => [
    [
      `${s} [data-a=page]`,
      { opacity: [0, 1], strokeDashoffset: [1, 0] },
      { at, duration: 0.35, ease },
    ],
    [`${s} [data-a=fold]`, { opacity: [0, 1] }, { at: at + 0.2, duration: 0.15 }],
    [
      `${s} [data-a=line]`,
      { opacity: [0, 1], x: [-6, 0] },
      { at: at + 0.15, duration: 0.2, delay: stagger(0.05), ease },
    ],
  ],
};

const processing: Glyph = {
  Svg: () => (
    <>
      {pageParts()}
      <rect data-a="scan" x="30" y="43" width="62" height="2.5" rx="1" className="fill-primary" />
    </>
  ),
  timeline: (s, at) => [
    [
      `${s} [data-a=page], ${s} [data-a=fold], ${s} [data-a=line]`,
      { opacity: [0, 1] },
      { at, duration: 0.2 },
    ],
    [
      `${s} [data-a=scan]`,
      { opacity: [0, 1, 1], y: [-36, 28, 0] },
      { at: at + 0.05, duration: 0.45, ease: "easeInOut" },
    ],
  ],
};

const chunking: Glyph = {
  Svg: () => (
    <>
      {[
        [10, 52],
        [26, 40],
        [42, 48],
        [58, 30],
      ].map(([y, w], i) => (
        <rect
          key={y}
          data-a="chunk"
          data-i={i}
          x="34"
          y={y}
          width={w}
          height="11"
          rx="2"
          className="pipeline-stroke"
        />
      ))}
    </>
  ),
  // The page's lines start packed together, then spread apart into separate chunks.
  timeline: (s, at) =>
    [0, 1, 2, 3].map((i) => [
      `${s} [data-a=chunk][data-i="${i}"]`,
      { opacity: [0, 1], y: [(1.5 - i) * 6, 0] },
      { at: at + i * 0.03, duration: 0.35, ease },
    ]),
};

function dotParts(withSelection: boolean) {
  return (
    <>
      <path data-a="axes" d="M24 72 H98 M24 72 V10" className="pipeline-stroke pipeline-faint" />
      {scatter.map(([cx, cy], i) => {
        const isSelected = withSelection && selected.has(i);
        return (
          <g key={i}>
            <circle
              data-a={isSelected ? "hit" : "dot"}
              data-dim={withSelection && !isSelected ? "" : undefined}
              cx={cx}
              cy={cy}
              r="3"
              className={isSelected ? "fill-primary" : "fill-current"}
            />
            {isSelected && (
              <circle
                data-a="ring"
                cx={cx}
                cy={cy}
                r="7.5"
                className="pipeline-stroke stroke-primary"
              />
            )}
          </g>
        );
      })}
    </>
  );
}

const embeddings: Glyph = {
  Svg: () => <>{dotParts(false)}</>,
  timeline: (s, at) => [
    [`${s} [data-a=axes]`, { opacity: [0, 1] }, { at, duration: 0.2 }],
    [
      `${s} [data-a=dot]`,
      { opacity: [0, 1], scale: [0, 1] },
      { at: at + 0.05, duration: 0.2, delay: stagger(0.03), ease },
    ],
  ],
};

const retrieval: Glyph = {
  Svg: () => <>{dotParts(true)}</>,
  timeline: (s, at) => [
    [
      `${s} [data-a=axes], ${s} [data-a=dot], ${s} [data-a=hit]`,
      { opacity: [0, 1] },
      { at, duration: 0.2 },
    ],
    [
      `${s} [data-a=ring]`,
      { opacity: [0, 1], scale: [0.4, 1] },
      { at: at + 0.2, duration: 0.25, delay: stagger(0.06), ease },
    ],
    [`${s} [data-dim]`, { opacity: [1, 0.35] }, { at: at + 0.25, duration: 0.2 }],
  ],
};

const agentRows = [18, 40, 62];
const agents: Glyph = {
  Svg: () => (
    <>
      {agentRows.map((y) => (
        <g key={y}>
          <circle data-a="input" cx="26" cy={y} r="3.5" className="fill-primary" />
          <rect
            data-a="agent"
            x="44"
            y={y - 6}
            width="12"
            height="12"
            rx="3"
            className="pipeline-stroke"
          />
          <path
            data-a="route"
            d={`M56 ${y} C72 ${y} 76 40 90 40`}
            pathLength={1}
            strokeDasharray={1}
            className="pipeline-stroke"
          />
        </g>
      ))}
      <circle data-a="merge" cx="94" cy="40" r="5" className="fill-primary" />
    </>
  ),
  timeline: (s, at) => [
    [`${s} [data-a=input]`, { opacity: [0, 1] }, { at, duration: 0.15 }],
    [
      `${s} [data-a=agent]`,
      { opacity: [0, 1], scale: [0.6, 1] },
      { at: at + 0.08, duration: 0.2, delay: stagger(0.05), ease },
    ],
    [
      `${s} [data-a=route]`,
      { opacity: [0, 1], strokeDashoffset: [1, 0] },
      { at: at + 0.2, duration: 0.2, ease },
    ],
    [
      `${s} [data-a=merge]`,
      { opacity: [0, 1], scale: [0, 1] },
      { at: at + 0.38, duration: 0.12, ease },
    ],
  ],
};

const extraction: Glyph = {
  Svg: () => (
    <>
      <circle data-a="source" cx="30" cy="40" r="5" className="fill-primary" />
      {[
        [26, 40],
        [37, 26],
        [48, 34],
      ].map(([y, w]) => (
        <rect
          key={y}
          data-a="field"
          x="48"
          y={y}
          width={w}
          height="7"
          rx="2"
          className="fill-current"
        />
      ))}
    </>
  ),
  timeline: (s, at) => [
    [`${s} [data-a=source]`, { opacity: [0, 1] }, { at, duration: 0.12 }],
    [
      `${s} [data-a=field]`,
      { opacity: [0, 1], x: [-16, 0] },
      { at: at + 0.08, duration: 0.25, delay: stagger(0.07), ease },
    ],
  ],
};

const output: Glyph = {
  Svg: () => (
    <>
      <text data-a="brace-l" x="24" y="54" className="pipeline-brace">
        {"{"}
      </text>
      <text data-a="brace-r" x="86" y="54" className="pipeline-brace">
        {"}"}
      </text>
      {[
        [24, 22],
        [37, 15],
        [50, 19],
      ].map(([y, w]) => (
        <g key={y}>
          <rect data-a="key" x="42" y={y} width="11" height="5" rx="1.5" className="fill-current" />
          <rect
            data-a="value"
            x="57"
            y={y}
            width={w}
            height="5"
            rx="1.5"
            className="fill-primary"
          />
        </g>
      ))}
    </>
  ),
  timeline: (s, at) => [
    [`${s} [data-a=brace-l]`, { opacity: [0, 1], x: [6, 0] }, { at, duration: 0.2, ease }],
    [`${s} [data-a=brace-r]`, { opacity: [0, 1], x: [-6, 0] }, { at, duration: 0.2, ease }],
    [
      `${s} [data-a=key], ${s} [data-a=value]`,
      { opacity: [0, 1], x: [-4, 0] },
      { at: at + 0.12, duration: 0.2, delay: stagger(0.035), ease },
    ],
  ],
};

const fallback: Glyph = {
  Svg: () => <circle data-a="node" cx="60" cy="40" r="10" className="pipeline-stroke" />,
  timeline: (s, at) => [
    [`${s} [data-a=node]`, { opacity: [0, 1], scale: [0.6, 1] }, { at, duration: 0.25, ease }],
  ],
};

const glyphs = [documents, processing, chunking, embeddings, retrieval, agents, extraction, output];

export function glyphFor(index: number): Glyph {
  return glyphs[index] ?? fallback;
}
