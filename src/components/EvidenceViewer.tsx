import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data';
import FrameTicks from './FrameTicks';

export default function EvidenceViewer({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = gallery[active];

  if (!current) return null;

  const selectTab = (index: number) => {
    const next = (index + gallery.length) % gallery.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectTab(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectTab(gallery.length - 1);
    }
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] dark:border-ink-700 dark:bg-ink-900">
      <div className="flex items-center justify-between border-b border-ink-200 px-4 py-2.5 dark:border-ink-800">
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-clinic-700 dark:text-clinic-300">
          {project.mediaLabel}
        </span>
        <span className="font-mono text-[11px] text-ink-500 dark:text-ink-300">
          {String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
        </span>
      </div>

      <div
        id={`evidence-panel-${project.id}`}
        role="tabpanel"
        aria-labelledby={`evidence-tab-${project.id}-${active}`}
        className="relative aspect-[4/5] overflow-hidden bg-ink-950"
      >
        <Link
          to={`/projects/${project.id}`}
          viewTransition
          aria-label={`Open ${project.title}`}
          className="block h-full w-full focus-visible:outline-offset-[-3px]"
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full animate-[fadeIn_200ms_ease-out] object-contain motion-reduce:animate-none"
          />
        </Link>
        <FrameTicks />
      </div>

      <div className="border-t border-ink-200 dark:border-ink-800">
        <div
          role="tablist"
          aria-label={project.title}
          className="grid border-b border-ink-200 dark:border-ink-800"
          style={{ gridTemplateColumns: `repeat(${gallery.length}, minmax(0, 1fr))` }}
        >
          {gallery.map((image, index) => (
            <button
              key={image.src}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`evidence-tab-${project.id}-${index}`}
              type="button"
              role="tab"
              tabIndex={active === index ? 0 : -1}
              aria-selected={active === index}
              aria-controls={`evidence-panel-${project.id}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={[
                'min-h-11 border-r border-ink-200 px-3 py-2 text-left text-xs font-medium transition-colors last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-clinic-700 dark:border-ink-800 dark:focus-visible:outline-clinic-300',
                active === index
                  ? 'bg-clinic-50 text-clinic-800 dark:bg-clinic-500/15 dark:text-clinic-200'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-800 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-100',
              ].join(' ')}
            >
              {image.label ?? `${index + 1}`}
            </button>
          ))}
        </div>
        <figcaption
          aria-live="polite"
          className="min-h-[4.5rem] px-4 py-3 text-[12.5px] leading-relaxed text-ink-600 dark:text-ink-300"
        >
          {current.summary ?? current.caption}
        </figcaption>
      </div>
    </figure>
  );
}
