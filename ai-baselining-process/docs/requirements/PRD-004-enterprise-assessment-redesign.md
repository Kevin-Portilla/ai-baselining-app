# PRD-004: Enterprise Assessment Redesign

**Status:** Active  
**Version:** 1.0  
**Created:** 2026-05-11  
**Author:** Architect  
**Supersedes:** PRD-003

---

## 1. Overview

PRD-004 defines the complete enterprise redesign of the AI Operations Baseline Assessment survey application. It replaces the question logic, branching structure, form fields, and section organisation established in PRD-002 and PRD-003.

The redesign introduces:
- A 5-section global survey flow with a constrained maturity progression model
- Level-specific question sets (Levels 0–4) with no contradiction or drift between levels
- An expanded Needs Validation path
- A universal Final Questions section shown to all respondents
- Transition & Evidence subsections for every maturity level

---

## 2. Design Principles

### 2.1 Constrained Maturity Progression

Each maturity level exposes only the questions and option values appropriate to that level. Options available at Level 1 must not appear in Level 0, and options appropriate to Level 3 must not bleed into Level 2. This prevents respondents from selecting answers inconsistent with the detected level, eliminating logical contradictions in the resulting data.

### 2.2 Contradiction Prevention

No single form field can simultaneously hold values appropriate to two different maturity levels. Option arrays are scoped per level, and multi-select toggle grids are reset or replaced when the user changes their AI usage detection answer. Governance controls, technology capabilities, and integration scopes escalate progressively.

### 2.3 Scoring Compatibility

The classification engine maps the AI usage detection answer to a base maturity level (0–4 or needs-validation). Supplementary signals (governance controls, impact measurement, tech enablement, process steps) may nudge the recommended level upward by at most 0.5–1.0 points, capped at Level 4. This ensures that the detected level remains the dominant signal and that respondents cannot game the score through peripheral answers.

### 2.4 Executive Reporting Readiness

Every question in every level produces structured data (string or array) suitable for downstream aggregation into executive dashboards, heat maps, and maturity distribution reports. Evidence fields at every level provide qualitative anchoring for quantitative scores. Final Questions add a self-assessment layer that can be compared against the calculated score.

---

## 3. Global Survey Flow (5 Sections)

| Section | Description | Trigger |
|---------|-------------|---------|
| **Section 1 — Respondent & Process Metadata** | Tribe, role, process name, description, frequency, criticality, process type, client data flag, main systems | Always shown |
| **Section 2 — AI Detection** | AI usage selection, operational AI dependency | Always shown |
| **Section 3 — Dynamic Branch** | Level-specific pillar questions (0-4) or Needs Validation path | Shown after AI Detection answered |
| **Section 4 — Validation & Evidence** | Transition, evidence, and (for Needs Validation) uncertainty questions | Embedded in Section 3 per level |
| **Section 5 — Final Questions** | Universal self-assessment questions shown to all active respondents | Shown after Section 3 is active |

---

## 4. Section 1 — Respondent & Process Metadata

### 4.1 Fields

| Field | Type | Options / Constraints |
|-------|------|-----------------------|
| Tribe | Select | Implementation, Client Services, Development, Professional Services, Intelligent Automation, Infrastructure, Other |
| Role Type | Select | Associate / IC, Technical Lead, Project Manager / Scrum Master, Manager, Architect, Analyst, Support / Operations, Executive / Director, Other |
| Process Name | Text input | Free text |
| Process Type | Select | Customer-facing operations, Internal operations, Compliance / risk management, Product development, Support / service delivery, Other |
| Execution Frequency | Select | Daily, Weekly, Bi-weekly, Monthly, Quarterly, Ad hoc |
| Process Criticality | Select | Low, Medium, High, Business critical |
| Client Data Flag | Select | Yes — this process handles client or sensitive data; No — no sensitive data involved; Partially — some steps involve sensitive data |
| Main Systems | Text input | Free text (e.g. Salesforce, Jira, Power BI) |
| Brief Process Description | Textarea | Free text |

---

## 5. Section 2 — AI Detection

### 5.1 AI Usage (Primary Branching Signal)

| Option | Maps To |
|--------|---------|
| No AI usage identified | Level 0 — No AI Usage |
| AI is used informally by individuals | Level 1 — Individual AI Use |
| AI supports some defined workflow activities | Level 2 — Connected Workflows |
| AI is integrated across multiple workflow steps | Level 3 — Orchestrated Systems |
| AI operates adaptive or autonomous activities | Level 4 — Adaptive / Autonomous Operations |
| Not sure | Needs Validation |

### 5.2 Operational AI Dependency (Secondary Signal)

Free-select. Supplements the primary signal but does not override it.

| Option |
|--------|
| No dependency — process runs without AI |
| Individual productivity support only |
| Some workflow activities depend on AI |
| Multiple operational activities depend on AI |
| The process is designed around AI-driven execution |

---

## 6. Section 3 — Dynamic Branch

### 6.1 Level 0 — No AI Usage

**Pillar: AI Literacy & Readiness**

| Question | Type | Options |
|----------|------|---------|
| What is the current AI awareness level within the team? | Select | No awareness; Basic awareness |
| What barriers currently prevent AI adoption? | Toggle | Lack of training; Unclear business value; Security concerns; No approved tools; Client restrictions; Resistance to change; Data quality; Lack of governance |

**Pillar: Operational Process AI Integration**

| Question | Type | Options |
|----------|------|---------|
| How is the workflow currently executed? | Select | Fully manual; Traditional tools only; Rule-based automation only |
| Which process areas could potentially benefit from AI? | Toggle | Documentation; Reporting; Analysis; Classification; Communication; Monitoring; Decision support; Development; Testing; Governance; Other |

**Pillar: AI Governance**

| Question | Type | Options |
|----------|------|---------|
| Is there any possibility of informal or unreported AI usage in this process? | Select | No; Yes; Not sure |
| What governance risks are most concerning today? | Toggle | Invisible AI usage; Sensitive data exposure; No validation practices; Compliance concerns; Lack of traceability |

**Pillar: Technology & Data Enablement**

| Question | Type | Options |
|----------|------|---------|
| What AI capabilities currently exist? | Select | No AI tools; Isolated experimentation only |
| How prepared is process data for future AI usage? | Select | Not structured; Partially structured but inconsistent |

**Pillar: Evidence**

| Question | Type |
|----------|------|
| What evidence supports that this process has no AI usage today? | Textarea |

---

### 6.2 Level 1 — Individual AI Use

**Pillar: AI Literacy & Readiness**

| Question | Type | Options |
|----------|------|---------|
| How would you describe AI literacy within the team? | Select | Basic awareness; Moderate practical usage; Some individuals highly capable |
| What barriers limit broader AI adoption? | Toggle | Lack of training; Low confidence; Unclear process applicability; No internal champions; Resistance to change; Tool limitations |

**Pillar: Operational Process AI Integration**

| Question | Type | Options |
|----------|------|---------|
| What individual AI activities are currently performed? | Toggle | Writing / rewriting; Summarization; Brainstorming; Documentation; Reporting; Code assistance; Communication support; Basic analysis; Other |
| How integrated is AI within the official workflow? | Select | Personal productivity only; Isolated activities; Some repeatable individual usage |
| Is the impact of this AI usage measured? | Select | No; Informally; Partially |

**Pillar: AI Governance**

| Question | Type | Options |
|----------|------|---------|
| How are AI outputs validated? | Select | No validation; Informal human review; Peer review in some situations |
| Are associates clear on what information can or cannot be entered into AI tools? | Select | No; Somewhat; Yes |
| What governance risks currently exist? | Toggle | Invisible AI usage; Lack of validation; Sensitive data exposure; No traceability; No escalation path; Use of non-approved tools |

**Pillar: Technology & Data Enablement**

| Question | Type | Options |
|----------|------|---------|
| Which AI tools are currently used? | Toggle | ChatGPT; Microsoft Copilot; GitHub Copilot; Claude; Gemini; Internal tools; Other |
| How are prompts or outputs reused? | Select | No reuse; Individual informal reuse; Shared informally inside team |

**Pillar: Outcome & Value Measurement**

| Question | Type | Options |
|----------|------|---------|
| What measurable impact has AI produced so far? | Select | No impact identified; Perceived improvements only; Small local improvements |

**Pillar: Transition & Evidence**

| Question | Type | Options |
|----------|------|---------|
| What would help move this usage toward a more repeatable workflow? | Toggle | Define team standards; Create shared prompt templates; Run training program; Get manager sponsorship; Obtain tool access / licensing; Document the process; Establish peer knowledge sharing |
| What evidence supports the detected maturity level? | Textarea | — |

---

### 6.3 Level 2 — Connected Workflows

**Pillar: AI Literacy & Readiness**

| Question | Type | Options |
|----------|------|---------|
| How capable is the team at identifying operational AI opportunities? | Select | Moderate; High |
| What operational improvements have been observed? | Toggle | Faster execution; Reduced effort; Better quality; Reduced errors; Improved reporting; Better decision support |

**Pillar: Operational Process AI Integration**

| Question | Type | Options |
|----------|------|---------|
| Which workflow activities are AI-supported? | Toggle | Intake; Classification; Analysis; Reporting; Documentation; Monitoring; Decision support; Communication |
| How integrated is AI across the workflow? | Select | AI supports defined workflow steps; AI connects some activities together; AI partially supports operational flow |
| Are AI-supported steps repeatable across the team? | Select | No; Partially; Yes — consistently across the team |

**Pillar: AI Governance**

| Question | Type | Options |
|----------|------|---------|
| How are AI activities governed? | Select | Human validation required; Partial documented controls; Team-level responsible use practices |
| How is sensitive data handled? | Select | Basic guidance; Defined team practices; Partial standardization |
| Is human validation applied consistently? | Select | No; Partially; Yes — consistently |

**Pillar: Technology & Data Enablement**

| Question | Type | Options |
|----------|------|---------|
| What reusable assets exist? | Toggle | Templates; Prompt libraries; Knowledge bases; Connectors; Workflow automations |
| How prepared is the data environment? | Select | Organized for some use cases; Reliable for defined workflows |

**Pillar: Outcome & Value Measurement**

| Question | Type | Options |
|----------|------|---------|
| What measurable impact has AI produced on this process? | Select | No impact identified; Perceived improvements only; Small local improvements; Measured operational improvements |
| Which areas improved due to AI? | Toggle | Productivity; Cycle time; Quality; Error reduction; Capacity; Customer experience; Compliance; Decision-making |

**Pillar: Transition & Evidence**

| Question | Type | Options |
|----------|------|---------|
| What is missing to move this process toward an orchestrated system? | Toggle | System integrations; Automated data pipelines; Standardised tooling; Governance framework; Dedicated team roles; Consistent documentation; Performance measurement |
| What evidence supports the detected maturity level? | Textarea | — |

---

### 6.4 Level 3 — Orchestrated Systems

**Pillar: AI Literacy & Readiness**

| Question | Type | Options |
|----------|------|---------|
| How mature is operational AI capability in the team? | Select | High; Advanced operational capability |
| How effectively can teams evaluate AI limitations and risks? | Select | Most teams understand limitations; Teams consistently evaluate outputs and risks |

**Pillar: Operational Process AI Integration**

| Question | Type | Options |
|----------|------|---------|
| Which process steps are connected through AI? | Toggle | Intake; Classification; Analysis; Reporting; Documentation; Monitoring; Decision support; Communication; Quality review; Prioritization |
| Which systems or tools does the AI-enabled workflow connect with? | Toggle | CRM systems; ERP systems; Ticketing tools; Data warehouses; Communication platforms; APIs / middleware; Workflow automation tools; Databases |
| How is AI impact measured operationally? | Select | Informally tracked; Measured with operational metrics; Measured with KPIs and SLAs |

**Pillar: AI Governance**

| Question | Type | Options |
|----------|------|---------|
| Which governance controls are implemented? | Toggle | Human validation; Audit trail; Approval workflows; Risk documentation; Traceability; Monitoring; Escalation procedures |
| Are AI outputs traceable or auditable? | Select | No; Partially; Yes — consistently |
| Are risks documented and actively managed? | Select | No; Informally; Yes — formally |
| Are approval criteria defined for AI-generated outputs or actions? | Select | No; Partially defined; Yes — formally defined |

**Pillar: Technology & Data Enablement**

| Question | Type | Options |
|----------|------|---------|
| Which reusable enterprise capabilities exist? | Toggle | APIs; Agents; Enterprise integrations; Shared orchestration workflows; Monitoring dashboards |
| How reliable is the technical environment? | Select | Reliable and repeatable; Operationally scalable |

**Pillar: Outcome & Value Measurement**

| Question | Type | Options |
|----------|------|---------|
| Which metrics are used to measure impact? | Toggle | Cycle time; Error rate; Quality score; Productivity; Cost savings; Customer satisfaction; SLA adherence |
| Is performance of the AI-supported workflow monitored? | Select | No; Ad hoc; Yes — systematically |

**Pillar: Transition & Evidence**

| Question | Type | Options |
|----------|------|---------|
| What is missing to move this process toward adaptive or autonomous operations? | Toggle | Autonomous decision logic; Self-monitoring workflows; Agentic orchestration; Continuous learning capability; Enterprise-wide integration; Advanced governance controls; Real-time data access |
| What evidence supports the detected maturity level? | Textarea | — |

---

### 6.5 Level 4 — Adaptive / Autonomous Operations

**Pillar: AI Literacy & Readiness**

| Question | Type | Options |
|----------|------|---------|
| How prepared are teams to operate adaptive AI workflows? | Select | Advanced; AI-native operational capability |
| How actively do teams improve AI-supported decisions? | Select | Teams validate and improve workflows; Teams continuously optimize AI decisions |

**Pillar: Operational Process AI Integration**

| Question | Type | Options |
|----------|------|---------|
| What level of autonomy does AI have in this process? | Select | AI recommends actions; AI executes some actions autonomously; AI adapts operational behavior dynamically |
| What actions can AI perform in the process? | Toggle | Route or classify items; Generate outputs; Trigger workflows; Notify stakeholders; Make decisions within defined parameters; Monitor and alert; Adapt behavior based on feedback |
| Where is human oversight required? | Toggle | Final approval; Exception handling; Risk escalation; Quality review; Strategic decisions; Override / correction |

**Pillar: AI Governance**

| Question | Type | Options |
|----------|------|---------|
| Which advanced governance capabilities exist? | Toggle | Continuous monitoring; Automated controls; Auditability; Confidence thresholds; Escalation automation; Human override; Risk lifecycle management |
| Is performance monitored continuously? | Select | No; Partially; Yes — continuously |
| Is there a human override mechanism? | Select | No; Available but rarely used; Yes — clearly defined and tested |
| Are escalation paths defined for incorrect or risky AI actions? | Select | No; Partially; Yes — clearly defined |

**Pillar: Technology & Data Enablement**

| Question | Type | Options |
|----------|------|---------|
| Which adaptive capabilities exist? | Toggle | Agents; Autonomous workflows; Adaptive orchestration; Continuous learning systems; Enterprise monitoring |
| How adaptive is the platform ecosystem? | Select | AI integrated enterprise-wide; AI-enabled continuous optimization; Adaptive operational architecture |

**Pillar: Outcome & Value Measurement**

| Question | Type | Options |
|----------|------|---------|
| Can the process learn, improve, or adapt based on data or feedback? | Select | No; Partially; Yes — with feedback loops; Yes — with continuous improvement cycles |
| Which safeguards are in place? | Toggle | Human override; Confidence thresholds; Audit logging; Rollback capabilities; Anomaly detection; Performance benchmarking |

**Pillar: Evidence**

| Question | Type |
|----------|------|
| What evidence supports the detected maturity level? | Textarea |

---

## 7. Needs Validation Path

Triggered when the respondent selects "Not sure" on the AI usage question.

| Question | Type | Options |
|----------|------|---------|
| Why are you unsure whether AI is used in this process? | Select | No AI tools are available; I don't know enough about the process; Usage may be informal or hidden; The process is new; Other |
| Have you seen any AI-generated outputs or workflow assistance? | Select | No; Yes — occasionally; Yes — regularly |
| Who could confirm current AI usage? | Text input | Free text |
| Should this process be reviewed with the process owner? | Select | No; Possibly; Yes — recommended |
| Additional context | Textarea | Free text |

---

## 8. Section 5 — Final Questions (All Respondents)

Shown to all respondents once any maturity level or Needs Validation path is active.

| Question | Type | Options |
|----------|------|---------|
| Does the detected maturity level seem accurate? | Select | Yes — accurate; Partially accurate; No — too low; No — too high |
| Which dimension is strongest today? | Select | AI Literacy & Readiness; Operational Process AI Integration; AI Governance; Technology & Data Enablement |
| Which dimension is weakest today? | Select | AI Literacy & Readiness; Operational Process AI Integration; AI Governance; Technology & Data Enablement |
| What would be needed to move this process to the next maturity level? | Toggle | More training; Better tooling; Governance framework; Process documentation; Leadership support; Data readiness; Integration work; Dedicated budget |
| Should this process be considered for deeper assessment or scaling? | Select | No; Possibly; Yes — recommended |
| Additional comments or examples | Textarea | Free text |

---

## 9. New Form Fields (PRD-004 Additions)

The following fields are added to the form state in addition to all existing PRD-002 and PRD-003 fields:

**Level 0**
- `evidenceL0` — Textarea

**Level 1**
- `impactL1` — Select
- `dataAwarenessL1` — Select
- `transitionL1` — Toggle array
- `evidenceL1` — Textarea

**Level 2**
- `teamRepeatability` — Select
- `validationConsistency` — Select
- `transitionL2` — Toggle array
- `evidenceL2` — Textarea

**Level 3**
- `connectedSystems` — Toggle array
- `auditability` — Select
- `risksDocumented` — Select
- `approvalCriteria` — Select
- `impactMetrics` — Toggle array
- `performanceMonitored` — Select
- `transitionL3` — Toggle array
- `evidenceL3` — Textarea

**Level 4**
- `autonomyLevel` — Select
- `aiActions` — Toggle array
- `humanOversightAreas` — Toggle array
- `continuousMonitoring` — Select
- `humanOverride` — Select
- `escalationPaths` — Select
- `processAdaptation` — Select
- `safeguards` — Toggle array
- `evidenceL4` — Textarea

**Needs Validation**
- `validationUncertainty` — Select
- `aiOutputsSeen` — Select
- `reviewRequired` — Select
- `validationContext` — Textarea

**Final Questions**
- `maturityAccurate` — Select
- `strongestDimension` — Select
- `weakestDimension` — Select
- `nextLevelNeeds` — Toggle array
- `deeperAssessment` — Select
- `additionalComments` — Textarea

---

## 10. Scoring & Classification Logic

| Signal | Weight / Effect |
|--------|----------------|
| AI Usage selection | Primary. Directly maps to base level 0–4 or needs-validation. |
| humanValidation = "Formal and required" | +0.5 if current level < 3 |
| impactMeasured = "Yes, with defined metrics" | +0.5 if current level < 3 |
| governanceControls.length >= 4 | +0.5 if current level < 4 |
| techEnablement.length >= 4 | +0.5 if current level < 4 |
| processSteps.length >= 4 | +0.5 if current level < 3 |
| maturityOverride set | Overrides all other signals |

Maximum score: 4. All increments are capped.

---

## 11. Acceptance Criteria

- [ ] All 5 levels have distinct, non-overlapping option sets per pillar
- [ ] Needs Validation path shows 5 questions (uncertainty, outputs seen, contact, review, context)
- [ ] Final Questions section visible for all respondents once an active path is selected
- [ ] Evidence textarea present at every maturity level
- [ ] Transition toggle grid present at Levels 1, 2, 3 (named transitionL1/L2/L3)
- [ ] Level 4 shows Evidence section instead of Transition section
- [ ] All new form fields initialised in initialForm with correct default types (string "" or array [])
- [ ] pillarActive useMemo updated to reflect new fields
- [ ] Standalone Outcome section (PRD-003 JSX block) removed — Outcome is now embedded inside PILLAR_QUESTIONS for Levels 1–4
- [ ] Section 1 tribe name corrected to "Intelligent Automation"
- [ ] Section 1 role types, frequencies, and criticalities updated per PRD-004 spec
- [ ] Build passes with zero lint errors

---

## 12. Open Questions

- Whether `maturityOverride` UI should be surfaced in the right panel for assessors (deferred to PRD-005)
- Whether JSON export should include Final Questions in the export payload (deferred to PRD-005)
- Whether the completion percentage should weight Final Questions answers (deferred to PRD-005)
