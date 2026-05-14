# Project Context & Preferences

> Stable project-level decisions made during the Discuss Phase.
> Updated by the Architect. Unlike ACTIVE_CONTEXT.md (volatile per-session), this file is persistent.

*Last Updated: 2026-05-14*

---

## Project Identity

| Property | Value |
|----------|-------|
| **Name** | AI Operations Baseline Assessment |
| **Purpose** | Survey tool to classify AI maturity using a 5-level model (L0-L4) across 3 strategic domains, with PRD-006 extending the model toward team-level diagnosis |
| **Target Users** | Operations Managers, Business Analysts, Process Owners, AI Program leads |
| **Primary Use Case** | Facilitated assessment: assessor fills in form during a team or process review session and exports JSON |
| **Repository** | `paulosolis-ai/ai-baselining-app` |
| **Framework** | ACE-Framework v2.5.0 |

---

## Visual Style

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Density | Comfortable | Executive/corporate audience — readable without being sparse |
| Theme | Dark page background, light form cards | Dark bg (`#020617`) with white card surfaces — high contrast corporate look |
| Component Library | shadcn/ui + Tailwind CSS v4 | Pre-built accessible components; Tailwind for all custom styling |
| Typography | Tailwind defaults (Inter-compatible) | Clean, professional sans-serif |
| Animations | Framer Motion | Smooth section transitions on level change |
| Icon Library | Lucide React | Consistent outline icons; inline Icon component for dynamic icon rendering |
| Domain Matrix | Custom chevron-shaped headers (#0052CC), orange category titles (#EA580C) | Matches corporate brand visual language |

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend Framework | React 19 | Stable; familiar to the team |
| Build Tool | Vite | Fast HMR; minimal config |
| Styling | Tailwind CSS v4 | Utility-first; no runtime overhead |
| State Management | Local `useState` in App.jsx | v1 facilitated use case; no persistence needed |
| Charts | Recharts | React-native charting; sufficient for bar/pie/radar |
| Animation | Framer Motion | AnimatePresence for level transition effects |
| Linting | ESLint | CI-enforced; prevents unused-vars regressions |

---

## API Design

- **Style:** None (v1 is purely client-side)
- **Export:** JSON blob via `URL.createObjectURL` — browser-native, no server
- **Future:** REST API with Problem Details RFC 7807 error format when backend is added

---

## Data Layer

- **Database:** None (v1 — local state only)
- **Future:** Supabase PostgreSQL only (custom auth + session management in application)
- **ORM/Query Builder (future):** Supabase JS client
- **Migration Tool (future):** Supabase migrations

---

## Testing

- **Framework:** None implemented in v1
- **Coverage Target:** 80% for scoring logic (`logic/maturity.js`) when tests are added
- **E2E Tool:** Playwright (planned — to detect blank-page regressions per RCA-001)
- **Current CI:** ESLint lint + Vite build only

---

## Code Style

| Decision | Choice |
|----------|--------|
| Language | JavaScript (JSX) — not TypeScript in v1 |
| Linter | ESLint (flat config) |
| Formatter | No Prettier configured — follow ESLint rules |
| File naming | kebab-case for components (e.g. `DomainCards.jsx`), camelCase for data/logic |
| Component pattern | Functional components + hooks only, no class components |
| Import aliases | `@/` maps to `src/` via Vite alias config |

---

## Deployment

| Decision | Choice |
|----------|--------|
| Platform | Static hosting (Vercel or Netlify) — no server required |
| CI/CD | GitHub Actions — lint + build on push to `main`/`develop` and PRs |
| Build artifact | `dist/` folder uploaded as GitHub Actions artifact (7-day retention) |
| Environment | No environment variables required for v1 |
| Branch strategy | `main` (production), `develop` (integration), `feat/*` / `refactor/*` / `release/*` feature branches |

---

## Project-Specific Decisions

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| No TypeScript in v1 | Plain JSX | Reduce setup complexity; prototype speed | 2026-05-12 |
| No Prettier | ESLint only | Single linting tool; Prettier not configured | 2026-05-12 |
| No tests in v1 | CI = lint + build only | Time-to-delivery for prototype; tests planned for v2 | 2026-05-12 |
| Inline icons via Icon.jsx | No icon library dependency for dynamic icons | Avoids lucide-react as an additional dependency for dynamically-rendered icons | 2026-05-12 |
| equipManagers field | Present in questions.js but missing from initialForm | Known gap — field defined but not wired; to be resolved in next PRD cycle | 2026-05-12 |
| Tribe = "Intelligent Automation" | Not "Intelligent" | Correct organizational naming per BR-005 | 2026-05-12 |
| shadcn/ui + Tailwind v4 | Not MUI or Ant Design | Lighter bundle; Tailwind utility-first matches design needs | 2026-05-12 |
| PRD-006 Notes semantics | Notes are informational only | Notes must not affect scoring, branching, classification, output generation, or maturity level | 2026-05-13 |
| PRD-006 Not Applicable semantics | N/A or fully negative responses produce no positive maturity evidence | Not every maturity indicator applies to every team/process | 2026-05-13 |
| PRD-006 assessment scope | Support team-level diagnosis | Process fields may remain supporting context, but final maturity can represent the team | 2026-05-13 |
| PRD-006 Service/Product catalog | Add/support preloaded catalog field | Users should select existing services/products rather than rely only on free text | 2026-05-13 |
| PRD-006 Director mapping | Auto-populate Director from selected Tribe | Director is ownership metadata and must not affect maturity logic | 2026-05-14 |
| PRD-006 Tribe-filtered Services/Products | Filter Service/Product options by selected Tribe | Service/Product is catalog metadata and must not affect maturity logic | 2026-05-14 |

---

*Update this file during the Discuss Phase. Reference it as a constraint during Plan and Execute phases.*
