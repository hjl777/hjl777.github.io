import { useEffect, useRef, useState } from 'react';

/**
 * Hand-rolled typewriter (no Typed.js dependency). Types each word, holds,
 * deletes, then advances — looping through `words`. Inspired by the classic
 * Typed.js hero line in many portfolios, but built for our React/Tailwind
 * stack. Under prefers-reduced-motion it renders the first word statically
 * with no caret. The animated text is aria-hidden; the full list is exposed
 * via aria-label so screen readers get stable content.
 */
export default function Typewriter({
  words,
  typeSpeed = 75,
  backSpeed = 38,
  holdTime = 1500,
  className,
}: {
  words: string[];
  typeSpeed?: number;
  backSpeed?: number;
  holdTime?: number;
  className?: string;
}) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState(reduced ? (words[0] ?? '') : '');
  const idx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;

    const current = words[idx.current % words.length];
    let delay = deleting.current ? backSpeed : typeSpeed;

    if (!deleting.current && text === current) {
      // Finished typing — hold, then start deleting.
      deleting.current = true;
      delay = holdTime;
    } else if (deleting.current && text === '') {
      // Finished deleting — advance to the next word.
      deleting.current = false;
      idx.current = (idx.current + 1) % words.length;
      delay = typeSpeed;
    }

    const timer = setTimeout(() => {
      const cur = words[idx.current % words.length];
      setText((t) =>
        deleting.current ? cur.slice(0, Math.max(t.length - 1, 0)) : cur.slice(0, t.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, words, typeSpeed, backSpeed, holdTime, reduced]);

  return (
    <span className={className} aria-label={words.join(', ')}>
      <span aria-hidden>{text}</span>
      {!reduced && (
        <span aria-hidden className="typewriter-caret">
          |
        </span>
      )}
    </span>
  );
}
