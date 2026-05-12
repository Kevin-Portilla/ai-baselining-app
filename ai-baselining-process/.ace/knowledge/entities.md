# Domain Entities — AI Operations Baseline Assessment

> Canonical definitions of domain entities and their relationships.
> This is the source of truth for domain modeling in the AI Operations Baseline Assessment tool.

*Last Updated: 2026-05-12*

---

## ProcessAssessment

### Description
The primary domain entity. Represents a single assessment of one operational process by one respondent. Contains all metadata, maturity answers, and the calculated maturity level.

### Type
Aggregate Root

### Attributes
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | Yes (future) | Unique identifier — not yet implemented in v1 (local state only) |
| tribe | String | No | Organizational tribe (e.g. "Intelligent Automation") |
| role | String | No | Respondent role type |
| processName | String | No | Name of the process being assessed |
| processType | String | No | Category of the process |
| processDescription | String | No | Free-text description of the process |
| frequency | String | No | Execution frequency |
| criticality | String | No | Process criticality level |
| clientData | String | No | Whether process handles sensitive/client data |
| mainSystems | String | No | Comma-separated list of systems used |
| aiUsage | String | No | Primary AI usage selection (branching signal) |
| maturityLevel | String | Computed | Recommended level: "0"–"4" or "needs-validation" |
| createdAt | DateTime | No (future) | Submission timestamp |

### Level-Specific Answer Groups
Each group is a subset of `ProcessAssessment` — attributes that only apply when `aiUsage` maps to that level.

**Level 0 (No AI):**
- `aiAwareness`, `adoptionBarriers[]`, `workflowExecution`, `potentialAiBenefits[]`, `evidenceL0`

**Level 1 (Individual):**
- `aiLiteracy`, `aiIntegrationWorkflow`, `broaderAdoptionBarriers[]`, `individualAiActivities[]`
- `outputValidationL1`, `aiToolsUsed[]`, `infoSecurityClearance`, `governanceRisksL1[]`, `evidenceL1`

**Level 2 (Connected):**
- `automationMaturity`, `evaluatingQuality`, `remainingBarriersL2[]`
- `workflowActivitiesL2[]`, `aiIntegrationL2`
- `aiGovernanceL2`, `sensitiveDataHandling`, `consistentValidation`
- `reusableAssetsL2[]`, `measurableImpactL2`, `improvedAreasL2[]`, `evidenceL2`

**Level 3 (Orchestrated):**
- `operationalAiCapability`, `limitationsRiskEval`
- `connectedProcessSteps[]`, `connectedSystems[]`, `operationalImpactMeasurement`
- `governanceControlsL3[]`, `auditableOutputs`, `riskManagementL3`, `approvalCriteria`
- `reusableCapabilitiesL3[]`, `environmentReliability`
- `impactMetricsL3[]`, `performanceMonitoringL3`, `missingForAdaptive[]`, `evidenceL3`

**Level 4 (Adaptive):**
- `preparednessAdaptive`, `improvingAiDecisions`
- `aiAutonomyLevel`, `aiActionsInProcess[]`
- `advancedTechCapabilities[]`, `humanOversightRequired[]`
- `advancedGovernanceL4[]`, `continuousMonitoringL4`, `humanOverrideMechanism`, `escalationPathsL4`
- `platformAdaptivity`, `evidenceL4`

**Needs Validation:**
- `validationUncertainty`, `aiOutputsSeen`, `validationContact`, `reviewRequired`, `validationContext`

### Invariants
- `aiUsage` is the primary branching signal — must be set before any level-specific fields are meaningful.
- `maturityLevel` is always derived from `aiUsage` + supplementary signals; never set directly by respondent input (only via `maturityOverride`).
- All array fields default to `[]`, all string fields default to `""`.

### Lifecycle
Draft (fields being filled) → Complete (all relevant fields answered) → Exported (JSON downloaded)

### Business Rules
- BR-001: Maturity Level Integrity
- BR-002: Option Set Scoping per Level
- BR-004: Evidence Field at Every Level
- BR-007: Field Initialization for All Form Fields

---

## MaturityLevel

### Description
A value object representing one of the five defined AI maturity levels plus the validation state. Not stored independently — computed from `ProcessAssessment`.

### Type
Value Object (Enum)

### Values
| Key | Label | Section Key |
|-----|-------|-------------|
| "0" | No AI Usage | `no-ai` |
| "1" | Individual AI Use | `individual` |
| "2" | Connected Workflows | `connected` |
| "3" | Orchestrated Systems | `orchestrated` |
| "4" | Adaptive / Autonomous Operations | `adaptive` |
| "needs-validation" | Needs Validation | `needs-validation` |
| (null/empty) | Screening / Awaiting Input | `screening` |

### Validation Rules
- Must be one of the six defined values.
- Computed via `calculateLevel()` in `logic/maturity.js`.

---

## Domain

### Description
One of three organizational dimensions used to categorize assessment questions. Value object — defined in `levelConfig.js`.

### Type
Value Object (Enum)

### Values
| ID | Title | Sub-title |
|----|-------|-----------|
| `clientCentric` | Client Centric Approach | (Business Model) |
| `operatingModel` | Operating Model & Technology | (How we deliver) |
| `people` | People | (How our people grow & win) |

---

## StrategicStage

### Description
One of three strategic progression stages that organize subcategories within each domain. Value object — defined in `levelConfig.js`.

### Type
Value Object (Enum)

### Values
| ID | Title |
|----|-------|
| `sbp` | Sense, Benchmark & Position |
| `sd` | Scale & Differentiate |
| `dh` | Become a Human-AI Delivery Hub |

---

## Entity Relationships

```
┌─────────────────────────────────────────────────────────────┐
│               ENTITY RELATIONSHIPS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌───────────────────────┐                                 │
│   │   ProcessAssessment   │                                 │
│   │   (Aggregate Root)    │                                 │
│   │                       │                                 │
│   │  - tribe              │──has──▶ MaturityLevel           │
│   │  - role               │         (value object)          │
│   │  - processName        │                                 │
│   │  - aiUsage            │──maps via──▶ Domain             │
│   │  - [level fields]     │              (3 values)         │
│   │  - maturityLevel      │                                 │
│   └───────────────────────┘──grouped by──▶ StrategicStage  │
│                                              (3 values)     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Future Entities (Post-v1 Backend)

When a backend is added the following entities will be introduced:

- **Assessor** — The user performing the assessment (auth identity)
- **AssessmentSession** — Groups multiple `ProcessAssessment` records into one review session
- **OrganizationSnapshot** — Aggregate of all `ProcessAssessment` records for reporting

---

## Cross-References

- `src/data/formConfig.js` — `initialForm` maps directly to `ProcessAssessment` attributes
- `src/data/levelConfig.js` — `domains`, `strategicStages` define Domain and StrategicStage value objects
- `src/logic/maturity.js` — `calculateLevel()` computes `MaturityLevel` from `ProcessAssessment`
- `.ace/knowledge/business-rules.md` — rules governing entity constraints
