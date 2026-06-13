/**
 * Per-project animated banner scenes (SVG only, no images). Each scene
 * visualizes the project's actual subject and plays once when `active`
 * flips true (card scrolled into view). All animation is transition-based
 * (stroke-dashoffset / opacity), so the reduced-motion guard in index.css
 * (`.scene-anim`) freezes everything to its final state.
 */

const STROKE = 'currentColor';

function dash(active: boolean, duration: number, delay: number) {
  return {
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
  } as const;
}

function fade(active: boolean, delay: number) {
  return {
    opacity: active ? 1 : 0,
    transition: `opacity 0.5s ease ${delay}s`,
  } as const;
}

/** Coronary centerline drawing itself, branch points lighting up. */
function VesselScene({ active }: { active: boolean }) {
  const nodes: [number, number, number][] = [
    // [cx, cy, delay]
    [150, 56, 1.0],
    [225, 64, 1.3],
    [318, 28, 1.9],
  ];
  return (
    <svg
      aria-hidden
      className="scene-anim absolute inset-0 h-full w-full text-indigo-500 dark:text-indigo-400"
      viewBox="0 0 400 112"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M -8 64 C 60 58, 120 52, 180 58 S 300 76, 408 62"
        pathLength={1}
        stroke={STROKE}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeOpacity={0.45}
        style={dash(active, 1.6, 0.1)}
      />
      <path
        d="M 150 56 C 200 42, 250 30, 318 28"
        pathLength={1}
        stroke={STROKE}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeOpacity={0.4}
        style={dash(active, 1.2, 0.7)}
      />
      <path
        d="M 225 64 C 262 80, 300 92, 360 98"
        pathLength={1}
        stroke={STROKE}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeOpacity={0.4}
        style={dash(active, 1.2, 1.0)}
      />
      <path
        d="M 318 28 C 344 22, 366 16, 394 18"
        pathLength={1}
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeOpacity={0.35}
        style={dash(active, 0.9, 1.6)}
      />
      {nodes.map(([cx, cy, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={2.6}
          fill={STROKE}
          fillOpacity={0.55}
          style={fade(active, delay)}
        />
      ))}
    </svg>
  );
}

/** Token row with a small soft-prompt prefix lighting up in indigo. */
function TokenScene({ active }: { active: boolean }) {
  const rows: { y: number; widths: number[]; soft: number }[] = [
    { y: 30, widths: [12, 12, 12, 34, 22, 40, 18, 30], soft: 3 },
    { y: 58, widths: [12, 12, 12, 26, 38, 20, 32, 24], soft: 3 },
  ];
  let order = 0;
  return (
    <svg
      aria-hidden
      className="scene-anim absolute inset-0 h-full w-full"
      viewBox="0 0 400 112"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {rows.map((row) => {
        let x = 24;
        return row.widths.map((w, i) => {
          const rect = (
            <rect
              key={`${row.y}-${i}`}
              x={x}
              y={row.y}
              width={w}
              height={15}
              rx={4}
              className={
                i < row.soft
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-ink-500 dark:text-ink-400'
              }
              fill={STROKE}
              fillOpacity={i < row.soft ? 0.5 : 0.16}
              style={fade(active, 0.15 + order * 0.08)}
            />
          );
          x += w + 7;
          order += 1;
          return rect;
        });
      })}
    </svg>
  );
}

/** Small knowledge graph — edges highlight sequentially. */
function GraphScene({ active }: { active: boolean }) {
  const nodes: [number, number][] = [
    [62, 32],
    [126, 72],
    [200, 30],
    [262, 80],
    [330, 40],
    [92, 94],
    [292, 20],
    [172, 94],
    [362, 86],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 8],
  ];
  const CENTER = 2;
  return (
    <svg
      aria-hidden
      className="scene-anim absolute inset-0 h-full w-full text-indigo-500 dark:text-indigo-400"
      viewBox="0 0 400 112"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          pathLength={1}
          stroke={STROKE}
          strokeWidth={1}
          strokeOpacity={0.3}
          style={dash(active, 0.5, 0.2 + i * 0.12)}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={i === CENTER ? 4.5 : 3}
          fill={STROKE}
          fillOpacity={i === CENTER ? 0.6 : 0.35}
          style={fade(active, 0.1 + i * 0.09)}
        />
      ))}
    </svg>
  );
}

/** Calibration curve drawing toward the ideal diagonal. */
function CalibrationScene({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className="scene-anim absolute inset-0 h-full w-full text-indigo-500 dark:text-indigo-400"
      viewBox="0 0 400 112"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Axes */}
      <path
        d="M 30 10 L 30 96 L 384 96"
        stroke={STROKE}
        strokeWidth={1}
        strokeOpacity={0.25}
        style={fade(active, 0.1)}
      />
      {/* Ideal diagonal */}
      <line
        x1={30}
        y1={96}
        x2={380}
        y2={14}
        stroke={STROKE}
        strokeWidth={1}
        strokeDasharray="4 5"
        strokeOpacity={0.3}
        style={fade(active, 0.4)}
      />
      {/* Model curve converging on the diagonal */}
      <path
        d="M 30 96 C 110 92, 190 64, 380 16"
        pathLength={1}
        stroke={STROKE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.55}
        style={dash(active, 1.6, 0.6)}
      />
    </svg>
  );
}

const SCENES: Record<string, (props: { active: boolean }) => JSX.Element> = {
  'proj-stent-marker': VesselScene,
  'proj-llm': TokenScene,
  'proj-defines': GraphScene,
  'proj-outcomes': CalibrationScene,
};

export default function ProjectScene({ id, active }: { id: string; active: boolean }) {
  const Scene = SCENES[id];
  if (!Scene) return null;
  return <Scene active={active} />;
}
