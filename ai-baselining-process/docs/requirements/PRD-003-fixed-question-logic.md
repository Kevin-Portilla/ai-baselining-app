# PRD-003 — Fixed Question Logic: Maturity-Constrained Survey Redesign

**Version:** 1.0
**Status:** In Progress
**Author:** Paulo Solis / Claude Sonnet 4.6
**Created:** 2026-05-11
**References:** PRD-002-pillar-based-questions.md

---

## 1. Objective

Redesign the AI Operations Baseline survey to enforce a maturity-consistent question and answer experience. The redesign must:

1. **Maturity-consistent survey** — Questions and selectable options are scoped per maturity level. A respondent answering at Level 0 (No AI) cannot select answers that describe Level 3 or 4 behaviors, preventing logical contradictions.
2. **Constrained progression** — Option sets within each pillar section are filtered to answers that are plausible at the declared maturity level. This avoids the "all options on every screen" problem from PRD-002.
3. **Contradiction prevention** — Cross-section drift is eliminated. The same field (e.g., `literacyAwareness`) shows different options depending on which maturity path is active.
4. **Operational scoring (dual-signal)** — The scoring model gains a second signal: operational dependency on AI, not just integration level. Both signals inform the recommended classification.
5. **Outcome / Value section** — A new Outcome & Value Measurement section captures whether AI has produced measurable impact, and in which areas — across all non-validation levels.

---

## 2. 7-Section Global Flow

The survey now follows a structured 7-section flow:

| # | Section | Trigger |
|---|---------|---------|
| 1 | Process Metadata | Always visible |
| 2 | AI Detection (dual-signal) | Always visible |
| 3 | Dynamic Pillar Questions | Shown when AI usage is answered and not "Not sure" |
| 4 | Outcome & Value Measurement | Shown for all scored levels (0–4) |
| 5 | Needs Validation path | Shown when answer is "Not sure" |
| 6 | Recommended Classification (sidebar) | Always computed |
| 7 | Branching Logic Preview (sidebar) | Always visible |

---

## 3. New and Changed Fields per Section

### Section 1 — Process Metadata (new fields)

| Field | Type | Description |
|-------|------|-------------|
| `squad` | text | Team or squad name within the tribe |
| `processType` | select | Category of process (customer-facing, internal, compliance, etc.) |
| `clientData` | select | Whether the process handles client or sensitive data |
| `mainSystems` | text | Main platforms or systems used in the process |

**Option arrays:**

`processTypeOptions`:
- Customer-facing operations
- Internal operations
- Compliance / risk management
- Product development
- Support / service delivery
- Other

`clientDataOptions`:
- Yes — this process handles client or sensitive data
- No — no sensitive data involved
- Partially — some steps involve sensitive data

### Section 2 — AI Detection (new field)

| Field | Type | Description |
|-------|------|-------------|
| `aiDependency` | select | Operational dependency on AI for the process to function |

**Option array (`aiDependencyOptions`):**
- No dependency — process runs without AI
- Individual productivity support only
- Some workflow activities depend on AI
- Multiple operational activities depend on AI
- The process is designed around AI-driven execution

### Section 3 — Dynamic Pillar Questions

The pillar questions are fully replaced with level-constrained versions. See Section 4 (Maturity-Constrained Option Logic) for detail.

### Section 4 — Outcome & Value Measurement (new section)

| Field | Type | Description |
|-------|------|-------------|
| `outcomeImpact` | select | Type of measurable impact produced by AI on this process |
| `outcomeAreas` | toggle (multi) | Specific operational areas where improvement was observed |

**Option arrays:**

`outcomeImpactOptions`:
- No impact identified
- Perceived improvements only
- Small local improvements
- Measured operational improvements
- KPI or SLA impact
- Strategic business impact

`outcomeAreaOptions`:
- Productivity
- Cycle time
- Quality
- Error reduction
- Capacity
- Customer experience
- Compliance
- Decision-making

---

## 4. Maturity-Constrained Option Logic

Each pillar question exposes only the options appropriate for the active maturity level. The table below summarizes the constraint approach by level and pillar.

### Level 0 — No AI (section key: `no-ai`)

| Pillar | Field | Allowed Options |
|--------|-------|-----------------|
| Literacy — awareness | `literacyAwareness` | No awareness, Basic awareness |
| Literacy — barriers | `literacyBarriers` | Lack of knowledge/training, Unclear business value, Security/compliance concerns, No approved tools, Client restrictions, Resistance to change |
| Integration — scope | `integrationScope` | Fully manual, Traditional tools only, Rule-based automation only |
| Integration — benefit | `barriers` | Documentation, Reporting, Analysis, Classification, Communication, Monitoring, Decision support, Development, Testing, Governance |
| Governance — handling | `governanceDataHandling` | No governance defined, Informal awareness only |
| Governance — risks | `governanceRisks` | Invisible AI usage, Sensitive data exposure, No validation practices, Compliance concerns, Lack of traceability |
| Technology — tools | `integrationDocumentation` | No AI tools, Isolated experimentation only |
| Technology — data readiness | `technologyDataReadiness` | Not structured, Partially structured but inconsistent |

### Level 1 — Individual AI Use (section key: `individual`)

| Pillar | Field | Allowed Options |
|--------|-------|-----------------|
| Literacy — awareness | `literacyAwareness` | Basic awareness, Moderate practical usage, Some individuals highly capable |
| Literacy — barriers | `literacyBarriers` | Lack of training, Low confidence, Unclear process applicability, No internal champions, Resistance to change, Tool limitations |
| Integration — activities | `individualActivities` | Writing/rewriting, Summarization, Brainstorming, Documentation, Reporting, Code assistance, Communication support, Basic analysis |
| Integration — scope | `integrationScope` | Personal productivity only, Isolated activities, Some repeatable individual usage |
| Governance — validation | `humanValidation` | No validation, Informal human review, Peer review in some situations |
| Governance — risks | `governanceRisks` | Invisible AI usage, Lack of validation, Sensitive data exposure, No traceability, No escalation path |
| Technology — tools | `tools` | ChatGPT, Microsoft Copilot, Claude, Gemini, GitHub Copilot, Internal tools, Other |
| Technology — reuse | `technologyReuse` | No reuse, Individual informal reuse, Shared informally inside team |

### Level 2 — Connected Workflows (section key: `connected`)

| Pillar | Field | Allowed Options |
|--------|-------|-----------------|
| Literacy — awareness | `literacyAwareness` | Moderate, High |
| Literacy — improvements | `integrationImprovements` | Faster execution, Reduced effort, Better quality, Reduced errors, Improved reporting, Better decision support |
| Integration — steps | `processSteps` | Intake, Classification, Analysis, Reporting, Documentation, Monitoring, Decision support, Communication |
| Integration — scope | `integrationScope` | AI supports defined workflow steps, AI connects some activities together, AI partially supports operational flow |
| Governance — validation | `humanValidation` | Human validation required, Partial documented controls, Team-level responsible use practices |
| Governance — data | `governanceDataHandling` | Basic guidance, Defined team practices, Partial standardization |
| Technology — assets | `techEnablement` | Templates, Prompt libraries, Knowledge bases, Connectors, Workflow automations |
| Technology — data readiness | `technologyDataReadiness` | Organized for some use cases, Reliable for defined workflows |

### Level 3 — Orchestrated Systems (section key: `orchestrated`)

| Pillar | Field | Allowed Options |
|--------|-------|-----------------|
| Literacy — awareness | `literacyAwareness` | High, Advanced operational capability |
| Literacy — evaluation | `integrationDocumentation` | Most teams understand limitations, Teams consistently evaluate outputs and risks |
| Integration — scope | `integrationScope` | AI supports multiple workflow steps, AI integrates with systems and data sources, AI enables measurable operational workflows |
| Integration — impact | `impactMeasured` | Informally tracked, Measured with operational metrics, Measured with KPIs and SLAs |
| Governance — controls | `governanceControls` | Human validation, Audit trail, Approval workflows, Risk documentation, Traceability, Monitoring, Escalation procedures |
| Governance — risk management | `governanceRiskManagement` | Documented and reviewed, Continuously managed operationally |
| Technology — assets | `techEnablement` | APIs, Agents, Enterprise integrations, Shared orchestration workflows, Monitoring dashboards |
| Technology — integration | `technologyEnterpriseIntegration` | Reliable and repeatable, Operationally scalable |

### Level 4 — Adaptive / Autonomous Operations (section key: `adaptive`)

| Pillar | Field | Allowed Options |
|--------|-------|-----------------|
| Literacy — awareness | `literacyAwareness` | Advanced, AI-native operational capability |
| Literacy — decision quality | `integrationDocumentation` | Teams validate and improve workflows, Teams continuously optimize AI decisions |
| Integration — scope | `integrationScope` | AI recommends actions, AI executes some actions autonomously, AI adapts operational behavior dynamically |
| Integration — oversight | `humanOversight` | textarea (free text) |
| Governance — controls | `governanceControls` | Continuous monitoring, Automated controls, Auditability, Confidence thresholds, Escalation automation, Human override, Risk lifecycle management |
| Governance — compliance | `governanceRiskManagement` | Continuously monitored, Embedded operationally, Adaptive risk management |
| Technology — capabilities | `techEnablement` | Agents, Autonomous workflows, Adaptive orchestration, Continuous learning systems, Enterprise monitoring |
| Technology — platform | `technologyEnterpriseIntegration` | AI integrated enterprise-wide, AI-enabled continuous optimization, Adaptive operational architecture |

---

## 5. Outcome / Value Section Requirement

The Outcome & Value Measurement section must:

- Be rendered for **all maturity levels 0–4** when a usage path is active.
- Be **suppressed** for the `needs-validation` path (no scoring can be applied).
- Capture two data points:
  1. **Impact level** (`outcomeImpact`) — what measurable impact AI has produced.
  2. **Impact areas** (`outcomeAreas`) — which operational dimensions improved.
- Be placed **after all pillar question sections** and **before** the Needs Validation section.
- Use `FormSelect` for `outcomeImpact` and `ToggleGrid` for `outcomeAreas`.

---

## 6. Scoring Change — Dual-Signal: AI Integration + Operational Dependency

### Previous scoring model (single-signal)

The previous `calculateLevel` function used `aiUsage` as the base level and applied incremental boosts from governance, measurement, and technology indicators.

### New scoring model (dual-signal)

The recommended classification is informed by two independent signals:

| Signal | Source field | Description |
|--------|-------------|-------------|
| AI Integration Level | `aiUsage` → `usageToLevel` | Self-reported usage pattern (base level) |
| Operational Dependency | `aiDependency` | How dependent the process is on AI to function |

**Dual-signal interpretation:**
- If both signals indicate a high level, the classification is confirmed at that level.
- If the dependency signal is significantly lower than the integration signal, a flag or adjusted recommendation may be applied (future enhancement).
- The dependency signal will be used to differentiate processes where AI is "used but optional" from processes where AI is "required for operation."

**Updated `aiUsageOptions` (clearer signal language):**
- No AI usage identified
- AI is used informally by individuals
- AI supports some defined workflow activities
- AI is integrated across multiple workflow steps
- AI operates adaptive or autonomous activities
- Not sure

**Updated `usageToLevel` mapping:**
- "No AI usage identified" → "0"
- "AI is used informally by individuals" → "1"
- "AI supports some defined workflow activities" → "2"
- "AI is integrated across multiple workflow steps" → "3"
- "AI operates adaptive or autonomous activities" → "4"
- "Not sure" → "needs-validation"

---

## 7. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|-------------|
| AC-001 | Section 1 displays squad, processType, clientData, and mainSystems fields | Visual inspection |
| AC-002 | Section 2 displays aiDependency as a second AI detection question | Visual inspection |
| AC-003 | aiUsageOptions uses new constrained language | Code review |
| AC-004 | usageToLevel maps new options correctly | Unit test / manual verification |
| AC-005 | PILLAR_QUESTIONS keys (no-ai, individual, connected, orchestrated, adaptive) each contain exactly 4 pillars | Code review |
| AC-006 | Each pillar at each level only exposes options valid for that level (no cross-level drift) | Manual test each level |
| AC-007 | Outcome & Value section appears for levels 0–4, not for needs-validation | Manual test |
| AC-008 | outcomeImpact and outcomeAreas are captured in form state | State inspection |
| AC-009 | completion useMemo includes squad, processType, clientData, mainSystems, aiDependency | Code review |
| AC-010 | pillarActive.integration tracks outcomeAreas and outcomeImpact | Code review |
| AC-011 | Build passes without lint errors | npm run lint + npm run build |
| AC-012 | All existing fields remain in initialForm (no regressions) | Code review |

---

## 8. Out of Scope (PRD-003)

- Backend persistence
- Export functionality changes
- Scoring algorithm overhaul beyond dual-signal introduction
- Visual redesign of the classification card
- Mobile responsiveness changes
