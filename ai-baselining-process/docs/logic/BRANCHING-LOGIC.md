# Branching & Scoring Logic

**Project:** AI Operations Baseline Assessment
**Source:** `front-end/src/logic/maturity.js`
**Last Updated:** 2026-05-14

---

## Overview

Three pure helpers drive the assessment's dynamic behavior:

| Function | Output | Notes |
|----------|--------|-------|
| `getCurrentSection(form)` | Survey branch key | Uses only `form.aiUsage` and `usageToLevel`. |
| `calculateLevel(form)` | Recommended maturity level | Uses the AI usage base level plus positive maturity evidence. |
| `computeDomainActive(form)` | Domain/quadrant activation map | Uses positive evidence only for matrix activation. |

`App.jsx` calls these helpers with `useMemo` and passes the resulting values to `SurveyView`, `ClassificationCard`, `BranchingPreview`, and `DomainCards`.

PRD-006 rule: `"Notes"`, legacy stored `"Other"`, `"Not Applicable"`, Director, and Service/Product are not positive maturity evidence. They must not affect branch routing, recommended classification, maturity score, AI readiness level, domain/quadrant matching, dashboard aggregation, or output-derived values.

The shared helpers in `front-end/src/data/responseOptions.js` enforce this:

- `positiveSelections(value)` removes `"Notes"`, legacy `"Other"`, and `"Not Applicable"` from multi-select values.
- `hasPositiveResponse(value)` returns `false` for `"Notes"`, legacy `"Other"`, `"Not Applicable"`, and arrays containing only those values.
- `toggleOptionSelection(value, option)` keeps Not Applicable mutually exclusive with positive options while allowing Notes to remain qualitative context.

---

## Branch Routing

`getCurrentSection(form)` maps `form.aiUsage` to the rendered section.

| `form.aiUsage` | Section |
|----------------|---------|
| empty | `screening` |
| `No AI usage identified` | `no-ai` |
| `AI is used informally by individuals` | `individual` |
| `AI supports some defined workflow activities` | `connected` |
| `AI is integrated across multiple workflow steps` | `orchestrated` |
| `AI operates adaptive or autonomous activities` | `adaptive` |
| `Not sure` | `needs-validation` |

Notes fields, Notes option selections, Not Applicable selections, Director, and Service/Product are not read by branch routing.

---

## Maturity Scoring

`calculateLevel(form)` works in this order:

1. Return `form.maturityOverride` if set.
2. Resolve the base level from `usageToLevel[form.aiUsage]`.
3. Return `needs-validation` if there is no scorable base.
4. Apply limited nudges from positive evidence in configured scoring fields.
5. Cap and round the result to `"0"` through `"4"`.

Current nudge fields:

| Field | Condition | Effect |
|-------|-----------|--------|
| `omtGovernanceL2` | At least 2 positive selections and score `< 3` | `+0.5` |
| `omtAutoWorkflowsL2` | At least 2 positive selections and score `< 3` | `+0.5` |
| `omtGovernanceL3` | At least 3 positive selections and score `< 4` | `+0.5` |
| `omtTechCapL4` | At least 4 positive selections and score `< 4` | `+0.5` |
| `omtConnectedSystemsL3` | At least 4 positive selections and score `< 3` | `+0.5` |

Each multi-select scoring field is evaluated through `positiveSelections()`, so Notes, legacy Other, and Not Applicable cannot satisfy scoring thresholds. Director and Service/Product are metadata fields and must not be read by scoring helpers.

---

## Domain / Quadrant Matching

`computeDomainActive(form)` returns:

```js
{
  clientCentric: boolean,
  operatingModel: boolean,
  people: boolean
}
```

The helper uses `positiveSelections()` for array fields and `hasPositiveResponse()` for scalar fields. Notes-only answers do not activate a domain or quadrant. Not Applicable-only answers also do not activate a domain or quadrant.

`DomainCards.jsx` uses `hasPositiveResponse()` for subcategory completion checks, preserving the same semantics at cell level.

---

## Output Generation

`front-end/src/logic/assessmentOutput.js` prepares export-ready output without making Notes part of scored answers:

- `buildScoredDiagnosticAnswers(form)` returns diagnostic answers with Notes, legacy Other, and Not Applicable removed.
- `collectNotes(form)` returns qualitative note text from legacy `*Other` fields.
- `prepareAssessmentOutput(form)` returns `metadata`, sanitized `diagnosticAnswers`, `notes`, and `derived` values.

The derived output values are computed from `getCurrentSection()`, `calculateLevel()`, and `computeDomainActive()`, so Notes do not alter `recommendedLevel`, `aiReadinessLevel`, `maturityScore`, or domain/quadrant matching. Director and Service/Product may be included in output metadata/details, but generated/derived output values must not be computed from them.

---

## Regression Tests

`front-end/src/logic/maturity.test.mjs` covers:

- Notes-only diagnostic answers do not create maturity evidence.
- Notes with valid maturity answers do not change recommended classification.
- Notes combined with Not Applicable remain unscored output context.
- Notes do not change branch routing, AI readiness level, or maturity score.
- Exported question option sets present `Notes` instead of user-facing `Other`.
