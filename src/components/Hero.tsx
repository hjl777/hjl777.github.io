import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Fingerprint,
} from 'lucide-react';
import { contacts, profile, siteCopy } from '../data';

const SOCIAL_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

const stat = (label: string) =>
  profile.highlights.find((h) => h.label.toLowerCase().includes(label))?.value;

/** Scene H0 — first visit only: a three-line intro mark, then the sheet
 * lifts. Session-gated; skipped entirely under reduced motion. */
function IntroGate() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return sessionStorage.getItem('intro-seen') !== '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      /* private mode — show it every time, still harmless */
    }
    const t = window.setTimeout(() => setShow(false), 850);
    return () => window.clearTimeout(t);
  }, [show]);

  if (!show) return null;
  return (
    <div className="intro-gate" aria-hidden="true">
      <p>
        {['HJL', 'Portfolio', String(new Date().getFullYear())].map((line, i) => (
          <span key={line} style={{ animationDelay: `${i * 45}ms` }}>
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

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
    <section id="home" className="nesh-hero">
      <IntroGate />
      <div className="container-prose relative z-10">
        <div className="hero-meta animate-hero-fade">
          <p>{profile.role.split('·')[0].trim()}</p>
          <p className="hidden sm:block">Seoul · KR</p>
          <p>{new Date().getFullYear()} {siteCopy.hero.portfolioLabel}</p>
        </div>

        <div className="hero-grid">
          <div className="min-w-0 pt-6 lg:pt-10">
            <p className="hero-eyebrow animate-hero-fade">{siteCopy.hero.eyebrow}</p>
            <h1 className="nesh-display" aria-label={profile.displayTitle}>
              {profile.displayTitle.split('\n').map((line, index) => (
                <span key={line} className="hero-line-mask">
                  <span style={{ animationDelay: `${120 + index * 110}ms` }}>{line}</span>
                </span>
              ))}
            </h1>

            <div className="mt-8 grid gap-8 border-t border-black/25 pt-6 sm:grid-cols-2 sm:items-end lg:mt-10">
              <p className="max-w-md text-sm leading-relaxed text-ink-700 sm:text-base">
                {profile.shortBio}
              </p>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Link to="/#projects" className="nesh-button nesh-button-dark">
                  {siteCopy.hero.workCta} <ArrowRight size={15} />
                </Link>
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="nesh-button">
                  <FileText size={15} /> CV
                </a>
              </div>
            </div>
          </div>

          <div className="hero-portrait-wrap">
            <div className="hero-portrait-reveal">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                fetchPriority="high"
                className="hero-portrait"
              />
            </div>
            <div className="hero-portrait-caption">
              <span>{profile.nameKr} · {profile.name}</span>
              <span>{siteCopy.hero.portraitLabel}</span>
            </div>
          </div>
        </div>

        <div className="hero-proof animate-hero-fade">
          <div>
            <strong>{stat('publication')}+</strong>
            <span>Publications</span>
          </div>
          <div>
            <strong>{stat('citation')}+</strong>
            <span>Citations</span>
          </div>
          <div>
            <strong>{stat('h-index')}</strong>
            <span>h-index</span>
          </div>
          <div className="hero-contact">
            <button type="button" onClick={copyEmail}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : profile.email}
            </button>
            <span>
              {contacts.filter((contact) => contact.icon !== 'mail').map((contact) => {
                const Icon = SOCIAL_ICONS[contact.icon];
                return (
                  <a key={contact.icon} href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.label}>
                    <Icon size={17} />
                  </a>
                );
              })}
            </span>
          </div>
        </div>
      </div>

      <a href="#projects" className="hero-scroll" aria-label="Scroll to selected work">
        Scroll <ArrowDown size={14} />
      </a>

      <div className="nesh-marquee" aria-hidden="true">
        <div>
          {[...profile.traits, ...profile.traits].map((trait, index) => (
            <span key={`${trait}-${index}`}>{trait}<i>↗</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
