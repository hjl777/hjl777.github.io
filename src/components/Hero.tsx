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
import ClinicalDepthPoster from './ClinicalDepthPoster';

const SOCIAL_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

// The featured QCA project — the strongest artifact, surfaced in the hero.
const qca = projects.find((p) => p.id === 'proj-stent-marker');

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
    <section id="home" className="relative overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36">
      <VesselField />

      <div className="container-prose relative">
        <div className="flex flex-col gap-4 border-b border-ink-300 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-ink-700">
          <div>
            <div className="section-kicker">{profile.role.split('—')[0].trim()}</div>
            <h1 className="font-serif text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50">
              {profile.nameKr} · {profile.name}
            </h1>
          </div>
          {profile.status && (
            <p className="status-chip">
              <span className="h-2 w-2 rounded-full bg-clinic-500" />
              {profile.status}
            </p>
          )}
        </div>

        <div className="mt-10 grid min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            {profile.thesis && (
              <p className="hero-display max-w-[11ch] text-ink-900 dark:text-ink-50">
                {profile.thesis}
              </p>
            )}

            <p className="mt-9 max-w-xl text-base leading-relaxed text-ink-700 dark:text-ink-300">
              {profile.shortBio}
            </p>

            <p className="mt-7 border-y border-ink-200 py-4 text-sm text-ink-600 dark:border-ink-800 dark:text-ink-400">
              <span className="font-medium text-ink-900 dark:text-ink-100">
                {stat('publication')} publications
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

            <div className="mt-6 flex flex-wrap gap-3">
              {qca && (
                <Link
                  to={`/projects/${qca.id}`}
                  viewTransition
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink-800 dark:bg-clinic-500 dark:text-ink-950 dark:hover:bg-clinic-400"
                >
                  View QCA case study
                  <ArrowRight size={16} />
                </Link>
              )}
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-5 py-2.5 text-sm font-medium text-ink-800 transition-colors duration-200 hover:border-clinic-500 hover:text-clinic-800 dark:border-ink-700 dark:text-ink-200 dark:hover:border-clinic-500 dark:hover:text-clinic-300"
              >
                <FileText size={16} /> CV
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-500 dark:text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
              <button
                type="button"
                onClick={copyEmail}
                title="Copy email"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink-900 dark:hover:text-ink-100"
              >
                {copied ? <Check size={14} className="text-clinic-600" /> : <Mail size={14} />}
                {profile.email}
                {copied ? <span className="text-xs text-clinic-700">Copied!</span> : <Copy size={12} />}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4">
              {profile.avatarUrl && (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-12 w-12 rounded-full object-cover object-top ring-1 ring-ink-300 dark:ring-ink-700"
                />
              )}
              <span className="inline-flex items-center gap-3">
                {contacts.filter((c) => c.icon !== 'mail').map((c) => {
                  const Icon = SOCIAL_ICONS[c.icon];
                  return (
                    <a
                      key={c.icon}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={c.label}
                      title={c.label}
                      className="text-ink-500 transition-colors duration-200 hover:text-clinic-700 dark:text-ink-400 dark:hover:text-clinic-300"
                    >
                      <Icon size={19} />
                    </a>
                  );
                })}
              </span>
            </div>
          </div>

          <aside className="min-w-0 w-full max-w-[520px] lg:col-span-5 lg:justify-self-end">
            {qca && <ClinicalDepthPoster projectId={qca.id} />}
          </aside>
        </div>
      </div>
    </section>
  );
}
