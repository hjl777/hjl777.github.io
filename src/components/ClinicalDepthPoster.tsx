import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { qcaEvidenceStack, qcaEvidenceStackLabels, type EvidenceLayer } from '../data';
import FrameTicks from './FrameTicks';

// Region of each source figure to show, measured from the PNGs rather than
// eyeballed. `rect` is [x, y, w, h] as a fraction of the image.
//   qca-angiogram.png  1679 x 2232 — angiogram above row 1603 (0.718), the
//     diameter plot below it; the plot's legend box is cropped out so the
//     diameter trace itself survives at hero size.
//   qca-murrays-law.png 1784 x 1422 — 2x2 panel grid; the k=3.0 panel that
//     carries the R² readout sits in the top-left quadrant.
const CROPS: Record<
  EvidenceLayer['id'],
  { img: [number, number]; rect: [number, number, number, number] }
> = {
  segment: { img: [1679, 2232], rect: [0, 0.03, 1, 0.67] },
  measure: { img: [1679, 2232], rect: [0.06, 0.72, 0.76, 0.265] },
  check: { img: [1784, 1422], rect: [0.02, 0.01, 0.47, 0.48] },
};

// Size and offset an <img> so `rect` exactly fills a container whose aspect
// ratio is that of the crop — an explicit rect crop, which object-position
// alone cannot express when both axes need trimming.
function cropStyle({ img, rect }: (typeof CROPS)[EvidenceLayer['id']]) {
  const [x, y, w, h] = rect;
  return {
    container: { aspectRatio: String((w * img[0]) / (h * img[1])) },
    image: {
      width: `${100 / w}%`,
      height: `${100 / h}%`,
      left: `${(-100 * x) / w}%`,
      top: `${(-100 * y) / h}%`,
    },
  };
}

// Depth of a plate once the active layer is brought to the front. Deeper plates
// step down-right so their corners stay visible past the front plate. Perspective
// does the scaling, so only translation is specified here. Offsets are percentages
// of the plate itself, which is 82% of the track — that keeps the deepest plate
// inside the stage instead of being clipped by its overflow.
const DEPTHS = [
  { transform: 'translate3d(0, 0, 0)', opacity: 1, zIndex: 30 },
  { transform: 'translate3d(10%, 9%, -70px)', opacity: 0.62, zIndex: 20 },
  { transform: 'translate3d(20%, 18%, -140px)', opacity: 0.38, zIndex: 10 },
];

export default function ClinicalDepthPoster({ projectId }: { projectId: string }) {
  const layers = qcaEvidenceStack;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = layers[active];

  if (!current) return null;

  const selectTab = (index: number) => {
    const next = (index + layers.length) % layers.length;
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
      selectTab(layers.length - 1);
    }
  };

  return (
    <figure className="min-w-0 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] dark:border-ink-700 dark:bg-ink-900">
      <div className="flex items-center justify-between border-b border-ink-200 px-4 py-2.5 dark:border-ink-800">
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-clinic-700 dark:text-clinic-300">
          {qcaEvidenceStackLabels.heading}
        </span>
        <span className="font-mono text-[11px] text-ink-500 dark:text-ink-300">
          {String(active + 1).padStart(2, '0')} / {String(layers.length).padStart(2, '0')}
        </span>
      </div>

      <div
        id={`depth-panel-${projectId}`}
        role="tabpanel"
        aria-labelledby={`depth-tab-${projectId}-${active}`}
        className="relative aspect-[4/5] overflow-hidden bg-ink-100 sm:aspect-[16/10] dark:bg-ink-950"
        style={{ perspective: '1100px' }}
      >
        <div className="absolute inset-4 [transform-style:preserve-3d]">
          {layers.map((layer, index) => {
            const depth = DEPTHS[(index - active + layers.length) % layers.length]!;
            const crop = cropStyle(CROPS[layer.id]);
            const isFront = index === active;
            return (
              <div
                key={layer.id}
                aria-hidden={!isFront}
                className="absolute left-0 top-0 flex h-[82%] w-[82%] flex-col rounded-lg border border-ink-200 bg-white/95 p-2.5 shadow-[0_12px_34px_-20px_rgba(15,23,42,0.6)] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:border-ink-700 dark:bg-ink-900/95"
                style={depth}
              >
                <div className="flex items-center justify-between px-0.5 pb-2 font-mono text-[10px] tracking-[0.14em]">
                  <span className="text-clinic-700 dark:text-clinic-300">{layer.label}</span>
                  <span className="text-ink-400 dark:text-ink-500">{layer.meta}</span>
                </div>
                <div className="flex flex-1 items-center">
                  <div
                    className="relative w-full overflow-hidden rounded-sm bg-ink-200 dark:bg-ink-800"
                    style={crop.container}
                  >
                    <img
                      src={layer.src}
                      alt={layer.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="absolute max-w-none"
                      style={crop.image}
                    />
                    {isFront && <FrameTicks />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-ink-200 dark:border-ink-800">
        <div
          role="tablist"
          aria-label={qcaEvidenceStackLabels.tablist}
          className="grid border-b border-ink-200 dark:border-ink-800"
          style={{ gridTemplateColumns: `repeat(${layers.length}, minmax(0, 1fr))` }}
        >
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`depth-tab-${projectId}-${index}`}
              type="button"
              role="tab"
              tabIndex={active === index ? 0 : -1}
              aria-selected={active === index}
              aria-controls={`depth-panel-${projectId}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={[
                'min-h-11 border-r border-ink-200 px-3 py-2 text-left text-xs font-medium transition-colors last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-clinic-700 dark:border-ink-800 dark:focus-visible:outline-clinic-300',
                active === index
                  ? 'bg-clinic-50 text-clinic-800 dark:bg-clinic-500/15 dark:text-clinic-200'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-800 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-100',
              ].join(' ')}
            >
              {layer.title}
            </button>
          ))}
        </div>
        <figcaption
          aria-live="polite"
          className="min-h-[7.75rem] px-4 py-3 text-[12.5px] leading-relaxed text-ink-600 dark:text-ink-300"
        >
          {current.caption}{' '}
          <Link
            to={`/projects/${projectId}`}
            viewTransition
            className="link-underline whitespace-nowrap"
          >
            {qcaEvidenceStackLabels.detailLink}
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}
