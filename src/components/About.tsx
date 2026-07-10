import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { profile } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';
import { renderRich } from '../lib/richtext';

/**
 * Long-form narrative moved out of the hero: the full bio, the "how I work"
 * statement, and research interests. First paragraph is always visible; the
 * rest folds behind a Read-more toggle so the section scans fast.
 */
export default function About() {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [lead, ...rest] = profile.longBio;

  return (
    <section id="about" className="section">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'right')}`}>
        <div className="section-kicker">06 · About</div>
        <h2 className="section-title">The Longer Story</h2>

        <div className="mt-6 max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-ink-700 dark:text-ink-300">
          <p>{renderRich(lead)}</p>

          {open && rest.map((p, i) => <p key={i}>{renderRich(p)}</p>)}
        </div>

        {open && profile.approach && (
          <div className="mt-8 max-w-3xl rounded-2xl border border-ink-200 bg-ink-50/60 p-6 dark:border-ink-800 dark:bg-ink-900/50">
            <p className="section-kicker !mb-3">How I work</p>
            <div className="space-y-3 text-[14.5px] leading-relaxed text-ink-700 dark:text-ink-300">
              {profile.approach.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
        >
          {open ? (
            <><ChevronUp size={15} /> Show less</>
          ) : (
            <><ChevronDown size={15} /> Read the full story</>
          )}
        </button>

        <div className="mt-10 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
            Research interests
          </p>
          <ul className="flex flex-wrap gap-2">
            {profile.interests.map((i) => (
              <li key={i} className="chip">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
