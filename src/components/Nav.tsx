import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Research' },
  { id: 'cv', label: 'CV' },
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
          ? 'border-b border-ink-200/70 bg-white/85 backdrop-blur-md'
          : 'border-b border-transparent bg-white/0',
      ].join(' ')}
    >
      <nav className="container-prose flex h-16 items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-serif text-base font-semibold tracking-tight text-ink-900"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-[11px] font-bold text-indigo-200 ring-1 ring-ink-900/10">
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
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-900',
                ].join(' ')}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-ink-100" />
                )}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              CV
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-md p-2 text-ink-700 hover:bg-ink-100"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-ink-200 bg-white">
          <ul className="container-prose flex flex-col py-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={[
                    'block rounded-md px-3 py-2 text-sm',
                    active === s.id
                      ? 'bg-ink-100 text-ink-900'
                      : 'text-ink-600 hover:bg-ink-50',
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
                className="mt-1 block rounded-md bg-ink-900 px-3 py-2 text-sm font-medium text-white"
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
