import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Mail,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  GraduationCap,
  Fingerprint,
} from 'lucide-react';
import { profile, contacts, projects } from '../data';
import VesselField from './VesselField';

const SOCIAL_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

// The featured QCA project — the strongest artifact, surfaced in the hero.
const qca = projects.find((p) => p.id === 'proj-stent-marker');
const qcaCover = qca?.gallery?.[0];

// One-line credential summary, keyed off the highlight values in data.ts.
const stat = (label: string) =>
  profile.highlights.find((h) => h.label.toLowerCase().includes(label))?.value;

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="home" className="section relative overflow-hidden pt-28 sm:pt-36">
      {/* Faint static coronary-tree watermark tied to the research subject. */}
      <VesselField />

      <div className="container-prose relative">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-14">
          {/* Left: positioning */}
          <div className="md:col-span-7">
            <div className="section-kicker">{profile.role.split('—')[0].trim()}</div>

            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-ink-900 sm:text-[1.7rem] dark:text-ink-50">
                {profile.nameKr} · {profile.name}
              </h1>
            </div>

            <p className="mt-1.5 font-mono text-sm text-ink-600 dark:text-ink-400">
              {profile.role.split('—')[1]?.trim()}
            </p>

            {profile.thesis && (
              <p className="mt-6 max-w-3xl font-serif text-[1.9rem] font-medium leading-[1.14] tracking-tight text-ink-900 sm:text-[2.4rem] lg:text-[2.9rem] dark:text-ink-100">
                {profile.thesis}
              </p>
            )}

            {profile.status && (
              <p className="status-chip mt-6">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.status}
              </p>
            )}

            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink-700 dark:text-ink-300">
              {profile.shortBio}
            </p>

            {/* Credentials as one quiet line, not stat cards. */}
            <p className="mt-5 text-sm text-ink-600 dark:text-ink-400">
              <span className="font-medium text-ink-800 dark:text-ink-200">
                {stat('paper')} peer-reviewed papers
              </span>
              <span className="mx-2 text-ink-300 dark:text-ink-700">·</span>
              h-index {stat('h-index')}
              <span className="mx-2 text-ink-300 dark:text-ink-700">·</span>
              {stat('citation')} citations
              <span className="mx-2 text-ink-300 dark:text-ink-700">·</span>
              <a
                href={contacts.find((c) => c.icon === 'scholar')?.href}
                target="_blank"
                rel="noreferrer"
                className="text-clinic-700 hover:text-clinic-900 dark:text-clinic-400 dark:hover:text-clinic-300"
              >
                Google Scholar
              </a>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-500 dark:text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
              <button
                type="button"
                onClick={copyEmail}
                title="Copy email"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink-800 dark:hover:text-ink-100"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Mail size={14} />
                )}
                {profile.email}
                {copied ? (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Copied!
                  </span>
                ) : (
                  <Copy size={12} className="opacity-50" />
                )}
              </button>
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
                        <Icon size={20} />
                      </a>
                    );
                  })}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {qca && (
                <Link
                  to={`/projects/${qca.id}`}
                  viewTransition
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink-800 dark:bg-clinic-500 dark:hover:bg-clinic-400"
                >
                  View QCA case study
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              )}
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 transition-colors duration-200 hover:border-ink-400 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-800"
              >
                <FileText size={16} /> CV
              </a>
            </div>
          </div>

          {/* Right: the signature research artifact, not a portrait */}
          <aside className="md:col-span-5">
            <div className="sticky top-28">
              {qcaCover && qca && (
                <Link
                  to={`/projects/${qca.id}`}
                  viewTransition
                  aria-label="Open the QCA case study"
                  className="group block overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_10px_40px_-18px_rgba(15,23,42,0.3)] dark:border-ink-800 dark:bg-ink-900"
                >
                  <figure>
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
                      <img
                        src={qcaCover.src}
                        alt={qcaCover.alt}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="border-t border-ink-200 px-4 py-3 text-[12.5px] leading-relaxed text-ink-600 dark:border-ink-800 dark:text-ink-400">
                      <span className="font-medium text-ink-800 dark:text-ink-200">
                        Signature work — QCA pipeline.
                      </span>{' '}
                      Angiogram → vessel segmentation → centerline → per-branch
                      diameter profile, on one review screen.
                    </figcaption>
                  </figure>
                </Link>
              )}

              {/* Small portrait badge — identity without dominating the fold. */}
              {profile.avatarUrl && (
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-1 ring-ink-200 dark:ring-ink-700"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-ink-900 dark:text-ink-50">
                      {profile.name}
                    </div>
                    <div className="text-ink-500 dark:text-ink-400">
                      Healthcare AI Researcher
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
