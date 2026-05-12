# Question Matrix

**Project:** AI Operations Baseline Assessment
**Source:** `src/data/questions.js`
**Last Updated:** 2026-05-12

Complete reference of all survey questions, organized by maturity level and domain.

---

## Reading This Document

| Column | Meaning |
|--------|---------|
| **Field** | Key in `initialForm` — used for state storage |
| **Domain** | `clientCentric` / `operatingModel` / `people` |
| **Type** | `select` (single), `toggle` (multi), `textarea`, `input` |
| **Options** | Available answer choices |

---

## LEVEL 0 — No AI Usage (`no-ai`)

*Triggered by: "No AI usage identified"*
*Questions: 4 + 1 evidence = 5 total*

### Domain: People

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `aiAwareness` | What is the current AI awareness level within the team? | select | No awareness · Basic awareness |
| `adoptionBarriers` | What barriers currently prevent AI adoption? | toggle | Lack of training · Unclear business value · Security concerns · No approved tools · Client restrictions · Resistance to change · Data quality · Lack of governance |

### Domain: Client Centric Approach

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `workflowExecution` | How is the workflow currently executed? | select | Fully manual · Traditional tools only · Rule-based automation only |
| `potentialAiBenefits` | Which process areas could potentially benefit from AI? | toggle | Documentation · Reporting · Analysis · Classification · Communication · Monitoring · Decision support · Development · Testing · Governance · Other |

### Domain: Operating Model & Technology

| Field | Label | Type | — |
|-------|-------|------|---|
| `evidenceL0` | What evidence supports that this process has no AI usage today? | textarea | Free text |

---

## LEVEL 1 — Individual AI Use (`individual`)

*Triggered by: "AI is used informally by individuals"*
*Questions: 8 + 1 evidence = 9 total*

### Domain: People

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `aiLiteracy` | How would you describe AI literacy within the team? | select | Basic awareness · Moderate practical usage · Some individuals highly capable |
| `broaderAdoptionBarriers` | What barriers limit broader AI adoption? | toggle | Lack of training · Low confidence · Unclear process applicability · No internal champions · Resistance to change · Tool limitations |

### Domain: Client Centric Approach

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `aiIntegrationWorkflow` | How integrated is AI within the official workflow? | select | Personal productivity only · Isolated activities · Some repeatable individual usage |
| `individualAiActivities` | What individual AI activities are currently performed? | toggle | Writing / rewriting · Summarization · Brainstorming · Documentation · Reporting · Code assistance · Communication support · Basic analysis · Other |

### Domain: Operating Model & Technology

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `outputValidationL1` | How are AI outputs validated? | select | No validation · Informal human review · Peer review in some situations |
| `aiToolsUsed` | Which AI tools are currently used? | toggle | ChatGPT · Microsoft Copilot · GitHub Copilot · Claude · Gemini · Internal tools · Other |
| `infoSecurityClearance` | Are associates clear on what information can or cannot be entered into AI tools? | select | No · Somewhat · Yes |
| `governanceRisksL1` | What governance risks currently exist? | toggle | Invisible AI usage · Lack of validation · Sensitive data exposure · No traceability · No escalation path · Use of non-approved tools |
| `evidenceL1` | What evidence supports the detected maturity level? | textarea | Free text |

---

## LEVEL 2 — Connected Workflows (`connected`)

*Triggered by: "AI supports some defined workflow activities"*
*Questions: 11 + 1 evidence = 12 total*

### Domain: People

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `automationMaturity` | How mature is the team's understanding of process automation? | select | Emerging · Developing capability · Established |
| `evaluatingQuality` | Are teams capable of evaluating AI output quality? | select | No · Partially · Yes |
| `remainingBarriersL2` | What barriers remain to broader AI integration? | toggle | Skill gaps · Limited governance · Tool constraints · Data access limitations · Change management challenges |

### Domain: Client Centric Approach

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `workflowActivitiesL2` | Which workflow activities are AI-supported? | toggle | Intake · Classification · Analysis · Reporting · Documentation · Monitoring · Decision support · Communication |
| `aiIntegrationL2` | How integrated is AI across the workflow? | select | AI supports defined workflow steps · AI connects some activities together · AI partially supports operational flow |

### Domain: Operating Model & Technology

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `aiGovernanceL2` | How are AI activities governed? | select | Human validation required · Partial documented controls · Team-level responsible use practices |
| `sensitiveDataHandling` | How is sensitive data handled? | select | Basic guidance · Defined team practices · Partial standardization |
| `consistentValidation` | Is human validation applied consistently? | select | No · Partially · Yes — consistently |
| `reusableAssetsL2` | What reusable assets exist? | toggle | Templates · Prompt libraries · Knowledge bases · Connectors · Workflow automations · APIs · System integration · Agents · Monitoring Dashboard |
| `measurableImpactL2` | What measurable impact has AI produced on this process? | select | No impact identified · Perceived improvements only · Small local improvements · Measured operational improvements |
| `improvedAreasL2` | Which areas improved due to AI? | toggle | Productivity · Cycle time · Quality · Error reduction · Capacity · Customer experience · Compliance · Decision-making |
| `evidenceL2` | What evidence supports the detected maturity level? | textarea | Free text |

---

## LEVEL 3 — Orchestrated Systems (`orchestrated`)

*Triggered by: "AI is integrated across multiple workflow steps"*
*Questions: 14 + 1 evidence = 15 total*

### Domain: People

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `operationalAiCapability` | How mature is operational AI capability in the team? | select | High · Advanced operational capability |
| `limitationsRiskEval` | How effectively can teams evaluate AI limitations and risks? | select | Most teams understand limitations · Teams consistently evaluate outputs and risks |

### Domain: Client Centric Approach

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `connectedProcessSteps` | Which process steps are connected through AI? | toggle | Intake · Classification · Analysis · Reporting · Documentation · Monitoring · Decision support · Communication · Quality review · Prioritization · Other |

### Domain: Operating Model & Technology

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `connectedSystems` | Which systems or tools does the AI-enabled workflow connect with? | toggle | CRM systems · ERP systems · Ticketing tools · Data warehouses · Communication platforms · APIs / middleware · Workflow automation tools · Databases · Other |
| `operationalImpactMeasurement` | How is AI impact measured operationally? | select | Informally tracked · Measured with operational metrics · Measured with KPIs and SLAs |
| `governanceControlsL3` | Which governance controls are implemented? | toggle | Human validation · Audit trail · Approval workflows · Risk documentation · Traceability · Monitoring · Escalation procedures · Other |
| `auditableOutputs` | Are AI outputs traceable or auditable? | select | No · Partially · Yes — consistently |
| `riskManagementL3` | Are risks documented and actively managed? | select | No · Informally · Yes — formally |
| `approvalCriteria` | Are approval criteria defined for AI-generated outputs or actions? | select | No · Partially defined · Yes — formally defined |
| `reusableCapabilitiesL3` | Which reusable enterprise capabilities exist? | toggle | APIs · Agents · Enterprise integrations · Shared orchestration workflows · Monitoring dashboards · Other |
| `environmentReliability` | How reliable is the technical environment? | select | Reliable and repeatable · Operationally scalable |
| `impactMetricsL3` | Which metrics are used to measure impact? | toggle | Cycle time · Error rate · Quality score · Productivity · Cost savings · Customer satisfaction · SLA adherence · Other |
| `performanceMonitoringL3` | Is performance of the AI-supported workflow monitored? | select | No · Ad hoc · Yes — systematically |
| `missingForAdaptive` | What is missing to move this process toward adaptive or autonomous operations? | toggle | Autonomous decision logic · Self-monitoring workflows · Agentic orchestration · Continuous learning capability · Enterprise-wide integration · Advanced governance controls · Real-time data access · Other |
| `evidenceL3` | What evidence supports the detected maturity level? | textarea | Free text |

---

## LEVEL 4 — Adaptive / Autonomous Operations (`adaptive`)

*Triggered by: "AI operates adaptive or autonomous activities"*
*Questions: 11 + 1 evidence = 12 total*

### Domain: People

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `preparednessAdaptive` | How prepared are teams to operate adaptive AI workflows? | select | Advanced · AI-native operational capability |
| `improvingAiDecisions` | How actively do teams improve AI-supported decisions? | select | Teams validate and improve workflows · Teams continuously optimize AI decisions |

### Domain: Client Centric Approach

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `aiAutonomyLevel` | What level of autonomy does AI have in this process? | select | AI recommends actions · AI executes some actions autonomously · AI adapts operational behavior dynamically |
| `aiActionsInProcess` | What actions can AI perform in the process? | toggle | Route or classify items · Generate outputs · Trigger workflows · Notify stakeholders · Make decisions within defined parameters · Monitor and alert · Adapt behavior based on feedback · Other |

### Domain: Operating Model & Technology

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `advancedTechCapabilities` | Which advanced technology capabilities support this process? | toggle | Agentic orchestration platform · Real-time data pipelines · Model fine-tuning · RAG (Retrieval-Augmented Generation) · Vector databases · Custom evaluation harness · Autonomous decision routing · Multi-model AI · Other |
| `humanOversightRequired` | Where is human oversight required? | toggle | Final approval · Exception handling · Risk escalation · Quality review · Strategic decisions · Override / correction · Other |
| `advancedGovernanceL4` | Which advanced governance capabilities exist? | toggle | Continuous monitoring · Automated controls · Auditability · Confidence thresholds · Escalation automation · Human override · Risk lifecycle management · Other |
| `continuousMonitoringL4` | Is performance monitored continuously? | select | No · Partially · Yes — continuously |
| `humanOverrideMechanism` | Is there a human override mechanism? | select | No · Available but rarely used · Yes — clearly defined and tested |
| `escalationPathsL4` | Are escalation paths defined for incorrect or risky AI actions? | select | No · Partially · Yes — clearly defined |
| `platformAdaptivity` | How adaptive is the platform ecosystem? | select | AI integrated enterprise-wide · AI-enabled continuous optimization · Adaptive operational architecture |
| `evidenceL4` | What evidence supports the detected maturity level? | textarea | Free text |

---

## NEEDS VALIDATION PATH

*Triggered by: "Not sure"*
*Questions: 5 total (no domain grouping)*

| Field | Label | Type | Options |
|-------|-------|------|---------|
| `validationUncertainty` | Why are you unsure whether AI is used in this process? | select | No AI tools are available · I don't know enough about the process · Usage may be informal or hidden · The process is new · Other |
| `aiOutputsSeen` | Have you seen any AI-generated outputs or workflow assistance? | select | No · Yes — occasionally · Yes — regularly |
| `validationContact` | Who could confirm current AI usage? | input | Free text (Name, role, or team) |
| `reviewRequired` | Should this process be reviewed with the process owner? | select | No · Possibly · Yes — recommended |
| `validationContext` | Additional context | textarea | Free text |

---

## Question Count Summary

| Level | Section | Select | Toggle | Textarea | Total Questions |
|-------|---------|--------|--------|----------|-----------------|
| L0 | no-ai | 3 | 1 | 1 | **5** |
| L1 | individual | 5 | 3 | 1 | **9** |
| L2 | connected | 6 | 5 | 1 | **12** |
| L3 | orchestrated | 8 | 6 | 1 | **15** |
| L4 | adaptive | 8 | 3 | 1 | **12** |
| Validation | needs-validation | 3 | 0 | 1 + 1 input | **5** |
| **Total** | | **33** | **18** | **5+1** | **58** |

---

## Domain Question Distribution per Level

| Domain | L0 | L1 | L2 | L3 | L4 |
|--------|----|----|----|----|----|
| People | 2 | 2 | 3 | 2 | 2 |
| Client Centric | 2 | 2 | 2 | 1 | 2 |
| Operating Model | 1* | 5 | 7 | 12 | 8 |

*L0 Operating Model = evidence textarea only

---

## Scoring Signal Fields

These fields in the Question Matrix are used as supplementary scoring signals in `calculateLevel()`:

| Field | Level | Signal Condition | Score Effect |
|-------|-------|-----------------|--------------|
| `consistentValidation` | L2 | = "Yes — consistently" | +0.5 (if score < 3) |
| `measurableImpactL2` | L2 | = "Measured operational improvements" | +0.5 (if score < 3) |
| `governanceControlsL3` | L3 | .length >= 4 | +0.5 (if score < 4) |
| `advancedTechCapabilities` | L4 | .length >= 4 | +0.5 (if score < 4) |
| `connectedProcessSteps` | L3 | .length >= 4 | +0.5 (if score < 3) |
