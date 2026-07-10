import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Users, X, ZoomIn } from 'lucide-react';
import { projects, type Project } from '../data';

type GalleryImage = NonNullable<Project['gallery']>[number];

function Lightbox({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
    >
      <figure
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6 dark:bg-ink-900"
      >
        <button
          onClick={onClose}
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
 * Per-project detail page (route: #/project/<id>). An attention-first
 * overview — big title, metric cards, full description — followed by a
 * gallery whose images open in a lightbox with a short explanation.
 */
export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

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

  return (
    <section className="section pt-28 sm:pt-32">
      <div className="container-prose">
        <Link
          to="/projects"
          viewTransition
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        {/* Overview */}
        <div className="mt-8 max-w-3xl">
          <div className="section-kicker">Research & Projects</div>
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-3 text-lg text-ink-600 dark:text-ink-400">{project.subtitle}</p>
          )}
          {(project.period || project.status) && (
            <div className="mt-4 flex items-center gap-2.5">
              {project.period && (
                <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
                  {project.period}
                </span>
              )}
              {project.status && <span className="badge-soft">{project.status}</span>}
            </div>
          )}
          {project.collaboration && (
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-400">
              <Users size={14} />
              {project.collaboration}
            </p>
          )}
        </div>

        {project.metrics && (
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-ink-200 bg-white p-4 text-center dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-50">
                  {m.value}
                </div>
                <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 max-w-3xl text-[15.5px] leading-relaxed text-ink-700 dark:text-ink-300">
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
      </div>

      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

/** Image on the left (~60%), short explanation directly to its right. */
function GalleryRow({
  image,
  onOpen,
}: {
  image: GalleryImage;
  onOpen: (img: GalleryImage) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-5 md:gap-8">
      <button
        onClick={() => onOpen(image)}
        title="Click to enlarge"
        className="group relative block w-full overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_18px_40px_-22px_rgba(79,70,229,0.35)] md:col-span-3 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-indigo-600"
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

      <div className="md:col-span-2 md:sticky md:top-28">
        <p className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-300">
          {image.caption}
        </p>
      </div>
    </div>
  );
}
