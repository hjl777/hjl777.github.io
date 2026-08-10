import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
import { renderRich } from '../lib/richtext';
import VesselField from './VesselField';

const SOCIAL_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  scholar: GraduationCap,
  orcid: Fingerprint,
} as const;

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
  // Portaled to <body>: the sticky hero is a stacking context, so rendering
  // in place would put this fixed sheet under the z-50 nav.
  return createPortal(
    <div className="intro-gate" aria-hidden="true">
      <p>
        {['HJL', 'Portfolio', String(new Date().getFullYear())].map((line, i) => (
          <span key={line} style={{ animationDelay: `${i * 45}ms` }}>
            {line}
          </span>
        ))}
      </p>
    </div>,
    document.body,
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);

  // Sticky-stack pin offset: the hero sticks at -(heroH - winH) so it only
  // pins after its bottom edge has fully entered the viewport. Re-measured on
  // hero/viewport resize; no scroll listeners.
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const measure = () => {
      el.style.setProperty(
        '--hero-pin-top',
        `${Math.min(0, window.innerHeight - el.offsetHeight)}px`,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

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
    <section ref={sectionRef} id="home" className="nesh-hero">
      <IntroGate />
      <VesselField />
      <div className="container-prose relative z-10">
        <div className="hero-meta animate-hero-fade">
          <p>{profile.role.split('·')[0].trim()}</p>
          <p className="hidden sm:block">Seoul · KR</p>
          <p>{new Date().getFullYear()} {siteCopy.hero.portfolioLabel}</p>
        </div>

        <div className="hero-grid">
          <div className="min-w-0 pt-6 lg:pt-10">
            <p className="hero-prompt animate-hero-fade" aria-hidden="true">
              <span>$</span> {siteCopy.hero.console.prompt}
            </p>
            <h1 className="nesh-display" aria-label={profile.displayTitle}>
              {profile.displayTitle.split('\n').map((line, index) => (
                <span key={line} className="hero-line-mask">
                  <span style={{ animationDelay: `${120 + index * 110}ms` }}>{line}</span>
                </span>
              ))}
            </h1>

            <div className="mt-8 grid gap-8 border-t border-black/25 pt-6 sm:grid-cols-2 sm:items-end lg:mt-10">
              <p className="max-w-md text-sm leading-relaxed text-ink-700 sm:text-base dark:text-[#a8b0a6]">
                {renderRich(profile.shortBio)}
              </p>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Link to="/#projects" className="nesh-button nesh-button-dark">
                  {siteCopy.hero.workCta} <ArrowRight size={15} />
                </Link>
                <a href={profile.cvUrl} download="Hojae-Lee-CV.pdf" className="nesh-button">
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

        <dl className="hero-console animate-hero-fade">
          <div>
            <dt>{siteCopy.hero.console.focusLabel}</dt>
            <dd>{profile.role.split('—')[1]?.trim() ?? profile.role}</dd>
          </div>
          <div>
            <dt>{siteCopy.hero.console.baseLabel}</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>{siteCopy.hero.console.scholarLabel}</dt>
            <dd>{siteCopy.hero.console.scholarLine}</dd>
          </div>
          <div>
            <dt>{siteCopy.hero.console.contactLabel}</dt>
            <dd className="hero-contact">
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
            </dd>
          </div>
        </dl>
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
