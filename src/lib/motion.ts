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

/** List↔list / detail↔list navigations that still morph shared elements get
 * the same fade-only root, without arming ProjectPage's enter choreography. */
export function markSharedEnter() {
  document.documentElement.dataset.routeMotion = 'shared';
  window.clearTimeout(clearTimer);
  clearTimer = window.setTimeout(() => {
    delete document.documentElement.dataset.routeMotion;
  }, MOTION.route + 400);
}

// ---------------------------------------------------------------------------
// Direction grammar for route transitions. The Navigation API (Chromium)
// reports back/forward traversals; CSS keys off html[data-vt-dir='fwd'|'back']
// to pick the lift direction. Browsers without the API never get the
// attribute and fall back to a directionless crossfade.
// ---------------------------------------------------------------------------
type NavigationLike = EventTarget & {
  currentEntry: { index: number } | null;
};
type NavigateEventLike = Event & {
  navigationType: string;
  destination: { index: number };
};

export function initRouteDirection() {
  const nav = (window as unknown as { navigation?: NavigationLike }).navigation;
  if (!nav) return;
  nav.addEventListener('navigate', (event) => {
    const e = event as NavigateEventLike;
    const current = nav.currentEntry?.index ?? -1;
    const destination = e.destination?.index ?? -1;
    const back =
      e.navigationType === 'traverse' &&
      current >= 0 &&
      destination >= 0 &&
      destination < current;
    document.documentElement.dataset.vtDir = back ? 'back' : 'fwd';
    // A traversal must not replay a click-armed enter choreography — a stale
    // data-route-motion would otherwise swallow the back lift for ~1s.
    if (e.navigationType === 'traverse') {
      delete document.documentElement.dataset.routeMotion;
    }
  });
}
