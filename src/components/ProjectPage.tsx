import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Users, X, ZoomIn } from 'lucide-react';
import { projects, type Project } from '../data';
import { consumeProjectEnter, prefersReducedMotion } from '../lib/motion';
import { useReveal } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';
import ScrollProgressBar from './ScrollProgressBar';
import NextProject from './NextProject';

type GalleryImage = NonNullable<Project['gallery']>[number];

function Lightbox({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const requestClose = () => {
    if (closingRef.current) return;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(onClose, 230);
  };

  // Keep the sequence identical for Escape, backdrop click, and the button;
  // trap Tab inside the dialog and hand focus back to the trigger on close.
  const trapTab = (e: ReactKeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = dialog.querySelectorAll<HTMLElement>('button, a[href]');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeButtonRef.current?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      trigger?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={requestClose}
      onKeyDown={trapTab}
      className={[
        'lightbox fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm',
        closing ? 'lightbox-closing' : '',
      ].join(' ')}
    >
      <figure
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6 dark:bg-ink-900"
      >
        <button
          ref={closeButtonRef}
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full bg-ink-100 p-2 text-ink-600 transition-colors hover:bg-ink-200 hover:text-ink-900 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700 dark:hover:text-ink-50"
        >
          <X size={16} />
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="mx-auto max-h-[65vh] w-auto rounded-lg"
        />
        <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {image.caption}
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * Per-project detail page. Enter choreography branches on how the visitor
 * arrived: a shared-element navigation lets the travelling frame/title lead
 * and holds the copy back; a direct load runs its own title/frame reveal.
 */
export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState(null as GalleryImage | null);

  // Decide the enter mode once per project id. The flag is set by the
  // clicked list row (or NextProject link) just before navigation.
  const enterRef = useRef<{ id?: string; mode: 'shared' | 'direct' }>({ mode: 'direct' });
  if (enterRef.current.id !== id) {
    enterRef.current = { id, mode: consumeProjectEnter() ? 'shared' : 'direct' };
  }
  const enterMode = enterRef.current.mode;

  useEffect(() => {
    document.title = project
      ? `${project.title} — Hojae Lee`
      : 'Hojae Lee — Healthcare AI Researcher';
    return () => {
      document.title = 'Hojae Lee — Healthcare AI Researcher';
    };
  }, [project]);

  if (!project) {
    return (
      <section className="section pt-32">
        <div className="container-prose">
          <p className="text-ink-600 dark:text-ink-400">Project not found.</p>
          <Link
            to="/projects"
            viewTransition
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft size={15} /> Back to all projects
          </Link>
        </div>
      </section>
    );
  }

  const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties;

  return (
    <section key={project.id} data-enter={enterMode} className="section pt-28 sm:pt-36">
      <ScrollProgressBar />
      <div className="container-prose">
        <Link
          to="/projects"
          viewTransition
          className="enter-item inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-400 dark:hover:text-indigo-400"
          style={delay(0)}
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        <div className="mt-12 grid gap-10 border-b border-ink-300 pb-12 md:grid-cols-12 md:items-end dark:border-ink-700">
          <div className="md:col-span-9">
            <div className="enter-item section-kicker" style={delay(60)}>
              Research & Projects
            </div>
            <h1
              className="page-display max-w-[13ch]"
              style={{ viewTransitionName: `project-title-${project.id}` } as CSSProperties}
            >
              {enterMode === 'direct' ? (
                <span className="enter-line-mask">
                  <span style={delay(120)}>{project.title}</span>
                </span>
              ) : (
                project.title
              )}
            </h1>
            {project.subtitle && (
              <p
                className="enter-item mt-5 font-mono text-sm text-ink-500 dark:text-ink-400"
                style={delay(200)}
              >
                {project.subtitle}
              </p>
            )}
          </div>
          <div className="space-y-3 md:col-span-3">
            {(project.period || project.status) && (
              <div className="enter-item flex flex-wrap items-center gap-2.5" style={delay(260)}>
                {project.period && (
                  <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
                    {project.period}
                  </span>
                )}
                {project.status && <span className="badge-soft">{project.status}</span>}
              </div>
            )}
            {project.collaboration && (
              <p
                className="enter-item inline-flex items-start gap-1.5 text-sm font-medium leading-relaxed text-clinic-700 dark:text-clinic-300"
                style={delay(315)}
              >
                <Users size={14} className="mt-0.5 shrink-0" />
                {project.collaboration}
              </p>
            )}
          </div>
        </div>

        <div className="detail-frame-enter mt-12">
          <BrowserFrame p={project} active priority />
        </div>

        <div className="detail-body">
          {project.metrics && (
            <dl className="mt-8 grid grid-cols-1 border-y border-ink-200 sm:grid-cols-3 dark:border-ink-800">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="border-b border-ink-200 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 dark:border-ink-800"
                >
                  <dd className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-50">
                    {m.value}
                  </dd>
                  <dt className="mt-1 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-ink-700 dark:text-ink-300">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[11px] text-ink-700 dark:bg-ink-800 dark:text-ink-300"
              >
                {s}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition-colors duration-200 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {l.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          )}

          {/* Structured case study — the order a research reviewer reads */}
          {project.caseStudy && project.caseStudy.length > 0 && (
            <div className="mt-20 border-t border-ink-300 pt-10 dark:border-ink-700">
              <dl className="space-y-8">
                {project.caseStudy.map((s) => (
                  <CaseStudyRow key={s.heading} heading={s.heading} body={s.body} />
                ))}
              </dl>
            </div>
          )}

          {/* Gallery — image on the left, explanation beside it on the right */}
          {(project.gallery?.length ?? 0) > 0 && (
            <div className="mt-14">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
                Results
              </p>

              <div className="space-y-10">
                {project.gallery!.map((g) => (
                  <GalleryRow key={g.src} image={g} onOpen={setLightbox} />
                ))}
              </div>
            </div>
          )}

          <NextProject current={project} />
        </div>
      </div>

      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

/** Case-study row: the heading stays put; only the body settles in. */
function CaseStudyRow({ heading, body }: { heading: string; body: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      data-in={visible ? 'true' : 'false'}
      className="grid grid-cols-1 gap-3 border-b border-ink-200 pb-8 sm:grid-cols-12 sm:gap-8 dark:border-ink-800"
    >
      <dt className="text-xs font-semibold uppercase tracking-wider text-clinic-700 dark:text-clinic-400">
        {heading}
      </dt>
      <dd className="io-rise text-[15px] leading-relaxed text-ink-700 sm:col-span-9 sm:col-start-4 dark:text-ink-300">
        {body}
      </dd>
    </div>
  );
}

/** Image on the left (~60%), short explanation directly to its right. The
 * image clip-reveals left→right; the caption follows 100ms later. */
function GalleryRow({
  image,
  onOpen,
}: {
  image: GalleryImage;
  onOpen: (img: GalleryImage) => void;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      data-in={visible ? 'true' : 'false'}
      className="grid grid-cols-1 items-start gap-6 md:grid-cols-5 md:gap-8"
    >
      <button
        onClick={() => onOpen(image)}
        title="Click to enlarge"
        className="io-clip-x group relative block w-full overflow-hidden rounded-2xl border border-ink-200 bg-white transition-colors duration-300 hover:border-indigo-300 md:col-span-3 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-indigo-600"
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="max-h-[560px] w-full object-contain"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <ZoomIn size={12} /> Enlarge
        </span>
      </button>

      <div
        className="io-fade md:col-span-2 md:sticky md:top-28"
        style={{ '--d': '100ms' } as CSSProperties}
      >
        <p className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-300">
          {image.caption}
        </p>
      </div>
    </div>
  );
}
