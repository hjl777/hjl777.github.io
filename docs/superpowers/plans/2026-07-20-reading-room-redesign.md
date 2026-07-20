# Reading Room Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the dark theme the site's default appearance (a "reading room" mood) and add one new signature chrome element — corner tick marks on figure/media frames — without changing the accent color, section order, motion budget, or any content/claim wording.

**Architecture:** A one-line flip in the theme-boot script in `index.html` promotes dark from opt-in to default. A single new presentational component, `FrameTicks.tsx`, is dropped into the three existing media-frame components (`EvidenceViewer.tsx`, `BrowserFrame.tsx`, `About.tsx`'s portrait) as a sibling of the framed image, relying on each frame's existing `relative` positioning context. No new Tailwind tokens are introduced.

**Tech Stack:** Vite 5, React 18, TypeScript (strict), Tailwind 3, react-router-dom 7. No test runner exists in this repo (`package.json` has no `test` script or test framework) — verification is `tsc -b` + `vite build` + real-browser screenshot capture, per this project's own `site-standards` skill. Every task below substitutes that rubric where a generic plan would say "run the tests."

## Global Constraints

- All copy/content lives in `src/data.ts` — this plan touches no copy, only presentation. (from `CLAUDE.md`)
- Never rename a project `id`. (from `CLAUDE.md`) — not touched by this plan.
- Accent color stays `clinic` cyan (`#16A7B7`) — do not introduce a new hue. (design spec, evidence check)
- No new animation classes; only existing `fade-in`/`fade-up`/View Transitions. (site-standards motion budget)
- Reveal must stay progressive enhancement — content visible without JS. (site-standards)
- Home section order (Hero → Projects → Publications → Experience → News → About) is unchanged. (design spec)
- Bash tool, not PowerShell, for git/build commands in this repo. (site-standards)
- Verify → deploy rubric: `npx tsc -b` silent → `npm run build` succeeds → screenshot-verify behavior → `code-review` → `security-review` → `deploy-site`. (site-standards, design spec verification plan)

Full design rationale: `docs/superpowers/specs/2026-07-20-reading-room-redesign-design.md`.

---

### Task 1: Flip the theme default to dark

**Files:**
- Modify: `index.html:46-59`

**Interfaces:**
- Produces: the boot script sets `document.documentElement.classList.add('dark')` in all cases except when `localStorage.getItem('theme') === 'light'`. No other task depends on this file directly, but every visual task below assumes dark is now what a fresh visitor sees.

- [ ] **Step 1: Read the current boot script to confirm exact text before editing**

The current script at `index.html:46-59`:

```html
<script>
  // Prevent dark-mode flash: apply class before React mounts.
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
</script>
```

- [ ] **Step 2: Replace it with the dark-default version**

```html
<script>
  // Dark is the default appearance; only an explicit light choice opts out.
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      if (stored !== 'light') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
</script>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, open the printed local URL in a private/incognito window (so there is no existing `localStorage.theme`).
Expected: the page loads with the dark theme applied immediately (no flash of light theme). Open DevTools → Application → Local Storage — confirm no `theme` key is set yet. Click the theme toggle (sun/moon icon in the nav) — page switches to light, and `localStorage.theme` becomes `"light"`. Reload — light persists. Click the toggle again — back to dark, `localStorage.theme` becomes `"dark"`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: promote dark theme to the site default"
```

---

### Task 2: Create the FrameTicks signature component

**Files:**
- Create: `src/components/FrameTicks.tsx`

**Interfaces:**
- Produces: `export default function FrameTicks(): JSX.Element` — a decorative, `pointer-events-none`, `aria-hidden` overlay of four corner tick marks. Must be rendered as the **last child** of a `relative`-positioned container so it stacks visually on top of that container's other content via normal DOM order (no `z-index` needed). Consumed by Tasks 3, 4, 5.

- [ ] **Step 1: Write the component**

```tsx
// Decorative corner ticks — the "reading viewer" signature frame element.
// Render as the last child of a `relative` container; DOM order alone puts
// it on top, so no z-index is needed.
export default function FrameTicks() {
  const corner = 'absolute h-2.5 w-2.5 border-ink-300/80 dark:border-ink-500/70';
  return (
    <div className="pointer-events-none absolute inset-1.5" aria-hidden="true">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks in isolation**

Run: `npx tsc -b`
Expected: exits 0, no errors mentioning `FrameTicks.tsx` (the file is unused so far — this only confirms the file itself is valid TypeScript/JSX).

- [ ] **Step 3: Commit**

```bash
git add src/components/FrameTicks.tsx
git commit -m "feat: add FrameTicks signature frame component"
```

---

### Task 3: Wire FrameTicks into EvidenceViewer

**Files:**
- Modify: `src/components/EvidenceViewer.tsx:2-3`, `src/components/EvidenceViewer.tsx:46-67`

**Interfaces:**
- Consumes: `FrameTicks` default export from Task 2.
- Produces: no change to `EvidenceViewer`'s existing props, ARIA wiring, or tab keyboard logic — visual-only addition.

- [ ] **Step 1: Add the import**

In `src/components/EvidenceViewer.tsx`, change line 2-3 from:

```tsx
import { Link } from 'react-router-dom';
import type { Project } from '../data';
```

to:

```tsx
import { Link } from 'react-router-dom';
import type { Project } from '../data';
import FrameTicks from './FrameTicks';
```

- [ ] **Step 2: Render FrameTicks inside the panel**

The panel block at lines 46-67 currently ends with the closing `</Link>` then `</div>`:

```tsx
      <div
        id={`evidence-panel-${project.id}`}
        role="tabpanel"
        aria-labelledby={`evidence-tab-${project.id}-${active}`}
        className="relative aspect-[4/5] overflow-hidden bg-ink-950"
      >
        <Link
          to={`/projects/${project.id}`}
          viewTransition
          aria-label={`Open ${project.title}`}
          className="block h-full w-full focus-visible:outline-offset-[-3px]"
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full animate-[fadeIn_200ms_ease-out] object-contain motion-reduce:animate-none"
          />
        </Link>
      </div>
```

Add `<FrameTicks />` as a sibling immediately after the closing `</Link>`, still inside the outer `<div>`:

```tsx
      <div
        id={`evidence-panel-${project.id}`}
        role="tabpanel"
        aria-labelledby={`evidence-tab-${project.id}-${active}`}
        className="relative aspect-[4/5] overflow-hidden bg-ink-950"
      >
        <Link
          to={`/projects/${project.id}`}
          viewTransition
          aria-label={`Open ${project.title}`}
          className="block h-full w-full focus-visible:outline-offset-[-3px]"
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full animate-[fadeIn_200ms_ease-out] object-contain motion-reduce:animate-none"
          />
        </Link>
        <FrameTicks />
      </div>
```

- [ ] **Step 3: Verify**

Run: `npx tsc -b && npm run build`
Expected: both exit 0.
Run: `npm run dev`, open the home page. Expected: the hero's QCA viewer panel shows four small L-shaped corner marks over the image; clicking the image still navigates to the project page (ticks don't block the click, since they're `pointer-events-none`); tab switching (arrow keys / clicking Pipeline output / Physiological check) still works exactly as before.

- [ ] **Step 4: Commit**

```bash
git add src/components/EvidenceViewer.tsx
git commit -m "feat: apply FrameTicks to the hero EvidenceViewer panel"
```

---

### Task 4: Wire FrameTicks into BrowserFrame

**Files:**
- Modify: `src/components/BrowserFrame.tsx:1-3`, `src/components/BrowserFrame.tsx:58-82`

**Interfaces:**
- Consumes: `FrameTicks` default export from Task 2.
- Produces: no prop or behavior change to `BrowserFrame` — this component is shared by `Projects.tsx` (home) and `ProjectsPage.tsx` (archive), so both inherit the change automatically.

- [ ] **Step 1: Add the import**

In `src/components/BrowserFrame.tsx`, change lines 1-3 from:

```tsx
import type { CSSProperties } from 'react';
import type { Project } from '../data';
import ProjectScene from './ProjectScene';
```

to:

```tsx
import type { CSSProperties } from 'react';
import type { Project } from '../data';
import ProjectScene from './ProjectScene';
import FrameTicks from './FrameTicks';
```

- [ ] **Step 2: Render FrameTicks inside the fixed-ratio viewport**

The viewport block at lines 58-82 currently ends with:

```tsx
      {/* Fixed-ratio viewport */}
      <div
        className={[
          'relative aspect-[16/10] overflow-hidden',
          p.mediaKind === 'clinical'
            ? 'bg-ink-950'
            : 'bg-gradient-to-br from-clinic-50 via-white to-ink-100 dark:from-clinic-500/15 dark:via-ink-900 dark:to-ink-800',
        ].join(' ')}
      >
        {cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className={
              contain
                ? 'h-full w-full bg-white object-contain p-4'
                : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
            }
          />
        ) : (
          <ProjectScene id={p.id} active={active} />
        )}
      </div>
```

Add `<FrameTicks />` as the last child of that `<div>`, after the `{cover ? ... : ...}` block:

```tsx
      {/* Fixed-ratio viewport */}
      <div
        className={[
          'relative aspect-[16/10] overflow-hidden',
          p.mediaKind === 'clinical'
            ? 'bg-ink-950'
            : 'bg-gradient-to-br from-clinic-50 via-white to-ink-100 dark:from-clinic-500/15 dark:via-ink-900 dark:to-ink-800',
        ].join(' ')}
      >
        {cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className={
              contain
                ? 'h-full w-full bg-white object-contain p-4'
                : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
            }
          />
        ) : (
          <ProjectScene id={p.id} active={active} />
        )}
        <FrameTicks />
      </div>
```

- [ ] **Step 3: Verify**

Run: `npx tsc -b && npm run build`
Expected: both exit 0.
Run: `npm run dev`, check the home page's "What I've built" section (signature + supporting cards) and `/projects` archive page. Expected: every project card's media frame now shows the same corner ticks; hover/click-through to `/projects/:id` still works; the `product`-kind card (browser-chrome dots + host name) also shows ticks on its viewport area without visually colliding with the dots bar (ticks are inset from the frame edge and the dots bar is a separate element above the viewport div).

- [ ] **Step 4: Commit**

```bash
git add src/components/BrowserFrame.tsx
git commit -m "feat: apply FrameTicks to BrowserFrame project media"
```

---

### Task 5: Wire FrameTicks into the About portrait

**Files:**
- Modify: `src/components/About.tsx:31-39`

**Interfaces:**
- Consumes: `FrameTicks` default export from Task 2.
- Produces: no change to `profile.avatarUrl` data usage — only wraps the existing `<img>` in a `relative` container so `FrameTicks` has a positioning context.

- [ ] **Step 1: Add the import**

In `src/components/About.tsx`, change line 5 from:

```tsx
import { renderRich } from '../lib/richtext';
```

to:

```tsx
import { renderRich } from '../lib/richtext';
import FrameTicks from './FrameTicks';
```

- [ ] **Step 2: Wrap the portrait image**

Current (lines 31-39):

```tsx
          {profile.avatarUrl && (
            <div className="md:col-span-1">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="mx-auto aspect-[4/5] w-full max-w-[240px] rounded-2xl object-cover object-top ring-1 ring-ink-200 dark:ring-ink-800"
              />
            </div>
          )}
```

Replace with:

```tsx
          {profile.avatarUrl && (
            <div className="md:col-span-1">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-full rounded-2xl object-cover object-top ring-1 ring-ink-200 dark:ring-ink-800"
                />
                <FrameTicks />
              </div>
            </div>
          )}
```

- [ ] **Step 3: Verify**

Run: `npx tsc -b && npm run build`
Expected: both exit 0.
Run: `npm run dev`, scroll to the About section. Expected: portrait image is the same size/position as before, now with corner ticks; no layout shift compared to the pre-change screenshot.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: apply FrameTicks to the About portrait"
```

---

### Task 6: Full-site dual-theme verification

**Files:** none (verification only — no source changes expected; this task exists to catch contrast/layout regressions from Tasks 1-5 before they reach code review)

**Interfaces:** none.

- [ ] **Step 1: Clean build**

Run: `npx tsc -b`
Expected: exits 0, no output.

Run: `npm run build`
Expected: ends with `✓ built` and the postbuild step copies `dist/index.html` to `dist/404.html`.

- [ ] **Step 2: Capture the dark (default) home page**

Use the `capture-site-screenshots` skill against `npx vite preview`'s local URL, in a fresh browser profile / incognito context (no `localStorage.theme` set), desktop width, full home page.

- [ ] **Step 3: Read the dark screenshot and check this list**

Read the captured PNG and confirm each of these:
- Hero heading, sub-line, credential line, and status chip are all legible against the dark ground (no near-black-on-near-black text).
- The "View QCA case study" primary button and "CV" secondary button both have visible borders/fill and readable label text.
- The EvidenceViewer panel's four corner ticks are visible but subtle (not competing with the clinical image).
- Project cards (signature + two supporting) show corner ticks on their media frames without overlapping the title/metric text below the frame.
- The About portrait shows corner ticks without the image looking clipped or shifted.

If any item fails, fix the specific Tailwind classes on the failing element (e.g., swap a `text-ink-400` for `text-ink-200` for insufficient contrast) and re-run Steps 1-3 until all pass.

- [ ] **Step 4: Capture and check the light (toggled) home page**

Click the theme toggle, reload, and re-capture the same page with `capture-site-screenshots`. Read the PNG and confirm the light theme still renders correctly (this is the pre-existing light theme, unchanged by this plan, but must not have been accidentally broken by any fix applied in Step 3).

- [ ] **Step 5: Manual behavior check**

In the running `vite preview` tab:
- Toggle dark → light → dark; confirm `localStorage.theme` updates each time and the choice survives a page reload.
- On the hero EvidenceViewer, click each tab and use ArrowLeft/ArrowRight/Home/End on the focused tab; confirm the panel image and caption update and focus stays on the tab strip.
- In OS/browser settings, enable "reduce motion," reload, and confirm the EvidenceViewer's image swap no longer animates (per the existing `motion-reduce:animate-none` class) and nothing else newly animates.

- [ ] **Step 6: Commit any fixes made during this task**

If Step 3 required class fixes:

```bash
git add -A
git commit -m "fix: correct contrast/layout regressions found in dual-theme verification"
```

If no fixes were needed, skip this step (nothing to commit).

---

### Task 7: Code review pass

**Files:** whatever Tasks 1-6 touched — no new files expected.

**Interfaces:** none.

- [ ] **Step 1: Run the review**

Invoke the `code-review` skill/plugin against the diff produced by Tasks 1-6 (commits from Task 1 through Task 6).

- [ ] **Step 2: Apply fixes**

For each finding the review reports, make the corresponding code edit in the affected file. Re-run `npx tsc -b && npm run build` after each fix.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: address code-review findings on Reading Room redesign"
```

If the review reports no findings, skip Steps 2-3.

---

### Task 8: Security review pass

**Files:** none expected (this is a presentational-only change: no new data flows, no new external requests, no new user input handling).

**Interfaces:** none.

- [ ] **Step 1: Run the review**

Invoke the `security-review` skill/plugin against the same diff.

- [ ] **Step 2: Confirm the expected result**

Expected: no high-risk findings, since Tasks 1-6 only change CSS classes, add one presentational component with no props/state/network access, and flip a boolean default in a `localStorage`-reading boot script that was already present and unchanged in its trust model.

If the review surfaces something unexpected, treat it as a real finding: read the flagged code, confirm or refute the concern, and fix it before proceeding — do not dismiss a finding solely because it was "expected" to be clean.

---

### Task 9: Deploy

**Files:** none (deployment only).

**Interfaces:** none.

- [ ] **Step 1: Push and deploy**

Follow the `deploy-site` skill: push the accumulated commits from Tasks 1-8 to `main`.

- [ ] **Step 2: Confirm the deploy**

Confirm: GitHub Actions run status is `completed`/`success`; `https://hjl777.github.io/` returns HTTP 200; the newly hashed JS bundle contains a string that changed in this plan (e.g., grep the built bundle for a class name unique to `FrameTicks`, or confirm the bundle hash itself changed from the pre-deploy value).

- [ ] **Step 3: Report to the user**

Report in Korean: what shipped (dark-default theme + FrameTicks signature frame across EvidenceViewer/BrowserFrame/About), the commit hash range, and the live-site confirmation.
