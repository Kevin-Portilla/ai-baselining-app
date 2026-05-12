# FEAT-004: Needs Validation Path

**Status:** Implemented
**PRD:** PRD-004 §7
**Component:** `NeedsValidation.jsx`
**Data:** `questions.js` (`NEEDS_VALIDATION_QUESTIONS`), `formConfig.js`

---

## Overview

When a respondent selects "Not sure" for the AI Usage question, the standard maturity branch is replaced by the Needs Validation path. This path collects context about the uncertainty so the assessment can be escalated to the process owner or validated through a follow-up session.

---

## Trigger

```js
// formConfig.js
aiUsageOptions: [..., "Not sure"]

// maturity.js
usageToLevel["Not sure"] → "needs-validation"
getCurrentSection → "needs-validation"
```

---

## Questions

| ID | Label | Type | Options |
|----|-------|------|---------|
| `validationUncertainty` | Why are you unsure whether AI is used in this process? | select | No AI tools are available; I don't know enough about the process; Usage may be informal or hidden; The process is new; Other |
| `aiOutputsSeen` | Have you seen any AI-generated outputs or workflow assistance? | select | No; Yes — occasionally; Yes — regularly |
| `validationContact` | Who could confirm current AI usage? | input (free text) | Name, role, or team |
| `reviewRequired` | Should this process be reviewed with the process owner? | select | No; Possibly; Yes — recommended |
| `validationContext` | Additional context | textarea | Any additional context that may help confirm AI usage |

---

## Classification Behaviour

- `calculateLevel` returns `"needs-validation"` — no maturity score assigned.
- `ClassificationCard` displays amber pill with "Needs Validation" label.
- `BranchingPreview` does not highlight any maturity level (none is active).

---

## Rendering

`NeedsValidation.jsx` renders each question from `NEEDS_VALIDATION_QUESTIONS` using inline JSX for each type (`select`, `input`, `textarea`). It is conditionally rendered inside `SurveyView.jsx` when `isNeedsValidation === true`.

---

## Acceptance Criteria

- [x] Selecting "Not sure" renders Needs Validation questions
- [x] All 5 questions render with correct types
- [x] `validationContact` renders as free-text input with placeholder
- [x] ClassificationCard shows amber "Needs Validation" pill
- [x] Switching from "Not sure" to any other option restores normal branch questions
- [x] Needs Validation fields initialised in `initialForm` (`validationUncertainty`, `aiOutputsSeen`, `validationContact`, `reviewRequired`, `validationContext`)
