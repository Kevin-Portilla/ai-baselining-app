# Data Model

**Project:** AI Operations Baseline Assessment
**Last Updated:** 2026-05-14

---

## Overview

All data is held in a single `initialForm` object in React state. There is no database in v1. The model is designed so that `initialForm` can be mapped to a future backend table when persistence is added.

PRD-006 updates the model direction: the assessment target must support team-level diagnosis, with process-level information available as supporting context. The current `process_assessments` future table remains a useful starting point, but the future schema may need to become `assessments` or `assessment_targets` to avoid hard-coding process-only semantics.

---

## `initialForm` — Complete Field Registry

The canonical source of truth is `src/data/formConfig.js`. Every field reference in any component **must** have an entry here (BR-007).

### Section 1 — Assessment Target and Process Metadata

| Field | Type | Options Source | Description |
|-------|------|----------------|-------------|
| `assessmentScope` | `string` | `assessmentScopeOptions[]` | Whether the final diagnosis represents a Team or Process. Defaults to `Team`. |
| `teamName` | `string` | free text | Team being assessed when scope is team-level |
| `area` | `string` | free text | Business or operational area for the assessed team |
| `squad` | `string` | free text | Squad or delivery group for the assessed team |
| `tribe` | `string` | `tribes[]` | Organizational tribe |
| `director` | `string` | Tribe-to-Director mapping | Director auto-populated from selected Tribe |
| `serviceProduct` | `string` | Tribe-filtered Service/Product catalog | Selected service/product from the selected Tribe catalog |
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

When a user exports their assessment (planned feature), output should be prepared through `front-end/src/logic/assessmentOutput.js`. The helper separates metadata, scored diagnostic answers, qualitative notes, and derived fields. Under PRD-006, export must also include assessment scope, Director, and Service/Product metadata when those fields are implemented.

Notes are output only under the `notes` object as unscored qualitative context. Diagnostic answers are sanitized through shared positive-evidence helpers so `"Notes"`, legacy `"Other"`, and `"Not Applicable"` never derive `recommendedLevel`, `aiReadinessLevel`, `maturityScore`, branch routing, or domain/quadrant matching.

```json
{
  "tribe": "Intelligent Automation",
  "director": "Jonathan Herrera",
  "assessmentScope": "Team",
  "teamName": "Client Operations Enablement",
  "serviceProduct": "SecureNow",
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
  director        TEXT,
  service_product TEXT,
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

  -- Level-specific fields stored as JSONB for flexibility
  level_answers   JSONB DEFAULT '{}'
);
```

---

## Proposed PRD-006 Extensions

These PRD-006 fields are implemented in `initialForm` and the metadata form:

| Field | Type | Description |
|-------|------|-------------|
| `assessmentScope` | `string` | Whether the assessment target is a process or a team |
| `teamName` | `string` | Team being assessed when scope is team-level |
| `area` | `string` | Business or operational area for the assessed team |
| `squad` | `string` | Squad or delivery group for the assessed team |
| `director` | `string` | Director derived from selected Tribe |
| `serviceProduct` | `string` | Tribe-filtered service or product selection |
| `processName` | `string` | Required for process scope; optional supporting context for team scope |

Proposed option arrays:

| Options Source | Values / Source |
|----------------|-----------------|
| `assessmentScopeOptions[]` | `Team`, `Process` |
| `directorByTribe` | Static Tribe-to-Director mapping in v1 unless a new ADR approves backend/API catalog loading |
| `serviceProductsByTribe` | Static Tribe-filtered catalog in v1 unless a new ADR approves backend/API catalog loading |

Director mapping:

| Tribe | Director |
|-------|----------|
| Client Services Tribe | Andrey Brenes |
| Automation Tribe | Jonathan Herrera |
| Infrastructure Tribe | Fernando Golcher |
| Development Tribe | Laura Monge |
| Implementations Tribe | Harold Castillo |
| Professional Services | Adrian Duarte |

Assessment target behavior:

- New assessments default to `Team`.
- Team assessments are valid with team, area, squad, or tribe context and do not require `processName`.
- Process assessments remain valid when `assessmentScope` is `Process` and `processName` is present.
- Legacy records without `assessmentScope` are treated as process assessments when `processName` exists and no team name is present.

Notes behavior:

- Existing `*Other` fields should be treated as qualitative Notes until renamed.
- Notes must not affect scoring, branching, recommended classification, maturity level, output-derived fields, dashboard aggregation, or recommendations.
- Legacy stored `"Other"` selections are mapped to Notes semantics and excluded from positive evidence.
- "Not Applicable" or fully negative diagnostic responses must not increase maturity; product must decide whether they count as completion.

Service/Product behavior:

- Director and Service/Product are metadata and must not directly change maturity scoring, branch routing, maturity classification, domain activation, or generated/derived output values.
- The v1 Director and Service/Product catalog source is static frontend reference data in `front-end/src/data/formConfig.js` or a dedicated frontend catalog module.
- The selected Tribe determines the Director and available Service/Product options.
- The selected Service/Product is stored in `initialForm.serviceProduct` and included in prepared assessment output metadata.
- Director is stored in `initialForm.director` or derived during output preparation and included in prepared assessment output metadata.
- Director and Service/Product are associated with the assessment target metadata alongside team, area, tribe, and squad.
- Unknown services/products use the `Unlisted / Not sure` fallback.
- No database table or migration is required in v1 because ADR-004 keeps the app local-state only with no backend/API/database.
