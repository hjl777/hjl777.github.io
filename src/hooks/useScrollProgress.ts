import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Reports how far an element has travelled through the viewport (0 → 1) via
 * an rAF-batched callback: 0 when its top reaches the viewport bottom, 1 when
 * its bottom does. Under prefers-reduced-motion the callback fires once with
 * the final value so scrubbed elements land in their finished state.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (progress: number, el: T) => void,
) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      cb.current(1, el);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const passed = window.innerHeight - rect.top;
      const progress = Math.min(1, Math.max(0, passed / Math.max(1, rect.height)));
      cb.current(progress, el);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return ref;
}
