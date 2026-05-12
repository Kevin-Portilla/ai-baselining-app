# Release 1.0.0 — AI Operations Baseline Assessment

**Date:** 2026-05-12
**Branch:** `release/complete-survey-app`
**PR:** #9 (`release/complete-survey-app → main`)
**Status:** Ready for merge

---

## Summary

Version 1.0.0 is the first production-ready release of the AI Operations Baseline Assessment tool. It delivers a complete, functional survey for classifying the AI maturity of operational processes using the Client-Centric Operational Framework.

---

## What's New

### Core Survey Application
- **Process Metadata Form** (FEAT-001) — Captures tribe, role, process name, type, frequency, criticality, data classification, systems, and description.
- **AI Maturity Branching Survey** (FEAT-002) — 5-level maturity assessment (L0 No AI → L4 Adaptive/Autonomous) with level-specific question sets across 3 organizational domains.
- **Domain Cards Matrix** (FEAT-003) — 3×3 visual framework matrix (domains × strategic stages) with real-time completion indicators.
- **Needs Validation Path** (FEAT-004) — 5-question escalation path for processes where AI usage is uncertain.
- **Real-Time Classification Card** (FEAT-006) — Live recommended maturity level with animated level pill, icon, and description.
- **Dashboard View** (FEAT-005) — Aggregate visualization of 50-process sample dataset using Recharts.

### Framework Integration
- 3-domain model: **Client Centric Approach**, **Operating Model & Technology**, **People** (PRD-005, ADR-002)
- 3 strategic stages: **Sense Benchmark & Position**, **Scale & Differentiate**, **Become a Human-AI Delivery Hub**
- Branching logic with supplementary score nudges (up to +2.0, capped at L4)
- Approved question set: 48+ questions across all levels, validated by stakeholders

### CI/CD
- GitHub Actions pipeline: lint (ESLint) + build (Vite) on push and PRs to `main`/`develop`
- Build artifact uploaded (7-day retention)

---

## Bug Fixes

| Fix | Description | Commit |
|-----|-------------|--------|
| Blank page on load | Restored 6 missing `levelConfig.js` exports removed in prior refactor | `1839a54` |
| Blank page on AI usage select | Fixed `calculateLevel()` calling `.length` on undefined fields | `1839a54` |
| Blank page on load (domainActive) | Fixed `domainActive` referencing stale field names | `1839a54` |
| Domain completion indicators | Fixed `DomainCards.jsx` reading `sub.field` instead of `sub.fields` | `1839a54` |
| CI lint failure | Removed unused `React`, `FINAL_QUESTIONS`, `sectionLabels` imports | `9b6fe61` |
| Tribe name | Corrected "Intelligent" → "Intelligent Automation" | `90efd97` |

---

## Commits in This Release

| Commit | Description |
|--------|-------------|
| `9b6fe61` | fix: remove unused imports to pass CI lint |
| `1839a54` | fix: restore missing levelConfig exports and repair runtime crashes |
| `6aecd2e` | Feat: Integrate Client-Centric Operational Framework (3 Domains, 3 Strategic Stages) as per PRD-005 |
| `009939e` | Refactor: Remove pillar-based categorization and flatten assessment flow as per ADR-001 |
| `90efd97` | fix: rename tribe from Intelligent to Intelligence Automation |
| `40357c5` | feat: add 50-process sample dataset and aggregate dashboard (#7) |
| `28a8eaf` | feat: add Survey/Dashboard views with Recharts visualizations (#6) |
| `f888428` | refactor: split App.jsx into modular file structure (#4) |
| `170fc94` | fix: restore clean index.css so h1 text-white renders correctly (#3) |

---

## Known Issues / Backlog for v1.1

| Issue | Priority |
|-------|----------|
| `equipManagers` field missing from `initialForm` | Medium |
| Completion % references non-existent `form.evidence` | Low |
| JSON export not yet implemented | Medium |
| No unit tests or E2E tests | High |
| Dashboard uses static sample data only | Low |
| Several subcategories have no questions yet | Low |

---

## Upgrade Notes

This is the first release — no upgrade path needed. Deploy as static site from `dist/`.

```bash
npm ci
npm run build
# Deploy dist/ to Vercel / Netlify / any static host
```
