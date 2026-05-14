# Domain Entities — AI Operations Baseline Assessment

> Canonical definitions of domain entities and their relationships.
> This is the source of truth for domain modeling in the AI Operations Baseline Assessment tool.

*Last Updated: 2026-05-14*

---

## AssessmentTarget

### Description
Represents the thing being assessed. The target may be a team or a process. PRD-006 makes Team the default new assessment scope while process-level details remain available as supporting context.

### Type
Aggregate Root Candidate

### Attributes
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| assessmentScope | String | Yes | Scope of the final diagnosis: `Team` or `Process` |
| teamName | String | Required for Team scope unless area, squad, or tribe identifies the team | Team being assessed |
| area | String | No | Business or operational area |
| squad | String | No | Squad or delivery group |
| managerName | String | No | Manager or lead for the evaluated team/process |
| director | String | No | Director derived from the selected Tribe |
| serviceProduct | String | No | Selected predefined service/product filtered by selected Tribe |
| processName | String | Required for Process scope | Process represented by a process-level assessment; optional supporting context for team scope |
| processContext | ProcessAssessment | No | Supporting process details when scope is team-level |
| maturityLevel | String | Computed | Recommended maturity level for the selected assessment scope |

### Invariants
- Final maturity output must clearly identify whether it represents a team or a process.
- New assessments default to Team scope.
- Team-level assessments may include process fields as supporting context, but the final diagnosis is scoped to the team.
- Legacy records without `assessmentScope` are treated as Process scope when `processName` exists and no `teamName` exists.
- Director is derived from the selected Tribe and persisted as assessment metadata.
- Service/Product values come from the static v1 catalog in `formConfig.js` or a dedicated frontend catalog module until a backend/API catalog ADR is approved.
- Service/Product options are filtered by selected Tribe.
- Director and Service/Product are metadata only and do not affect maturity logic.
- Notes and Not Applicable responses do not create positive maturity evidence.

### Business Rules
- BR-009: Notes Are Informational Only
- BR-010: Not Applicable Must Not Inflate Maturity
- BR-011: Team-Level Diagnosis Support
- BR-012: Service/Product Catalog Field
- BR-013: Director Is Derived Metadata
- BR-014: Director and Service/Product Do Not Affect Maturity Logic

---

## ProcessAssessment

### Description
The current v1 domain entity. Represents a single assessment of one operational process by one respondent. Contains all metadata, maturity answers, and the calculated maturity level. Under PRD-006, this may remain as a supported process-level target or become supporting context under `AssessmentTarget`.

### Type
Aggregate Root

### Attributes
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | Yes (future) | Unique identifier — not yet implemented in v1 (local state only) |
| tribe | String | No | Organizational tribe (e.g. "Intelligent Automation") |
| director | String | No | Director auto-populated from selected Tribe |
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
- Notes fields are informational only and do not affect maturity or branch routing.
- Not Applicable / fully negative responses do not count as positive maturity evidence.
- Director and Service/Product are metadata only and do not affect scoring, maturity classification, branch routing, or domain activation.

### Lifecycle
Draft (fields being filled) → Complete (all relevant fields answered) → Exported (JSON downloaded)

### Business Rules
- BR-001: Maturity Level Integrity
- BR-002: Option Set Scoping per Level
- BR-004: Evidence Field at Every Level
- BR-007: Field Initialization for All Form Fields
- BR-009: Notes Are Informational Only
- BR-010: Not Applicable Must Not Inflate Maturity
- BR-013: Director Is Derived Metadata
- BR-014: Director and Service/Product Do Not Affect Maturity Logic

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

## Notes Fields

Existing `*Other` fields should be treated as proposed Notes fields until renamed. Notes are informational-only and must not affect scoring, branching, classification, completion, dashboard aggregation, or recommendations.

---

## OrganizationCatalog (Proposed for PRD-006)

### Description
Reference data that maps each approved Tribe to its Director and available Services/Products. For v1, this should remain static local data. If catalog data comes from a backend or external system, ADR-004 must be updated or superseded.

### Type
Reference Data / Catalog

### Attributes
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| tribe | String | Yes | Canonical Tribe label |
| director | String | Yes | Director associated with the Tribe |
| servicesProducts | String[] | Yes | Services/Products selectable for the Tribe |

### Director Mapping
| Tribe | Director |
|-------|----------|
| Client Services Tribe | Andrey Brenes |
| Automation Tribe | Jonathan Herrera |
| Infrastructure Tribe | Fernando Golcher |
| Development Tribe | Laura Monge |
| Implementations Tribe | Harold Castillo |
| Professional Services | Adrian Duarte |

### Invariants
- Director is derived from the selected Tribe.
- Services/Products are filtered by the selected Tribe.
- Unknown or unavailable services/products must have a defined fallback.
- Director and Service/Product selection are metadata and must not directly change maturity scoring, classification, branch routing, domain activation, or generated/derived output values.

---

## ServiceProductCatalog (Legacy / Superseded by OrganizationCatalog)

### Description
A predefined list of services/products that can be selected in the assessment metadata. This concept is superseded by `OrganizationCatalog` because Services/Products must now be filtered by selected Tribe. For v1, this may be static frontend reference data. If catalog data comes from a backend or external system, ADR-004 must be updated or superseded.

### Type
Reference Data / Catalog

### Attributes
| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes (future) | Stable catalog identifier |
| name | String | Yes | Display name |
| status | String | No | Active, inactive, deprecated, or similar |
| owner | String | No | Catalog owner or maintaining team |

### Invariants
- The catalog source must be documented.
- Unknown or unavailable services/products must have a defined fallback.
- Service/Product selection is metadata and must not directly change maturity scoring.

---

## Cross-References

- `src/data/formConfig.js` — `initialForm` maps directly to `ProcessAssessment` attributes
- `src/data/levelConfig.js` — `domains`, `strategicStages` define Domain and StrategicStage value objects
- `src/logic/maturity.js` — `calculateLevel()` computes `MaturityLevel` from `ProcessAssessment`
- `.ace/knowledge/business-rules.md` — rules governing entity constraints
