import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, sectionLabels } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';

function SelectedWork({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.12 });

  return (
    <article
      ref={ref}
      className="border-t border-ink-300 py-10 last:border-b sm:py-14 dark:border-ink-700"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-3">
          {p.period && (
            <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
              {p.period}
            </span>
          )}
          {p.status && <span className="badge-soft">{p.status}</span>}
        </div>
      </div>

      <Link
        to={`/projects/${p.id}`}
        viewTransition
        className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
        aria-label={`${p.title} — case study`}
      >
        <div className="lg:col-span-7">
          <BrowserFrame p={p} active={visible} />
        </div>

        <div className={`lg:col-span-5 ${revealClass(visible)}`}>
          <h3
            className="font-serif text-3xl font-medium leading-[1.04] tracking-tight text-ink-900 transition-colors duration-200 group-hover:text-clinic-700 sm:text-4xl dark:text-ink-50 dark:group-hover:text-clinic-300"
            style={{ viewTransitionName: `project-title-${p.id}` } as CSSProperties}
          >
            {p.title}
          </h3>
          {p.subtitle && (
            <p className="mt-3 font-mono text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              {p.subtitle}
            </p>
          )}
          <p className="mt-6 line-clamp-4 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            {p.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.slice(0, 4).map((s) => (
              <span key={s} className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
                {s}
              </span>
            ))}
          </div>

          {p.metrics && (
            <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-ink-200 pt-5 dark:border-ink-800">
              {p.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}>
                  <dd className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
                    {metric.value}
                  </dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-wider text-ink-500 dark:text-ink-400">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-clinic-700 dark:text-clinic-300">
            Case study <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible)}`}>
        <div className="grid gap-8 pb-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="section-kicker">{sectionLabels.projects}</div>
            <h2 className="section-title max-w-[12ch]">What I&apos;ve built</h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              Three systems, each answering the same question a reviewer asks —
              what was the problem, what did I own, and how was it evaluated.
            </p>
            <Link
              to="/projects"
              viewTransition
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-clinic-700 dark:text-clinic-300"
            >
              All projects <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div>
          {featured.map((p, index) => (
            <SelectedWork key={p.id} p={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
