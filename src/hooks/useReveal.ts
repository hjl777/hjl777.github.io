import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based reveal hook.
 * Returns a ref to attach and a boolean that flips true once the element
 * scrolls into view (and stays true afterwards). Honors prefers-reduced-motion
 * by skipping the animation gate.
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, visible };
}

/**
 * Reveal transition classes. `from` picks the entrance direction:
 *   'up'    — rise + slight scale settle (default, camera-like)
 *   'left'  — slide in from the left
 *   'right' — slide in from the right
 * Sections alternate left/right to read as "sliding sideways" on scroll.
 */
export function revealClass(visible: boolean, from: 'up' | 'left' | 'right' = 'up') {
  const hidden =
    from === 'left'
      ? 'opacity-0 -translate-x-16'
      : from === 'right'
        ? 'opacity-0 translate-x-16'
        : 'opacity-0 translate-y-3 scale-[0.985]';
  return [
    'transition-all duration-[900ms] ease-out will-change-transform motion-reduce:transition-none',
    visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hidden,
  ].join(' ');
}
