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

export function revealClass(visible: boolean) {
  // Slight scale gives section entrances a camera-like settle (P5).
  return [
    'transition-all duration-700 ease-out',
    visible
      ? 'opacity-100 translate-y-0 scale-100'
      : 'opacity-0 translate-y-3 scale-[0.985]',
  ].join(' ');
}
