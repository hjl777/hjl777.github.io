import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { consoleMeta, profile } from '../data';
import ThemeToggle from './ThemeToggle';

// Section links use "/#id" so they lead back to the home page from /projects
// and project detail routes; on the home page they scroll in place.
const sections = [
  { id: 'projects', label: 'Work', to: '/#projects' },
  { id: 'publications', label: 'Papers', to: '/#publications' },
  { id: 'cv', label: 'Experience', to: '/#cv' },
  { id: 'about', label: 'About', to: '/#about' },
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section elements only exist on the home route, so the observer re-attaches
  // whenever we navigate back there.
  useEffect(() => {
    if (!isHome) {
      setActive('');
      return;
    }
    setActive('home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const pubs = profile.highlights.find((h) => h.label === 'Publications')?.value;
  const hIndex = profile.highlights.find((h) => h.label === 'h-index')?.value;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* SYS status bar (Direction v2) — collapses away once scrolled. */}
      <div className="sys-bar" data-hidden={scrolled ? 'true' : 'false'} aria-hidden="true">
        <div className="container-prose flex items-center justify-between">
          <span>
            {consoleMeta.labels.node}: {consoleMeta.node} <i>·</i> {consoleMeta.labels.auth}:{' '}
            {consoleMeta.auth}
          </span>
          <span className="hidden sm:inline">
            {consoleMeta.labels.pubs}: {pubs} <i>·</i> {consoleMeta.labels.hIndex}: {hIndex}{' '}
            <i>·</i> {consoleMeta.labels.sync}: {consoleMeta.lastSync}
          </span>
        </div>
      </div>
      <nav
        className={[
          'container-prose flex h-[72px] items-center justify-between border-b transition-[background-color,border-color] duration-300',
          scrolled
            ? 'border-black/15 bg-[#d8d1bf]/92 backdrop-blur-md dark:border-white/12 dark:bg-[#161a17]/92'
            : 'border-black/20 bg-transparent dark:border-white/15',
        ].join(' ')}
      >
        <Link
          to="/"
          viewTransition
          className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 dark:text-ink-50"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 font-mono text-[10px] font-bold text-[#d8d1bf] dark:bg-ink-50 dark:text-ink-950">
            HL
          </span>
          <span className="hidden sm:inline">
            {profile.nameKr} · {profile.name}
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-2 md:flex">
          {sections.map((s, i) => (
            <li key={s.id}>
              <Link
                to={s.to}
                viewTransition={!isHome}
                className={[
                  'relative px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors',
                  active === s.id
                    ? 'text-ink-950 dark:text-ink-50'
                    : 'text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-ink-50',
                ].join(' ')}
              >
                <span aria-hidden="true" className="mr-0.5 opacity-50">
                  {String(i + 1).padStart(2, '0')}._
                </span>
                {s.label}
                {active === s.id && (
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-clinic-500 dark:bg-clinic-300" />
                )}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
          <li className="ml-2">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink-950 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-transform duration-300 hover:-translate-y-0.5 dark:bg-ink-50 dark:text-ink-950"
            >
              CV
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
          <ul className="container-prose flex flex-col py-3">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={s.to}
                  viewTransition={!isHome}
                  onClick={() => setOpen(false)}
                  className={[
                    'block rounded-md px-3 py-2 text-sm',
                    active === s.id
                      ? 'bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-ink-50'
                      : 'text-ink-600 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-900',
                  ].join(' ')}
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-ink-900 px-3 py-2 text-sm font-medium text-white dark:bg-[#1f7a55]"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
