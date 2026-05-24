# Hojae Lee — Academic Personal Website

A premium, responsive single-page academic site built with **Vite + React + TypeScript + Tailwind CSS**, optimized for **GitHub Pages**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to ./dist
npm run preview   # preview production build
```

## Editing content

All text content (profile, publications, projects, experience, contacts) lives in **`src/data.ts`** — that is the only file you need to touch to update the site.

- **Bold an author name** in a publication: wrap it in `**` (e.g., `"A. Kim, **Hojae Lee**, B. Park"`).
- Mark publications as `selected: true` to surface them under the **Selected** filter.
- Drop your CV at **`public/cv.pdf`** — the download button is already wired to `/cv.pdf`.
- Drop a portrait at **`public/portrait.jpg`** and set `profile.avatarUrl = '/portrait.jpg'` in `data.ts`.

## Project structure

```
src/
├── App.tsx              # Single-page layout (Hero / Pubs / Projects / CV)
├── data.ts              # ✏️  All editable content
├── index.css            # Tailwind layers + design tokens
├── main.tsx
└── components/
    ├── Nav.tsx          # Fixed nav with smooth-scroll + active-section pill
    ├── Hero.tsx         # About + portrait + education sidebar
    ├── Publications.tsx # Filter tabs (All / Selected / Journal / Conference)
    ├── Projects.tsx     # Card grid with metrics + tech badges
    ├── Experience.tsx   # Timeline + contact card + CV button
    └── Footer.tsx
```

## Deploy to GitHub Pages

### Option A — automatic (recommended)

A workflow is already provided at `.github/workflows/deploy.yml`.

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. If deploying to a **project page** (`https://<user>.github.io/<repo>/`):
   - **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name: `VITE_BASE`, Value: `/<repo>/` (include leading + trailing slash).
4. Push to `main`. The workflow builds with the correct base path and publishes `./dist`.

For a **user/organization page** (`https://<user>.github.io/`), leave `VITE_BASE` unset (defaults to `/`).

### Option B — `gh-pages` branch

```bash
# Update vite.config.ts base to '/<repo>/' before building
npm run deploy
```

## Stack

- **Vite 5** + React 18 + TypeScript (strict)
- **Tailwind CSS 3** with custom `ink` palette (slate-tuned) and Indigo accents
- **lucide-react** for icons
- **Inter** + **Source Serif 4** + **JetBrains Mono** via Google Fonts

## License

Content © Hojae Lee. Template — MIT.
