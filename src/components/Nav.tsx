import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { profile } from '../data';
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

  return (
    <header
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <nav
        className={[
          'container-prose flex h-14 items-center justify-between rounded-full border transition-[background-color,border-color,box-shadow] duration-300',
          scrolled
            ? 'border-ink-200/80 bg-paper/90 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.35)] backdrop-blur-md dark:border-ink-800/80 dark:bg-ink-950/90'
            : 'border-transparent bg-transparent',
        ].join(' ')}
      >
        <Link
          to="/"
          viewTransition
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink-900 dark:text-ink-50"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-mono text-[10px] font-bold text-clinic-200 dark:bg-ink-50 dark:text-clinic-700">
            HL
          </span>
          <span className="hidden sm:inline">
            {profile.nameKr} · {profile.name}
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                to={s.to}
                viewTransition={!isHome}
                className={[
                  'relative px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors',
                  active === s.id
                    ? 'text-clinic-700 dark:text-clinic-300'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50',
                ].join(' ')}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-clinic-500" />
                )}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
          <li className="ml-1">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-ink-800 dark:bg-clinic-500 dark:text-ink-950 dark:hover:bg-clinic-400"
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
                className="mt-1 block rounded-md bg-ink-900 px-3 py-2 text-sm font-medium text-white dark:bg-indigo-500"
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
