import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, sectionLabels } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';

/**
 * Home "Selected Works": the three featured projects as a minimal card grid.
 * Thumbnails use the same 16:10 BrowserFrame as /projects (and the same
 * view-transition-name), so navigating between the two morphs each window.
 */
function SelectedCard({ p }: { p: (typeof projects)[number] }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>({ threshold: 0.15 });

  return (
    <Link ref={ref} to={`/projects/${p.id}`} viewTransition className="group block">
      <BrowserFrame p={p} active={visible} />

      <div className="mt-4 flex items-center justify-between gap-3">
        {p.period && (
          <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
            {p.period}
          </span>
        )}
        {p.status && <span className="badge-soft">{p.status}</span>}
      </div>
      <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-indigo-700 dark:text-ink-50 dark:group-hover:text-indigo-300">
        {p.title}
      </h3>
      {p.subtitle && (
        <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-500">
          {p.subtitle}
        </p>
      )}
    </Link>
  );
}

function SignatureCard({ p }: { p: (typeof projects)[number] }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>({ threshold: 0.12 });

  return (
    <Link
      ref={ref}
      to={`/projects/${p.id}`}
      viewTransition
      className="group grid gap-7 border-y border-ink-200 py-7 md:grid-cols-12 md:items-center dark:border-ink-800"
    >
      <div className="md:col-span-7">
        <BrowserFrame p={p} active={visible} />
      </div>
      <div className="md:col-span-5 md:pl-3">
        <div className="flex flex-wrap items-center gap-3">
          {p.period && (
            <span className="font-mono text-xs text-ink-400 dark:text-ink-500">
              {p.period}
            </span>
          )}
          {p.status && <span className="badge-soft">{p.status}</span>}
        </div>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink-900 transition-colors group-hover:text-clinic-700 dark:text-ink-50 dark:group-hover:text-clinic-300">
          {p.title}
        </h3>
        {p.subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            {p.subtitle}
          </p>
        )}
        {p.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-200 pt-5 dark:border-ink-800">
            {p.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs text-ink-500 dark:text-ink-400">{metric.label}</dt>
                <dd className="mt-1 font-mono text-sm font-medium text-ink-900 dark:text-ink-100">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}

export default function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const featured = projects.filter((p) => p.featured);
  const [signature, ...supporting] = featured;

  return (
    <section id="projects" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'right')}`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="section-kicker">{sectionLabels.projects}</div>
            <h2 className="section-title">What I&apos;ve built</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-400">
              Three systems, each answering the same question a reviewer asks —
              what was the problem, what did I own, and how was it evaluated.
            </p>
          </div>
          <Link
            to="/projects"
            viewTransition
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            All projects
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12">
          {signature && <SignatureCard p={signature} />}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {supporting.map((p) => (
              <SelectedCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
