# AI Operations Baseline Assessment

A survey tool for classifying the AI maturity of operational processes using a structured 5-level model across three organizational domains.

---

## What It Does

Helps organizations assess how deeply AI is integrated into each of their operational processes. A respondent fills in a short form describing the process and selects the current AI usage level. The tool routes them through a level-specific set of questions, groups answers by organizational domain, and produces a recommended maturity classification.

**Maturity Levels:**
| Level | Label |
|-------|-------|
| L0 | No AI Usage |
| L1 | Individual AI Use |
| L2 | Connected Workflows |
| L3 | Orchestrated Systems |
| L4 | Adaptive / Autonomous Operations |
| — | Needs Validation |

**Three Domains (Client-Centric Framework):**
- Client Centric Approach *(Business Model)*
- Operating Model & Technology *(How we deliver)*
- People *(How our people grow & win)*

---

## Tech Stack

- **React 19** + **Vite** — frontend framework and build tool
- **Tailwind CSS v4** + **shadcn/ui** — styling and UI components
- **Framer Motion** — animated level transitions
- **Recharts** — dashboard charts
- **ESLint** — linting (CI-enforced)

---

## Getting Started

```bash
# Install dependencies
cd ai-baselining-process/front-end
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

The app runs at `http://localhost:5173`.

---

## Project Structure

```
ai-baselining-app/
├── ai-baselining-process/
│   ├── .ace/                    # ACE-Framework knowledge layer
│   │   ├── knowledge/           # Business rules, entities, glossary
│   │   ├── standards/           # Coding, security, git, architecture standards
│   │   ├── skills/              # 22+ AI-assisted dev skills
│   │   └── feedback/            # Incident and feedback log
│   ├── docs/
│   │   ├── adr/                 # Architecture Decision Records
│   │   ├── context/             # Active context + project context
│   │   ├── features/            # Feature specifications
│   │   ├── planning/            # Implementation plans
│   │   ├── rca/                 # Root Cause Analysis records
│   │   ├── releases/            # Release notes
│   │   └── requirements/        # PRDs and tech specs
│   └── front-end/
│       └── src/
│           ├── components/      # React components
│           ├── data/            # Form config, questions, level config
│           ├── logic/           # Maturity scoring and branching
│           └── views/           # Survey and Dashboard views
└── CHANGELOG.md
```

---

## Key Documentation

| Document | Description |
|----------|-------------|
| [PRD-004](ai-baselining-process/docs/requirements/PRD-004-enterprise-assessment-redesign.md) | Enterprise survey redesign — 5-section flow, 30+ fields |
| [PRD-005](ai-baselining-process/docs/requirements/PRD-005-client-centric-framework.md) | Client-Centric 3-domain framework |
| [ADR-002](ai-baselining-process/docs/adr/ADR-002-client-centric-model.md) | Decision: 3-domain model adoption |
| [ADR-004](ai-baselining-process/docs/adr/ADR-004-local-state-no-backend.md) | Decision: local state only, no backend |
| [RCA-001](ai-baselining-process/docs/rca/RCA-001-blank-page-crash.md) | Blank page crash post-refactor |
| [CHANGELOG](CHANGELOG.md) | All notable changes |
| [Release 1.0.0](ai-baselining-process/docs/releases/RELEASE-1.0.0.md) | v1.0.0 release notes |

---

## CI/CD

GitHub Actions runs on push to `main`/`develop` and on all PRs:
1. Install Node.js 20
2. `npm ci`
3. `npm run lint` (ESLint)
4. `npm run build` (Vite production build)
5. Upload `dist/` artifact (7-day retention)

---

## Development Methodology

This project uses **ACE-Framework v2.5.0** for AI-assisted development. See `ai-baselining-process/ACE-SPEC.md` for the full specification and `ai-baselining-process/.ace/standards/` for coding, security, git, and architecture standards.

---

## Known Limitations (v1)

- Data is not persisted — lost on page refresh (by design for facilitated assessments)
- No user authentication or multi-user support
- Dashboard uses static sample data — not connected to live form
- JSON export not yet implemented
- No automated tests

See [ACTIVE_CONTEXT.md](ai-baselining-process/docs/context/ACTIVE_CONTEXT.md) for the full backlog.
