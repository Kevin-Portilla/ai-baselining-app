# FEAT-002: AI Maturity Branching Survey

**Status:** Implemented
**PRD:** PRD-004 §6, PRD-005
**Components:** `SurveyView.jsx`, `BranchingPreview.jsx`, `ClassificationCard.jsx`
**Data:** `questions.js` (`SECTION_QUESTIONS`), `levelConfig.js`, `logic/maturity.js`

---

## Overview

The core feature of the application. Based on the AI Usage selection in Section 1, the form dynamically renders a level-specific set of questions grouped by domain. Each maturity level (L0–L4) has its own question set covering the three domains: Client Centric Approach, Operating Model & Technology, and People.

---

## Maturity Levels

| Level | Key | Survey Section | Questions |
|-------|-----|----------------|-----------|
| 0 — No AI Usage | `no-ai` | 4 questions across 2 domains | aiAwareness, adoptionBarriers, workflowExecution, potentialAiBenefits |
| 1 — Individual AI Use | `individual` | 8 questions across 3 domains | aiLiteracy, aiIntegrationWorkflow, broaderAdoptionBarriers, individualAiActivities, outputValidationL1, aiToolsUsed, infoSecurityClearance, governanceRisksL1 |
| 2 — Connected Workflows | `connected` | 11 questions across 3 domains | automationMaturity, evaluatingQuality, remainingBarriersL2, workflowActivitiesL2, aiIntegrationL2, aiGovernanceL2, sensitiveDataHandling, consistentValidation, reusableAssetsL2, measurableImpactL2, improvedAreasL2 |
| 3 — Orchestrated Systems | `orchestrated` | 14 questions across 3 domains | operationalAiCapability, limitationsRiskEval, connectedProcessSteps, connectedSystems, operationalImpactMeasurement, governanceControlsL3, auditableOutputs, riskManagementL3, approvalCriteria, reusableCapabilitiesL3, environmentReliability, impactMetricsL3, performanceMonitoringL3, missingForAdaptive |
| 4 — Adaptive / Autonomous | `adaptive` | 11 questions across 3 domains | preparednessAdaptive, improvingAiDecisions, aiAutonomyLevel, aiActionsInProcess, advancedTechCapabilities, humanOversightRequired, advancedGovernanceL4, continuousMonitoringL4, humanOverrideMechanism, escalationPathsL4, platformAdaptivity |

Each level also includes an evidence textarea: `evidenceL0`–`evidenceL4`.

---

## Branching Logic

Implemented in `logic/maturity.js`:

```
getCurrentSection(form):
  usageToLevel[form.aiUsage] → section key
  "screening" if no selection made

calculateLevel(form):
  base = usageToLevel[form.aiUsage]
  score adjustments (max +2.0, capped at 4):
    +0.5 if consistentValidation = "Yes — consistently" and score < 3
    +0.5 if measurableImpactL2 = "Measured operational improvements" and score < 3
    +0.5 if governanceControlsL3.length >= 4 and score < 4
    +0.5 if advancedTechCapabilities.length >= 4 and score < 4
    +0.5 if connectedProcessSteps.length >= 4 and score < 3
```

---

## Domain Grouping

Questions are rendered in domain-grouped cards (ADR-003):
1. Client Centric Approach (clientCentric)
2. Operating Model & Technology (operatingModel)
3. People (people)

Domains with zero questions at a given level are silently skipped.

---

## Question Types

| Type | Component | Description |
|------|-----------|-------------|
| `select` | `FormSelect` | Single-choice dropdown |
| `toggle` | `ToggleGrid` | Multi-select toggle button grid |
| `textarea` | `<textarea>` | Free-text evidence field |
| `input` | `<input>` | Free-text single-line field |

---

## Acceptance Criteria

- [x] Each AI usage selection renders the correct question set
- [x] Questions grouped by domain within each level
- [x] Evidence textarea present at every level
- [x] Selecting AI usage does not cause blank page (RCA-001)
- [x] ClassificationCard updates in real time as answers change
- [x] BranchingPreview highlights the active level
- [x] AnimatePresence transition between levels is smooth
