# Business Rules — AI Operations Baseline Assessment

> Core business logic and constraints for the AI Operations Baseline Assessment tool.
> These rules are immutable without explicit stakeholder approval.

*Last Updated: 2026-05-14*

---

## Rule Categories

- **Critical** — Must never be violated. Application must enforce at all costs.
- **Standard** — Normal business constraints. May have edge cases requiring approval.
- **Soft** — Guidelines that can be overridden with appropriate authorization.

---

## BR-001: Maturity Level Integrity

- **Priority:** Critical
- **Description:** A process cannot be assigned a maturity level that contradicts the selected AI usage answer. The AI usage selection is the primary and dominant branching signal.
- **Rationale:** If a process has "No AI usage identified" it cannot score at Level 2+. Contradictory data would invalidate executive reports.
- **Enforcement:** `calculateLevel()` in `logic/maturity.js` — base level set by `usageToLevel[form.aiUsage]`. Supplementary signals can only nudge upward by ≤ 2.0 points and are capped at L4.
- **Exceptions:** `maturityOverride` field allows an assessor to manually override the computed level for edge cases.
- **Example:**
  ```
  Valid: aiUsage = "AI is used informally by individuals" → base L1, nudged to L1.5 → recommended L2
  Invalid: aiUsage = "No AI usage identified" → recommended L3 (impossible without override)
  ```

---

## BR-002: Option Set Scoping per Level

- **Priority:** Critical
- **Description:** Question options visible at Level N must not include options that are only appropriate at Level N+1 or above. Each level's `SECTION_QUESTIONS` entry must contain only options calibrated to that level's maturity state.
- **Rationale:** Prevents respondents from selecting answers inconsistent with their detected level, eliminating logical contradictions in the output data.
- **Enforcement:** Each entry in `SECTION_QUESTIONS[level]` in `questions.js` has a distinct `options` array scoped to that level. No shared option arrays between levels.
- **Exceptions:** None.

---

## BR-003: Domain Coverage at Every Level

- **Priority:** Standard
- **Description:** Each maturity level (L0–L4) must have at least one question per active domain. Currently L0 has questions only in `clientCentric` and `people`; `operatingModel` coverage at L0 is provided by the evidence textarea.
- **Rationale:** The domain matrix must reflect real assessment data, not empty cells.
- **Enforcement:** `SECTION_QUESTIONS` data structure review on PRD updates.
- **Exceptions:** A domain may have zero questions at a given level only if that domain is genuinely irrelevant at that maturity stage (documented explicitly in the PRD).

---

## BR-004: Evidence Field at Every Level

- **Priority:** Standard
- **Description:** Every maturity level (L0–L4) must include a free-text evidence textarea (`evidenceL0` through `evidenceL4`).
- **Rationale:** Qualitative anchoring for quantitative scores is required for executive reporting credibility. An assessor must be able to note what specific observation supports the level assignment.
- **Enforcement:** Each `SECTION_QUESTIONS[level]` array must contain an `evidenceL{N}` textarea entry.
- **Exceptions:** Needs Validation path has `validationContext` instead of `evidenceL{N}`.

---

## BR-005: Tribe Naming Convention

- **Priority:** Standard
- **Description:** The tribe named for AI automation must always be "Intelligent Automation" — never "Intelligent," "AI Tribe," or any other variant.
- **Rationale:** Organizational naming convention set by stakeholder (ADR correction applied in commit `90efd97`).
- **Enforcement:** `tribes` array in `formConfig.js`.
- **Exceptions:** None.

---

## BR-006: No Backend Data Persistence in v1

- **Priority:** Standard
- **Description:** Version 1 of the application must not send assessment data to any external server, API, or analytics service. All data remains in the browser session.
- **Rationale:** Privacy and simplicity for v1 facilitated-assessment use case (ADR-004).
- **Enforcement:** No `fetch`, `axios`, or SDK calls in any component. No cookies, no LocalStorage writes.
- **Exceptions:** JSON export via `URL.createObjectURL` (browser-native, no network call) is permitted.

---

## BR-007: Field Initialization for All Form Fields

- **Priority:** Critical
- **Description:** Every field referenced in any component (`App.jsx`, `SurveyView.jsx`, `maturity.js`, `DomainCards.jsx`) must have a corresponding entry in `initialForm` in `formConfig.js`. String fields initialize to `""`, array fields to `[]`.
- **Rationale:** Accessing `.length` on an undefined field crashes the application (RCA-001). All field references must be safe from initial render.
- **Enforcement:** `initialForm` in `formConfig.js` is the canonical registry of all form fields. Any PR adding a new field reference must also add it to `initialForm`.
- **Exceptions:** None.

---

## BR-008: Approved Questions Only

- **Priority:** Standard
- **Description:** Survey questions, options, and labels must match the approved question set reviewed and validated by stakeholders. New questions must go through a PRD update cycle before implementation.
- **Rationale:** Questions have been tested and approved for measurement accuracy. Unauthorized additions may invalidate comparability between assessments.
- **Enforcement:** Questions defined in `SECTION_QUESTIONS` in `questions.js`. Changes require a new PRD or a PRD amendment.
- **Exceptions:** Minor wording fixes (typos, grammar) can be made without a full PRD cycle if the meaning is preserved.

---

## BR-009: Notes Are Informational Only

- **Priority:** Critical
- **Description:** Free-text Notes fields capture qualitative context only. Notes must never affect maturity scoring, branch routing, classification, domain completion, dashboard aggregation, or recommendation logic.
- **Rationale:** Stakeholders requested replacing "Other" with "Notes" so respondents can add context without changing the assessment result.
- **Enforcement:** `calculateLevel()` and `getCurrentSection()` must not read note fields. Domain completion and dashboard logic must ignore note-only fields unless displaying qualitative context.
- **Exceptions:** Notes may be included in JSON export as unscored context.

---

## BR-010: Not Applicable Must Not Inflate Maturity

- **Priority:** Critical
- **Description:** "Not Applicable" or fully negative diagnostic responses must not increase a maturity score or imply that a quadrant matched the assessed area.
- **Rationale:** Not every framework quadrant applies to every process or team, and that is acceptable.
- **Enforcement:** Scoring and domain indicators must distinguish positive capability evidence from explicit non-applicability.
- **Exceptions:** Product may decide that Not Applicable counts as survey completion while still counting as zero positive maturity evidence.

---

## BR-011: Team-Level Diagnosis Support

- **Priority:** Critical
- **Description:** The assessment model supports a team-level maturity diagnosis. Process-level information may remain as supporting context, but the final maturity result must identify the assessment scope it represents.
- **Rationale:** Stakeholders requested that the baseline work at team level rather than only as a single-process assessment.
- **Enforcement:** `initialForm.assessmentScope` defaults to `Team`. `assessmentTarget` helpers validate Team and Process context, preserve legacy process records, and provide labels for classification, dashboard, and output. Output labels, dashboard labels, and export shape must not imply that every diagnosis is process-only.
- **Exceptions:** Existing v1 process-level assessments remain valid and must continue to be supported.

---

## BR-012: Service/Product Catalog Field

- **Priority:** Standard
- **Description:** The form must include or support a Service/Product metadata field populated from a documented catalog source and filtered by selected Tribe when Tribe-specific catalog data is available.
- **Rationale:** Assessors need to connect the maturity diagnosis to known services/products instead of relying only on free-text process names.
- **Enforcement:** Static catalog configuration in `formConfig.js` or a dedicated frontend catalog data module is the v1 source. Service/Product options must be filtered by selected Tribe. Backend or external catalog access requires a new ADR or ADR-004 update.
- **Exceptions:** A fallback free-text note may be allowed for unknown services/products, but it must not replace the catalog requirement.

---

## BR-013: Director Is Derived Metadata

- **Priority:** Standard
- **Description:** The survey must include a Director field automatically populated from the selected Tribe.
- **Rationale:** Assessments need to carry organizational ownership metadata without requiring assessors to manually maintain Director names.
- **Enforcement:** A canonical Tribe-to-Director mapping must be stored with the survey metadata configuration. Director is derived from `tribe`, saved with the survey, and shown in view/edit/output details where metadata appears.
- **Exceptions:** Manual Director override is not allowed unless a future requirement and ADR explicitly approve it.

Approved mapping:

| Tribe | Director |
|-------|----------|
| Client Services Tribe | Andrey Brenes |
| Automation Tribe | Jonathan Herrera |
| Infrastructure Tribe | Fernando Golcher |
| Development Tribe | Laura Monge |
| Implementations Tribe | Harold Castillo |
| Professional Services | Adrian Duarte |

---

## BR-014: Director and Service/Product Do Not Affect Maturity Logic

- **Priority:** Critical
- **Description:** Director and Service/Product are metadata only. They must never affect scoring, maturity classification, branch routing, domain activation, recommendation logic, or generated/derived output values.
- **Rationale:** Organizational ownership and service/product context should make the assessment easier to attribute, but must not change the maturity model.
- **Enforcement:** `getCurrentSection()`, `calculateLevel()`, and `computeDomainActive()` must not read `director` or `serviceProduct`. Output helpers may include these fields only in metadata/details sections.
- **Exceptions:** None.

---

## Rule Validation Checklist

When implementing features touching form fields or scoring:

```
- [ ] All new field names added to initialForm in formConfig.js
- [ ] All domainActive references use fields that exist in initialForm
- [ ] All calculateLevel references use fields that exist in initialForm
- [ ] Option arrays scoped to the correct maturity level
- [ ] Evidence textarea present at the level being modified
- [ ] Notes fields are ignored by scoring, branching, classification, completion, dashboard aggregation, and recommendations
- [ ] Not Applicable / negative options do not increase maturity
- [ ] Team/process assessment scope is present when output is generated
- [ ] Team-level assessments do not require process-specific fields unless process scope is selected
- [ ] Legacy process-level records without `assessmentScope` remain compatible
- [ ] Service/Product value comes from `serviceProductOptions` or documented fallback
- [ ] Director field exists in `initialForm` if referenced by UI or output
- [ ] Director is derived from selected Tribe through the approved mapping
- [ ] Service/Product options are filtered by selected Tribe
- [ ] Director and Service/Product are ignored by scoring, branching, classification, domain activation, and recommendations
- [ ] Build passes with zero lint errors
```

---

## Cross-References

- `.ace/standards/security.md` — security-related rules
- `docs/adr/` — architectural decisions related to these rules
- `docs/rca/RCA-001-blank-page-crash.md` — BR-007 violation incident
- `src/data/formConfig.js` — field registry (initialForm)
- `src/data/questions.js` — approved question sets (SECTION_QUESTIONS)
