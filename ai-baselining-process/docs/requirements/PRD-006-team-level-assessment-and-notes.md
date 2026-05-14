# PRD-006: Team-Level Assessment, Notes, and Service/Product Catalog

**Status:** Proposed
**Version:** 0.3
**Created:** 2026-05-13
**Last Updated:** 2026-05-13
**Author:** Architect
**Source:** Meeting notes / Don Fran requested improvements

---

## 1. Overview

PRD-006 captures the next stakeholder requirements for the AI Operations Baseline Assessment. The current v1 assessment is process-oriented and uses level-specific diagnostic questions grouped by the three-domain framework. The next iteration must support explicit non-applicability, rename "Other" to "Notes", keep notes informational only, support team-level maturity diagnosis, and add a Director and tribe-filtered Service/Product catalog experience.

This PRD is documentation and planning scope only. It does not authorize code changes until the implementation plan is accepted.

---

## 2. Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| PRD6-FR-001 | Diagnostic questions must allow a "Not Applicable" or fully negative response so users can indicate that a maturity indicator does not apply. | Must | Proposed |
| PRD6-FR-002 | The current "Other" option must be renamed to "Notes". | Must | Proposed |
| PRD6-FR-003 | "Notes" must be informational only and must not affect scoring, recommended classification, branching logic, output generation, or maturity level. | Must | Proposed |
| PRD6-FR-004 | The assessment model must support team-level evaluation. Process-level information may remain as supporting context, but the final maturity diagnosis should be able to represent the team. | Must | Proposed |
| PRD6-FR-005 | The form must include or support a preloaded Service/Product field, allowing users to select existing services/products from a catalog. | Must | Proposed |
| PRD6-FR-006 | The form must include Director and tribe-filtered Service/Product metadata, derived from the selected Tribe where applicable, without affecting maturity logic. | Must | Proposed |

---

## 3. Functional Details and Acceptance Criteria

### PRD6-FR-001: Not Applicable / Fully Negative Responses

Diagnostic questions must allow the respondent to indicate that a maturity indicator does not apply to the assessed team or process. This can be represented by a standard "Not Applicable" option or by question-specific fully negative wording where that is clearer.

Implementation expectations:

- Applies to maturity diagnostic questions across the three domains.
- Applies to select and multi-select/toggle question types where non-applicability is meaningful.
- For multi-select questions, Not Applicable should be mutually exclusive with positive maturity evidence unless a documented exception is approved.
- Not Applicable must not increase maturity or satisfy positive-evidence thresholds.

Acceptance criteria:

- [ ] Each diagnostic question set has either a Not Applicable option, a fully negative option, or documented rationale for not needing one.
- [ ] Selecting Not Applicable or a fully negative option does not increase `calculateLevel()` output.
- [ ] Selecting Not Applicable on a multi-select question removes conflicting positive selections or prevents them from coexisting.
- [ ] Domain progress can distinguish "answered as not applicable" from "positive maturity evidence present".
- [ ] Tests cover at least one scoring field where Not Applicable would otherwise inflate an array-length threshold.

### PRD6-FR-002: Rename Other to Notes

The current "Other" option and related user-facing copy must be renamed to "Notes". The purpose is to capture context, caveats, or assessor comments without implying an additional scored answer.

Implementation expectations:

- User-facing labels, placeholders, and helper text should say "Notes" rather than "Other".
- Existing internal `*Other` or `otherField` names may remain temporarily only if implementation risk is lower, but they must be treated semantically as notes.
- Future data-model naming should prefer `*Notes` or a dedicated notes structure.

Acceptance criteria:

- [ ] "Other" no longer appears in the rendered diagnostic question UI as an answer option for notes.
- [ ] The free-text note field uses "Notes" terminology in labels and placeholders.
- [ ] Existing notes are stored separately from scored answer selections.
- [ ] Documentation maps any temporary `*Other` internal fields to Notes semantics.

### PRD6-FR-003: Notes Are Informational Only

Notes must not affect any derived assessment result. Notes may be displayed or exported as qualitative context, but they must not influence scoring, recommended classification, branching, maturity level, dashboard aggregation, or other formal output values.

Implementation expectations:

- `calculateLevel()` must ignore note fields.
- `getCurrentSection()` must ignore note fields.
- Recommended classification must not change when only notes change.
- Dashboard metrics and domain completion/activation must not treat notes as positive maturity evidence.
- Export may include notes as unscored context only; generated summaries or derived output fields must not be computed from notes.

Acceptance criteria:

- [ ] Changing only Notes fields leaves `recommendedLevel` unchanged.
- [ ] Changing only Notes fields leaves `currentSection` unchanged.
- [ ] Changing only Notes fields does not activate a domain, subcategory, score, or maturity indicator.
- [ ] Generated/exported derived fields exclude Notes from scoring and classification logic.
- [ ] Tests verify that Notes are ignored by scoring and branching.

### PRD6-FR-004: Team-Level Assessment Support

The assessment model must support team-level evaluation. Process-level information can remain as supporting context, but the final maturity diagnosis must be able to represent a team rather than only a single process.

Implementation expectations:

- Add or model an `assessmentScope` concept, with at least `Team` and `Process` as supported scopes.
- Team-level metadata should include team name and relevant manager/SME context.
- Process-level fields should remain available as optional supporting context for team assessments.
- Question wording and output labels must not assume that the target is always one process.
- The final maturity result must be attributable to the selected assessment scope.

Acceptance criteria:

- [ ] The model can represent a team-level assessment target.
- [ ] The final maturity diagnosis clearly identifies whether it applies to a team or a process.
- [ ] Process context can be captured without forcing the final result to be process-level.
- [ ] Export shape includes assessment scope and team metadata when applicable.
- [ ] Dashboard and classification labels can display team-level results without misleading process-only language.
- [ ] Any architectural decision about process-only versus scope-aware modeling is documented in an ADR before implementation.

### PRD6-FR-005: Preloaded Service/Product Catalog Field

The form must include or support a preloaded Service/Product field so users can select existing services or products from a catalog.

Implementation expectations:

- The Service/Product field belongs in metadata.
- The field should support predefined values from a catalog.
- For v1 local-state mode, a static catalog in form configuration is acceptable.
- If the catalog must come from a backend or external system, that change must be documented because it affects ADR-004 local-only architecture.

Acceptance criteria:

- [ ] The requirements define where Service/Product appears in the form.
- [ ] The selected Service/Product is included in the form state and export shape.
- [ ] A catalog source is documented: static config, import file, backend-managed catalog, or external integration.
- [ ] The implementation path preserves ADR-004 local-only constraints unless a new ADR approves an API/backend dependency.
- [ ] Empty, unknown, or unavailable catalog values have a defined fallback behavior.

### PRD6-FR-006: Director and Services/Products Catalog

The survey must capture Director and Service/Product metadata so each assessment can be associated with the appropriate organizational ownership and service/product context.

Implementation expectations:

- The survey must include a Director field.
- The survey must include a Service/Product field.
- Director must be automatically populated based on the selected Tribe.
- Services/Products must be filtered based on the selected Tribe.
- Director and Service/Product must be saved with the survey.
- Director and Service/Product must be shown when viewing or editing a survey.
- Director and Service/Product must be shown in survey output/details if applicable.
- Director and Service/Product must not affect scoring, maturity classification, branching logic, or generated/derived output values.
- The Services/Products catalog must be seeded from the provided Tribe/Director/Services-Products business list. The Director mapping below is approved; the Service/Product values per Tribe must be supplied or confirmed before implementation.

Director mapping:

| Tribe | Director |
|-------|----------|
| Client Services Tribe | Andrey Brenes |
| Automation Tribe | Jonathan Herrera |
| Infrastructure Tribe | Fernando Golcher |
| Development Tribe | Laura Monge |
| Implementations Tribe | Harold Castillo |
| Professional Services | Adrian Duarte |

Acceptance criteria:

- [ ] Selecting a Tribe auto-populates the Director field with the mapped Director.
- [ ] Director is displayed as derived/read-only metadata unless a future requirement explicitly allows overrides.
- [ ] Service/Product options are filtered to the selected Tribe.
- [ ] Changing Tribe clears or invalidates a previously selected Service/Product if it does not belong to the new Tribe.
- [ ] Director and Service/Product are included in form state and prepared survey output metadata.
- [ ] Director and Service/Product are visible in view/edit/details surfaces where assessment metadata is displayed.
- [ ] Director and Service/Product are not read by `getCurrentSection()`, `calculateLevel()`, or `computeDomainActive()`.
- [ ] Tests verify that changing Director or Service/Product does not change branch routing, recommended maturity, classification, or domain activation.
- [ ] No backend, API, or database dependency is introduced unless ADR-004 is updated or superseded.

---

## 4. Affected Areas

| Area | Files / Modules | Impact |
|------|-----------------|--------|
| Requirements | `docs/requirements/PRD-005-client-centric-framework.md`, this PRD | PRD-006 amends the next scope for assessment semantics and metadata. |
| Domain model | `.ace/knowledge/entities.md`, `docs/architecture/DATA-MODEL.md` | Process-only entity must be generalized or supplemented for team-level assessment. |
| Business rules | `.ace/knowledge/business-rules.md` | Add rules for Notes, Not Applicable, team-level diagnosis, and Service/Product catalog behavior. |
| Form state/options | `front-end/src/data/formConfig.js` | Add `assessmentScope`, team metadata, `director`, `serviceProduct`, Director mapping, and tribe-filtered catalog options. |
| Question config | `front-end/src/data/questions.js` | Add Not Applicable / negative responses and replace user-facing Other semantics with Notes. |
| UI components | `FormSelect.jsx`, `ToggleGrid.jsx`, `SurveyView.jsx`, `NeedsValidation.jsx` | Notes behavior, Not Applicable handling, metadata rendering, and scope-aware labels. |
| Scoring/branching | `front-end/src/logic/maturity.js` | Exclude Notes and Not Applicable from positive scoring evidence. |
| Domain indicators | `DomainCards.jsx`, `App.jsx` domain completion logic | Distinguish not-applicable answers from positive maturity evidence. |
| Dashboard/export | `DashboardView.jsx`, `ClassificationCard.jsx`, future export code in `App.jsx` or helper | Include scope, Director, and Service/Product; keep notes qualitative only. |
| Tests | future unit/E2E tests | Add regression tests for Notes, Not Applicable, and scope behavior. |

---

## 5. Backlog Additions

- Add Not Applicable / negative response handling across diagnostic question sets.
- Rename user-facing Other copy to Notes.
- Separate Notes storage from scored answer selections.
- Update scoring helpers to count only positive maturity evidence.
- Add team-level assessment metadata and scope-aware labels.
- Add Director and tribe-filtered Service/Product catalog fields and source-of-truth documentation.
- Add unit and smoke tests for Notes, Not Applicable, team scope, and catalog metadata.

---

## 6. ADR Candidates

- ADR: Scope-aware assessment model: process-only versus team/process assessment target.
- ADR: Notes and Not Applicable semantics for scoring, completion, and output.
- ADR: Director and Service/Product catalog source: static local config versus backend/API catalog.
- ADR update: ADR-004 local-state-only, if catalog loading requires a backend/API.

---

## 7. Open Questions

- Should Not Applicable count as completion for a domain/quadrant while contributing zero maturity evidence?
- Should all diagnostic questions use a universal "Not Applicable" label, or should some use tailored negative wording?
- Should Notes be always visible, or revealed through a Notes affordance?
- Should Notes be included in JSON export under renamed fields, existing `*Other` fields, or a dedicated `notes` object?
- Should team-level assessment be the default scope or an explicit selector?
- Who owns and updates the Service/Product catalog?
- What is the complete Service/Product list for each Tribe?
- Are services/products a flat list, hierarchical catalog, or many-to-many relation?
- Should Director remain read-only derived metadata, or can assessors override it?
- What exact Tribe labels should be canonical in the app and output?

---

## 8. Related Documents

- PRD-005: Client-Centric Operational Framework
- ADR-004: Local React State Only - No Backend for v1
- `.ace/knowledge/business-rules.md`
- `.ace/knowledge/entities.md`
- `docs/architecture/DATA-MODEL.md`
- `docs/planning/implementation_plan.md`
- `docs/specs/director-services-products-catalog.md`
