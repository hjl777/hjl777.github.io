import type { CSSProperties } from 'react';
import type { Project } from '../data';
import ProjectScene from './ProjectScene';
import FrameTicks from './FrameTicks';

/** Project media frame matched to the artifact: clinical figure, research
 * chart, or real browser product. Shared by home and the project archive. */
export default function BrowserFrame({
  p,
  active,
  priority = false,
}: {
  p: Project;
  active: boolean;
  priority?: boolean;
}) {
  const cover = p.gallery?.[0];
  const contain = p.mediaFit === 'contain';
  const product = p.mediaKind === 'product';
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
      className={[
        'overflow-hidden border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900',
        product
          ? 'rounded-xl shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)] dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]'
          : 'rounded-lg',
      ].join(' ')}
      style={{ viewTransitionName: `project-${p.id}` } as CSSProperties}
    >
      {product ? (
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
      ) : (
        <div className="flex min-h-9 items-center justify-between gap-4 border-b border-ink-200 px-3.5 py-2 dark:border-ink-800">
          <span className="truncate font-mono text-[10.5px] font-medium tracking-[0.12em] text-clinic-700 dark:text-clinic-300">
            {p.mediaLabel}
          </span>
          {p.status && (
            <span className="shrink-0 text-[11px] text-ink-400 dark:text-ink-500">
              {p.status}
            </span>
          )}
        </div>
      )}

      {/* Fixed-ratio viewport */}
      <div
        className={[
          'relative aspect-[16/10] overflow-hidden',
          p.mediaKind === 'clinical'
            ? 'bg-ink-950'
            : 'bg-gradient-to-br from-clinic-50 via-white to-ink-100 dark:from-clinic-500/15 dark:via-ink-900 dark:to-ink-800',
        ].join(' ')}
      >
        {cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className={
              contain
                ? 'h-full w-full bg-white object-contain p-4'
                : 'h-full w-full object-cover object-top'
            }
          />
        ) : (
          <ProjectScene id={p.id} active={active} />
        )}
        <FrameTicks />
      </div>
    </div>
  );
}
