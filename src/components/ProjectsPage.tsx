import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';

function ProjectRow({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <article
      ref={ref}
      className="grid grid-cols-1 gap-7 border-t border-ink-300 py-10 last:border-b sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-10 dark:border-ink-700"
    >
      <div className="flex items-center justify-between lg:col-span-1 lg:block lg:self-start">
        <span className="font-mono text-sm text-ink-400 dark:text-ink-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        {p.status && <span className="badge-soft lg:mt-3">{p.status}</span>}
      </div>

      <Link
        to={`/projects/${p.id}`}
        viewTransition
        aria-label={`${p.title} — case study`}
        className="group block lg:col-span-4"
      >
        <BrowserFrame p={p} active={visible} />
      </Link>

      <div className={`lg:col-span-6 ${revealClass(visible)}`}>
        {p.period && (
          <span className="font-mono text-xs text-ink-400 dark:text-ink-500">{p.period}</span>
        )}
        <Link to={`/projects/${p.id}`} viewTransition className="group/title">
          <h2
            className="mt-3 font-serif text-3xl font-medium leading-[1.05] tracking-tight text-ink-900 transition-colors duration-200 group-hover/title:text-clinic-700 sm:text-4xl dark:text-ink-50 dark:group-hover/title:text-clinic-300"
            style={{ viewTransitionName: `project-title-${p.id}` } as CSSProperties}
          >
            {p.title}
          </h2>
        </Link>
        {p.subtitle && (
          <p className="mt-1.5 font-mono text-[13px] text-ink-500 dark:text-ink-500">
            {p.subtitle}
          </p>
        )}

        <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
          {p.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[10.5px] text-ink-700 dark:bg-ink-800 dark:text-ink-300"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            to={`/projects/${p.id}`}
            viewTransition
            className="group/cs inline-flex items-center gap-1 text-sm font-semibold text-clinic-700 transition-colors duration-200 hover:text-clinic-900 dark:text-clinic-300 dark:hover:text-clinic-200"
          >
            Case study
            <ArrowRight
              size={14}
              className="transition-transform group-hover/cs:translate-x-0.5"
            />
          </Link>
          {p.links?.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-400 dark:hover:text-indigo-400"
            >
              {l.label}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
      </div>

      <div className="hidden justify-self-end lg:col-span-1 lg:block">
        <Link
          to={`/projects/${p.id}`}
          viewTransition
          aria-label={`Open ${p.title}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 text-ink-600 transition-colors hover:border-clinic-500 hover:text-clinic-700 dark:border-ink-700 dark:text-ink-300 dark:hover:border-clinic-500 dark:hover:text-clinic-300"
        >
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [tag, setTag] = useState<string>('All');

  useEffect(() => {
    document.title = 'Projects — Hojae Lee';
    return () => {
      document.title = 'Hojae Lee — Healthcare AI Researcher';
    };
  }, []);

  // Stack tags ordered by how many projects use them, then alphabetically.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.stack.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  }, []);

  const filtered = tag === 'All' ? projects : projects.filter((p) => p.stack.includes(tag));

  return (
    <section className="section pt-28 sm:pt-36">
      <div className="container-prose">
        <Link
          to="/"
          viewTransition
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={15} /> Home
        </Link>

        <div className="mt-12 grid gap-8 border-b border-ink-300 pb-12 md:grid-cols-12 md:items-end dark:border-ink-700">
          <div className="md:col-span-8">
          <div className="section-kicker">Research & Projects</div>
            <h1 className="page-display">All Projects</h1>
          </div>
          <p className="text-sm leading-relaxed text-ink-600 md:col-span-4 dark:text-ink-400">
            Systems and studies, built end to end — from population-scale
            prediction to medical vision and trustworthy LLMs.
          </p>
        </div>

        {/* Stack-tag filter chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {['All', ...tags].map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={[
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200',
                tag === t
                  ? 'border-ink-900 bg-ink-900 text-white dark:border-indigo-500 dark:bg-indigo-500'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {filtered.map((p, i) => (
            <ProjectRow key={p.id} p={p} index={i} />
          ))}
        </div>

        {!filtered.length && (
          <p className="py-12 text-center text-sm text-ink-500 dark:text-ink-500">
            No projects use this stack yet.
          </p>
        )}
      </div>
    </section>
  );
}
