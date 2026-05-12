# Active Context: AI Operations Baseline Assessment

## Session Metadata
- **Last Updated:** 2026-05-12
- **Active Role:** Architect
- **Mode:** REVIEW / DOCUMENTATION

---

## Current State Summary

The application is **functionally complete for v1** as of 2026-05-12. The full client-centric 3-domain framework (PRD-005) has been implemented and all critical runtime crashes have been resolved (RCA-001). The PR `release/complete-survey-app → main` (PR #9) is open and awaiting merge.

---

## Completed PRDs

| PRD | Title | Status |
|-----|-------|--------|
| PRD-002 | Pillar-based questions per maturity level | Completed (superseded) |
| PRD-003 | Fixed question logic: maturity-constrained survey redesign | Completed (superseded) |
| PRD-004 | Enterprise Assessment Redesign — 5-section global flow | Implemented |
| PRD-005 | Client-Centric Operational Framework — 3 domains × 3 stages | Implemented |

---

## Accepted ADRs

| ADR | Title | Status |
|-----|-------|--------|
| ADR-001 | Removal of Pillar-Based Categorization | Accepted |
| ADR-002 | Client-Centric Domain Model | Accepted |
| ADR-003 | Domain-Grouped Question Rendering in SurveyView | Accepted |
| ADR-004 | Local React State Only — No Backend for v1 | Accepted |

---

## Resolved RCAs

| RCA | Title | Status |
|-----|-------|--------|
| RCA-001 | Blank Page Crash — Missing levelConfig Exports + Stale Field References | Resolved |

---

## Current Architecture

### Frontend Stack
- React 19 + Vite
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (AnimatePresence for level transitions)
- Recharts (dashboard charts)
- Lucide React (icons in static JSX)

### State Management
- Local React state only (`useState` in App.jsx)
- No persistence layer — data lives in browser session
- Export via JSON blob download

### Core Files
| File | Responsibility |
|------|---------------|
| `App.jsx` | Global state, `domainActive`, `completion`, `currentSection`, `recommendedLevel` |
| `views/SurveyView.jsx` | Main survey form with domain-grouped questions |
| `views/DashboardView.jsx` | Aggregate dashboard with Recharts |
| `data/formConfig.js` | `initialForm` — single source of truth for all form fields |
| `data/questions.js` | `SECTION_QUESTIONS` — question sets per maturity level |
| `data/levelConfig.js` | Domain structure, strategic stages, level metadata |
| `logic/maturity.js` | `calculateLevel()`, `getCurrentSection()` |
| `components/DomainCards.jsx` | 3×3 domain matrix |
| `components/ClassificationCard.jsx` | Real-time recommended level card |
| `components/BranchingPreview.jsx` | Level navigation sidebar |
| `components/NeedsValidation.jsx` | Needs Validation path |

---

## Known Gaps / Backlog

| Item | Priority | Notes |
|------|----------|-------|
| `equipManagers` field missing from `initialForm` | Medium | Field defined in `questions.js` and `levelConfig.js` but never initialized — will render as controlled-undefined. Needs wiring or removal. |
| No automated tests | High | Scoring logic, branch routing, and field initialization all lack unit tests. RCA-001 would have been caught by tests. |
| No E2E smoke test | High | Playwright test to load the app and select each AI usage option — prevents blank-page regressions. |
| Dashboard not connected to live form data | Low | Dashboard uses static `sampleProcesses.js` — does not reflect current session's assessment. |
| Some subcategories have no questions | Low | "IP - Reusable Accelerators," "Equip Managers to Win," "Intelligent Staffing," "Next-Gen Roles" have no form fields yet. |
| JSON export not implemented | Medium | Export button/mechanism not yet wired up. `URL.createObjectURL` approach decided but not built. |
| Completion % counts legacy `evidence` field | Low | `form.evidence` referenced in completion calc but doesn't exist in `initialForm`. |

---

## Active Constraints

- No backend — local state only (ADR-004, BR-006)
- Approved questions only — no new questions without PRD update (BR-008)
- All field references must exist in `initialForm` (BR-007, RCA-001)
- Tribe name must be "Intelligent Automation" (BR-005)
- Build must pass lint + build CI before merge

---

## Next Recommended Actions

1. [ ] Fix `equipManagers` — add to `initialForm` or remove from `questions.js` and `levelConfig.js`
2. [ ] Fix completion calc — remove stale `form.evidence` reference from `App.jsx`
3. [ ] Implement JSON export functionality
4. [ ] Add unit tests for `calculateLevel()` and `getCurrentSection()`
5. [ ] Add Playwright E2E smoke test for blank-page regression
6. [ ] Connect Dashboard to live form state (or define aggregation strategy for v2)
7. [ ] PRD-006: Define scope for v2 (backend, persistence, multi-user, PDF export)
