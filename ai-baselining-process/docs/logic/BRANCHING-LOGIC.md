# Branching & Scoring Logic

**Project:** AI Operations Baseline Assessment
**Source:** `src/logic/maturity.js`
**Last Updated:** 2026-05-12

---

## Overview

Two pure functions drive all dynamic behaviour in the survey:

| Function | Input | Output | Used in |
|----------|-------|--------|---------|
| `getCurrentSection(form)` | `form` object | section key string | `useMemo` in `App.jsx` → passed to `SurveyView` |
| `calculateLevel(form)` | `form` object | level string "0"–"4" or "needs-validation" | `useMemo` in `App.jsx` → passed to `ClassificationCard` |

Both are computed on every state change via `useMemo`. They are pure functions — no side effects, no API calls.

---

## `getCurrentSection(form)` — Branch Routing

Maps the AI usage selection to a section key that controls which question set renders.

```js
export function getCurrentSection(form) {
  const level = usageToLevel[form.aiUsage];
  if (!form.aiUsage) return "screening";
  if (level === "0") return "no-ai";
  if (level === "1") return "individual";
  if (level === "2") return "connected";
  if (level === "3") return "orchestrated";
  if (level === "4") return "adaptive";
  return "needs-validation";
}
```

### Routing Map

```
form.aiUsage                                          → section
─────────────────────────────────────────────────────────────────
"" (empty / no selection)                            → "screening"
"No AI usage identified"                             → "no-ai"
"AI is used informally by individuals"               → "individual"
"AI supports some defined workflow activities"       → "connected"
"AI is integrated across multiple workflow steps"    → "orchestrated"
"AI operates adaptive or autonomous activities"      → "adaptive"
"Not sure"                                           → "needs-validation"
```

### `usageToLevel` Map (in `levelConfig.js`)

```js
export const usageToLevel = {
  "No AI usage identified":                          "0",
  "AI is used informally by individuals":            "1",
  "AI supports some defined workflow activities":    "2",
  "AI is integrated across multiple workflow steps": "3",
  "AI operates adaptive or autonomous activities":   "4",
  "Not sure":                                        "needs-validation",
};
```

---

## `calculateLevel(form)` — Maturity Score Engine

Computes the recommended maturity level. The AI usage selection provides the **base level**; supplementary signals can nudge the score upward.

```js
export function calculateLevel(form) {
  if (form.maturityOverride) return form.maturityOverride;

  const base = usageToLevel[form.aiUsage];
  if (!base || base === "needs-validation") return "needs-validation";

  let score = Number(base);  // 0, 1, 2, 3, or 4

  // Supplementary nudges
  if (form.consistentValidation === "Yes — consistently" && score < 3) score += 0.5;
  if (form.measurableImpactL2 === "Measured operational improvements" && score < 3) score += 0.5;
  if ((form.governanceControlsL3 || []).length >= 4 && score < 4) score += 0.5;
  if ((form.advancedTechCapabilities || []).length >= 4 && score < 4) score += 0.5;
  if ((form.connectedProcessSteps || []).length >= 4 && score < 3) score += 0.5;

  return String(Math.min(4, Math.round(score)));
}
```

### Scoring Decision Table

```
Priority 1 — Manual override (assessor only):
  form.maturityOverride set → return that value immediately

Priority 2 — Primary signal:
  base = usageToLevel[form.aiUsage]
  if empty or "needs-validation" → return "needs-validation"
  score = Number(base)  →  0 | 1 | 2 | 3 | 4

Priority 3 — Supplementary nudges (applied in order):

  Signal                                        Condition           Effect
  ────────────────────────────────────────────────────────────────────────
  consistentValidation = "Yes — consistently"   score < 3           +0.5
  measurableImpactL2 = "Measured operational…" score < 3           +0.5
  governanceControlsL3.length >= 4              score < 4           +0.5
  advancedTechCapabilities.length >= 4          score < 4           +0.5
  connectedProcessSteps.length >= 4             score < 3           +0.5
  ────────────────────────────────────────────────────────────────────────
  Maximum possible nudge:                                           +2.5

Priority 4 — Cap and round:
  score = Math.min(4, Math.round(score))
  return String(score)  →  "0" | "1" | "2" | "3" | "4"
```

### Scoring Examples

```
Example A — Pure L2, no nudges
  aiUsage = "AI supports some defined workflow activities"  → base = 2
  No supplementary signals present
  → score = 2 → recommended "2"

Example B — L2 with governance nudge
  aiUsage = "AI supports some defined workflow activities"  → base = 2
  consistentValidation = "Yes — consistently"              → +0.5
  measurableImpactL2 = "Measured operational improvements" → +0.5
  → score = 3 → recommended "3"

Example C — L3 with tech nudge
  aiUsage = "AI is integrated across multiple workflow steps" → base = 3
  advancedTechCapabilities.length = 5                        → +0.5
  → score = 3.5 → Math.round(3.5) = 4 → recommended "4"

Example D — L0, nudge conditions not met
  aiUsage = "No AI usage identified"  → base = 0
  No condition satisfied (all require score < 3 or < 4)
  → score = 0 → recommended "0"

Example E — Override
  form.maturityOverride = "3"
  → returns "3" immediately (ignores all other signals)
```

### Why Nudge Conditions Have Score Caps

- `score < 3` cap: governance and impact signals at L1/L2 can indicate higher maturity but cannot push a process to L3+ on their own — process integration (the aiUsage signal) must be at least L3.
- `score < 4` cap: technology and connectivity signals at L3 can suggest L4 readiness but cannot bypass the primary autonomy signal.
- This ensures the primary signal (how AI is actually used) always dominates. A well-governed L1 process does not become an L3 process just because it has good validation practices.

---

## `domainActive` — Domain Matrix Activation

Computed in `App.jsx`. Determines whether each domain row in the matrix appears active (full opacity) or inactive (dimmed).

```js
const domainActive = useMemo(() => ({
  clientCentric: !!(
    form.workflowExecution || form.potentialAiBenefits.length ||
    form.aiIntegrationWorkflow || form.individualAiActivities.length ||
    form.workflowActivitiesL2.length || form.aiIntegrationL2 ||
    form.connectedProcessSteps.length || form.aiAutonomyLevel ||
    form.aiActionsInProcess.length
  ),
  operatingModel: !!(
    form.outputValidationL1 || form.aiToolsUsed.length ||
    form.infoSecurityClearance || form.governanceRisksL1.length ||
    form.aiGovernanceL2 || form.sensitiveDataHandling ||
    form.consistentValidation || form.reusableAssetsL2.length ||
    form.measurableImpactL2 || form.connectedSystems.length ||
    form.governanceControlsL3.length || form.auditableOutputs ||
    form.riskManagementL3 || form.approvalCriteria ||
    form.reusableCapabilitiesL3.length || form.environmentReliability ||
    form.impactMetricsL3.length || form.performanceMonitoringL3 ||
    form.missingForAdaptive.length || form.advancedTechCapabilities.length ||
    form.humanOversightRequired.length || form.advancedGovernanceL4.length ||
    form.continuousMonitoringL4 || form.humanOverrideMechanism ||
    form.escalationPathsL4 || form.platformAdaptivity
  ),
  people: !!(
    form.aiAwareness || form.adoptionBarriers.length ||
    form.aiLiteracy || form.broaderAdoptionBarriers.length ||
    form.automationMaturity || form.evaluatingQuality ||
    form.remainingBarriersL2.length || form.operationalAiCapability ||
    form.limitationsRiskEval || form.preparednessAdaptive ||
    form.improvingAiDecisions
  ),
}), [form]);
```

A domain is active if **any** field belonging to that domain has been answered. This drives the visual state of each row in the `DomainCards` matrix.

---

## Subcategory Completion (DomainCards)

Within each matrix cell, individual subcategories show a green ✓ when any of their associated fields are answered:

```js
// DomainCards.jsx
const isSubActive = sub.fields?.some(f => {
  const val = form[f];
  return Array.isArray(val) ? val.length > 0 : !!val;
}) ?? false;
```

`sub.fields` is the array of field names defined in `levelConfig.js` for each subcategory. A subcategory is complete if at least one of its fields is filled.

---

## `completion` — Progress Percentage

Tracked in `App.jsx` from Section 1 metadata fields only:

```js
const completion = useMemo(() => {
  const fields = [
    form.tribe, form.role, form.processName, form.aiUsage,
    form.processDescription, form.frequency, form.criticality,
    form.evidence,       // ← known bug: field doesn't exist in initialForm
    form.processType, form.clientData, form.mainSystems,
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}, [form]);
```

> **Known issue:** `form.evidence` does not exist in `initialForm` — it is always `undefined` / falsy. This inflates the denominator by 1, making 100% unachievable (max = 10/11 = 90%). Fix: remove `form.evidence` from the array.
