# Active Context: AI Operations Baseline Assessment

## Session Metadata
- **Last Updated:** 2026-05-14
- **Active Role:** Developer
- **Mode:** EXECUTION

---

## Current State Summary

The application is **functionally complete for v1** as of 2026-05-12. The full client-centric 3-domain framework (PRD-005) has been implemented and all critical runtime crashes have been resolved (RCA-001). The PR `release/complete-survey-app → main` (PR #9) is open and awaiting merge.

On 2026-05-13, new stakeholder notes from Don Fran were captured as PRD-006 and expanded with per-requirement acceptance criteria. A detailed BMAD implementation plan now exists in `docs/planning/implementation_plan.md`.

Execution update: Not Applicable diagnostic responses have been implemented for maturity diagnostic select/toggle questions. Not Applicable is mutually exclusive in multi-select controls, excluded from positive maturity evidence, excluded from domain activation, and verified against branch stability and scoring regressions.

Execution update: User-facing diagnostic "Other" options have been renamed to "Notes" through the question option export layer. Legacy stored `"Other"` values remain compatible, but Notes and legacy Other are excluded from positive maturity evidence, domain activation, recommended classification, and branch-affecting logic.

Execution update: Notes exclusion has been extended and tested across scoring, classification, branch routing, AI readiness level, domain/quadrant matching, and output preparation. `front-end/src/logic/assessmentOutput.js` now separates sanitized diagnostic answers from qualitative `notes`; UI export wiring remains a separate backlog item. Remaining PRD-006 work includes team-level assessment metadata, Service/Product catalog, and export UI wiring.

Execution update: Team-level assessment is now supported as the primary context. `initialForm` includes `assessmentScope`, `teamName`, `area`, `squad`, and `serviceProduct`; the metadata form renders these fields, process name remains supporting context for team assessments, and recommended classification displays the evaluated team/process. Legacy process-level records without `assessmentScope` remain compatible through `assessmentTarget` helpers.

Execution update: The Service/Product field was originally backed by the static `serviceProductOptions[]` catalog in `front-end/src/data/formConfig.js`. The selected value is saved in local form state, associated with team/area/tribe/squad metadata in prepared output, and verified not to affect maturity scoring. No database migration is required under ADR-004.

Planning update: New Director and Services/Products catalog requirements have been captured in PRD-006 and `docs/specs/director-services-products-catalog.md`. Director must be auto-populated from selected Tribe, Services/Products must be filtered by Tribe, both fields must be saved and shown in view/edit/details/output metadata, and neither field may affect scoring, maturity classification, branching logic, domain activation, or derived output generation.

Execution update: A typed frontend-only Director and Services/Products catalog now exists at `front-end/src/data/aiBaselineCatalog.ts`. It contains the approved Tribe-to-Director mapping, the complete supplied Services/Products list grouped by Tribe, exact-duplicate removal within each Tribe through a local helper, and helper exports `getDirectorByTribe()` and `getServicesProductsByTribe()`. Director and Service/Product remain local metadata only; no database, migration, Supabase, API, backend DTO, or persistence change was introduced.

---

## Completed PRDs

| PRD | Title | Status |
|-----|-------|--------|
| PRD-002 | Pillar-based questions per maturity level | Completed (superseded) |
| PRD-003 | Fixed question logic: maturity-constrained survey redesign | Completed (superseded) |
| PRD-004 | Enterprise Assessment Redesign — 5-section global flow | Implemented |
| PRD-005 | Client-Centric Operational Framework — 3 domains × 3 stages | Implemented |
| PRD-006 | Team-Level Assessment, Notes, Director, and Service/Product Catalog | Proposed / Planning |

---

## Accepted ADRs

| ADR | Title | Status |
|-----|-------|--------|
| ADR-001 | Removal of Pillar-Based Categorization | Accepted |
| ADR-002 | Client-Centric Domain Model | Accepted |
| ADR-003 | Domain-Grouped Question Rendering in SurveyView | Accepted |
| ADR-004 | Local React State Only — No Backend for v1 | Accepted |
| ADR-005 | Support Team-Level AI Maturity Assessment | Proposed |

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
| `equipManagers` field status needs doc/code reconciliation | Medium | Current `front-end/src/data/formConfig.js` includes `equipManagers`, but some docs still describe it as missing. Treat docs as stale and verify during next cleanup. |
| Expand automated tests | High | Focused unit coverage now exists for maturity scoring, branch routing, Not Applicable, and Notes exclusion. E2E smoke and field-initialization coverage are still needed. |
| No E2E smoke test | High | Playwright test to load the app and select each AI usage option — prevents blank-page regressions. |
| Dashboard not connected to live form data | Low | Dashboard uses static `sampleProcesses.js` — does not reflect current session's assessment. |
| Some subcategories have no questions | Low | "IP - Reusable Accelerators," "Equip Managers to Win," "Intelligent Staffing," "Next-Gen Roles" have no form fields yet. |
| JSON export not implemented | Medium | Export button/mechanism not yet wired up. `URL.createObjectURL` approach decided but not built. |
| Completion % counts legacy `evidence` field | Low | `form.evidence` referenced in completion calc but doesn't exist in `initialForm`. |
| Add Not Applicable / negative responses | Completed | Implemented for diagnostic select/toggle questions; excluded from scoring and branch changes. |
| Rename Other to Notes | Completed | Diagnostic option exports now display Notes instead of Other while preserving legacy Other compatibility. |
| Notes must not affect logic | Completed | Notes and legacy Other are excluded from positive evidence, domain activation, scoring/classification, branch-affecting helper behavior, readiness output, and prepared output diagnostic answers. Export UI wiring remains separate because export is not implemented. |
| Support team-level assessment model | Completed | Team is now the default assessment scope, with process-level context optional for team assessments and compatible with legacy process records. |
| Add Services / Products preload | Completed | Static frontend catalog in `front-end/src/data/aiBaselineCatalog.ts` is grouped by Tribe and seeded with the supplied business list. External catalog/API remains deferred. |
| Add Director metadata | In progress | Director auto-populates from selected Tribe in the survey form and remains scoring-neutral. Display in all view/details/output surfaces is still tracked separately. |

---

## Active Constraints

- No backend — local state only (ADR-004, BR-006)
- Approved questions only — no new questions without PRD update (BR-008)
- PRD-006 is the active PRD update for Don Fran requested improvements
- Notes are informational only and must remain unscored/unclassified
- Team-level diagnosis identifies whether maturity applies to a team or a process
- Service/Product catalog source is static frontend config in `front-end/src/data/aiBaselineCatalog.ts`
- Director mapping and Tribe-filtered Services/Products catalog must remain local/static unless ADR-004 is updated
- All field references must exist in `initialForm` (BR-007, RCA-001)
- Tribe name must be "Intelligent Automation" (BR-005)
- Build must pass lint + build CI before merge

---

## Next Recommended Actions

1. [ ] Validate current code/docs drift: `equipManagers`, tribe spelling, completion fields, and export status
2. [ ] Finalize remaining PRD-006 decisions: Not Applicable label and N/A completion behavior
3. [x] Create detailed BMAD implementation plan for PRD-006 in `docs/planning/implementation_plan.md`
4. [ ] Fix completion calc — remove stale `form.evidence` reference from `App.jsx`
5. [ ] Wire JSON export UI to `front-end/src/logic/assessmentOutput.js`
6. [x] Add unit tests for `calculateLevel()`, `getCurrentSection()`, Notes exclusion, and Not Applicable behavior
7. [ ] Add Playwright E2E smoke test for blank-page regression
8. [ ] Connect Dashboard to live form state (or define aggregation strategy for v2)
9. [x] Confirm full Services/Products list per Tribe before implementation
10. [x] Implement Director auto-population and Tribe-filtered Service/Product catalog after plan approval
