import {
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Download,
  MapPin,
  Award,
  Fingerprint,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  experience,
  contacts,
  profile,
  honors,
  sectionLabels,
  type ExperienceItem,
} from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';

const ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

// Bullets shown per role before the "+N more" toggle — keeps each entry scannable.
const BULLETS_SHOWN = 2;

/** P8: each waypoint ignites (dot color + ring pulse, staggered bullets) when it scrolls into view. */
function TimelineItem({ e }: { e: ExperienceItem }) {
  const { ref, visible } = useReveal<HTMLLIElement>({
    threshold: 0.15,
    rootMargin: '0px 0px -12% 0px',
  });
  const [showAll, setShowAll] = useState(false);
  const isNow = e.period.includes('Present');
  const hiddenCount = e.bullets.length - BULLETS_SHOWN;
  const bullets = showAll ? e.bullets : e.bullets.slice(0, BULLETS_SHOWN);

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[11rem_1.5rem_1fr] sm:gap-x-6"
    >
      {/* Period (desktop column) */}
      <div className="hidden sm:block">
        <p className="font-mono text-xs text-ink-500 dark:text-ink-400">{e.period}</p>
        {e.location && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
            <MapPin size={11} />
            {e.location}
          </p>
        )}
      </div>

      {/* Dot */}
      <div className="relative pt-1.5">
        <span
          className={[
            'block h-3.5 w-3.5 rounded-full border-2 border-white transition-colors duration-500 dark:border-ink-950',
            visible
              ? 'bg-clinic-500 ring-2 ring-clinic-200 dark:ring-clinic-700/60'
              : 'bg-ink-300 dark:bg-ink-700',
          ].join(' ')}
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-50">
          {e.role}
          {isNow && <span className="badge-soft ml-2 align-middle">Now</span>}
        </h3>
        <p className="text-sm text-ink-700 dark:text-ink-300">{e.org}</p>
        <p className="mt-0.5 font-mono text-xs text-ink-500 sm:hidden dark:text-ink-400">
          {e.period}
          {e.location ? ` · ${e.location}` : ''}
        </p>
        <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-ink-600 marker:text-ink-300 dark:text-ink-400 dark:marker:text-ink-600">
          {bullets.map((b, i) => (
            <li
              key={i}
              className={[
                'scene-anim transition-all duration-500',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
              ].join(' ')}
              style={{ transitionDelay: visible ? `${150 + i * 80}ms` : '0ms' }}
            >
              {b}
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink-400 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-500 dark:hover:text-indigo-400"
          >
            {showAll ? (
              <><ChevronUp size={13} /> Show less</>
            ) : (
              <><ChevronDown size={13} /> +{hiddenCount} more</>
            )}
          </button>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const olRef = useRef<HTMLOListElement>(null);
  const [lineP, setLineP] = useState(0);

  // P8: the timeline's vertical line draws downward with scroll progress.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLineP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = olRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setLineP(Math.min(Math.max((window.innerHeight * 0.65 - r.top) / r.height, 0), 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section id="cv" className="section bg-ink-50/50 dark:bg-ink-900/40">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'left')}`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="section-kicker">{sectionLabels.experience}</div>
            <h2 className="section-title">Experience &amp; education</h2>
            <p className="mt-3 max-w-xl text-ink-600 dark:text-ink-400">
              A timeline of research positions, programs, and industry
              experience.
            </p>
          </div>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-ink-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Download CV (PDF)
          </a>
        </div>

        {/* Timeline */}
        <ol ref={olRef} className="mt-12 relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-200 sm:left-[calc(11rem+7px)] dark:bg-ink-800"
          />
          {/* Scroll-driven progress line (transform-only) */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-indigo-500/60 sm:left-[calc(11rem+7px)]"
            style={{ transform: `scaleY(${lineP})` }}
          />
          {experience.map((e) => (
            <TimelineItem key={`${e.org}-${e.period}`} e={e} />
          ))}
        </ol>

        {/* Education */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-2">
            <GraduationCap size={16} className="text-clinic-600 dark:text-clinic-400" />
            <h3 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-50">
              Education
            </h3>
          </div>
          <ul className="space-y-4 border-l border-ink-200 pl-5 dark:border-ink-800">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <div className="font-medium text-ink-900 dark:text-ink-50">{e.degree}</div>
                <div className="text-sm text-ink-600 dark:text-ink-400">{e.org}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-500 dark:text-ink-500">
                  <span className="font-mono">{e.period}</span>
                  {e.detail && (
                    <>
                      <span className="text-ink-300 dark:text-ink-700">·</span>
                      <span>{e.detail}</span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Honors & Awards */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-2">
            <Award size={16} className="text-clinic-600 dark:text-clinic-400" />
            <h3 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-50">
              Honors & Awards
            </h3>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {honors.map((h) => (
              <li
                key={h.title}
                className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink-900 dark:text-ink-50">{h.title}</p>
                    <p className="mt-0.5 text-sm text-ink-600 dark:text-ink-400">{h.org}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-ink-500 dark:text-ink-400">
                    {h.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact card */}
        <div className="mt-14 rounded-2xl border border-ink-200 bg-white p-7 shadow-sm sm:p-9 dark:border-ink-800 dark:bg-ink-900">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Contact
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink-900 dark:text-ink-50">
                Get in touch
              </h3>
              <p className="mt-2 max-w-md text-sm text-ink-600 dark:text-ink-400">
                Open to collaborations on medical AI, clinical prediction, and
                trustworthy LLMs. Reach out by email or any of the channels
                below.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-2.5">
              {contacts.map((c) => {
                const Icon = ICONS[c.icon];
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-700 transition-colors duration-200 hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-ink-50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-100 text-ink-600 transition-colors duration-200 group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:bg-ink-800 dark:text-ink-400 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300">
                        <Icon size={15} />
                      </span>
                      <span className="font-medium">{c.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
