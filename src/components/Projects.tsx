import { ArrowUpRight, Users } from 'lucide-react';
import { projects } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-prose">
        <div className="max-w-2xl">
          <div className="section-kicker">Research & Projects</div>
          <h2 className="section-title">Selected systems & studies</h2>
          <p className="mt-3 text-ink-600">
            Applied research bridging mathematical foundations and clinical
            problems — from population-scale prediction to medical vision and
            trustworthy LLMs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_18px_40px_-22px_rgba(79,70,229,0.35)]"
            >
              {/* Architecture / metrics placeholder */}
              <div className="relative mb-5 h-28 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 via-white to-ink-100 ring-1 ring-ink-200/60">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                {p.metrics && (
                  <div className="absolute inset-0 flex items-center justify-around px-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="font-serif text-lg font-semibold text-ink-900">
                          {m.value}
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-500">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="font-serif text-lg font-semibold leading-snug text-ink-900">
                {p.title}
              </h3>
              {p.subtitle && (
                <p className="mt-0.5 text-sm text-ink-500">{p.subtitle}</p>
              )}

              {p.collaboration && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700">
                  <Users size={12} />
                  {p.collaboration}
                </p>
              )}

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[10.5px] text-ink-700"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {p.links && p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-100 pt-4">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:text-indigo-900"
                    >
                      {l.label}
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
