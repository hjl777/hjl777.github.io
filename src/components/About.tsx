import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile, sectionLabels, siteCopy } from '../data';
import { renderRich } from '../lib/richtext';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const caps = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="about" className="nesh-about">
      <div ref={ref} data-in={visible ? 'true' : 'false'} className="container-prose">
        <p className="io-fade nesh-light-kicker">{sectionLabels.about}</p>
        <h2
          className="io-rise nesh-about-title whitespace-pre-line"
          style={{ '--d': '60ms' } as CSSProperties}
        >
          {siteCopy.about.title}
        </h2>

        <div className="nesh-about-grid">
          <div
            className="io-settle-l nesh-about-portrait"
            style={{ '--d': '140ms' } as CSSProperties}
          >
            <img src={profile.avatarUrl} alt={profile.name} loading="lazy" />
            <div><span>{profile.name}</span><span>Seoul · KR</span></div>
          </div>
          <div
            className="io-settle-r nesh-about-story"
            style={{ '--d': '200ms' } as CSSProperties}
          >
            <p className="nesh-about-lead">{renderRich(profile.longBio[0])}</p>
            {profile.longBio.slice(1).map((paragraph, index) => (
              <p key={index}>{renderRich(paragraph)}</p>
            ))}
          </div>
        </div>

        <div
          ref={caps.ref}
          data-in={caps.visible ? 'true' : 'false'}
          className="nesh-capabilities"
        >
          <p className="io-fade">{siteCopy.about.practiceLabel}</p>
          <ol>
            {profile.interests.map((interest, index) => (
              <li
                key={interest}
                className="io-fade"
                style={{ '--d': `${index * 50}ms` } as CSSProperties}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{interest}</h3>
                <ArrowUpRight size={18} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
