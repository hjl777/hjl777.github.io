import {
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Download,
  MapPin,
  Award,
} from 'lucide-react';
import { experience, contacts, profile, honors } from '../data';

const ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
} as const;

export default function Experience() {
  return (
    <section id="cv" className="section bg-ink-50/50">
      <div className="container-prose">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="section-kicker">CV & Contact</div>
            <h2 className="section-title">Experience</h2>
            <p className="mt-3 max-w-xl text-ink-600">
              A timeline of research positions, programs, and industry
              experience.
            </p>
          </div>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ink-800"
          >
            <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Download CV (PDF)
          </a>
        </div>

        {/* Timeline */}
        <ol className="mt-12 relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-200 sm:left-[calc(11rem+7px)]"
          />
          {experience.map((e) => (
            <li
              key={`${e.org}-${e.period}`}
              className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[11rem_1.5rem_1fr] sm:gap-x-6"
            >
              {/* Period (desktop column) */}
              <div className="hidden sm:block">
                <p className="font-mono text-xs text-ink-500">{e.period}</p>
                {e.location && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-ink-400">
                    <MapPin size={11} />
                    {e.location}
                  </p>
                )}
              </div>

              {/* Dot */}
              <div className="relative pt-1.5">
                <span className="block h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-500 ring-2 ring-indigo-200" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-base font-semibold text-ink-900">
                  {e.role}
                </h3>
                <p className="text-sm text-ink-700">{e.org}</p>
                <p className="mt-0.5 font-mono text-xs text-ink-500 sm:hidden">
                  {e.period}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-ink-600 marker:text-ink-300">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Honors & Awards */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-2">
            <Award size={16} className="text-indigo-600" />
            <h3 className="font-serif text-xl font-semibold text-ink-900">
              Honors & Awards
            </h3>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {honors.map((h) => (
              <li
                key={h.title}
                className="rounded-xl border border-ink-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink-900">{h.title}</p>
                    <p className="mt-0.5 text-sm text-ink-600">{h.org}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-ink-500">
                    {h.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact card */}
        <div className="mt-14 rounded-2xl border border-ink-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
                Contact
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink-900">
                Get in touch
              </h3>
              <p className="mt-2 max-w-md text-sm text-ink-600">
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
                      className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-700 transition hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-ink-900"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-100 text-ink-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
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
