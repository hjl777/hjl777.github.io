import { useEffect, useState, type RefObject } from 'react';

/**
 * Fixed right-hand year rail — a map of where the reader is inside a long
 * chronological section. Shown only while the host section is on screen
 * (continuous observation, unlike useReveal's one-shot arm). Rows inside the
 * host carry data-rail-year; the row crossing the viewport's center band sets
 * the highlighted label. Decorative: aria-hidden, pointer-events none.
 */
export default function ProgressRail({
  host,
  years,
  observeKey,
}: {
  host: RefObject<HTMLElement>;
  years: string[];
  observeKey?: string | number;
}) {
  const [onScreen, setOnScreen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const section = host.current;
    if (!section || !('IntersectionObserver' in window)) return;
    setActive(null);

    const sectionObserver = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '-20% 0px -20% 0px' },
    );
    sectionObserver.observe(section);

    const rowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-rail-year'));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    section
      .querySelectorAll<HTMLElement>('[data-rail-year]')
      .forEach((row) => rowObserver.observe(row));

    return () => {
      sectionObserver.disconnect();
      rowObserver.disconnect();
    };
  }, [host, years.join(','), observeKey]);

  if (!years.length) return null;
  return (
    <div className="progress-rail" data-visible={onScreen ? 'true' : 'false'} aria-hidden="true">
      {years.map((year) => (
        <span key={year} data-active={year === active ? 'true' : 'false'}>
          {year}
        </span>
      ))}
    </div>
  );
}
