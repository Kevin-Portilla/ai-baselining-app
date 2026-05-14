# PRD-005: Client-Centric Operational Framework

**Status:** Implemented
**Version:** 1.1
**Created:** 2026-05-12
**Last Updated:** 2026-05-12
**Author:** Architect
**Supersedes:** Pillar structure in PRD-004

---

## 1. Overview

PRD-005 introduces the organizational framework for the AI Operations Baseline Assessment. It replaces the previous 4-pillar model with a 3-domain model aligned with three strategic dimensions of AI maturity: client impact, operational delivery, and people.

The framework is organized by three **Strategic Stages**:
1. **Sense, Benchmark & Position** (sbp) — Baseline readiness and initial AI adoption
2. **Scale & Differentiate** (sd) — Optimization, automation, and asset creation
3. **Become a Human-AI Delivery Hub** (dh) — Adaptive, autonomous, AI-native operations

---

## 2. Framework Domains & Categories

### 2.1 Domain 1: Client Centric Approach (Business Model)
Focuses on how AI impacts the client experience and service delivery.

| Strategic Stage | Category | Subcategory | Key Fields |
|-----------------|----------|-------------|------------|
| Sense, Benchmark & Position | AI Impact to Client | Align with Client Priorities | workflowExecution, aiIntegrationWorkflow, individualAiActivities |
| Sense, Benchmark & Position | AI Impact to Client | Identify Opportunities | potentialAiBenefits |
| Scale & Differentiate | AI Impact to Customers of Clients | Co-design | workflowActivitiesL2, aiIntegrationL2 |
| Scale & Differentiate | AI Impact to Customers of Clients | IP - Reusable Accelerators | — |
| Become a Human-AI Delivery Hub | AI Impact End to End | Infinite Led | connectedProcessSteps |
| Become a Human-AI Delivery Hub | AI Impact End to End | AI-Managed Delivery Models | aiAutonomyLevel, aiActionsInProcess |

### 2.2 Domain 2: Operating Model & Technology (How We Deliver)
Focuses on standardization, automation, and platform capabilities.

| Strategic Stage | Category | Subcategory | Key Fields |
|-----------------|----------|-------------|------------|
| Sense, Benchmark & Position | Standardization & Modernization | Standard for AI-Readiness | aiToolsUsed |
| Sense, Benchmark & Position | Standardization & Modernization | Baseline Operations | evidenceL0–L4 |
| Sense, Benchmark & Position | Standardization & Modernization | Intelligent Governance | outputValidationL1, governanceRisksL1, aiGovernanceL2, governanceControlsL3, advancedGovernanceL4 |
| Sense, Benchmark & Position | Standardization & Modernization | Secure Environments | infoSecurityClearance, sensitiveDataHandling |
| Scale & Differentiate | Embedded Intelligent Automation | Highly Automated Workflows | missingForAdaptive, advancedTechCapabilities |
| Scale & Differentiate | Embedded Intelligent Automation | Performance & Capacity | measurableImpactL2, improvedAreasL2, impactMetricsL3, performanceMonitoringL3, continuousMonitoringL4 |
| Become a Human-AI Delivery Hub | Intelligent by Design | Secure Platforms | reusableAssetsL2, reusableCapabilitiesL3, environmentReliability, platformAdaptivity |
| Become a Human-AI Delivery Hub | Intelligent by Design | Tribe Enablement | connectedSystems |

### 2.3 Domain 3: People (How Our People Grow & Win)
Focuses on mindset, talent, and leadership.

| Strategic Stage | Category | Subcategory | Key Fields |
|-----------------|----------|-------------|------------|
| Sense, Benchmark & Position | AI Enhances People | Strengthen Training | aiAwareness, adoptionBarriers |
| Sense, Benchmark & Position | AI Enhances People | Develop Fresh AI Talent | aiLiteracy, broaderAdoptionBarriers |
| Sense, Benchmark & Position | AI Enhances People | Equip Managers to Win | — |
| Scale & Differentiate | Upskilling & Right Sourcing | Intelligent Staffing | — |
| Scale & Differentiate | Upskilling & Right Sourcing | Champion & Mentor Networks | remainingBarriersL2 |
| Scale & Differentiate | Upskilling & Right Sourcing | Build Manager Fluency | automationMaturity, evaluatingQuality |
| Become a Human-AI Delivery Hub | Superminds (Human + AI) | Next-Gen Roles | — |
| Become a Human-AI Delivery Hub | Superminds (Human + AI) | Performance Management | operationalAiCapability, limitationsRiskEval |
| Become a Human-AI Delivery Hub | Superminds (Human + AI) | Strong Leadership | preparednessAdaptive, improvingAiDecisions |

---

## 3. Maturity Level Mapping (L0 → L4)

| Level | Label | Primary Stage Focus |
|-------|-------|---------------------|
| L0 — No AI | No AI Usage | Sense, Benchmark & Position (baseline only) |
| L1 — Individual | Individual AI Use | Sense, Benchmark & Position (initial capability) |
| L2 — Connected | Connected Workflows | Scale & Differentiate (process integration) |
| L3 — Orchestrated | Orchestrated Systems | Scale & Differentiate + Deliver Hub (systemic) |
| L4 — Adaptive | Adaptive / Autonomous Operations | Become a Human-AI Delivery Hub (full realization) |

---

## 4. UI Implementation

### 4.1 DomainCards Matrix Component
Renders a `3 × 3` matrix: 3 domains as rows × 3 strategic stages as columns. Each cell shows category name and subcategory list. Subcategories show a completion indicator (green checkmark) when their associated fields are filled.

### 4.2 Question Grouping in SurveyView
Questions within each maturity level are grouped by domain. Each domain group is rendered as a card with the domain title and all its questions for that level.

### 4.3 Data Structures
- `domains[]` in `levelConfig.js` — single source of truth for domain structure
- `strategicStages[]` in `levelConfig.js` — single source of truth for stage definitions
- `SECTION_QUESTIONS` in `questions.js` — each question carries `domain` and `subcategory`

---

## 5. Acceptance Criteria

- [x] All 3 Domains present in UI and data structure (`clientCentric`, `operatingModel`, `people`)
- [x] All 3 Strategic Stages defined (`sbp`, `sd`, `dh`)
- [x] DomainCards matrix renders 3×3 grid with completion indicators
- [x] All questions from PRD-004 mapped to domain + subcategory
- [x] Survey flow remains: Metadata → AI Detection → Domain-grouped Branch Questions → Final Questions
- [x] Needs Validation path unaffected by domain restructuring
- [x] Build passes with zero lint errors
- [x] No runtime crashes when selecting AI usage level

---

## 6. Known Gaps (Future PRDs)

- Some subcategories have no associated questions yet (marked `—` in tables above): "IP - Reusable Accelerators," "Equip Managers to Win," "Intelligent Staffing," "Next-Gen Roles," etc.
- `equipManagers` field referenced in `levelConfig.js` but not initialized in `formConfig.js` — requires cleanup (ADR-003 candidate).
- JSON export format not yet defined for the 3-domain output structure.
- Dashboard view does not yet reflect domain breakdown — aggregation by domain pending.
- PRD-006 adds new stakeholder requirements: Not Applicable / negative diagnostic responses, Other-to-Notes rename, Notes as informational-only, team-level assessment evaluation, and Services / Products preload evaluation.

---

## 7. Related Documents

- ADR-001: Removal of Pillar-Based Categorization
- ADR-002: Client-Centric Domain Model
- PRD-004: Enterprise Assessment Redesign (superseded pillar structure)
- RCA-001: Blank Page Crash — Missing levelConfig Exports
