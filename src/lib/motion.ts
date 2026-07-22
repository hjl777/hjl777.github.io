// Motion tokens + route-motion flags. CSS owns the keyframes; this module is
// the one place JS reads durations from so timers and CSS stay in step.
export const MOTION = {
  micro: 160,
  ui: 260,
  reveal: 680,
  section: 900,
  route: 720,
  shared: 520,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// Route-motion flag. A project-card click marks the next navigation as a
// shared-element enter: CSS keys off html[data-route-motion="project"] to
// swap the curtain for an opacity-only root transition, and ProjectPage
// consumes the flag to pick its enter choreography.
// ---------------------------------------------------------------------------
let projectEnter = false;
let clearTimer: number | undefined;

export function markProjectEnter() {
  projectEnter = true;
  document.documentElement.dataset.routeMotion = 'project';
  window.clearTimeout(clearTimer);
  clearTimer = window.setTimeout(() => {
    delete document.documentElement.dataset.routeMotion;
  }, MOTION.route + 400);
}

export function peekProjectEnter() {
  return projectEnter;
}

export function consumeProjectEnter() {
  const value = projectEnter;
  projectEnter = false;
  return value;
}
