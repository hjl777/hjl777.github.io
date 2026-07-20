import { ArrowUpRight } from 'lucide-react';
import { news, sectionLabels } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';

function formatDate(iso: string) {
  // "2025-02" -> "Feb 2025"
  const [y, m] = iso.split('-');
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// The home page shows only the latest few updates — a "still active" signal,
// not a full changelog.
const HOME_COUNT = 3;

export default function News() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const timeline = news.filter((n) => !n.highlight).slice(0, HOME_COUNT);

  if (!timeline.length) return null;

  return (
    <section id="news" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible)}`}>
        <div className="max-w-2xl">
          <div className="section-kicker">{sectionLabels.news}</div>
          <h2 className="section-title">Recent updates</h2>
          <p className="mt-3 text-ink-600 dark:text-ink-400">
            The latest papers, projects, and fellowships.
          </p>
        </div>

        <ol className="relative mt-10 max-w-3xl">
          <span
            aria-hidden
            className="absolute left-[6.5rem] top-2 bottom-2 w-px bg-ink-200 hidden sm:block dark:bg-ink-800"
          />
          {timeline.map((n, i) => (
            <li
              key={`${n.date}-${i}`}
              className="relative grid grid-cols-1 gap-y-1 pb-6 last:pb-0 sm:grid-cols-[6.5rem_1.5rem_1fr] sm:gap-x-4"
            >
              <div className="hidden pt-0.5 font-mono text-xs text-ink-500 sm:block dark:text-ink-400">
                {formatDate(n.date)}
              </div>
              <div className="relative hidden pt-1.5 sm:block">
                <span className="block h-2.5 w-2.5 rounded-full border-2 border-white bg-clinic-500 ring-2 ring-clinic-200 dark:border-ink-950 dark:ring-clinic-700/60" />
              </div>
              <div>
                <p className="font-mono text-xs text-ink-500 sm:hidden dark:text-ink-400">
                  {formatDate(n.date)}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-700 sm:mt-0 dark:text-ink-300">
                  {n.text}
                  {n.href && (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 inline-flex items-center gap-0.5 text-clinic-700 transition-colors duration-200 hover:text-clinic-900 dark:text-clinic-400 dark:hover:text-clinic-300"
                      aria-label="External link"
                    >
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
