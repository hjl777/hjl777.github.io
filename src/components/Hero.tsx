import {
  ArrowRight,
  MapPin,
  Mail,
  FileText,
  Github,
  Linkedin,
  GraduationCap,
  Fingerprint,
} from 'lucide-react';
import { profile, contacts } from '../data';

const SOCIAL_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

export default function Hero() {
  return (
    <section id="home" className="section pt-28 sm:pt-36">
      <div className="container-prose">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: bio */}
          <div className="md:col-span-7 animate-fade-up">
            <div className="section-kicker">About</div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem] dark:text-ink-50">
              {profile.name}
              <span className="ml-2 align-middle text-xl font-normal text-ink-400 sm:text-2xl dark:text-ink-500">
                {profile.nameKr}
              </span>
            </h1>

            <p className="mt-4 text-base text-ink-600 sm:text-lg dark:text-ink-400">
              {profile.role}
              {profile.affiliation && (
                <>
                  {' · '}
                  <span className="text-ink-700 dark:text-ink-300">{profile.affiliation}</span>
                </>
              )}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-500 dark:text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink-800 dark:hover:text-ink-100"
              >
                <Mail size={14} /> {profile.email}
              </a>
              <span className="inline-flex items-center gap-2.5 border-l border-ink-200 pl-5 dark:border-ink-800">
                {contacts
                  .filter((c) => c.icon !== 'mail')
                  .map((c) => {
                    const Icon = SOCIAL_ICONS[c.icon];
                    return (
                      <a
                        key={c.icon}
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={c.label}
                        title={c.label}
                        className="text-ink-500 transition-colors duration-200 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
              </span>
            </div>

            <div className="mt-8 space-y-4 text-[15.5px] leading-relaxed text-ink-700 dark:text-ink-300">
              {profile.longBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#publications"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                See publications
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 transition-colors duration-200 hover:border-ink-400 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-800"
              >
                <FileText size={16} /> Download CV
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {profile.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-ink-200 bg-white p-4 text-center dark:border-ink-800 dark:bg-ink-900"
                >
                  <div className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-50">
                    {h.value}
                  </div>
                  <div className="mt-1 text-[10.5px] font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
                Research interests
              </p>
              <ul className="flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <li key={i} className="chip">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: portrait + facts */}
          <aside className="md:col-span-5">
            <div className="sticky top-28 animate-fade-in">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-2xl bg-ink-50 ring-1 ring-ink-200/70 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.25)] dark:bg-ink-900 dark:ring-ink-800/70 dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-ink-900 font-serif text-3xl font-semibold text-indigo-200 ring-4 ring-white dark:ring-ink-950">
                        HL
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-400 dark:text-ink-500">
                        Portrait placeholder
                      </p>
                      <p className="mt-1 text-[11px] text-ink-400 dark:text-ink-500">
                        /public/portrait.jpg
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
                  Education
                </p>
                <ul className="mt-3 space-y-3">
                  {profile.education.map((e) => (
                    <li key={e.degree} className="text-sm">
                      <div className="font-medium text-ink-900 dark:text-ink-50">
                        {e.degree}
                      </div>
                      <div className="text-ink-600 dark:text-ink-400">{e.org}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-500">
                        <span>{e.period}</span>
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
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
