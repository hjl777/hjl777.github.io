import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { publications } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';

function renderAuthors(authors: string) {
  const parts = authors.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-ink-900 dark:text-ink-50">
          {p.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export default function Highlights() {
  const featured = publications
    .filter((p) => p.selected)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  const { ref, visible } = useReveal<HTMLDivElement>();

  // Scale impact bars against the most-cited paper across the whole record.
  const maxCitations = Math.max(...publications.map((p) => p.citations ?? 0), 1);

  if (!featured.length) return null;

  return (
    <section id="highlights" className="section bg-white dark:bg-ink-950">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'right')}`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="section-kicker">Highlights</div>
            <h2 className="section-title">Selected publications</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-400">
              A few recent papers that best represent my work. Co-first
              authorship is marked with{' '}
              <Star size={12} className="inline align-[-2px] fill-amber-400 stroke-amber-500" />.
            </p>
          </div>
          <a
            href="#publications"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all publications
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((p) => {
            const isCoFirst =
              p.badge?.toLowerCase().includes('co-first') ||
              p.authors.includes('**H Lee***');
            const href = p.links?.publisher || p.links?.pdf || p.links?.arxiv;

            const card = (
              <article className="group relative flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_18px_40px_-22px_rgba(79,70,229,0.35)] dark:border-ink-800 dark:bg-ink-900 dark:hover:border-indigo-700">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-500 dark:text-ink-400">
                    {p.year} · {p.kind}
                  </span>
                  {isCoFirst && (
                    <Star
                      size={12}
                      className="fill-amber-400 stroke-amber-500"
                      aria-label="Co-first author"
                    />
                  )}
                  {href && (
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-ink-400 transition-colors group-hover:text-indigo-600 dark:text-ink-500 dark:group-hover:text-indigo-400"
                    />
                  )}
                </div>
                <h3 className="mt-3 font-serif text-[15.5px] font-semibold leading-snug text-ink-900 line-clamp-3 dark:text-ink-50">
                  {p.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600 line-clamp-2 dark:text-ink-400">
                  {renderAuthors(p.authors)}
                </p>
                <p className="mt-auto pt-3 text-[12px] italic text-ink-500 dark:text-ink-500">
                  {p.venue}
                </p>
                {typeof p.citations === 'number' && p.citations > 0 && (
                  <div className="mt-3">
                    <p className="font-mono text-[10.5px] text-ink-500 dark:text-ink-400">
                      Cited by {p.citations}
                    </p>
                    <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                      <div
                        className="scene-anim h-full rounded-full bg-indigo-500/80"
                        style={{
                          width: visible
                            ? `${Math.max((p.citations / maxCitations) * 100, 6)}%`
                            : '0%',
                          transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s',
                        }}
                      />
                    </div>
                  </div>
                )}
              </article>
            );

            return href ? (
              <a
                key={p.id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                {card}
              </a>
            ) : (
              <div key={p.id} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
