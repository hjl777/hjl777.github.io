import { useEffect, useState } from 'react';

/**
 * P5: fixed scroll-journey rail (desktop ≥xl only). Three waypoints map the
 * page to the research pipeline — Data (news/highlights), Models
 * (publications/projects), Clinic (experience). A line draws down the rail
 * as the user scrolls; native scrolling is never intercepted. Hidden under
 * prefers-reduced-motion.
 */

const WAYPOINTS = [
  { id: 'news', label: 'Data' },
  { id: 'publications', label: 'Models' },
  { id: 'cv', label: 'Clinic' },
];

export default function JourneyRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const docTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY;
    const update = () => {
      raf = 0;
      const first = document.getElementById(WAYPOINTS[0].id);
      const last = document.getElementById(WAYPOINTS[WAYPOINTS.length - 1].id);
      if (!first || !last) return;
      const start = docTop(first);
      const end = docTop(last) + last.offsetHeight * 0.5;
      const y = window.scrollY + window.innerHeight * 0.5;
      setProgress(Math.min(Math.max((y - start) / (end - start), 0), 1));
      let a = -1;
      WAYPOINTS.forEach((w, i) => {
        const el = document.getElementById(w.id);
        if (el && y >= docTop(el)) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <nav
      aria-label="Research journey"
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative h-64 w-px bg-ink-200 dark:bg-ink-800">
        <span
          aria-hidden
          className="absolute inset-0 origin-top bg-indigo-500/70"
          style={{ transform: `scaleY(${progress})` }}
        />
        {WAYPOINTS.map((w, i) => {
          const reached = active >= i;
          return (
            <a
              key={w.id}
              href={`#${w.id}`}
              className="group absolute left-1/2 flex -translate-x-[5px] -translate-y-1/2 items-center gap-3"
              style={{ top: `${(i / (WAYPOINTS.length - 1)) * 100}%` }}
            >
              <span
                className={[
                  'block h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300',
                  reached
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-ink-300 bg-white dark:border-ink-700 dark:bg-ink-950',
                ].join(' ')}
              />
              <span
                className={[
                  'font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300',
                  active === i
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-ink-400 group-hover:text-ink-600 dark:text-ink-600 dark:group-hover:text-ink-400',
                ].join(' ')}
              >
                {w.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
