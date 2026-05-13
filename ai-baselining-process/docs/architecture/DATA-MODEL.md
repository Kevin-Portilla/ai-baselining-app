# Data Model

**Project:** AI Operations Baseline Assessment
**Last Updated:** 2026-05-12

---

## Overview

All data is held in a single `initialForm` object in React state. There is no database in v1. The model is designed so that `initialForm` can be mapped 1:1 to a `process_assessments` table when a backend is added.

---

## `initialForm` — Complete Field Registry

The canonical source of truth is `src/data/formConfig.js`. Every field reference in any component **must** have an entry here (BR-007).

### Section 1 — Process Metadata

| Field | Type | Options Source | Description |
|-------|------|----------------|-------------|
| `tribe` | `string` | `tribes[]` | Organizational tribe |
| `role` | `string` | `roleTypes[]` | Respondent role |
| `processType` | `string` | `processTypeOptions[]` | Process category |
| `processName` | `string` | free text | Name of the process |
| `frequency` | `string` | `frequencies[]` | Execution frequency |
| `clientData` | `string` | `clientDataOptions[]` | Sensitive data flag |
| `mainSystems` | `string` | free text | Systems used (e.g. Salesforce) |
| `processDescription` | `string` | free text | Brief description |
| `criticality` | `string` | `criticalityOptions[]` | Process criticality |

### Section 2 — Screening

| Field | Type | Options Source | Description |
|-------|------|----------------|-------------|
| `aiUsage` | `string` | `aiUsageOptions[]` | Primary branching signal |

### Level 0 — No AI Usage

| Field | Type | Description |
|-------|------|-------------|
| `aiAwareness` | `string` | Current AI awareness level |
| `adoptionBarriers` | `string[]` | Barriers preventing AI adoption |
| `workflowExecution` | `string` | How workflow is currently executed |
| `potentialAiBenefits` | `string[]` | Process areas that could benefit from AI |
| `evidenceL0` | `string` | Free-text evidence supporting L0 classification |

### Level 1 — Individual AI Use

| Field | Type | Description |
|-------|------|-------------|
| `aiLiteracy` | `string` | AI literacy level within team |
| `aiIntegrationWorkflow` | `string` | AI integration in official workflow |
| `broaderAdoptionBarriers` | `string[]` | Barriers to broader adoption |
| `individualAiActivities` | `string[]` | AI activities currently performed |
| `outputValidationL1` | `string` | How AI outputs are validated |
| `aiToolsUsed` | `string[]` | AI tools in use |
| `infoSecurityClearance` | `string` | Awareness of data entry constraints |
| `governanceRisksL1` | `string[]` | Current governance risks |
| `evidenceL1` | `string` | Free-text evidence supporting L1 classification |

### Level 2 — Connected Workflows

| Field | Type | Description |
|-------|------|-------------|
| `automationMaturity` | `string` | Team understanding of process automation |
| `evaluatingQuality` | `string` | Ability to evaluate AI output quality |
| `remainingBarriersL2` | `string[]` | Barriers to broader integration |
| `workflowActivitiesL2` | `string[]` | AI-supported workflow activities |
| `aiIntegrationL2` | `string` | AI integration level across workflow |
| `aiGovernanceL2` | `string` | How AI activities are governed |
| `sensitiveDataHandling` | `string` | Sensitive data handling practices |
| `consistentValidation` | `string` | Consistency of human validation |
| `reusableAssetsL2` | `string[]` | Existing reusable assets |
| `measurableImpactL2` | `string` | Measurable AI impact on process |
| `improvedAreasL2` | `string[]` | Areas improved by AI |
| `evidenceL2` | `string` | Free-text evidence supporting L2 classification |

### Level 3 — Orchestrated Systems

| Field | Type | Description |
|-------|------|-------------|
| `operationalAiCapability` | `string` | Maturity of operational AI capability |
| `limitationsRiskEval` | `string` | AI limitations and risk evaluation |
| `connectedProcessSteps` | `string[]` | Process steps connected through AI |
| `connectedSystems` | `string[]` | Systems the AI workflow connects with |
| `operationalImpactMeasurement` | `string` | How AI impact is measured |
| `governanceControlsL3` | `string[]` | Implemented governance controls |
| `auditableOutputs` | `string` | Whether AI outputs are traceable/auditable |
| `riskManagementL3` | `string` | Risk documentation and management |
| `approvalCriteria` | `string` | Approval criteria for AI outputs |
| `reusableCapabilitiesL3` | `string[]` | Enterprise reusable capabilities |
| `environmentReliability` | `string` | Technical environment reliability |
| `impactMetricsL3` | `string[]` | Metrics used to measure impact |
| `performanceMonitoringL3` | `string` | AI workflow performance monitoring |
| `missingForAdaptive` | `string[]` | Missing elements to reach L4 |
| `evidenceL3` | `string` | Free-text evidence supporting L3 classification |

### Level 4 — Adaptive / Autonomous Operations

| Field | Type | Description |
|-------|------|-------------|
| `preparednessAdaptive` | `string` | Team preparedness for adaptive AI |
| `improvingAiDecisions` | `string` | Active improvement of AI decisions |
| `aiAutonomyLevel` | `string` | Level of AI autonomy in process |
| `aiActionsInProcess` | `string[]` | Actions AI can perform |
| `advancedTechCapabilities` | `string[]` | Advanced technology capabilities |
| `humanOversightRequired` | `string[]` | Where human oversight is required |
| `advancedGovernanceL4` | `string[]` | Advanced governance capabilities |
| `continuousMonitoringL4` | `string` | Continuous performance monitoring |
| `humanOverrideMechanism` | `string` | Human override mechanism status |
| `escalationPathsL4` | `string` | Escalation paths for risky AI actions |
| `platformAdaptivity` | `string` | Platform ecosystem adaptivity |
| `evidenceL4` | `string` | Free-text evidence supporting L4 classification |

### Needs Validation Path

| Field | Type | Description |
|-------|------|-------------|
| `validationUncertainty` | `string` | Reason for uncertainty |
| `aiOutputsSeen` | `string` | Whether AI outputs have been observed |
| `validationContact` | `string` | Who can confirm AI usage (free text) |
| `reviewRequired` | `string` | Whether process owner review is needed |
| `validationContext` | `string` | Additional context (free text) |

---

## Field Defaults

All fields initialize in one of two ways:

| Type | Default | Example fields |
|------|---------|---------------|
| Single-select (string) | `""` | `tribe`, `aiUsage`, `aiLiteracy` |
| Multi-select (array) | `[]` | `adoptionBarriers`, `aiToolsUsed`, `connectedSystems` |
| Free text (string) | `""` | `processName`, `evidenceL0`, `validationContact` |

---

## Export Shape (JSON)

When a user exports their assessment (planned feature), the JSON output mirrors the flat `initialForm` object:

```json
{
  "tribe": "Intelligent Automation",
  "role": "Process Owner",
  "processName": "Invoice Validation",
  "processType": "Internal operations",
  "frequency": "Daily",
  "criticality": "High",
  "clientData": "Yes — contains PII/Sensitive data",
  "mainSystems": "SAP, ServiceNow",
  "processDescription": "Validates incoming invoices against PO data...",
  "aiUsage": "AI supports some defined workflow activities",
  "recommendedLevel": "2",
  "workflowActivitiesL2": ["Analysis", "Classification", "Reporting"],
  "aiIntegrationL2": "AI supports defined workflow steps",
  "consistentValidation": "Partially",
  "reusableAssetsL2": ["Templates", "Prompt libraries"],
  "measurableImpactL2": "Small local improvements",
  "evidenceL2": "Team uses Claude for summarizing complex invoices...",
  ...
}
```

---

## Domain Field Mapping

Each question field belongs to one of the three domains. This mapping is encoded in `questions.js` (`domain` property on each question object) and in `levelConfig.js` (`domains[].stages[].subcategories[].fields[]`).

```
clientCentric domain fields:
  workflowExecution, potentialAiBenefits, aiIntegrationWorkflow,
  individualAiActivities, workflowActivitiesL2, aiIntegrationL2,
  connectedProcessSteps, aiAutonomyLevel, aiActionsInProcess

operatingModel domain fields:
  evidenceL0–L4, outputValidationL1, aiToolsUsed, infoSecurityClearance,
  governanceRisksL1, aiGovernanceL2, sensitiveDataHandling,
  consistentValidation, reusableAssetsL2, measurableImpactL2,
  improvedAreasL2, connectedSystems, operationalImpactMeasurement,
  governanceControlsL3, auditableOutputs, riskManagementL3,
  approvalCriteria, reusableCapabilitiesL3, environmentReliability,
  impactMetricsL3, performanceMonitoringL3, missingForAdaptive,
  advancedTechCapabilities, humanOversightRequired, advancedGovernanceL4,
  continuousMonitoringL4, humanOverrideMechanism, escalationPathsL4,
  platformAdaptivity

people domain fields:
  aiAwareness, adoptionBarriers, aiLiteracy, broaderAdoptionBarriers,
  automationMaturity, evaluatingQuality, remainingBarriersL2,
  operationalAiCapability, limitationsRiskEval,
  preparednessAdaptive, improvingAiDecisions
```

---

## Future Schema (PostgreSQL)

When a backend is added, `initialForm` maps to:

```sql
CREATE TABLE process_assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  assessor_id     UUID REFERENCES users(id),

  -- Section 1
  tribe           TEXT,
  role            TEXT,
  process_type    TEXT,
  process_name    TEXT,
  frequency       TEXT,
  client_data     TEXT,
  main_systems    TEXT,
  process_desc    TEXT,
  criticality     TEXT,

  -- Section 2
  ai_usage        TEXT,

  -- Computed
  recommended_level  TEXT,

  -- Free-form assessment metadata for process context
  metadata         JSONB DEFAULT '{}'::jsonb,

  -- Level-specific fields stored as JSONB for flexibility
  level_answers    JSONB DEFAULT '{}'::jsonb
);
```
