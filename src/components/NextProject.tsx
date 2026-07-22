import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data';
import { markProjectEnter } from '../lib/motion';
import { useReveal } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';

/** Endless-portfolio tail: the following project's preview, entered with the
 * same shared-element transition as the list rows. Cycles past the end. */
export default function NextProject({ current }: { current: Project }) {
  const idx = projects.findIndex((p) => p.id === current.id);
  const next = projects[(idx + 1) % projects.length];
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.15 });

  if (!next || next.id === current.id) return null;

  return (
    <div
      ref={ref}
      data-in={visible ? 'true' : 'false'}
      className="mt-24 border-t border-ink-300 pt-10 dark:border-ink-700"
    >
      <p className="section-kicker">Next project</p>
      <Link
        to={`/projects/${next.id}`}
        viewTransition
        onClick={markProjectEnter}
        className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center"
      >
        <div className="io-rise md:col-span-7">
          <h2 className="font-serif text-4xl font-medium leading-[1.02] tracking-tight text-ink-900 transition-colors duration-200 group-hover:text-clinic-700 sm:text-5xl dark:text-ink-50 dark:group-hover:text-clinic-300">
            {next.title}
          </h2>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clinic-700 dark:text-clinic-300">
            Open case study
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <div className="io-clip md:col-span-5" style={{ '--d': '120ms' } as React.CSSProperties}>
          <BrowserFrame p={next} active={visible} />
        </div>
      </Link>
    </div>
  );
}
