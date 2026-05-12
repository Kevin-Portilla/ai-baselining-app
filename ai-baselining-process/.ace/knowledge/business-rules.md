# Business Rules — AI Operations Baseline Assessment

> Core business logic and constraints for the AI Operations Baseline Assessment tool.
> These rules are immutable without explicit stakeholder approval.

*Last Updated: 2026-05-12*

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

## Rule Validation Checklist

When implementing features touching form fields or scoring:

```
- [ ] All new field names added to initialForm in formConfig.js
- [ ] All domainActive references use fields that exist in initialForm
- [ ] All calculateLevel references use fields that exist in initialForm
- [ ] Option arrays scoped to the correct maturity level
- [ ] Evidence textarea present at the level being modified
- [ ] Build passes with zero lint errors
```

---

## Cross-References

- `.ace/standards/security.md` — security-related rules
- `docs/adr/` — architectural decisions related to these rules
- `docs/rca/RCA-001-blank-page-crash.md` — BR-007 violation incident
- `src/data/formConfig.js` — field registry (initialForm)
- `src/data/questions.js` — approved question sets (SECTION_QUESTIONS)
