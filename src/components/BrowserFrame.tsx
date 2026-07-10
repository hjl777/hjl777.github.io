import type { CSSProperties } from 'react';
import type { Project } from '../data';
import ProjectScene from './ProjectScene';

/**
 * Browser-chrome frame around a project's cover media: three window dots, a
 * faux address bar, and a fixed 16:10 viewport so images never stretch.
 * Shared by the home Selected Works grid and the /projects archive — the
 * frame carries view-transition-name: project-<id>, so route changes morph
 * the whole window between pages.
 *
 * mediaFit 'cover' (default) crops photographic media from the top;
 * 'contain' letterboxes charts/graphs on a white background with padding.
 */
export default function BrowserFrame({ p, active }: { p: Project; active: boolean }) {
  const cover = p.gallery?.[0];
  const contain = p.mediaFit === 'contain';
  // Address bar shows a real public URL when the project has one; otherwise
  // it stays empty — internal route ids are not meaningful to visitors.
  const liveHost = (() => {
    const href = p.links?.[0]?.href;
    if (!href) return null;
    try {
      return new URL(href).hostname;
    } catch {
      return null;
    }
  })();

  return (
    <div
      className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] dark:border-ink-700 dark:bg-ink-900 dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]"
      style={{ viewTransitionName: `project-${p.id}` } as CSSProperties}
    >
      {/* Chrome bar: dots + address */}
      <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-3 py-2 dark:border-ink-800 dark:bg-ink-950/60">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-600" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[10px] text-ink-400 dark:text-ink-500">
          {liveHost}
        </span>
        <span className="w-[38px] shrink-0" aria-hidden />
      </div>

      {/* Fixed-ratio viewport */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-ink-100 dark:from-indigo-500/15 dark:via-ink-900 dark:to-ink-800">
        {cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className={
              contain
                ? 'h-full w-full bg-white object-contain p-4'
                : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
            }
          />
        ) : (
          <ProjectScene id={p.id} active={active} />
        )}
      </div>
    </div>
  );
}
