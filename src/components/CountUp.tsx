import { useEffect, useRef, useState } from 'react';

/**
 * Animated number that counts up from 0 to its target the first time it
 * scrolls into view. The `value` may carry a non-numeric prefix/suffix
 * (e.g. "404", "0.94%", "n > 1,190") — only the leading integer is animated,
 * surrounding characters are preserved. Honors prefers-reduced-motion.
 */
export default function CountUp({
  value,
  duration = 1200,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/s);
  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const suffix = match?.[3] ?? '';
  const animatable = match !== null && Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(animatable ? 0 : null);

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable, target, duration]);

  if (!animatable) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display?.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
