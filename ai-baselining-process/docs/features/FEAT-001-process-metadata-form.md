# FEAT-001: Process Metadata Form (Section 1)

**Status:** Implemented
**PRD:** PRD-004 §4
**Component:** `SurveyView.jsx` (top section of the form card)
**Fields:** `tribe`, `role`, `processType`, `processName`, `frequency`, `clientData`, `mainSystems`, `processDescription`, `criticality`

---

## Overview

The Process Metadata Form is the first section of every assessment. It captures the organizational and operational context of the process being assessed. This data provides the metadata layer for downstream dashboard aggregation and executive reporting.

---

## Fields

| Field | Type | Component | Options |
|-------|------|-----------|---------|
| Tribe | Select | `FormSelect` | Compliance, Intelligent Automation, Customer Experience, Data & Analytics, Risk Management, Operations, Technology, Other |
| Role Type | Select | `FormSelect` | Process Owner, SME, Business Analyst, Operations Associate, Manager / Lead, Other |
| Process Type | Select | `FormSelect` | Data Entry & Validation, Report Generation, Decision Support / Underwriting, Customer Communication, Monitoring & Alerting, Complex Analysis, Software Development / Testing, Other |
| Process Name | Text input | `<input>` | Free text |
| Execution Frequency | Select | `FormSelect` | Real-time / Continuous, Daily, Weekly, Monthly, Ad-hoc |
| Client / Sensitive Data | Select | `FormSelect` | Yes — contains PII/Sensitive data, No — internal/public data only, Unsure |
| Main Systems | Text input | `<input>` | Free text (e.g. Salesforce, Jira, Power BI) |
| Brief Process Description | Textarea | `<textarea>` | Free text |
| Process Criticality | Select | `FormSelect` | Critical, High, Medium, Low |
| AI Usage (branching signal) | Select | `FormSelect` (highlighted) | 5 maturity options + Not sure |

---

## Behaviour

- Always visible — shown regardless of AI usage selection.
- The AI Usage field is visually highlighted (`highlight` prop on `FormSelect`) to signal it as the key branching input.
- Completion percentage in the `Header` component is computed from this section's fields.
- No validation enforced client-side in v1 — all fields optional to allow partial saves.

---

## Completion Tracking

Fields counted in the `completion` useMemo in `App.jsx`:
`tribe`, `role`, `processName`, `aiUsage`, `processDescription`, `frequency`, `criticality`, `processType`, `clientData`, `mainSystems` (+ `evidence` field — legacy reference, unused).

---

## Acceptance Criteria

- [x] All metadata fields render correctly
- [x] Tribe list includes "Intelligent Automation" (not "Intelligent")
- [x] AI Usage dropdown triggers dynamic branching section
- [x] Completion percentage updates as fields are filled
- [x] Form renders inside a white card on dark background
