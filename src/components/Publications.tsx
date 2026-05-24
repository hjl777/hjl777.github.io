import { useMemo, useState } from 'react';
import { FileText, Code2, ExternalLink, BookOpen } from 'lucide-react';
import { publications, type Publication } from '../data';

type Filter = 'All' | 'Selected' | 'Journal' | 'Conference';
const FILTERS: Filter[] = ['All', 'Selected', 'Journal', 'Conference'];

function renderAuthors(authors: string) {
  // Split on **name** segments, bolding the wrapped portion.
  const parts = authors.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-ink-900">
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
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-1 text-[11px] font-medium text-ink-700 transition hover:border-indigo-300 hover:text-indigo-700"
        >
          {it.icon} {it.label}
        </a>
      ))}
    </div>
  );
}

export default function Publications() {
  const [filter, setFilter] = useState<Filter>('Selected');

  const filtered = useMemo(() => {
    const list = publications.filter((p) => {
      if (filter === 'All') return true;
      if (filter === 'Selected') return !!p.selected;
      return p.kind === filter;
    });
    return list.sort((a, b) => b.year - a.year);
  }, [filter]);

  const counts = useMemo(
    () => ({
      All: publications.length,
      Selected: publications.filter((p) => p.selected).length,
      Journal: publications.filter((p) => p.kind === 'Journal').length,
      Conference: publications.filter((p) => p.kind === 'Conference').length,
    }),
    [],
  );

  return (
    <section id="publications" className="section bg-ink-50/50">
      <div className="container-prose">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="section-kicker">Publications</div>
            <h2 className="section-title">Selected Work</h2>
            <p className="mt-3 max-w-xl text-ink-600">
              Peer-reviewed work and preprints across medical AI, clinical
              prediction, and trustworthy language models.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="inline-flex rounded-full border border-ink-200 bg-white p-1 shadow-sm">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition',
                  filter === f
                    ? 'bg-ink-900 text-white shadow-sm'
                    : 'text-ink-500 hover:text-ink-800',
                ].join(' ')}
              >
                {f}
                <span
                  className={[
                    'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                    filter === f
                      ? 'bg-white/15 text-white'
                      : 'bg-ink-100 text-ink-500',
                  ].join(' ')}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-10 divide-y divide-ink-200 border-t border-ink-200">
          {filtered.map((p, idx) => (
            <li
              key={p.id}
              className="group grid grid-cols-12 gap-x-6 gap-y-2 py-7 transition-colors hover:bg-white"
            >
              {/* Year + index gutter */}
              <div className="col-span-12 sm:col-span-2">
                <div className="flex items-baseline gap-3 sm:block">
                  <div className="font-mono text-[11px] text-ink-400">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="font-serif text-xl font-semibold text-ink-900 sm:mt-1">
                    {p.year}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-400 sm:mt-0.5">
                    {p.kind}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="col-span-12 sm:col-span-10">
                <div className="flex flex-wrap items-start gap-2">
                  <h3 className="font-serif text-[17px] font-semibold leading-snug text-ink-900">
                    {p.title}
                  </h3>
                  {p.badge && <span className="badge-soft mt-1">{p.badge}</span>}
                </div>
                <p className="mt-1.5 text-sm text-ink-600">
                  {renderAuthors(p.authors)}
                </p>
                <p className="mt-1 text-sm italic text-ink-500">{p.venue}</p>
                {p.abstract && (
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">
                    {p.abstract}
                  </p>
                )}
                <PubLinks pub={p} />
              </div>
            </li>
          ))}
        </ol>

        {!filtered.length && (
          <p className="py-12 text-center text-sm text-ink-500">
            No publications in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
