import { useEffect, useMemo, useState } from 'react';
import { FileText, Code2, ExternalLink, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { publications, contacts, type Publication } from '../data';
import { useReveal, revealClass } from '../hooks/useReveal';
import CountUp from './CountUp';

type Filter = 'All' | 'Selected' | 'Journal' | 'Conference';
const FILTERS: Filter[] = ['All', 'Selected', 'Journal', 'Conference'];
const COLLAPSED_COUNT = 6;

function renderAuthors(authors: string) {
  // Split on **name** segments, bolding the wrapped portion.
  const parts = authors.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-ink-900 dark:text-ink-50">
          {p.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function PubLinks({ pub }: { pub: Publication }) {
  const items: { label: string; href: string; icon: JSX.Element }[] = [];
  if (pub.links?.pdf) items.push({ label: 'PDF', href: pub.links.pdf, icon: <FileText size={12} /> });
  if (pub.links?.code) items.push({ label: 'Code', href: pub.links.code, icon: <Code2 size={12} /> });
  if (pub.links?.publisher)
    items.push({ label: 'Publisher', href: pub.links.publisher, icon: <ExternalLink size={12} /> });
  if (pub.links?.arxiv)
    items.push({ label: 'arXiv', href: pub.links.arxiv, icon: <BookOpen size={12} /> });
  if (!items.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-1 text-[11px] font-medium text-ink-700 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
        >
          {it.icon} {it.label}
        </a>
      ))}
    </div>
  );
}

const scholarUrl = contacts.find((c) => c.icon === 'scholar')?.href;

export default function Publications() {
  const [filter, setFilter] = useState<Filter>('Selected');
  const [expanded, setExpanded] = useState(false);
  // Abstracts are collapsed by default; each entry toggles independently.
  const [openAbstracts, setOpenAbstracts] = useState<Set<string>>(new Set());

  const toggleAbstract = (id: string) =>
    setOpenAbstracts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Collapse back to the preview whenever the filter changes.
  useEffect(() => {
    setExpanded(false);
  }, [filter]);

  const filtered = useMemo(() => {
    const list = publications.filter((p) => {
      if (filter === 'All') return true;
      if (filter === 'Selected') return !!p.selected;
      return p.kind === filter;
    });
    return list.sort((a, b) => b.year - a.year);
  }, [filter]);

  const hidden = Math.max(0, filtered.length - COLLAPSED_COUNT);
  const visiblePubs = expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT);

  const counts = useMemo(
    () => ({
      All: publications.length,
      Selected: publications.filter((p) => p.selected).length,
      Journal: publications.filter((p) => p.kind === 'Journal').length,
      Conference: publications.filter((p) => p.kind === 'Conference').length,
    }),
    [],
  );

  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="publications" className="section bg-ink-50/50 dark:bg-ink-900/40">
      <div ref={ref} className={`container-prose ${revealClass(visible, 'left')}`}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="section-kicker">03 · Publications</div>
            <h2 className="section-title">Selected Work</h2>
            <p className="mt-3 max-w-xl text-ink-600 dark:text-ink-400">
              Peer-reviewed work and preprints across medical AI, clinical
              prediction, and trustworthy language models.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="inline-flex rounded-full border border-ink-200 bg-white p-1 shadow-sm dark:border-ink-800 dark:bg-ink-900">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200',
                  filter === f
                    ? 'bg-ink-900 text-white shadow-sm dark:bg-indigo-500'
                    : 'text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100',
                ].join(' ')}
              >
                {f}
                <span
                  className={[
                    'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                    filter === f
                      ? 'bg-white/15 text-white'
                      : 'bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400',
                  ].join(' ')}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-10 divide-y divide-ink-200 border-t border-ink-200 dark:divide-ink-800 dark:border-ink-800">
          {visiblePubs.map((p, idx) => (
            <li
              key={p.id}
              className="group grid grid-cols-12 gap-x-6 gap-y-2 py-7 transition-colors hover:bg-white dark:hover:bg-ink-900/60"
            >
              {/* Year + index gutter */}
              <div className="col-span-12 sm:col-span-2">
                <div className="flex items-baseline gap-3 sm:block">
                  <div className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="font-serif text-xl font-semibold text-ink-900 sm:mt-1 dark:text-ink-50">
                    {p.year}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-400 sm:mt-0.5 dark:text-ink-500">
                    {p.kind}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="col-span-12 sm:col-span-10">
                <div className="flex flex-wrap items-start gap-2">
                  <h3 className="font-serif text-[17px] font-semibold leading-snug text-ink-900 dark:text-ink-50">
                    {p.title}
                  </h3>
                  {p.badge && <span className="badge-soft mt-1">{p.badge}</span>}
                </div>
                <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400">
                  {renderAuthors(p.authors)}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm italic text-ink-500 dark:text-ink-500">{p.venue}</p>
                  {typeof p.citations === 'number' && p.citations > 0 && (
                    <span className="inline-flex items-center rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[10.5px] text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                      Cited by&nbsp;
                      <CountUp value={String(p.citations)} duration={900} />
                    </span>
                  )}
                </div>
                {p.abstract && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleAbstract(p.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-ink-400 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-500 dark:hover:text-indigo-400"
                    >
                      {openAbstracts.has(p.id) ? (
                        <><ChevronUp size={13} /> Hide abstract</>
                      ) : (
                        <><ChevronDown size={13} /> Abstract</>
                      )}
                    </button>
                    {openAbstracts.has(p.id) && (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                        {p.abstract}
                      </p>
                    )}
                  </div>
                )}
                <PubLinks pub={p} />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {hidden > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
            >
              {expanded ? (
                <><ChevronUp size={15} /> Show fewer</>
              ) : (
                <><ChevronDown size={15} /> Show all {filtered.length} publications</>
              )}
            </button>
          )}
          {scholarUrl && (
            <a
              href={scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-indigo-600 dark:text-ink-400 dark:hover:text-indigo-400"
            >
              View all {publications.length} on Google Scholar
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {!filtered.length && (
          <p className="py-12 text-center text-sm text-ink-500 dark:text-ink-500">
            No publications in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
