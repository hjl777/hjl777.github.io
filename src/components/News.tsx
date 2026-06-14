import { useState } from 'react';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { news, profile } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';

function formatDate(iso: string) {
  // "2025-02" -> "Feb 2025"
  const [y, m] = iso.split('-');
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function News() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);

  const spotlight = news.find((n) => n.highlight);
  const timeline = news.filter((n) => !n.highlight);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  if (!news.length) return null;

  return (
    <section id="news" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'left')}`}>
        <div className="max-w-2xl">
          <div className="section-kicker">News</div>
          <h2 className="section-title">Recent updates</h2>
          <p className="mt-3 text-ink-600 dark:text-ink-400">
            Recent papers, projects, and fellowships.
          </p>
        </div>

        {/* Spotlight callout — the one message this page exists to deliver */}
        {spotlight && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-indigo-200/80 bg-white p-6 sm:p-8 dark:border-indigo-500/30 dark:bg-ink-900">
            <div aria-hidden className="spotlight-glow pointer-events-none absolute -inset-x-24 -inset-y-20" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl dark:text-ink-50">
                {spotlight.title ?? spotlight.text}
              </h3>
              {spotlight.title && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-[15px] dark:text-ink-400">
                  {spotlight.text}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  {copied ? <Check size={15} /> : <Mail size={15} />}
                  {copied ? 'Email copied!' : 'Email me about research fit'}
                </button>
                <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
        )}

        <ol className="relative mt-10 max-w-3xl">
          <span
            aria-hidden
            className="absolute left-[6.5rem] top-2 bottom-2 w-px bg-ink-200 hidden sm:block dark:bg-ink-800"
          />
          {timeline.map((n, i) => (
            <li
              key={`${n.date}-${i}`}
              className="relative grid grid-cols-1 gap-y-1 pb-6 last:pb-0 sm:grid-cols-[6.5rem_1.5rem_1fr] sm:gap-x-4"
            >
              <div className="hidden pt-0.5 font-mono text-xs text-ink-500 sm:block dark:text-ink-400">
                {formatDate(n.date)}
              </div>
              <div className="relative hidden pt-1.5 sm:block">
                <span className="block h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500 ring-2 ring-indigo-200 dark:border-ink-950 dark:ring-indigo-700/60" />
              </div>
              <div>
                <p className="font-mono text-xs text-ink-500 sm:hidden dark:text-ink-400">
                  {formatDate(n.date)}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-700 sm:mt-0 dark:text-ink-300">
                  {n.text}
                  {n.href && (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 inline-flex items-center gap-0.5 text-indigo-700 transition-colors duration-200 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      aria-label="External link"
                    >
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
