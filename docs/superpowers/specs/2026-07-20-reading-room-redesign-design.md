# Reading Room redesign — design spec

Date: 2026-07-20
Status: approved by user, pending implementation plan

## Problem

The current site (post `3656d82` evidence-first redesign, post `79c5b98` EvidenceViewer)
reads as flat/low-impact ("밋밋함") despite having strong evidence (QCA pipeline
figures, publications, metrics). Light `paper` background + quiet clinic-cyan accent
under-sells the material. User wants a stronger, more deliberate visual identity while
keeping every content/claim-precision rule in `CLAUDE.md` and `site-standards` intact.

## Decision: direction and scope

Three directions were mocked up and shown as a Claude Artifact (Reading Room dark /
Cobalt Evidence light / Cath Lab Navy). User picked **Reading Room** — a dark,
DICOM-reading-room mood — applied to the **full homepage**, with dark promoted to the
**default theme** (not just a toggle option). Light mode is kept, reachable via the
existing `ThemeToggle`.

## Evidence check (why the accent color does NOT change)

The initial Reading Room mockup proposed a neon-lime accent, on the premise that
segmentation overlays are "green/cyan." Checked against the actual pipeline output
image (`public/projects/qca-angiogram.png`) and its caption in `data.ts:539-540`:
the real overlay is a **cyan boundary** with a **yellow centerline** and muted-green
label tags (P1/P2/P3) — not neon lime. `CLAUDE.md` already documents `clinic-500
#16A7B7` as "sampled from the actual analysis screens." Introducing lime would
contradict that documented, evidence-based claim.

**Decision: keep the `clinic` cyan accent unchanged.** The redesign is a dark-default
theme flip plus a new signature chrome treatment, not a palette replacement.

## What changes

1. **Theme default flip** — `index.html`'s inline boot script currently defaults to
   light unless `localStorage.theme === 'dark'` or the OS prefers dark. Flip the
   condition so dark is the default unless the user has explicitly chosen light
   (`localStorage.theme === 'light'`). No change to the `clinic`/`ink`/`paper`/`amber`
   token values themselves — `ink-950 #020617` / `ink-900 #0f172a` already read as a
   cool dark slate consistent with the Reading Room mood.

2. **Signature chrome: the "reading viewer" frame** — extend `EvidenceViewer.tsx`'s
   existing header bar (mono label + counter) into a shared visual pattern applied to
   other figure/card surfaces: `BrowserFrame.tsx`, `Projects.tsx` cards, and the
   `About.tsx` portrait/credentials block. Concretely: a thin hairline border, a
   mono-font meta strip (label left, index/counter right), and small corner tick
   marks on the frame — no new color, no new animation.

3. **Component pass.** `dark:` variants already exist throughout (Hero, EvidenceViewer,
   Projects, etc.), but were designed as a rarely-seen alternate — verify each now
   holds up as the *primary* appearance (contrast, CTA legibility, hover states).
   `ThemeToggle.tsx` needs no logic change (it already flips the `dark` class either
   way) but gets a quick check that its icon/label still read correctly once dark is
   the default. `tailwind.config.js` changes only if a gap surfaces during
   implementation — none anticipated from the current file.

## What does not change

- Home section order: Hero → Projects (Featured Evidence) → Publications (Selected)
  → Experience+Education → News (latest 3) → About.
- Claim-precision policy (Murray's Law wording, PEFT param-ratio wording, etc.).
- Motion budget — no new animation classes; existing `fade-in`/`fade-up`/View
  Transitions only.
- `EvidenceViewer` tab behavior, keyboard handling, ARIA wiring — visual retone only.
- Project `id`s, routing, `data.ts` as sole copy source.
- Accent hue (`clinic` cyan) and all existing Tailwind token *values*.

## Files expected to touch

`index.html`, `src/index.css`, `src/components/Hero.tsx`,
`src/components/EvidenceViewer.tsx`, `src/components/Projects.tsx`,
`src/components/BrowserFrame.tsx`, `src/components/About.tsx`,
`src/components/ThemeToggle.tsx`. `tailwind.config.js` only if a gap is found.

## Verification plan

1. `npx tsc -b` — silent / exit 0.
2. `npm run build` — ends with `✓ built` + postbuild 404.html copy.
3. `capture-site-screenshots` skill: capture home in dark (new default) and light
   (toggled) at desktop width; Read each PNG to confirm rendering.
4. Manual behavior check via `vite preview`: theme toggle flips correctly and
   persists across reload; `EvidenceViewer` tab keyboard nav (arrows/Home/End) and
   focus-visible states still work; no layout shift/overlap introduced by the new
   frame chrome.
5. `code-review` plugin pass on the diff; fix findings.
6. `security-review` pass; confirm no high-risk issues (expected: none, this is a
   presentational-only change with no new data flows).
7. Deploy via `deploy-site` skill: push to `main`, confirm GitHub Actions
   `completed/success`, live site 200, and grep the hashed JS bundle for a changed
   string to confirm the deployed bundle reflects the change.

## Out of scope (explicitly deferred)

- Publications/Experience/News page-level restyle beyond inheriting the new dark
  default and any shared chrome utility classes — no bespoke redesign of those
  sections' internal layout.
- The known open item (hero says 25 papers / list has 24 / OG says 21) — untouched,
  tracked separately per `CLAUDE.md`.
- Cobalt Evidence and Cath Lab Navy directions — not built, kept only as rejected
  alternatives for future reference.
