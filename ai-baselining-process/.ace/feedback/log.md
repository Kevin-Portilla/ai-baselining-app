# Feedback Log

> Track issues, improvements, and learnings from AI-assisted development sessions.

*Last Updated: 2026-05-12*

---

## How to Use

1. Log incidents when prompts fail or produce incorrect output
2. Track improvements made to prompts/skills
3. Review periodically to identify patterns
4. Update .ace/ files based on learnings

---

## Log Entries

### Entry [2026-05-12-001]

**Date:** 2026-05-12
**Role:** Developer / Architect

#### Incident
Application rendered a blank white page on initial load and on every AI usage dropdown selection. Caused by three independent stale field reference bugs introduced during the pillar → domain refactor (PRD-005 / ADR-001 / ADR-002).

#### Root Cause
The refactor removed fields from `initialForm` in `formConfig.js` and removed exports from `levelConfig.js`, but did not audit all runtime references. Three locations called `.length` on `undefined` values, causing `TypeError` at first render. Six missing module exports caused `ClassificationCard` and `BranchingPreview` to fail silently.

#### Category
- [x] Standard Violation (BR-007: all field references must exist in initialForm)
- [ ] Prompt Failure
- [ ] Skill Gap
- [ ] Context Drift

#### Resolution
- Restored 6 missing exports to `levelConfig.js` (`sectionLabels`, `levelDescriptions`, `levelShortLabels`, `levelIcons`, `levelPillClass`, `branchingLevels`)
- Updated `domainActive` in `App.jsx` to reference current `initialForm` fields
- Updated `calculateLevel` in `maturity.js` to use current field names with `|| []` guards
- Fixed `DomainCards.jsx` to read `sub.fields` array (not `sub.field`)

#### Prevention
- BR-007 added to `.ace/knowledge/business-rules.md`
- RCA-001 documented in `docs/rca/RCA-001-blank-page-crash.md`
- Regression guard test added to backlog (ACTIVE_CONTEXT.md)
- E2E smoke test added to backlog

#### Impact
- **Severity:** Critical
- **Time Lost:** ~1 session hour

---

### Entry [2026-05-12-002]

**Date:** 2026-05-12
**Role:** Architect

#### Incident
Misinterpretation of "incorporate these approved questions" instruction. Initial response focused on verifying whether questions were present (they were), while the user expected a check AND confirmation that existing questions would be preserved — not replaced.

#### Root Cause
Ambiguous instruction: "incorporate" can mean "add missing" OR "verify alignment while preserving existing." Context was not fully clarified before responding.

#### Category
- [ ] Standard Violation
- [ ] Prompt Failure
- [x] Context Drift
- [ ] Skill Gap

#### Resolution
Clarified intent with the user, performed full comparison of approved question list against `SECTION_QUESTIONS`, confirmed all 48+ questions present with exact label and option matches. No changes needed.

#### Prevention
When "incorporate" appears in an instruction about adding content to an existing structure, clarify: (a) add missing, (b) replace with these, or (c) verify alignment. Ask before executing.

#### Impact
- **Severity:** Low
- **Time Lost:** ~5 minutes

---

### Entry [2026-05-12-003]

**Date:** 2026-05-12
**Role:** Developer

#### Incident
`equipManagers` field defined in `questions.js` and referenced in `levelConfig.js` + `App.jsx` `domainActive`, but never initialized in `formConfig.js` `initialForm`. Discovered during documentation audit.

#### Root Cause
Field was added to questions and the domain config but the corresponding `initialForm` entry was skipped — likely added in a rush without following the three-file sync rule.

#### Category
- [x] Standard Violation (BR-007)
- [ ] Prompt Failure
- [ ] Skill Gap
- [ ] Context Drift

#### Resolution
Deferred — currently masked by `|| ""` guard in SurveyView rendering. Added to ACTIVE_CONTEXT.md backlog.

#### Prevention
BR-007 covers this. During PRD cycles, always add new fields to `initialForm` at the same time as adding them to `questions.js` and `levelConfig.js`. Three files must stay in sync.

#### Impact
- **Severity:** Medium (no crash in current code due to guards, but controlled-component integrity is compromised)
- **Time Lost:** 0 (not yet fixed)

---

## Summary Statistics

| Category | Count | Last Occurrence |
|----------|-------|-----------------|
| Prompt Failure | 0 | — |
| Skill Gap | 0 | — |
| Standard Violation | 2 | 2026-05-12 |
| Context Drift | 1 | 2026-05-12 |

---

## Improvement Actions

| Action | Status | Date | Outcome |
|--------|--------|------|---------|
| Add BR-007 (field initialization rule) to business-rules.md | Done | 2026-05-12 | Prevents future stale reference crashes |
| Document RCA-001 in docs/rca/ | Done | 2026-05-12 | Root cause documented for future reference |
| Add regression guard to backlog | Pending | 2026-05-12 | — |
| Add E2E blank-page smoke test to backlog | Pending | 2026-05-12 | — |
| Fix equipManagers field initialization | Pending | 2026-05-12 | — |

---

## Patterns Identified

### Pattern 1: Stale Field References After Refactor
- **Frequency:** 1 incident (2026-05-12)
- **Trigger:** Removing a field from `initialForm` without auditing all references
- **Prevention:** Before any PR that removes/renames a field: `grep -r "fieldName" src/` and audit all three sync files (`formConfig.js`, `questions.js`, `levelConfig.js`)

### Pattern 2: Three-File Sync Gap
- **Frequency:** 2 incidents (2026-05-12)
- **Trigger:** Adding a question to `questions.js` without simultaneously updating `formConfig.js` and `levelConfig.js`
- **Prevention:** Treat field addition as a three-step atomic operation: (1) `initialForm`, (2) `SECTION_QUESTIONS`, (3) domain subcategory mapping

---

*Feedback Log — ACE-Framework v2.5.0 | AI Operations Baseline Assessment*
