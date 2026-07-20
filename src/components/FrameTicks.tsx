// Decorative corner ticks — the "reading viewer" signature frame element.
// Render as the last child of a `relative` container; DOM order alone puts
// it on top, so no z-index is needed.
export default function FrameTicks() {
  // Same tone in both themes: every consumer's dark-mode backdrop is already
  // near-black (bg-ink-950 or the site's dark page background), so ink-300
  // reads at ~8.8:1 contrast there — a dark: override would only dim it.
  const corner = 'absolute h-2.5 w-2.5 border-ink-300/80';
  return (
    <div className="pointer-events-none absolute inset-1.5" aria-hidden="true">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
