# Portfolio Site — Bilol Sanatillaev

Interactive 3D iOS Engineer portfolio at [sanatillayev.com](https://sanatillayev.com).

## Quick Start

```bash
npm install --legacy-peer-deps   # required: react-spring peer dep conflict with React 19
npm run dev                       # http://localhost:3000
npm run build                     # production build
npm run lint                      # ESLint
```

## Tech Stack

- **Next.js 15** (App Router) + TypeScript + React 19
- **React Three Fiber v9** + drei v10 — 3D scene (stars, orbiting app nodes, core sphere)
- **Framer Motion** — UI animations, modals, section reveals
- **Tailwind CSS** — styling with custom `glass` utilities
- **Zustand** — global state (UI, scene, project filter/modal)
- **GSAP** / **@react-spring/web** / **@use-gesture/react** — available but not heavily used yet

## Architecture

```
src/
├── app/                    # Next.js App Router (layout, page, sitemap, robots)
├── components/
│   ├── canvas/             # R3F 3D scene (Scene, SpaceEnvironment, CoreSphere, AppNode, AppOrbits, CameraController)
│   ├── sections/           # Page sections (Hero, About, Experience, Projects, Engineering, Architecture, Contact)
│   ├── ui/                 # Reusable UI (LoadingScreen, CustomCursor, MagneticButton, FrostedPanel, Navbar, ScrollProgress)
│   ├── effects/            # Visual effects (empty — for future confetti/easter eggs)
│   └── JsonLd.tsx          # SEO structured data
├── data/                   # Static data (projects.ts — 14 apps, experience.ts — 5 companies, skills.ts)
├── stores/                 # Zustand store (useAppStore.ts)
├── hooks/                  # Custom hooks (empty — for future useMagnetic, useTypewriter, etc.)
├── lib/                    # Utilities (constants.ts, utils.ts)
└── types/                  # TypeScript types (index.ts, three.d.ts for R3F JSX types)
```

## Key Patterns

- **3D Canvas**: `position: fixed, z-0` behind scrolling 2D content at `z-10`
- **R3F components**: dynamically imported with `ssr: false` to avoid hydration errors
- **R3F JSX types**: declared in `src/types/three.d.ts` via `ThreeElements` from `@react-three/fiber`
- **State bridge**: Zustand store connects 3D scene state (hovered/selected app, camera target) with UI state (modals, filters)
- **Glass UI**: `.glass` and `.glass-strong` Tailwind utilities in `globals.css` using `backdrop-blur`

## Important Notes

- `.npmrc` has `legacy-peer-deps=true` — required for `npm install` to succeed (react-spring peer dep)
- The `line` JSX element conflicts with SVG — use drei's `<Line>` component instead
- All R3F canvas children must be inside components loaded with `ssr: false`
- `'use client'` is required on all components using hooks, Framer Motion, or R3F

## Git Workflow

- **main**: protected, PRs only, auto-deploys to Vercel via GitHub Actions
- **develop**: working branch, push freely
- PR to main triggers lint + build check; merge triggers production deploy

## Deployment

- Hosted on **Vercel**, domain: `sanatillayev.com`
- GitHub Actions CI/CD in `.github/workflows/`
- Vercel secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) stored in GitHub repo secrets

## Data

- **14 projects** across fintech, crypto, healthtech, logistics, F&B, marketplace
- **5 companies**: OVI Uzbekistan (current), OSON, Mimsoft/laCafe, Wellmate Inc., Novalab Tech
- Project data in `src/data/projects.ts`, company data in `src/data/experience.ts`
- Each project has: tagline, description, features, tech stack, challenge ("The Hard Part"), orbit params
