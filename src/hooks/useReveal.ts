import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Progressive-enhancement reveal hook.
 *
 * Content is visible by default — if JavaScript never runs, the observer is
 * unavailable, or the element already sits in the initial viewport, nothing is
 * ever hidden. Only elements that start *below* the fold are armed into their
 * hidden state (in a layout effect, before paint, so there is no flash) and
 * then revealed as they scroll in. Honors prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const el = ref.current;
    if (!el) return;

    // Already in (or above) the viewport → leave it visible, never animate.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setVisible(false);
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
 * Reveal transition classes. A single, restrained motion: a short fade with a
 * small upward settle (transform/opacity only). The direction argument is kept
 * for call-site compatibility but no longer slides sideways.
 */
export function revealClass(visible: boolean, _from?: 'up' | 'left' | 'right') {
  return [
    'transition-all duration-500 ease-out will-change-transform motion-reduce:transition-none',
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
  ].join(' ');
}
