import { useEffect, useRef, useState } from 'react';

/**
 * Hero ambient background: a faint static coronary-tree network. On devices
 * with a hover pointer (and motion allowed) it is cursor-reactive: the tree
 * drifts with a lerped parallax, and bifurcation nodes near the cursor
 * brighten and reveal their segment name (anatomy labels only — no fabricated
 * measurements). One rAF loop, woken by pointermove and self-stopping once
 * every lerp settles; fully idle while the sticky hero is covered ([inert]).
 * Reduced-motion (live-tracked) and touch render the static network only.
 */

const PATHS: { d: string; w: number }[] = [
  // Main trunk
  { d: 'M -40 220 C 140 240, 260 290, 400 370 C 520 440, 640 520, 800 560', w: 3 },
  // Upper branch off the trunk
  { d: 'M 330 320 C 430 290, 540 260, 660 265 C 770 270, 870 300, 980 280', w: 2.2 },
  { d: 'M 660 265 C 740 220, 830 180, 950 165', w: 1.6 },
  { d: 'M 950 165 C 1010 155, 1070 140, 1130 110', w: 1.2 },
  { d: 'M 980 280 C 1050 270, 1110 280, 1170 310', w: 1.4 },
  // Lower branch
  { d: 'M 480 420 C 540 500, 590 580, 620 670', w: 2 },
  { d: 'M 620 670 C 650 720, 700 760, 780 780', w: 1.5 },
  // Distal continuation
  { d: 'M 800 560 C 900 580, 1000 570, 1090 520', w: 2.2 },
  { d: 'M 1090 520 C 1150 480, 1185 430, 1200 380', w: 1.5 },
  // Short twig near the first bifurcation
  { d: 'M 400 370 C 460 352, 520 346, 580 362', w: 1.4 },
];

// Coronary segment names per node — anatomical labels, not measurements.
const NODES: { cx: number; cy: number; tag: string }[] = [
  { cx: 330, cy: 320, tag: 'LM' },
  { cx: 400, cy: 370, tag: 'LAD' },
  { cx: 480, cy: 420, tag: 'LCx' },
  { cx: 660, cy: 265, tag: 'D1' },
  { cx: 800, cy: 560, tag: 'RCA' },
  { cx: 950, cy: 165, tag: 'D2' },
  { cx: 980, cy: 280, tag: 'OM1' },
  { cx: 620, cy: 670, tag: 'PDA' },
  { cx: 1090, cy: 520, tag: 'dLAD' },
];

const GLOW_RADIUS = 120; // viewBox units
const NODE_BASE_OPACITY = 0.14;
const LERP = 0.05;

/** Live media-query state — re-renders when the preference flips mid-session. */
function useMediaFlag(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export default function VesselField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const tagRefs = useRef<(SVGTextElement | null)[]>([]);

  const reduced = useMediaFlag('(prefers-reduced-motion: reduce)');
  const canHover = useMediaFlag('(hover: hover)');
  const interactive = !reduced && canHover;

  useEffect(() => {
    const wrap = wrapRef.current;
    const group = groupRef.current;
    if (!wrap || !group || !interactive) return;

    const target = { x: 0.5, y: 0.5, active: 0 };
    const mouse = { x: 0.5, y: 0.5, active: 0 };
    let raf = 0;
    let running = false;

    const frame = () => {
      // Behind the opaque home-stack the hero is [inert] — decay and stop.
      if (wrap.closest('.nesh-hero')?.hasAttribute('inert')) target.active = 0;

      mouse.x += (target.x - mouse.x) * LERP;
      mouse.y += (target.y - mouse.y) * LERP;
      mouse.active += (target.active - mouse.active) * 0.08;

      // Parallax drift, ±12px against the cursor.
      const dx = (mouse.x - 0.5) * -24;
      const dy = (mouse.y - 0.5) * -24;
      group.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;

      // Cursor position in viewBox coordinates (preserveAspectRatio: slice).
      const rect = wrap.getBoundingClientRect();
      const scale = Math.max(rect.width / 1200, rect.height / 800);
      const offX = (rect.width - 1200 * scale) / 2;
      const offY = (rect.height - 800 * scale) / 2;
      const vx = (mouse.x * rect.width - offX) / scale;
      const vy = (mouse.y * rect.height - offY) / scale;

      NODES.forEach((n, i) => {
        const node = nodeRefs.current[i];
        const tag = tagRefs.current[i];
        if (!node || !tag) return;
        const d = Math.hypot(n.cx - vx, n.cy - vy);
        const t = Math.max(0, 1 - d / GLOW_RADIUS) * mouse.active;
        node.style.opacity = (NODE_BASE_OPACITY + t * (1 - NODE_BASE_OPACITY)).toFixed(3);
        node.setAttribute('r', (3 + t * 3.5).toFixed(2));
        tag.style.opacity = t > 0.1 ? Math.min(1, t * 1.1).toFixed(2) : '0';
      });

      // Once every lerp has settled the picture is static — stop until the
      // next pointermove wakes the loop.
      const settled =
        Math.abs(target.x - mouse.x) < 0.0005 &&
        Math.abs(target.y - mouse.y) < 0.0005 &&
        Math.abs(target.active - mouse.active) < 0.005;
      if (settled) {
        running = false;
        return;
      }
      raf = window.requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = window.requestAnimationFrame(frame);
      }
    };
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (wrap.closest('.nesh-hero')?.hasAttribute('inert')) return;
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
      target.active =
        target.x >= 0 && target.x <= 1 && target.y >= 0 && target.y <= 1 ? 1 : 0;
      wake();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(raf);
      group.style.transform = '';
    };
  }, [interactive]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full text-indigo-600 dark:text-indigo-400"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g ref={groupRef}>
          <g className="opacity-[0.07] dark:opacity-[0.09]">
            {PATHS.map((p) => (
              <path
                key={p.d}
                d={p.d}
                stroke="currentColor"
                strokeWidth={p.w}
                strokeLinecap="round"
              />
            ))}
          </g>
          {NODES.map((n, i) => (
            <g key={`${n.cx}-${n.cy}`}>
              <circle
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                cx={n.cx}
                cy={n.cy}
                r={3}
                fill="currentColor"
                style={{ opacity: NODE_BASE_OPACITY }}
              />
              <text
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                x={n.cx + 12}
                y={n.cy - 10}
                className="vessel-tag"
                fill="currentColor"
              >
                {n.tag}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
