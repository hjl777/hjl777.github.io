# Build Update — Hojae Lee Academic Website

**Build date:** 2026-05-24
**Stack:** Vite 5 · React 18 · TypeScript (strict) · Tailwind CSS 3 · lucide-react
**Build result:** ✅ clean — `1583 modules transformed`, JS `~55 kB gzip`, CSS `~5 kB gzip`

---

## 1. What was built

A premium, fully responsive single-page academic site with smooth-scroll navigation and four sections, matching the original brief.

### Sections

| # | Section | Component | Highlights |
|---|---------|-----------|------------|
| 1 | **Home / About** | `Hero.tsx` | Bio on the left (name + Korean name, role, affiliation, location, email), portrait placeholder on the right with a subtle grid overlay, sticky Education sidebar, interest chips, CTA buttons (See publications / Download CV). |
| 2 | **Publications** | `Publications.tsx` | Filter tabs (All / Selected / Journal / Conference) with counts. Each entry: year + index gutter, bold author rendering, italic venue, 1-sentence abstract, badges (PDF / Code / Publisher / arXiv), and optional "Top-tier" pill. |
| 3 | **Research & Projects** | `Projects.tsx` | 3-card grid with: metric strip placeholder (architecture-style grid background + 3 KPIs), collaboration line, tech stack monospace badges, project links. |
| 4 | **CV & Contact** | `Experience.tsx` | Prominent "Download CV (PDF)" button in the header, vertical timeline (date column + dot + bullets), and a contact card with Email / GitHub / LinkedIn / Google Scholar. |

Plus: fixed **`Nav.tsx`** (active-section detection via IntersectionObserver, pill highlight, mobile sheet) and **`Footer.tsx`**.

---

## 2. Project structure

```
website/
├── .github/workflows/deploy.yml      # GitHub Pages CI
├── public/
│   └── favicon.svg                   # Built-in "HL" mark
├── src/
│   ├── App.tsx                       # Single-page layout
│   ├── main.tsx
│   ├── index.css                     # Tailwind layers + design tokens
│   ├── data.ts                       # ✏️  ALL editable content
│   ├── vite-env.d.ts
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── Publications.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       └── Footer.tsx
├── index.html
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── README.md
└── update.md   ← this file
```

---

## 3. Design system

- **Palette:** custom `ink` scale (slate-tuned, 50→950) + **Indigo** accents. Pure-white surfaces, `ink-50/50` alternating section bands.
- **Typography:**
  - **Headings:** Source Serif 4 (academic-paper feel)
  - **Body / UI:** Inter (with `cv11 ss01 ss03` features for cleaner numerals)
  - **Mono:** JetBrains Mono (years, tech badges, dates)
- **Motion:** `fade-in` / `fade-up` on entry; soft hover translates on cards; pill underline on nav.
- **Reusable utilities** (in `index.css`): `.container-prose`, `.section`, `.section-title`, `.section-kicker`, `.link-underline`, `.chip`, `.badge-soft`.

---

## 4. Content model (`src/data.ts`)

Every piece of copy is driven from one file. Edit it and the UI re-renders — no component changes needed.

| Export | Type | Where it shows |
|---|---|---|
| `profile` | object | Hero, Nav, Footer, Experience header |
| `publications` | `Publication[]` | Publications section (sorted desc by year, filtered by tab) |
| `projects` | `Project[]` | Projects grid |
| `experience` | `ExperienceItem[]` | CV timeline |
| `contacts` | `ContactLink[]` | Contact card icons |

**Author bolding convention:** wrap your name in `**…**`, e.g. `"A. Kim, **Hojae Lee**, B. Park"` → renders the wrapped portion in semibold ink-900.

---

## 5. GitHub Pages deploy

Two paths, both ready:

1. **GitHub Actions (recommended)** — `.github/workflows/deploy.yml` builds on every push to `main` and deploys via the official Pages action.
   - For a **project page** (`<user>.github.io/<repo>/`): add repo variable **`VITE_BASE = /<repo>/`** in *Settings → Secrets and variables → Actions → Variables*.
   - For a **user page** (`<user>.github.io`): leave `VITE_BASE` unset (defaults to `/`).
2. **Manual `gh-pages`** — `npm run deploy` after setting the base in `vite.config.ts`.

---

## 6. Commands

```bash
npm install      # one-time
npm run dev      # local dev → http://localhost:5173
npm run build    # tsc + vite → ./dist
npm run preview  # serve ./dist locally
npm run deploy   # build + push to gh-pages branch
```

---

## 7. Build verification log

```
> hojae-lee-academic@0.1.0 build
> tsc -b && vite build

vite v5.4.21 building for production...
✓ 1583 modules transformed.
dist/index.html                  1.07 kB │ gzip:  0.57 kB
dist/assets/index-XXXX.css      24.17 kB │ gzip:  5.15 kB
dist/assets/index-XXXX.js      173.97 kB │ gzip: 54.94 kB
✓ built in 2.23s
```

No TypeScript errors, no warnings.

---

## 8. Resources you still need to supply

These are the only assets the site references but doesn't yet contain:

| File / value | Where it's used | Action |
|---|---|---|
| `public/cv.pdf` | "Download CV" buttons (Nav, Hero, Experience header) | Drop your CV PDF at this exact path. |
| `public/portrait.jpg` (or any image) | Hero portrait | Add the image, then set `profile.avatarUrl = '/portrait.jpg'` in `src/data.ts`. Until then a tasteful "HL" placeholder shows. |
| Publication links (PDF / Code / Publisher / arXiv) | `publications[].links` in `data.ts` | Replace the `'#'` placeholders with real URLs. |
| GitHub / LinkedIn / Scholar URLs | `contacts` in `data.ts` | Replace the generic homepage URLs with your actual profile URLs. |
| Project links | `projects[].links` | Same — replace `'#'`. |
| Real publication metadata | `publications` in `data.ts` | Replace the placeholder Lancet / Scientific Reports entries with your actual citations. |

---

## 9. Notable implementation details

- **Active-section detection** uses `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'` so the highlighted nav item matches what is visually centered.
- **Smooth scroll** is CSS-only (`html { scroll-behavior: smooth; scroll-padding-top: 5rem; }`) — no JS scroll libraries.
- **Mobile nav** is a slide-down sheet that auto-closes on link click.
- **Strict TS** with `noUnusedLocals` / `noUnusedParameters` — every component is fully typed.
- **Author rendering** uses a small regex split (`/(\*\*[^*]+\*\*)/g`) so you never write JSX in `data.ts`.
- **Filter counts** are memoized and shown inline in each tab.
- **No external icon font** — `lucide-react` is tree-shaken; only the ~10 icons used are bundled.

---

## 10. Session log — 2026-05-26 (content accuracy pass)

Full review of `src/data.ts` against current reality and official CV. All changes committed and pushed to `main`.

### Commit `85f0f2c` — Bio update: drop Asan affiliation, add mental health & addiction
- **longBio[0]**: removed `"I'm a researcher at the Institute of Biomedical Engineering, Asan Medical Center..."` → `"I'm an independent researcher..."` (contract ended; currently job-seeking).
- **longBio[0]**: integrated mental health / addiction into existing scope → `"clinical risk prediction (suicidal ideation, substance use & addiction)"`.
- **interests**: added `'Mental Health & Addiction Risk Modeling'`.

### Commit `fa22a5c` — News item tense fix
- **news[2026-01]**: `"Started a new project thread on stent-marker localization..."` → `"Completed an end-to-end DL pipeline for stent-marker localization..."`. Project is finished; "Started" framing was misleading.

### Commit `fd64a7a` — Bio accuracy + Hero icon size
- **longBio / highlights**: paper count `21 → 24`, verified against Google Scholar (26 entries on Scholar, minus 1 Author Correction and 1 duplicate listing = 24 unique).
- **shortBio**: added `"(including mental health & addiction risk)"` to clinical outcome prediction.
- **experience[Asan].bullets**: present tense → past tense (`Build → Built`, `Prototype → Prototyped`, `Develop → Developed`, `Integrate → Integrated`) — period `2025.03.01 – 2026.02.28`, contract concluded.
- **Hero.tsx**: social link icons `size={16} → size={20}` per user feedback (Gemini review + own observation that icons felt too small).

### Commit `7c44681` — Co-first author badges + asterisk corrections
Cross-checked against official CV. 4 publications were missing the `"Co-first author"` badge despite the user being marked `*` in the official list:
| Publication | Official author line |
|---|---|
| `pub-jmir-suicidality-2024` | `Lee H*, Cho JK*, Park J*, Lee H*` |
| `pub-scirep-cvd-2024` | `Sang H*, Lee H*` |
| `pub-jmir-suicidal-thinking-2024` | `Kim H*, Son Y*, Lee H*` |
| `pub-iaai-rhinitis-2024` | `Lee H*, Park J*` |

Also fixed **`pub-scirep-atopic-2024`** authors string: 5 co-first authors on the CV (`Kattih M*, Lee H*, Jo H*, Jeong J*, Kim H*`) but only 3 had `*` markers in the rendered author line.

After this commit, total **6 co-first author papers** are now correctly badged on the site (matching `highlights.Co-first author = 6`):
1. Sci Rep — Neurodegenerative in T2D (2024)
2. Sci Rep — CVD in diabetes (2024)
3. Sci Rep — Atopic dermatitis (2024)
4. JMIR — Suicidal thinking in 3 cohorts (2024)
5. IAAI — Allergic rhinitis & rhinosinusitis (2024)
6. JMIR — Suicidality in allergic rhinitis (2024)

Of these, 2 are also literal first-author position (#5 IAAI, #6 JMIR suicidality).

### Verified but unchanged
- **`experience[Private Academy].period: '2025.01 – Present'`** — confirmed by user as still ongoing.
- **`pub-scirep-ra-2023`** (Rheumatoid arthritis) and **`pub-scirep-liposuction-2024`** (original Liposuction paper) — present in `data.ts` but absent from the official CV list shared this session. User confirmed both are theirs; the CV list omitted them. Kept on site.

### Notes for next session
- Gemini-feedback items left unaddressed: verify mobile stacking (Hero left/right columns), already have sticky nav + dark mode.
- Consider whether to add 2025 Author Correction (Liposuction) — currently excluded since corrections aren't typically counted as separate publications.
