# FEAT-006: Real-Time Classification Card

**Status:** Implemented
**PRD:** PRD-004 §10 (Scoring Logic)
**Component:** `ClassificationCard.jsx`
**Data:** `levelConfig.js` (`levelPillClass`, `levelIcons`, `levelShortLabels`, `levelDescriptions`)

---

## Overview

The Classification Card is a live feedback panel in the right sidebar of the survey. It displays the recommended maturity level in real time as the respondent fills in the form, giving immediate orientation on how the current answers are scored.

---

## Display

| Level | Pill Color | Icon | Short Label |
|-------|-----------|------|-------------|
| 0 | `bg-slate-700` | ban | No AI Usage |
| 1 | `bg-teal-700` | user | Individual AI Use |
| 2 | `bg-blue-600` | network | Connected Workflows |
| 3 | `bg-indigo-600` | workflow | Orchestrated Systems |
| 4 | `bg-violet-600` | rocket | Adaptive / Autonomous Operations |
| needs-validation | `bg-amber-400` | warning | Needs Validation |
| (no selection) | `bg-slate-700` | network | Awaiting Input |

---

## Score Calculation

The `recommendedLevel` prop is computed in `App.jsx` via `calculateLevel(form)` (see `logic/maturity.js`). The base level comes from the AI usage selection; supplementary signals can nudge the score up by at most 2.0 points (capped at Level 4).

Score nudge signals (all require base level conditions):
- `consistentValidation = "Yes — consistently"` → +0.5 (if base < 3)
- `measurableImpactL2 = "Measured operational improvements"` → +0.5 (if base < 3)
- `governanceControlsL3.length >= 4` → +0.5 (if base < 4)
- `advancedTechCapabilities.length >= 4` → +0.5 (if base < 4)
- `connectedProcessSteps.length >= 4` → +0.5 (if base < 3)

---

## Behaviour

- Animates between levels using `framer-motion` `AnimatePresence` with fade + scale transition.
- The description paragraph below the pill updates to the level description from `levelDescriptions`.
- Title format: `"<level number> — <short label>"` (e.g., "2 — Connected Workflows").
- For `needs-validation`: shows "Needs Validation" without a level prefix.
- For no selection ("screening"): shows "Awaiting Input" with the `levelDescriptions.screening` text.

---

## Acceptance Criteria

- [x] Card renders in right sidebar for all maturity selections
- [x] Pill color matches level
- [x] Icon renders correctly for each level
- [x] Description text updates on level change
- [x] AnimatePresence fade transition on level change
- [x] No blank page when level changes (RCA-001 fix)
- [x] All six `levelConfig.js` exports present (`levelPillClass`, `levelIcons`, `levelShortLabels`, `levelDescriptions`, `sectionLabels`, `branchingLevels`)
