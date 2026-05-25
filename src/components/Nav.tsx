import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data';
import ThemeToggle from './ThemeToggle';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'news', label: 'News' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Research' },
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-200/70 bg-white/85 backdrop-blur-md dark:border-ink-800/70 dark:bg-ink-950/85'
          : 'border-b border-transparent bg-white/0 dark:bg-ink-950/0',
      ].join(' ')}
    >
      <nav className="container-prose flex h-16 items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-serif text-base font-semibold tracking-tight text-ink-900 dark:text-ink-50"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-[11px] font-bold text-indigo-200 ring-1 ring-ink-900/10 dark:bg-ink-50 dark:text-indigo-700 dark:ring-ink-50/10">
            HL
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={[
                  'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active === s.id
                    ? 'text-ink-900 dark:text-ink-50'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50',
                ].join(' ')}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-ink-100 dark:bg-ink-800" />
                )}
              </a>
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
              className="rounded-full bg-ink-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-ink-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
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
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={[
                    'block rounded-md px-3 py-2 text-sm',
                    active === s.id
                      ? 'bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-ink-50'
                      : 'text-ink-600 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-900',
                  ].join(' ')}
                >
                  {s.label}
                </a>
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
