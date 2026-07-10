import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data';
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
        <p className="mt-1 font-mono text-xs text-ink-500 dark:text-ink-500">{p.subtitle}</p>
      )}
    </Link>
  );
}

export default function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'right')}`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="section-kicker">04 · Research & Projects</div>
            <h2 className="section-title">Selected Works</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-400">
              Applied research bridging mathematical foundations and clinical
              problems.
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

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((p) => (
            <SelectedCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
