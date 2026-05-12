# RCA-001: Blank Page Crash on App Load and AI Usage Selection

**Date:** 2026-05-12
**Severity:** Critical (complete application failure)
**Status:** Resolved
**Reporter:** User observation
**Fix Commit:** `1839a54`

---

## 1. Symptom

The application rendered a completely blank white page at `localhost:5173` on initial load. Additionally, selecting any option in the "Is AI currently used in this process?" dropdown also produced a blank white page.

---

## 2. Root Cause Analysis

Three independent bugs were found, all caused by the same underlying issue: **stale field references left behind after the pillar-to-domain refactor (ADR-001, ADR-002)**. Fields that existed in the original pillar-based implementation were removed from `formConfig.js` (`initialForm`) but were still referenced in runtime code.

### Bug 1 — App.jsx: `.length` on undefined in `domainActive`

```js
// BROKEN — these fields don't exist in initialForm
const domainActive = useMemo(() => ({
  clientCentric: !!(form.clientPriorities || form.aiOpportunities.length || ...),
  operatingModel: !!(form.intelligentGovernance.length || form.tribeEnablement.length || ...),
  people: !!(form.mentorNetworks.length || ...),
}), [form]);
```

`form.aiOpportunities`, `form.intelligentGovernance`, `form.tribeEnablement`, `form.mentorNetworks` are all `undefined` (removed from `initialForm`). Calling `.length` on `undefined` throws a `TypeError` during the first render, causing React to unmount the entire tree → blank page.

### Bug 2 — maturity.js: `.length` on undefined in `calculateLevel`

```js
// BROKEN — these fields don't exist in initialForm
if (form.governanceControls.length >= 4 ...) score += 0.5;
if (form.techEnablement.length >= 4 ...) score += 0.5;
if (form.processSteps.length >= 4 ...) score += 0.5;
```

`form.governanceControls`, `form.techEnablement`, `form.processSteps` are all `undefined`. This function is called via `useMemo` on every state change — so selecting the AI usage dropdown triggers `calculateLevel`, which crashes → blank page on every selection.

### Bug 3 — levelConfig.js: Missing exports used by ClassificationCard and BranchingPreview

Six named exports were removed from `levelConfig.js` during the PRD-005 refactor but were still imported by two components:
- `ClassificationCard.jsx` imported: `levelPillClass`, `levelIcons`, `levelShortLabels`, `levelDescriptions`
- `BranchingPreview.jsx` imported: `branchingLevels`
- `SurveyView.jsx` imported: `sectionLabels`

Missing module exports cause Vite/Rollup to fail to build the affected components, resulting in a blank page.

---

## 3. Fix

### Fix 1 — App.jsx `domainActive`
Replaced stale field names with actual fields from `initialForm` per domain:
```js
clientCentric: !!(form.workflowExecution || form.potentialAiBenefits.length || ...),
operatingModel: !!(form.outputValidationL1 || form.aiToolsUsed.length || ...),
people: !!(form.aiAwareness || form.adoptionBarriers.length || ...),
```

### Fix 2 — maturity.js `calculateLevel`
Replaced stale field names with equivalent current fields, added `|| []` safety guards:
```js
if (form.consistentValidation === "Yes — consistently" && score < 3) score += 0.5;
if (form.measurableImpactL2 === "Measured operational improvements" && score < 3) score += 0.5;
if ((form.governanceControlsL3 || []).length >= 4 && score < 4) score += 0.5;
if ((form.advancedTechCapabilities || []).length >= 4 && score < 4) score += 0.5;
if ((form.connectedProcessSteps || []).length >= 4 && score < 3) score += 0.5;
```

### Fix 3 — levelConfig.js missing exports
Restored all six missing exports from the previous version of the file:
`sectionLabels`, `levelDescriptions`, `levelShortLabels`, `levelIcons`, `levelPillClass`, `branchingLevels`

---

## 4. Contributing Factors

- No integration tests verify that all fields referenced in `useMemo` or `calculateLevel` exist in `initialForm`.
- The refactor that removed `initialForm` fields (commit `6aecd2e`) did not audit all runtime references to those fields.
- The CI pipeline only runs lint and build — a build can succeed even when runtime `.length` calls will crash on real `undefined` values.

---

## 5. Prevention

- [ ] Add a regression guard: a test that iterates all `domainActive` field references and asserts they exist as keys in `initialForm`.
- [ ] Add a regression guard: a test that iterates all `calculateLevel` field references and asserts they exist as keys in `initialForm`.
- [ ] Any PR that removes a field from `initialForm` must search all `.jsx` and `.js` files for that field name before merging.
- [ ] Add runtime CI smoke test (Playwright or similar) that loads the app, selects each AI usage option, and asserts no blank page.

---

## 6. Timeline

| Time | Event |
|------|-------|
| 2026-05-12 | PRD-005 implemented (commit `6aecd2e`) — stale references introduced |
| 2026-05-12 | Blank page reported by user |
| 2026-05-12 | Root cause identified in `App.jsx`, `maturity.js`, and `levelConfig.js` |
| 2026-05-12 | Fix committed (`1839a54`) — blank page resolved |
| 2026-05-12 | CI lint fix committed (`9b6fe61`) — unused imports removed |
