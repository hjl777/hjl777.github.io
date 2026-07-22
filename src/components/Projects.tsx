import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects, sectionLabels, siteCopy } from '../data';
import { markProjectEnter } from '../lib/motion';
import { useReveal } from '../hooks/useReveal';
import BrowserFrame from './BrowserFrame';

function SelectedWork({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.08 });

  return (
    <article ref={ref} data-in={visible ? 'true' : 'false'} className="nesh-work-row">
      <span className="io-rule nesh-work-rule" aria-hidden="true" />
      <div className="io-fade nesh-work-index" style={{ '--d': '45ms' } as CSSProperties}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{p.period}</span>
      </div>

      <Link
        to={`/projects/${p.id}`}
        viewTransition
        onClick={markProjectEnter}
        className="nesh-work-link"
        aria-label={`${p.title} — ${siteCopy.projects.caseStudyLabel}`}
      >
        <div className="io-rise nesh-work-copy" style={{ '--d': '90ms' } as CSSProperties}>
          <div className="flex flex-wrap items-center gap-3">
            {p.status && <span className="nesh-work-status">{p.status}</span>}
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
              {p.mediaLabel}
            </span>
          </div>
          <h3
            style={{ viewTransitionName: `project-title-${p.id}` } as CSSProperties}
          >
            {p.title}
          </h3>
          <p>{p.description}</p>
          <div className="nesh-work-stack">
            {p.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="io-clip nesh-work-media" style={{ '--d': '130ms' } as CSSProperties}>
          <BrowserFrame p={p} active={visible} />
          <span className="nesh-work-arrow"><ArrowUpRight size={20} /></span>
        </div>
      </Link>

      {p.metrics && (
        <dl className="io-rise nesh-work-metrics" style={{ '--d': '180ms' } as CSSProperties}>
          {p.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <dd>{metric.value}</dd>
              <dt>{metric.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="nesh-projects">
      <div className="container-prose">
        <div className="nesh-projects-head">
          <div>
            <p className="nesh-light-kicker">{sectionLabels.projects}</p>
            <h2 className="whitespace-pre-line">{siteCopy.projects.title}</h2>
          </div>
          <div className="nesh-projects-intro">
            <p>
              {siteCopy.projects.intro}
            </p>
            <Link to="/projects" viewTransition>
              {siteCopy.projects.allCta} <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="nesh-work-list">
          {featured.map((project, index) => (
            <SelectedWork key={project.id} p={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
