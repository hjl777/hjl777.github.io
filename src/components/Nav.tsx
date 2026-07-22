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
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={[
          'container-prose flex h-[72px] items-center justify-between border-b transition-[background-color,border-color] duration-300',
          scrolled
            ? 'border-black/15 bg-[#d8d1bf]/92 backdrop-blur-md'
            : 'border-black/20 bg-transparent',
        ].join(' ')}
      >
        <Link
          to="/"
          viewTransition
          className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 font-mono text-[10px] font-bold text-[#d8d1bf]">
            HL
          </span>
          <span className="hidden sm:inline">
            {profile.nameKr} · {profile.name}
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-2 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                to={s.to}
                viewTransition={!isHome}
                className={[
                  'relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors',
                  active === s.id
                    ? 'text-ink-950'
                    : 'text-ink-600 hover:text-ink-950',
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
          <li className="ml-2">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink-950 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-transform duration-300 hover:-translate-y-0.5"
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
