import type { CSSProperties } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { experience, honors, profile, sectionLabels, siteCopy, type ExperienceItem } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useScrollProgress } from '../hooks/useScrollProgress';

function yearFromPeriod(period: string) {
  const match = period.match(/\d{4}/);
  return match?.[0] ?? period;
}

function TimelineRow({ item, index }: { item: ExperienceItem; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>({ threshold: 0.08 });

  return (
    <li ref={ref} data-in={visible ? 'true' : 'false'}>
      <div className="io-fade nesh-timeline-year">
        <span>&apos;{yearFromPeriod(item.period).slice(-2)}</span>
        <small>{String(index + 1).padStart(2, '0')}</small>
      </div>
      <div className="io-rise nesh-timeline-main" style={{ '--d': '55ms' } as CSSProperties}>
        <p>{item.org}</p>
        <h3>{item.role}</h3>
        <span>{item.period} · {item.location}</span>
      </div>
      <div className="io-rise nesh-timeline-detail" style={{ '--d': '110ms' } as CSSProperties}>
        <p>{item.bullets[0]}</p>
        <span aria-hidden="true"><ArrowUpRight size={18} /></span>
      </div>
    </li>
  );
}

export default function Experience() {
  // Vertical progress line scrubbed by how far the timeline has scrolled
  // through the viewport (rAF-batched, transform-only).
  const timelineRef = useScrollProgress<HTMLOListElement>((p, el) => {
    el.style.setProperty('--progress', p.toFixed(4));
  });

  return (
    <section id="cv" className="nesh-journey">
      <div className="container-prose">
        <div className="nesh-journey-head">
          <div>
            <p className="section-kicker">{sectionLabels.experience}</p>
            <h2 className="whitespace-pre-line">{siteCopy.experience.title}</h2>
          </div>
          <div>
            <p>
              {siteCopy.experience.intro}
            </p>
            <a href={profile.cvUrl} target="_blank" rel="noreferrer">
              {siteCopy.experience.cvCta} <Download size={15} />
            </a>
          </div>
        </div>

        <ol ref={timelineRef} className="nesh-timeline">
          {experience.map((item, index) => (
            <TimelineRow key={`${item.org}-${item.period}`} item={item} index={index} />
          ))}
        </ol>

        <div className="nesh-credentials">
          <div>
            <p className="nesh-credential-label">{siteCopy.experience.educationLabel}</p>
            {profile.education.map((item) => (
              <article key={item.degree}>
                <span>{item.period}</span>
                <h3>{item.degree}</h3>
                <p>{item.org}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="nesh-credential-label">{siteCopy.experience.honorsLabel}</p>
            {honors.map((item) => (
              <article key={item.title}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.org}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
