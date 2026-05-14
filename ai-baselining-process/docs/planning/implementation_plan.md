# Implementation Plan: PRD-006 AI Operations Baseline App Changes

**Status:** Draft for approval
**Mode:** PLANNING
**Role:** Architect
**Last Updated:** 2026-05-14
**Source Requirements:** `docs/requirements/PRD-006-team-level-assessment-and-notes.md`

---

## 1. Objective

Implement the new AI Operations Baseline App changes requested from the meeting notes and Don Fran's feedback:

1. Add "Not Applicable" / fully negative diagnostic responses.
2. Rename "Other" to "Notes".
3. Exclude Notes from scoring, recommended classification, branching logic, maturity calculation, and generated output.
4. Support team-level assessment, with process-level information available as supporting context.
5. Add Director and tribe-filtered Service/Product catalog fields.
6. Preserve the frontend-only/local-state architecture for Director and Service/Product work.
7. Update frontend form behavior.
8. Preserve scoring/classification/branching/output-generation neutrality for metadata-only fields.
9. Do not add API, database, migration, Supabase, or backend persistence changes for the frontend-only Director and Services/Products implementation unless a future ADR explicitly changes scope.
10. Add tests and regression coverage.
11. Update documentation and `ACTIVE_CONTEXT.md`.

---

## 2. BMAD Methodology

### Analyze

Current state:

- App is React 19 + Vite, local-state only.
- `front-end/src/data/formConfig.js` is the canonical field registry.
- `front-end/src/data/questions.js` contains diagnostic question configuration.
- `front-end/src/logic/maturity.js` owns `getCurrentSection()` and `calculateLevel()`.
- `front-end/src/App.jsx` derives completion, domain activation, current section, and recommended level.
- `FormSelect.jsx` and `ToggleGrid.jsx` currently treat `"Other"` as an option that reveals a text field.
- No backend, API, or active database schema exists in the repo.
- `docs/rca/regression-guards.yaml` has no active guards.

Key constraints:

- ADR-004: no backend/API/persistence for v1.
- BR-007: every referenced field must exist in `initialForm`.
- BR-009: Notes are informational only.
- BR-010: Not Applicable must not inflate maturity.
- BR-011: team-level diagnosis must identify its scope.
- BR-012: Service/Product catalog source must be documented.
- BR-013: Director must be derived from selected Tribe.
- BR-014: Director and Service/Product must remain metadata-only and scoring-neutral.

### Plan

Implementation should proceed in small, reversible slices:

1. Finalize product decisions and ADRs.
2. Add data-model fields and constants.
3. Update form behavior for Notes and Not Applicable.
4. Update question configuration.
5. Update scoring/domain/output helpers to exclude Notes and non-applicable answers.
6. Add output/API/schema behavior only after local model is stable.
7. Add tests and regression coverage.
8. Update documentation and active context.

### Execute

Developer role executes only after this plan is accepted. Each task should be atomic, checked against regression guards, and verified before moving to the next task.

### Verify

QA role verifies:

- Build/lint pass.
- Unit tests cover scoring, branching, notes exclusion, and N/A handling.
- E2E smoke path covers scope selection, Service/Product selection, Notes, and Not Applicable.
- Documentation and `ACTIVE_CONTEXT.md` reflect final implementation.

---

## 3. Architectural Decisions Needed

### ADR-005: Scope-Aware Assessment Target

Decision needed: whether to keep `ProcessAssessment` as the aggregate and add `assessmentScope`, or introduce a generalized `AssessmentTarget`.

Recommendation: add `assessmentScope` to the current local model for v1, with `Team` as the preferred/default scope if stakeholders confirm. Keep process fields as supporting context.

### ADR-006: Notes and Not Applicable Semantics

Decision needed: how Notes and Not Applicable affect completion and export.

Recommendation:

- Notes never affect scoring, branching, classification, maturity, domain activation, or generated output values.
- Notes may be exported as unscored qualitative context.
- Not Applicable counts as answered for completion only if product wants progress completeness, but never counts as positive maturity evidence.

### ADR-007: Director and Service/Product Catalog Source

Decision needed: static local catalog versus backend/API catalog.

Recommendation: use static frontend reference data for the Tribe-to-Director mapping and tribe-filtered Services/Products list in v1 to preserve ADR-004. Revisit API/backend when persistence is introduced.

### ADR-004 Update Trigger

If Director or Service/Product catalog loading requires a network call, backend table, or external integration, update or supersede ADR-004 before implementation.

---

## 4. Atomic Tasks

### Task 1: Finalize PRD-006 Decisions

**Description:** Confirm unresolved product decisions before code changes: Not Applicable wording, completion behavior, default assessment scope, Service/Product catalog source, and Notes export shape.

**Role Responsible:** Architect

**Files/modules likely affected:**

- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`
- `docs/planning/implementation_plan.md`
- `.ace/knowledge/business-rules.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- Not Applicable wording is approved.
- Completion semantics for Not Applicable are documented.
- Team/process scope approach is documented.
- Service/Product catalog source is documented.
- Notes export behavior is documented.

**Validation Steps:**

- Review PRD-006 open questions and close or mark each as deferred.
- Confirm plan matches BR-009 through BR-012.
- Confirm no implementation starts before decision capture.

**Risk Level:** Medium

**Dependencies:** Stakeholder/product confirmation.

---

### Task 2: Create Required ADRs

**Description:** Create ADRs for scope-aware assessment, Notes/N/A semantics, and Service/Product catalog source.

**Role Responsible:** Architect

**Files/modules likely affected:**

- `docs/adr/ADR-005-scope-aware-assessment-target.md`
- `docs/adr/ADR-006-notes-and-not-applicable-semantics.md`
- `docs/adr/ADR-007-service-product-catalog-source.md`
- `docs/adr/ADR-004-local-state-no-backend.md` only if backend/API catalog is selected

**Acceptance Criteria:**

- ADRs are written before Developer implementation.
- ADRs identify consequences, rejected alternatives, and impacted modules.
- ADR-004 is preserved unless catalog/API requirements explicitly change it.

**Validation Steps:**

- Check ADR numbering does not collide.
- Verify each ADR cross-references PRD-006.
- Verify implementation plan references the accepted ADRs.

**Risk Level:** Medium

**Dependencies:** Task 1.

---

### Task 3: Add Assessment Scope, Director, and Service/Product Fields to Form Model

**Description:** Add team-level, Director, and Service/Product metadata to the local form state and option exports.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `docs/architecture/DATA-MODEL.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- `initialForm` includes approved fields such as `assessmentScope`, `teamName`, `director`, `serviceProduct`, and optionally `relatedProcesses`.
- String fields initialize to `""`; array fields initialize to `[]`.
- `assessmentScopeOptions`, approved Tribe options, Tribe-to-Director mapping, and tribe-filtered Service/Product options exist if static catalog approach is chosen.
- Existing process fields remain available as supporting context.

**Validation Steps:**

- Run lint/build.
- Inspect first render for no uncontrolled/undefined field warnings.
- Confirm BR-007 field initialization checklist passes.

**Risk Level:** Medium

**Dependencies:** Tasks 1 and 2.

---

### Task 4: Update Metadata Form UI for Team Scope, Director, and Service/Product

**Description:** Render the new assessment target fields in the metadata step, auto-populate Director from selected Tribe, filter Services/Products by Tribe, and adjust labels so the form is not process-only.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/views/SurveyView.jsx`
- `front-end/src/components/FormSelect.jsx`
- `front-end/src/data/formConfig.js`
- `docs/logic/SURVEY-FLOW.md`

**Acceptance Criteria:**

- User can select Team or Process assessment scope.
- User can select a Tribe and see the mapped Director.
- User can select a Service/Product from the selected Tribe's preload catalog.
- Changing Tribe clears Service/Product if the old selection is not valid for the new Tribe.
- Team name is available when team scope is selected or supported.
- Process name/description remain available as supporting context.
- UI copy avoids implying all results are process-level.

**Validation Steps:**

- Manual smoke test first metadata step.
- Verify `Next Step` behavior still depends on required routing inputs.
- Verify metadata completion calculation handles new fields as designed.

**Risk Level:** Medium

**Dependencies:** Task 3.

---

### Task 5: Rename User-Facing Other to Notes

**Description:** Replace user-facing "Other" behavior with "Notes" terminology while preserving safe internal state if a full field migration is deferred.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/components/FormSelect.jsx`
- `front-end/src/components/ToggleGrid.jsx`
- `front-end/src/components/NeedsValidation.jsx`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/data/questions.js`
- `docs/architecture/COMPONENT-MAP.md`

**Acceptance Criteria:**

- Diagnostic UI no longer presents "Other" as a scored answer option for note capture.
- Notes labels/placeholders are clear and consistent.
- Notes values are stored separately from scored answer selections.
- Temporary internal `otherField` names, if retained, are documented as Notes semantics.

**Validation Steps:**

- Search rendered strings and config for user-facing `"Other"` in diagnostic questions.
- Manually enter notes for select and toggle questions.
- Confirm selecting/typing notes does not change recommended level or branch.

**Risk Level:** High

**Dependencies:** Tasks 1 and 2.

---

### Task 6: Add Not Applicable / Negative Response Support in Question Model

**Description:** Update diagnostic question configuration so maturity indicators can be answered as not applicable or fully negative.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/questions.js`
- `front-end/src/data/clientCentricApproach.md`
- `front-end/src/data/operatingModelAndTechnology.md`
- `front-end/src/data/people.md`
- `docs/logic/QUESTION-MATRIX.md`
- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`

**Acceptance Criteria:**

- Diagnostic question sets include Not Applicable / negative response where required.
- Any omitted N/A option has documented rationale.
- N/A/negative options are semantically identifiable, not just free-form labels.
- Option sets remain scoped to the correct maturity level.

**Validation Steps:**

- Review every `SECTION_QUESTIONS` section.
- Run a config consistency audit: every question field exists in `initialForm`.
- Confirm no scoring field can count only N/A as positive evidence.

**Risk Level:** High

**Dependencies:** Tasks 1, 2, and 5.

---

### Task 7: Update Toggle and Select Behavior for Notes and Not Applicable

**Description:** Ensure UI components enforce Notes and Not Applicable semantics.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/components/ToggleGrid.jsx`
- `front-end/src/components/FormSelect.jsx`
- `front-end/src/components/NeedsValidation.jsx`
- `front-end/src/views/SurveyView.jsx`

**Acceptance Criteria:**

- Not Applicable is mutually exclusive with positive options for multi-select questions unless documented otherwise.
- Selecting a positive option clears Not Applicable when mutual exclusion applies.
- Notes can be entered without adding a scored option.
- Select questions can display notes without relying on selected value `"Other"`.

**Validation Steps:**

- Manual test: select N/A then select positive option.
- Manual test: select positive options then select N/A.
- Manual test: add Notes and confirm answer arrays/values remain score-safe.
- Run lint/build.

**Risk Level:** High

**Dependencies:** Tasks 5 and 6.

---

### Task 8: Update Scoring and Classification Logic

**Description:** Refactor scoring helpers so only positive maturity evidence contributes to `calculateLevel()` and recommended classification.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.js`
- `front-end/src/components/ClassificationCard.jsx`
- `front-end/src/data/levelConfig.js`
- `docs/logic/BRANCHING-LOGIC.md`

**Acceptance Criteria:**

- Notes fields are never read by `calculateLevel()`.
- Not Applicable / negative answers are excluded from all evidence counts.
- `getCurrentSection()` remains driven only by approved branch routing input.
- Changing only Notes does not alter `recommendedLevel`.
- Selecting only N/A does not increase maturity.

**Validation Steps:**

- Add unit tests for `calculateLevel()` with notes-only changes.
- Add unit tests for scoring arrays containing N/A.
- Add unit tests for `getCurrentSection()` stability.
- Run lint/build/tests.

**Risk Level:** High

**Dependencies:** Tasks 6 and 7.

---

### Task 9: Update Domain Activation, Completion, and Dashboard Semantics

**Description:** Distinguish positive maturity evidence from not-applicable or notes-only answers in domain cards, completion, and dashboard display.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/App.jsx`
- `front-end/src/components/DomainCards.jsx`
- `front-end/src/views/DashboardView.jsx`
- `docs/architecture/COMPONENT-MAP.md`

**Acceptance Criteria:**

- Notes-only changes do not activate domains or subcategories.
- Not Applicable can be displayed as answered/out-of-scope if approved, but not as positive maturity evidence.
- Dashboard labels support team-level assessment scope.
- Completion behavior follows Task 1 decision.

**Validation Steps:**

- Manual test domain matrix with notes-only answers.
- Manual test domain matrix with N/A answers.
- Manual test Dashboard with Team scope.
- Add unit/helper tests if activation logic is extracted.

**Risk Level:** High

**Dependencies:** Tasks 1, 7, and 8.

---

### Task 10: Implement or Update Output Generation

**Description:** Implement or update JSON export so it includes team scope, Director, and Service/Product metadata while excluding Notes and metadata-only fields from derived scoring outputs.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/App.jsx`
- Possible new helper: `front-end/src/logic/export.js`
- `front-end/src/components/Header.jsx` or export button location
- `docs/architecture/DATA-MODEL.md`
- `docs/logic/SURVEY-FLOW.md`

**Acceptance Criteria:**

- Export includes `assessmentScope`, `teamName`, `director`, `serviceProduct`, and supporting process context.
- Export includes `recommendedLevel` and current section.
- Notes appear only as unscored qualitative context if included.
- Generated/derived output values are not computed from Notes, Director, or Service/Product.
- Export works without backend/API.

**Validation Steps:**

- Export JSON for Process scope and Team scope.
- Compare recommended level before/after notes-only edits.
- Verify exported schema matches DATA-MODEL docs.
- Run lint/build/tests.

**Risk Level:** Medium

**Dependencies:** Tasks 3, 8, and 9.

---

### Task 11: Database Schema Planning

**Description:** Decide whether schema files are needed now. The repo currently has no `db/schema.sql`, but the IDE references one. If backend remains deferred, update docs only. If schema is required, create future schema/migration planning artifacts.

**Role Responsible:** Architect, then Developer if schema artifact is approved

**Files/modules likely affected:**

- `docs/architecture/DATA-MODEL.md`
- Possible new file: `db/schema.sql`
- Possible new file: `docs/adr/ADR-008-backend-schema.md` if persistence scope changes

**Acceptance Criteria:**

- Decision is documented: no DB for v1, or schema artifact added for future backend.
- If schema is added, it supports `assessment_scope`, team metadata, Director, Service/Product catalog relationship, level answers, notes context, and recommended level.
- If schema is not added, docs clearly state no database change is needed for v1.

**Validation Steps:**

- Confirm ADR-004 local-only remains valid.
- Confirm `db/schema.sql` existence or non-existence is intentional.
- If schema is created, review SQL for team/process scope and catalog fields.

**Risk Level:** Medium

**Dependencies:** Tasks 1 and 2.

---

### Task 12: API and Service Planning

**Description:** Determine whether any API/service layer is needed for Service/Product catalog or export. Default is no API for v1.

**Role Responsible:** Architect

**Files/modules likely affected:**

- `docs/architecture/ARCHITECTURE.md`
- `docs/architecture/DATA-MODEL.md`
- `docs/adr/ADR-004-local-state-no-backend.md`
- Possible new ADR if API/backend is introduced

**Acceptance Criteria:**

- Plan states whether API/services are unchanged, deferred, or introduced.
- Static Director and Service/Product catalog path is documented if no API is needed.
- If API is introduced, auth, failure modes, caching, and ownership are documented before code.

**Validation Steps:**

- Search app for `fetch`, `axios`, SDK calls; none should be added under local-only path.
- Confirm BR-006 compliance.
- Confirm ADR coverage if any network dependency is approved.

**Risk Level:** Medium

**Dependencies:** Task 2 and catalog decision in Task 1.

---

### Task 13: Add Unit Tests for Branching, Scoring, and Exclusions

**Description:** Add focused tests for the highest-risk logic.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.js`
- Possible test files under `front-end/src/logic/`
- Test framework config if not already present
- `package.json` if a test runner is introduced

**Acceptance Criteria:**

- Tests cover `getCurrentSection()`.
- Tests cover `calculateLevel()` base routing.
- Tests cover Notes ignored by scoring.
- Tests cover Not Applicable ignored by scoring thresholds.
- Tests cover team/process, Director, and Service/Product metadata does not silently change scoring.

**Validation Steps:**

- Run unit test command.
- Run lint/build.
- Confirm tests fail before logic fix or specifically assert new behavior.

**Risk Level:** Medium

**Dependencies:** Tasks 8 and test tooling decision.

---

### Task 14: Add E2E Smoke and Regression Tests

**Description:** Add Playwright or equivalent smoke coverage for blank-page regression and PRD-006 flows.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- Possible `front-end/tests/` or `tests/e2e/`
- `package.json`
- CI workflow if E2E becomes part of CI
- `docs/planning/walkthrough.md`

**Acceptance Criteria:**

- App loads without blank page.
- User can select Team scope.
- User can select Tribe and see Director auto-populate.
- User can select Service/Product filtered by Tribe.
- User can answer a diagnostic question as Not Applicable.
- User can add Notes.
- Recommended classification does not change from notes-only edits.
- Export/smoke path passes if export is implemented.

**Validation Steps:**

- Run E2E locally.
- Capture QA walkthrough notes.
- Optionally add CI command after stability is confirmed.

**Risk Level:** Medium

**Dependencies:** Tasks 4, 7, 8, and 10.

---

### Task 15: Update Documentation and Active Context

**Description:** Update all docs to reflect implemented behavior, decisions, and residual gaps.

**Role Responsible:** Architect, Developer for code-adjacent docs, QA Engineer for verification docs

**Files/modules likely affected:**

- `docs/context/ACTIVE_CONTEXT.md`
- `docs/context/PROJECT_CONTEXT.md`
- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`
- `docs/architecture/DATA-MODEL.md`
- `docs/architecture/COMPONENT-MAP.md`
- `docs/logic/BRANCHING-LOGIC.md`
- `docs/logic/SURVEY-FLOW.md`
- `docs/logic/QUESTION-MATRIX.md`
- `docs/planning/walkthrough.md`
- `.ace/knowledge/business-rules.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- `ACTIVE_CONTEXT.md` includes final PRD-006 implementation status.
- Requirement docs match implemented behavior.
- Architecture and logic docs describe Notes/N/A/team/catalog behavior.
- Walkthrough includes validation evidence.
- Remaining open questions are marked resolved or deferred.

**Validation Steps:**

- Search docs for stale "Other" semantics.
- Search docs for process-only claims where team scope is supported.
- Confirm docs mention no database/API changes if local-only path remains.

**Risk Level:** Low

**Dependencies:** All implementation tasks.

---

### Task 16: Final Verification and Handoff

**Description:** Complete QA verification, regression review, and ACE handoff.

**Role Responsible:** QA Engineer, then Architect

**Files/modules likely affected:**

- `docs/planning/walkthrough.md`
- `docs/context/ACTIVE_CONTEXT.md`
- `docs/rca/regression-guards.yaml` only if a regression or incident is discovered

**Acceptance Criteria:**

- Lint passes.
- Build passes.
- Unit tests pass.
- E2E/smoke tests pass or documented as deferred with reason.
- Regression guard check completed.
- No unresolved critical PRD-006 acceptance criteria remain.

**Validation Steps:**

- Run full verification command set.
- Review modified files against BR-007, BR-009, BR-010, BR-011, and BR-012.
- Update `ACTIVE_CONTEXT.md` with final state and next actions.

**Risk Level:** Medium

**Dependencies:** Tasks 13, 14, and 15.

---

## 4A. Director and Services/Products Implementation Tasks

This task set is the focused execution plan for `PRD6-FR-006` and `docs/specs/director-services-products-catalog.md`. It follows BMAD: Analyze the existing local-state model, Discuss/resolve catalog ownership and labels, Plan atomic changes, Execute only after approval, then Verify scoring neutrality and metadata persistence.

### DSP-001: Add Director Field to Survey Form

**Description:** Add Director as survey metadata in the Section 1 assessment context form. The field should display the Director associated with the selected Tribe and should be treated as read-only derived metadata unless a future requirement approves manual override.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/logic/assessmentTarget.js`
- `docs/architecture/DATA-MODEL.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- `initialForm` includes `director` initialized to `""` if UI or output reads it directly.
- Survey metadata step shows a Director field.
- Director field is populated from Tribe selection, not typed freely by default.
- Empty Tribe results in empty Director or a clearly neutral placeholder.
- First render has no undefined-field or uncontrolled-input warnings.

**Validation Steps:**

- Confirm `director` exists in `initialForm` before any component references it.
- Manually load survey metadata step with no Tribe selected.
- Select each approved Tribe and confirm Director display updates.
- Run lint/build during implementation verification.

**Dependencies:** DSP-003.

**Risk Level:** Medium.

---

### DSP-002: Add Service/Product Field to Survey Form

**Description:** Ensure Service/Product appears as survey metadata and is compatible with Tribe-scoped option filtering. The existing flat `serviceProduct` field should be preserved or migrated safely into the tribe-filtered model.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/logic/assessmentTarget.js`
- `docs/architecture/DATA-MODEL.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- `initialForm.serviceProduct` remains initialized to `""`.
- Survey metadata step includes a Service/Product select.
- Service/Product options are sourced from the catalog selected in DSP-005.
- Service/Product remains optional unless stakeholders later mark it required.
- Existing assessments without `serviceProduct` remain valid.

**Validation Steps:**

- Confirm `serviceProduct` exists in `initialForm`.
- Confirm Service/Product select renders when no Tribe is selected.
- Confirm legacy/empty `serviceProduct` values do not break output preparation.
- Run lint/build during implementation verification.

**Dependencies:** DSP-005.

**Risk Level:** Low.

---

### DSP-003: Implement Tribe-to-Director Mapping

**Description:** Create the approved Tribe-to-Director mapping as local reference data and expose a helper or constant that the form and output helpers can use consistently.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- Possible new file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/logic/assessmentTarget.js`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- Mapping includes:
  - `Client Services Tribe` -> `Andrey Brenes`
  - `Automation Tribe` -> `Jonathan Herrera`
  - `Infrastructure Tribe` -> `Fernando Golcher`
  - `Development Tribe` -> `Laura Monge`
  - `Implementations Tribe` -> `Harold Castillo`
  - `Professional Services` -> `Adrian Duarte`
- Mapping uses canonical Tribe labels consistently with the rendered Tribe options.
- Unknown/legacy Tribe values return `""` or a documented fallback.
- Director derivation is deterministic and does not require a network call.

**Validation Steps:**

- Add unit coverage for every approved Tribe mapping.
- Add a test for unknown/empty Tribe behavior.
- Search for stale Tribe labels that conflict with the approved mapping.
- Confirm ADR-004 remains valid: no API/backend dependency added.

**Dependencies:** DSP-011 open question on canonical Tribe labels should be resolved before implementation.

**Risk Level:** High.

---

### DSP-004: Implement Tribe-Based Services/Products Filtering

**Description:** Filter Service/Product options using the selected Tribe. Changing Tribe should clear the selected Service/Product when the old selection is not valid for the new Tribe.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- Possible new file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/components/FormSelect.jsx` only if current select behavior cannot support filtered options
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- Service/Product options shown in the form are filtered by selected Tribe.
- No Tribe selected yields an approved behavior: empty list, disabled select, or documented fallback.
- Tribe change clears `serviceProduct` if the current value is invalid for the new Tribe.
- Filtering is local and deterministic.
- Filtering does not alter `aiUsage`, `currentSection`, `recommendedLevel`, or domain activation.

**Validation Steps:**

- Manually select Tribe A, choose a Service/Product, switch to Tribe B, and confirm invalid selection clears.
- Add unit/helper tests for filtering by Tribe.
- Add regression test confirming filtering does not change scoring outputs.
- Run lint/build during implementation verification.

**Dependencies:** DSP-005 and DSP-006.

**Risk Level:** High.

---

### DSP-005: Add Catalog Source for Services/Products

**Description:** Define the source of truth for Director and Services/Products catalog data. For v1, use static frontend reference data to preserve local-only architecture.

**Role Responsible:** Architect, then Developer

**Files/modules likely affected:**

- `docs/specs/director-services-products-catalog.md`
- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`
- `front-end/src/data/formConfig.js`
- Possible new file: `front-end/src/data/organizationCatalog.js`
- `docs/adr/ADR-004-local-state-no-backend.md` only if backend/API source is chosen

**Acceptance Criteria:**

- Catalog source is documented as static local frontend reference data for v1, unless a new ADR approves otherwise.
- Catalog structure supports Tribe, Director, and Services/Products per Tribe.
- Catalog source has a documented fallback for unknown/unlisted services/products.
- No `fetch`, `axios`, SDK, database, or external integration is introduced under the v1 path.

**Validation Steps:**

- Review ADR-004 compliance.
- Search code for network calls after implementation.
- Confirm docs/specs identify the catalog owner or mark ownership as an open question.
- Confirm catalog source supports future backend migration without changing scoring logic.

**Dependencies:** Business catalog ownership and source decision.

**Risk Level:** Medium.

---

### DSP-006: Seed Services/Products Data by Tribe

**Description:** Seed the static catalog with the provided business Services/Products list grouped by Tribe. Do not invent catalog entries.

**Role Responsible:** Developer, after Architect confirms source data

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- Possible new file: `front-end/src/data/organizationCatalog.js`
- `docs/specs/director-services-products-catalog.md`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- Every approved Tribe has a Services/Products array.
- The seeded catalog matches the provided business list exactly.
- Duplicate Service/Product values within a Tribe are removed or flagged before implementation.
- Each Tribe has an approved fallback such as `Unlisted / Not sure` if stakeholders want one.
- Catalog values are not used by scoring or branch routing.

**Validation Steps:**

- Compare seeded values against the supplied business list.
- Add a catalog integrity test for duplicate values and missing Tribe entries.
- Confirm every Tribe in Director mapping has a catalog entry.
- Confirm no catalog values appear in `maturity.js`.

**Dependencies:** Full Services/Products list per Tribe must be provided.

**Risk Level:** High.

---

### DSP-007: Persist Director and Service/Product in Survey Data Model

**Description:** Ensure Director and Service/Product are carried through the in-memory survey data model and prepared output metadata.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `front-end/src/logic/assessmentTarget.js`
- `front-end/src/logic/assessmentOutput.js`
- `front-end/src/App.jsx` only if update logic needs to derive multiple fields on Tribe change
- `docs/architecture/DATA-MODEL.md`

**Acceptance Criteria:**

- `director` and `serviceProduct` are present in form state or deterministically derived into output metadata.
- `prepareAssessmentOutput()` includes Director and Service/Product under metadata/details, not scored answers.
- `getAssessmentTarget()` includes Director and Service/Product if assessment target metadata displays them.
- Legacy records without Director or Service/Product remain compatible.
- No database persistence is introduced for v1.

**Validation Steps:**

- Add tests for output metadata containing Director and Service/Product.
- Add tests for legacy forms missing these fields.
- Confirm `diagnosticAnswers` does not include Director or Service/Product.
- Run lint/build/tests during implementation verification.

**Dependencies:** DSP-001, DSP-002, DSP-003, DSP-006.

**Risk Level:** Medium.

---

### DSP-008: Update View/Edit/Output Screens

**Description:** Display Director and Service/Product wherever survey metadata is viewed, edited, or prepared for output/details. This includes the metadata form, current assessment display surfaces, and output preparation.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/views/SurveyView.jsx`
- `front-end/src/views/DashboardView.jsx`
- `front-end/src/components/ClassificationCard.jsx`
- `front-end/src/logic/assessmentOutput.js`
- `docs/architecture/COMPONENT-MAP.md`
- `docs/logic/SURVEY-FLOW.md`

**Acceptance Criteria:**

- Metadata form shows Director and Service/Product.
- Current assessment/details displays show Director and Service/Product where space and context permit.
- Prepared output includes Director and Service/Product metadata if applicable.
- Display labels do not imply Director or Service/Product are maturity inputs.
- Empty metadata values render gracefully.

**Validation Steps:**

- Manual walkthrough of Survey view metadata step.
- Manual walkthrough of Dashboard current assessment card.
- Inspect prepared output object in unit tests.
- Run lint/build during implementation verification.

**Dependencies:** DSP-007.

**Risk Level:** Medium.

---

### DSP-009: Ensure Director and Service/Product Do Not Affect Scoring or Classification

**Description:** Protect maturity logic so Director and Service/Product remain metadata only and cannot affect branching, scoring, classification, domain activation, or derived output values.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.js`
- `front-end/src/logic/assessmentOutput.js`
- `front-end/src/logic/maturity.test.mjs`
- `docs/logic/BRANCHING-LOGIC.md`
- `.ace/knowledge/business-rules.md`

**Acceptance Criteria:**

- `getCurrentSection()` does not read Director or Service/Product.
- `calculateLevel()` does not read Director or Service/Product.
- `computeDomainActive()` does not read Director or Service/Product.
- Changing only Director and/or Service/Product leaves `currentSection`, `recommendedLevel`, classification display, and domain activation unchanged.
- Output derived values are unchanged by Director or Service/Product changes except metadata fields.

**Validation Steps:**

- Add unit tests comparing baseline form vs forms with different Director/ServiceProduct metadata.
- Search `maturity.js` for `director` and `serviceProduct`; expected result is no scoring reads.
- Confirm `assessmentOutput.js` includes these fields only in metadata/target context.
- Run full available test command and lint/build.

**Dependencies:** DSP-007 and DSP-008.

**Risk Level:** High.

---

### DSP-010: Add Tests and Regression Coverage

**Description:** Add focused regression coverage for Director mapping, Tribe-filtered Services/Products, persistence/output, and scoring neutrality.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.test.mjs`
- Possible new test file: `front-end/src/data/organizationCatalog.test.mjs`
- `front-end/package.json` only if test command wiring changes
- `docs/planning/walkthrough.md`
- `docs/rca/regression-guards.yaml` only if a regression is found

**Acceptance Criteria:**

- Tests cover all approved Tribe-to-Director mappings.
- Tests cover Service/Product filtering for at least two Tribes.
- Tests cover invalid Service/Product clearing on Tribe change if implemented as helper logic.
- Tests cover prepared output metadata for Director and Service/Product.
- Tests cover scoring/classification neutrality.
- Tests cover legacy form compatibility.

**Validation Steps:**

- Run unit tests.
- Run lint/build.
- Document any deferred E2E coverage in walkthrough or ACTIVE_CONTEXT.
- If a regression is discovered, create RCA and guard entry per ACE process.

**Dependencies:** DSP-003 through DSP-009.

**Risk Level:** Medium.

---

### DSP-011: Update ACTIVE_CONTEXT and Documentation

**Description:** Update handoff documentation after implementation and verification so future ACE sessions know the exact Director/catalog state, residual gaps, and validation evidence.

**Role Responsible:** Architect, Developer for code-adjacent docs, QA Engineer for verification docs

**Files/modules likely affected:**

- `docs/context/ACTIVE_CONTEXT.md`
- `docs/context/PROJECT_CONTEXT.md`
- `docs/specs/director-services-products-catalog.md`
- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`
- `docs/architecture/DATA-MODEL.md`
- `docs/architecture/COMPONENT-MAP.md`
- `docs/logic/BRANCHING-LOGIC.md`
- `docs/logic/SURVEY-FLOW.md`
- `docs/planning/walkthrough.md`
- `.ace/knowledge/business-rules.md`
- `.ace/knowledge/entities.md`

**Acceptance Criteria:**

- `ACTIVE_CONTEXT.md` states whether Director and Tribe-filtered Services/Products are implemented, verified, or blocked.
- Spec includes final catalog source and any unresolved catalog ownership questions.
- Data model docs show Director and Service/Product metadata behavior.
- Branching logic docs explicitly state Director and Service/Product are not logic inputs.
- Walkthrough records validation evidence or deferred verification.

**Validation Steps:**

- Search docs for stale references to flat-only `serviceProductOptions[]`.
- Search docs for missing Director metadata references.
- Confirm docs match implemented behavior and tests.
- Confirm no docs imply backend/database changes for v1 unless ADR-004 changes.

**Dependencies:** DSP-001 through DSP-010.

**Risk Level:** Low.

---

## 4B. Frontend-Only Director and Services/Products Plan

This section is the active implementation plan for the frontend-only Director and Services/Products request. It supersedes any older Director/Services task wording that implies database changes, Supabase work, migrations, backend persistence, API catalog loading, or generated-output changes. The implementation must preserve ADR-004 local React state only.

BMAD framing:

- **Analyze:** Existing survey metadata is local state in `App.jsx`, initialized by `initialForm` in `formConfig.js`, and rendered in `SurveyView.jsx`. Scoring/classification live in `logic/maturity.js`.
- **Discuss:** Resolve canonical Tribe labels and obtain the complete Services/Products business list before execution.
- **Plan:** Add static frontend catalog data, derive Director from Tribe, filter Service/Product options locally, and protect maturity logic.
- **Execute:** Developer performs atomic frontend/config changes only after this plan is accepted.
- **Verify:** QA confirms mapping, filtering, invalid-selection clearing, and scoring/classification neutrality.

### FODSP-001: Create Static Tribe-to-Director Catalog

**Description:** Create a local frontend catalog/config source for the approved Tribe-to-Director mapping. This should be deterministic reference data with no network, backend, database, or Supabase dependency.

**Role Responsible:** Developer

**Files/modules likely affected:**

- New recommended file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/data/formConfig.js`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- Catalog includes the approved mapping:
  - `Client Services Tribe` -> `Andrey Brenes`
  - `Automation Tribe` -> `Jonathan Herrera`
  - `Infrastructure Tribe` -> `Fernando Golcher`
  - `Development Tribe` -> `Laura Monge`
  - `Implementations Tribe` -> `Harold Castillo`
  - `Professional Services` -> `Adrian Duarte`
- Catalog exports a stable helper such as `getDirectorForTribe(tribe)`.
- Empty or unknown Tribe returns `""` or another documented neutral fallback.
- No `fetch`, SDK, Supabase client, migration, or backend call is introduced.

**Validation Steps:**

- Add unit tests for every approved Tribe mapping.
- Add unit tests for empty/unknown Tribe behavior.
- Search implementation for `fetch`, `axios`, `supabase`, and migration/schema changes; expected result is none for this feature.

**Dependencies:** Canonical Tribe labels must be confirmed before final implementation.

**Risk Level:** High, because current code and docs use conflicting Tribe labels.

---

### FODSP-002: Create Static Services/Products Catalog Grouped by Tribe

**Description:** Create static frontend reference data containing Services/Products grouped by canonical Tribe. The catalog must be seeded from the supplied business list and must not invent entries.

**Role Responsible:** Developer, after Architect confirms source data

**Files/modules likely affected:**

- New recommended file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/data/formConfig.js`
- `front-end/src/logic/maturity.test.mjs`
- `docs/specs/director-services-products-catalog.md`

**Acceptance Criteria:**

- Each approved Tribe has a `servicesProducts` array.
- The seeded values match the provided business list exactly.
- Catalog exposes a helper such as `getServiceProductsForTribe(tribe)`.
- Catalog exposes or supports validation of whether a selected Service/Product belongs to the selected Tribe.
- Catalog remains static frontend data only.

**Validation Steps:**

- Compare seeded catalog values against the supplied business list.
- Add catalog integrity tests for missing Tribe entries and duplicate values within each Tribe.
- Confirm every Tribe in the Director mapping has a Services/Products catalog entry.
- Confirm no catalog data appears in scoring or branching files.

**Dependencies:** Complete Services/Products list grouped by Tribe.

**Risk Level:** High, because the business catalog is not currently present in the repository context.

---

### FODSP-003: Add Director Field to Survey Form State and UI

**Description:** Add Director as read-only derived survey context. Director should be displayed in the metadata step after or near Tribe selection and populated from the selected Tribe.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `front-end/src/views/SurveyView.jsx`
- `front-end/src/App.jsx`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- `initialForm` includes `director: ""` before any component reads it.
- Survey metadata step displays Director.
- Director is read-only or otherwise clearly derived from Tribe.
- Empty Tribe results in empty Director or a neutral placeholder.
- Director does not become a required routing, scoring, or classification input.

**Validation Steps:**

- Manual smoke: load form with no Tribe selected and verify no uncontrolled-input warning.
- Manual smoke: select each Tribe and verify Director updates.
- Unit test: changing Director alone does not change `getCurrentSection()`, `calculateLevel()`, or `computeDomainActive()`.

**Dependencies:** FODSP-001.

**Risk Level:** Medium.

---

### FODSP-004: Add or Preserve Service/Product Field in Survey Form

**Description:** Preserve the existing `serviceProduct` form field and update the survey UI so Service/Product options come from the Tribe-scoped catalog instead of the current flat global list.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/data/formConfig.js`
- `front-end/src/views/SurveyView.jsx`
- New recommended file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- `initialForm.serviceProduct` remains initialized to `""`.
- Survey metadata step includes the Service/Product select.
- Options are loaded from the static frontend catalog for the selected Tribe.
- When no Tribe is selected, the select uses an approved behavior: disabled, empty, or neutral placeholder.
- Service/Product remains optional unless a later requirement makes it mandatory.

**Validation Steps:**

- Manual smoke: verify Service/Product select renders with no Tribe selected.
- Manual smoke: select a Tribe and verify options populate from that Tribe.
- Unit test: Service/Product selection remains local form metadata and does not affect maturity logic.

**Dependencies:** FODSP-002.

**Risk Level:** Medium.

---

### FODSP-005: Implement Tribe Change Behavior

**Description:** Centralize Tribe update behavior so selecting a Tribe updates Director, refreshes available Service/Product options, and clears the selected Service/Product if it is invalid for the new Tribe.

**Role Responsible:** Developer

**Files/modules likely affected:**

- `front-end/src/App.jsx`
- `front-end/src/views/SurveyView.jsx`
- New recommended file: `front-end/src/data/organizationCatalog.js`
- `front-end/src/logic/maturity.test.mjs`

**Acceptance Criteria:**

- Changing Tribe updates `form.tribe`.
- Changing Tribe updates `form.director` from the catalog.
- Changing Tribe refreshes the Service/Product option list in the survey UI.
- Existing `form.serviceProduct` is preserved only if it is valid for the newly selected Tribe.
- Existing `form.serviceProduct` is cleared when invalid for the newly selected Tribe.
- Behavior is implemented locally without backend persistence.

**Validation Steps:**

- Manual smoke: select Tribe A, choose a Service/Product, switch to Tribe B with no matching option, and confirm selection clears.
- Manual smoke: switch between Tribes and confirm Director updates each time.
- Unit/helper test: invalid Service/Product clearing behavior.
- Unit/helper test: valid Service/Product preservation behavior, if applicable.

**Dependencies:** FODSP-001, FODSP-002, FODSP-003, and FODSP-004.

**Risk Level:** High, because the behavior touches shared form update flow.

---

### FODSP-006: Ensure Director and Service/Product Are Excluded from Scoring and Classification

**Description:** Protect maturity logic so Director and Service/Product remain survey context only. This task should avoid changing `maturity.js` unless a test reveals an existing violation.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.js`
- `front-end/src/logic/assessmentOutput.js`
- `front-end/src/logic/assessmentTarget.js`
- `front-end/src/logic/maturity.test.mjs`
- `docs/logic/BRANCHING-LOGIC.md`

**Acceptance Criteria:**

- `getCurrentSection()` does not read `director` or `serviceProduct`.
- `calculateLevel()` does not read `director` or `serviceProduct`.
- `computeDomainActive()` does not read `director` or `serviceProduct`.
- Changing only Director and/or Service/Product does not change current section, recommended level, classification display, domain activation, or derived output values.
- Director and Service/Product are not added to scored diagnostic answers.
- No output-generation logic uses Director or Service/Product to compute recommendations, maturity, branch routing, or generated text.

**Validation Steps:**

- Add regression tests comparing baseline form state against forms with only Director/Service/Product changed.
- Search `front-end/src/logic/maturity.js` for `director` and `serviceProduct`; expected result is no scoring reads.
- Inspect `assessmentOutput.js` to ensure any metadata handling does not feed derived output values.
- Run lint/build/tests during execution verification.

**Dependencies:** FODSP-003 through FODSP-005.

**Risk Level:** High.

---

### FODSP-007: Add Frontend Tests

**Description:** Add focused frontend/unit coverage for catalog mapping, Tribe-filtered Services/Products, Tribe-change clearing behavior, and scoring/classification neutrality.

**Role Responsible:** Developer, then QA Engineer

**Files/modules likely affected:**

- `front-end/src/logic/maturity.test.mjs`
- Possible new test file: `front-end/src/data/organizationCatalog.test.mjs`
- `front-end/package.json` only if adding a script for an already-local test command

**Acceptance Criteria:**

- Tests cover all approved Tribe-to-Director mappings.
- Tests cover Service/Product filtering for at least two Tribes.
- Tests cover empty/unknown Tribe behavior.
- Tests cover invalid Service/Product clearing on Tribe change.
- Tests cover Director and Service/Product neutrality for `getCurrentSection()`, `calculateLevel()`, and `computeDomainActive()`.
- Tests do not require a backend, database, network, or Supabase.

**Validation Steps:**

- Run the existing unit test command or direct Node test command used by the project.
- Run `npm run lint`.
- Run `npm run build`.
- Document any missing E2E coverage as deferred if not added in this frontend-only slice.

**Dependencies:** FODSP-001 through FODSP-006.

**Risk Level:** Medium.

---

### FODSP-008: Update Documentation and ACTIVE_CONTEXT

**Description:** Update project documentation after implementation so future ACE sessions understand the final frontend-only catalog architecture, what was intentionally excluded, and any remaining catalog data gaps.

**Role Responsible:** Architect, Developer for implementation-adjacent docs, QA Engineer for verification notes

**Files/modules likely affected:**

- `docs/context/ACTIVE_CONTEXT.md`
- `docs/specs/director-services-products-catalog.md`
- `docs/planning/implementation_plan.md`
- `.ace/knowledge/business-rules.md`
- `.ace/knowledge/entities.md`
- `docs/logic/BRANCHING-LOGIC.md`
- `docs/logic/SURVEY-FLOW.md`
- `docs/planning/walkthrough.md` if QA verification is performed

**Acceptance Criteria:**

- `ACTIVE_CONTEXT.md` states whether Director and Tribe-filtered Services/Products are implemented, verified, or blocked.
- Docs state that the implementation is frontend-only/local-state only.
- Docs explicitly state no database changes, migrations, Supabase changes, API catalog calls, or backend persistence were added.
- Docs state Director and Service/Product are excluded from scoring, classification, branching, domain activation, and output generation.
- Open questions remain visible if canonical Tribe labels or full Services/Products catalog data are not resolved.

**Validation Steps:**

- Search docs for stale claims that a backend, database, or Supabase catalog is required for this slice.
- Search docs for stale references to flat-only `serviceProductOptions[]`.
- Confirm `ACTIVE_CONTEXT.md` reflects final verification status.
- Confirm no implementation docs imply Director or Service/Product are maturity inputs.

**Dependencies:** FODSP-001 through FODSP-007.

**Risk Level:** Low.

---

## 5. Dependency Order

1. Tasks 1-2: Decisions and ADRs.
2. Tasks 3-4: Form model and metadata UI.
3. Tasks 5-7: Notes and Not Applicable form behavior.
4. Tasks 8-9: Scoring/classification/domain/dashboard semantics.
5. Tasks 10-12: Output, schema, and API/service decisions.
6. Tasks 13-14: Tests and regression coverage.
7. Tasks 15-16: Documentation, active context, verification, and handoff.
8. FODSP-001 through FODSP-008: Active frontend-only Director and Services/Products sequence. This supersedes older DSP wording wherever the older wording implies database, Supabase, backend persistence, API catalog loading, or generated-output changes.

---

## 6. Validation Command Plan

Exact commands may be adjusted to the package scripts available at execution time.

- `npm install` only if dependencies are missing and approved.
- `npm run lint`
- `npm run build`
- Unit test command to be added if no test runner exists.
- E2E command to be added if Playwright is introduced.

If dependency installation or network access is needed, request approval before running commands that require it.

---

## 7. Regression Coverage Requirements

Minimum regression tests:

- Notes-only changes do not change `currentSection`.
- Notes-only changes do not change `recommendedLevel`.
- Not Applicable does not satisfy scoring thresholds in `calculateLevel()`.
- Multi-select Not Applicable is mutually exclusive with positive options.
- Team scope appears in output/classification context.
- Director and Service/Product selection appear in local form state; any future export/display inclusion must remain metadata-only and must not alter generated or derived output values.
- Director and Service/Product changes do not change `currentSection`, `recommendedLevel`, or domain activation.
- App loads and all AI usage paths render without blank page.

Potential regression guard additions after implementation:

- Guard `front-end/src/logic/maturity.js` to prevent Notes/N/A scoring regressions.
- Guard `front-end/src/data/formConfig.js` and `front-end/src/data/questions.js` for field sync.
- Guard `front-end/src/components/ToggleGrid.jsx` for N/A mutual exclusion behavior.

---

## 8. Out of Scope Unless Approved

- Backend persistence.
- Backend DTO or persistence-layer changes for Director/Service/Product.
- Authentication.
- External Director or Service/Product catalog API.
- Supabase changes.
- New database tables.
- Database migrations for the frontend-only Director and Services/Products slice.
- PDF export.
- Multi-user collaborative assessment.

---

## 9. Open Questions Before Execute

- Should Team be the default `assessmentScope`, or should the user explicitly choose?
- Should Not Applicable count toward completion/progress?
- Should Not Applicable use one universal label or question-specific negative wording?
- Should Notes always be visible or revealed by a Notes control?
- Should Notes be exported under legacy `*Other` field names, renamed `*Notes` fields, or a dedicated `notes` object?
- Who owns the Service/Product catalog and initial list?
- What is the full Services/Products list per Tribe?
- Is Service/Product a single-select, multi-select, or hierarchical selection?
- Should Director remain read-only derived metadata, or can assessors override it?
