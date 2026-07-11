# CLAUDE.md — working guide for this repo

Personal academic website of Hojae Lee — live at **https://hjl777.github.io/**.
Vite 5 + React 18 + TypeScript (strict) + Tailwind 3 + react-router-dom 7. GitHub Pages user-page repo: **every push to `main` auto-deploys** via `.github/workflows/deploy.yml`.

## Session start

1. Read `HANDOFF.md` (gitignored) — latest session state and pending tasks. Trust live git/filesystem state over it if they conflict.
2. The user communicates in Korean — respond in Korean unless they switch. They are new to git: give exact commands, never "figure it out".

## The one rule of content

**All copy lives in `src/data.ts`** — profile, publications, projects, experience, honors, news, contacts. Components never hold copy. Any wording/number/link change = edit `data.ts` only.

## Verify & deploy

```bash
npx tsc --noEmit        # typecheck (strict)
npm run build           # vite build + postbuild copies dist/index.html → dist/404.html (SPA fallback)
git add <files> && git commit -m "feat|fix: ..." && git push   # push = deploy
```

Local skills in `.claude/skills/` cover screenshots (`capture-site-screenshots`), deploy (`deploy-site`), and session wrap-up (`wrap-session`).

## Routing (don't break URLs)

- `/` home, `/projects` archive, `/projects/:id` detail. Legacy `#/project/…` redirects live in `App.tsx`.
- **Never rename project `id`s** (e.g. `proj-stent-marker`) — they are public URLs. Retitle via `title` only.
- View Transitions: thumbnails carry `view-transition-name: project-<id>`.

## Content conventions

- Publication authors: bold the user with `**H Lee**` inside the `authors` string (regex-rendered in `Publications.tsx`).
- Project gallery images → `public/projects/`, ideally **1600×1000** (BrowserFrame is `aspect-[16/10]`). Charts/figures on white: set `mediaFit: 'contain'` on the project.
- Captions in English; each caption must tie the image to a specific research claim (venue, metric, what it evidences).
- News dates are ISO `YYYY-MM`.

## Claim-precision policy (user-endorsed, 2026-07)

Research claims must not outrun the evidence shown:

- Murray's Law R² is a **"physiological consistency check"** — never call it "validation" (validation = comparison against manual QCA / clinician reference).
- PEFT metric is **"% of FT params"** (parameter ratio), not "cost".
- A project title may only claim what its gallery/metrics actually show.
- Numbers must agree everywhere they appear (hero stats, publication filter count, OG description in `index.html`). Known open item: hero says 25 papers, list has 24, OG says 21 — fix all together once the user confirms the true count.

## Privacy

`참고자료/`, `HANDOFF.md`, `SITE_OVERVIEW.md`, `DESIGN_PROMPTS.md`, `.claude/` are gitignored — private. Never commit them or move their contents into tracked files. Patient imagery in QCA figures must be de-identified / already published under CC-BY.
