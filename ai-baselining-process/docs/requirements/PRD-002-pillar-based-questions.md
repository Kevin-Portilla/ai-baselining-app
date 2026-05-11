# Product Requirements Document: Pillar-Based Questions per Maturity Level

> **Status:** Approved
> **Author:** Paulo Solis / Claude Sonnet 4.6
> **Last Updated:** 2026-05-10
> **Stakeholders:** Intelligence Automation Team, AI Operations Practice

---

## Executive Summary

The AI Operations Baseline survey currently presents flat toggle-grid questions when a user selects a maturity level. This PRD defines the requirement to restructure those branching questions into 4 framework pillars — AI Literacy & Readiness, Operational Process AI Integration, AI Governance, and Technology & Data Enablement — with level-specific questions per pillar. This enables structured, dimension-aware assessment aligned to the AI maturity framework matrix.

---

## Problem Statement

### Current State
When a respondent selects an AI usage level, the form shows a flat list of toggle-grid questions without any structural grouping. Questions across different dimensions (literacy, integration, governance, technology) are mixed together, making it difficult to understand what aspect of the process each question addresses.

### Pain Points
- Respondents cannot tell which dimension a question belongs to
- Assessors cannot compare pillar-specific maturity across processes
- The flat structure does not reflect the 4-pillar framework that underlies the maturity model
- Question coverage is uneven — some pillars are over-represented, others absent for certain levels

### Impact
Without pillar grouping, the tool cannot produce dimension-level insights. Every process gets scored holistically but not broken down by pillar, which limits actionability of the assessment output.

---

## Goals

### Primary Goals
1. Restructure every branching section (Levels 0–4) to show questions grouped by 4 pillars
2. Ensure each pillar × level combination has at least one meaningful question grounded in the framework matrix
3. Preserve all existing option arrays and form fields — no regressions

### Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Pillar visibility | 0 of 4 | 4 of 4 | UI inspection per level |
| Questions per level | Flat list | 4 pillar sections | Code review |
| Build success | Passing | Passing | `npm run build` |

### Non-Goals
- Backend persistence or API integration
- Per-pillar scoring algorithm changes
- Multi-page form layout
- Export format changes

---

## User Stories

### Persona: Process Assessor

**As a** process assessor conducting an AI maturity baseline
**I want to** see questions organized by the 4 framework pillars for the maturity level I selected
**So that** I can provide structured, dimension-aware answers that reflect the actual state of each pillar

**Acceptance Criteria:**
- [ ] Each maturity level section (0–4) shows exactly 4 pillar groups
- [ ] Each pillar group has a visible header with icon and title
- [ ] Questions within each pillar are relevant to that level's framework description
- [ ] The Needs Validation path is unchanged

### Persona: Program Lead / Reviewer

**As a** program lead reviewing baseline results
**I want to** see that each pillar was assessed at each maturity level
**So that** I can identify which specific dimensions are lagging and require enablement

**Acceptance Criteria:**
- [ ] Pillar headers clearly differentiate Literacy, Integration, Governance, and Technology
- [ ] Questions per pillar match the framework matrix for that level
- [ ] Form state captures pillar-specific field values

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-001 | Level 0 (No AI) — Literacy pillar shows questions about lack of AI awareness, understanding gaps | Must | |
| FR-002 | Level 0 — Integration pillar shows questions about manual/traditional execution, absence of AI in workflow | Must | |
| FR-003 | Level 0 — Governance pillar shows questions about invisible AI usage risk, absence of controls | Must | |
| FR-004 | Level 0 — Technology pillar shows questions about barriers to AI adoption | Must | Reuses `noAiBarriers` |
| FR-005 | Level 1 (Individual) — Literacy pillar shows questions about informal awareness and individual initiative | Must | |
| FR-006 | Level 1 — Integration pillar shows questions about isolated AI activities (writing, summarizing, etc.) | Must | Reuses `individualActivityOptions` |
| FR-007 | Level 1 — Governance pillar shows questions about individual-judgment controls and ad hoc validation | Must | |
| FR-008 | Level 1 — Technology pillar shows questions about tools in use and prompt/output reuse | Must | Reuses `aiToolOptions` |
| FR-009 | Level 2 (Connected) — Literacy pillar shows questions about practical AI opportunity identification | Must | |
| FR-010 | Level 2 — Integration pillar shows questions about defined AI-supported process steps | Must | Reuses `processStepOptions` |
| FR-011 | Level 2 — Governance pillar shows questions about basic review/validation practices | Must | |
| FR-012 | Level 2 — Technology pillar shows questions about partial reuse of prompts/templates/connectors | Must | Reuses `reusableAssetOptions` |
| FR-013 | Level 3 (Orchestrated) — Literacy pillar shows questions about role-based AI readiness and output evaluation | Must | |
| FR-014 | Level 3 — Integration pillar shows questions about multi-step AI workflow and measurable impact | Must | Reuses `processStepOptions` |
| FR-015 | Level 3 — Governance pillar shows questions about defined controls, traceability, and risk documentation | Must | Reuses `advancedControlOptions` |
| FR-016 | Level 3 — Technology pillar shows questions about reusable components and platform reliability | Must | Reuses `reusableAssetOptions` |
| FR-017 | Level 4 (Adaptive) — Literacy pillar shows questions about advanced AI readiness and decision validation | Must | |
| FR-018 | Level 4 — Integration pillar shows questions about agentic/autonomous workflow scope | Must | |
| FR-019 | Level 4 — Governance pillar shows questions about continuous/proactive governance and monitoring | Must | Reuses `advancedControlOptions` |
| FR-020 | Level 4 — Technology pillar shows questions about scalable platforms, enterprise integration, and learning | Must | Reuses `reusableAssetOptions` |
| FR-021 | Each pillar section renders with a distinct header: icon (blue square) + pillar title | Must | Matches dimension card style |
| FR-022 | Pillar sections are visually separated with spacing or subtle divider | Should | |
| FR-023 | All existing form fields and option arrays are preserved — no removals | Must | |
| FR-024 | 12 new form fields are added to `initialForm` for pillar-specific data | Must | See data model section |

### Non-Functional Requirements

| ID | Requirement | Target | Notes |
|----|-------------|--------|-------|
| NFR-001 | Build performance | `npm run build` passes with 0 errors | Verified after implementation |
| NFR-002 | Animation | AnimatePresence retained on branch section | No regression |
| NFR-003 | Visual consistency | Pillar icon style matches dimension cards | Blue bg square, same Icon component |

---

## Data Model Changes

### New fields added to `initialForm`

```js
// Literacy pillar
literacyAwareness: "",          // select — level of AI awareness in the team
literacyBarriers: [],           // toggle — knowledge/confidence barriers

// Integration pillar
integrationDocumentation: "",   // select — is AI usage documented
integrationScope: "",           // select — scope of AI in the workflow
integrationImprovements: [],    // toggle — measurable improvements observed

// Governance pillar
governanceRisks: [],            // toggle — known governance risks
governanceDataHandling: "",     // select — sensitive data handling approach
governanceRiskManagement: "",   // select — risk management maturity

// Technology pillar
technologyCurrentTools: [],     // toggle — AI tools currently in use
technologyDataReadiness: "",    // select — data readiness for AI
technologyReuse: "",            // select — reuse of prompts/templates/assets
technologyEnterpriseIntegration: "", // select — enterprise system integration level
```

All existing fields (`barriers`, `individualActivities`, `tools`, `processSteps`, `techEnablement`, `governanceControls`, `humanValidation`, `impactMeasured`, etc.) are preserved unchanged.

---

## User Experience

### User Flow

```
User selects AI usage level
    ↓
Form renders branching section for that level
    ↓
Section shows "Path: [Level Name]" header
    ↓
4 PillarSection components render in sequence:
  [1] AI Literacy & Readiness
  [2] Operational Process AI Integration
  [3] AI Governance
  [4] Technology & Data Enablement
    ↓
Each pillar shows its icon, title, and level-specific questions
    ↓
User answers questions (toggles, selects, or textareas)
    ↓
Recommended Classification panel updates
```

### Pillar Icon Mapping

| Pillar | Icon Key | Visual |
|--------|----------|--------|
| AI Literacy & Readiness | `brain` | "AI" |
| Operational Process AI Integration | `workflow` | "⚙" |
| AI Governance | `shield` | "✓" |
| Technology & Data Enablement | `database` | "▣" |

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| User switches maturity level | AnimatePresence transitions — new 4-pillar layout renders for new level |
| Needs Validation path | Unchanged amber warning block shown instead of pillar sections |
| "Other" toggle selected | Inline text input expands below grid (existing behavior retained) |

---

## Technical Considerations

### Dependencies
- Existing `Icon`, `ToggleGrid`, `FormSelect`, `AnimatePresence` components
- All existing option arrays (`noAiBarriers`, `individualActivityOptions`, `aiToolOptions`, `processStepOptions`, `reusableAssetOptions`, `advancedControlOptions`)
- New `PillarSection` component (defined in App.jsx alongside other sub-components)
- New `PILLAR_QUESTIONS` constant (defined in the Data section of App.jsx)

### Constraints
- No new npm packages
- No file splits — all code stays in App.jsx
- No backend — local state only
- Must not remove or rename any existing form fields

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Build failure due to JSX syntax error | M | H | Run `npm run build` after implementation |
| Existing field references broken | L | H | Preserve all field bindings, only add new ones |
| Visual inconsistency with existing style | L | M | Follow dimension card CSS conventions |

---

## Acceptance Criteria (Summary)

- [ ] All 5 branching sections (no-ai, individual, connected, orchestrated, adaptive) render 4 PillarSection components
- [ ] Each PillarSection has a blue-accented icon header matching dimension card style
- [ ] Questions per pillar match the framework matrix for the corresponding level
- [ ] `initialForm` includes all 12 new pillar-specific fields
- [ ] All existing fields and arrays are preserved
- [ ] `npm run build` completes with 0 errors
- [ ] Needs Validation section is unchanged
- [ ] AnimatePresence transition still applies to the branch section wrapper

---

## Appendix

### Glossary
| Term | Definition |
|------|------------|
| Pillar | One of the 4 framework dimensions: Literacy, Integration, Governance, Technology |
| PillarSection | React sub-component that renders a single pillar's header and questions |
| PILLAR_QUESTIONS | Constant mapping each maturity level section to its 4 pillar objects |
| Branching section | The conditional form area that changes based on selected AI usage level |

### References
- ACE Framework AI Maturity Model (internal)
- App.jsx — existing implementation
- PRD-template.md — document standard

---

*This PRD follows ACE-Framework documentation standards*
