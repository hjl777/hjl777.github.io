/**
 * Hero ambient background: a faint coronary-tree network that draws itself
 * once on load (staggered line-draw, trunk → branches → twigs), then pulses
 * gently like a heartbeat. Replaces the previous generic gradient blobs with
 * a visual tied to the research subject. Pure SVG + CSS keyframes
 * (vessel-* classes in index.css); reduced-motion renders the final static
 * network immediately.
 */

const PATHS: { d: string; w: number; delay: number }[] = [
  // Main trunk
  { d: 'M -40 220 C 140 240, 260 290, 400 370 C 520 440, 640 520, 800 560', w: 3, delay: 0 },
  // Upper branch off the trunk
  { d: 'M 330 320 C 430 290, 540 260, 660 265 C 770 270, 870 300, 980 280', w: 2.2, delay: 400 },
  { d: 'M 660 265 C 740 220, 830 180, 950 165', w: 1.6, delay: 900 },
  { d: 'M 950 165 C 1010 155, 1070 140, 1130 110', w: 1.2, delay: 1300 },
  { d: 'M 980 280 C 1050 270, 1110 280, 1170 310', w: 1.4, delay: 1200 },
  // Lower branch
  { d: 'M 480 420 C 540 500, 590 580, 620 670', w: 2, delay: 500 },
  { d: 'M 620 670 C 650 720, 700 760, 780 780', w: 1.5, delay: 1000 },
  // Distal continuation
  { d: 'M 800 560 C 900 580, 1000 570, 1090 520', w: 2.2, delay: 600 },
  { d: 'M 1090 520 C 1150 480, 1185 430, 1200 380', w: 1.5, delay: 1100 },
  // Short twig near the first bifurcation
  { d: 'M 400 370 C 460 352, 520 346, 580 362', w: 1.4, delay: 700 },
];

const NODES: { cx: number; cy: number; delay: number }[] = [
  { cx: 330, cy: 320, delay: 700 },
  { cx: 400, cy: 370, delay: 800 },
  { cx: 480, cy: 420, delay: 900 },
  { cx: 660, cy: 265, delay: 1200 },
  { cx: 800, cy: 560, delay: 1100 },
  { cx: 950, cy: 165, delay: 1600 },
  { cx: 980, cy: 280, delay: 1500 },
  { cx: 620, cy: 670, delay: 1400 },
  { cx: 1090, cy: 520, delay: 1500 },
];

export default function VesselField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <svg
        className="vessel-group absolute inset-0 h-full w-full text-indigo-600 dark:text-indigo-400"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="opacity-[0.07] dark:opacity-[0.09]">
          {PATHS.map((p) => (
            <path
              key={p.d}
              d={p.d}
              pathLength={1}
              stroke="currentColor"
              strokeWidth={p.w}
              strokeLinecap="round"
              className="vessel-path"
              style={{ animationDelay: `${p.delay}ms` }}
            />
          ))}
          {NODES.map((n) => (
            <circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r={3}
              fill="currentColor"
              className="vessel-node"
              style={{ animationDelay: `${n.delay}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
