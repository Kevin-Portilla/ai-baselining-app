# Changelog

All notable changes to the AI Operations Baseline Assessment are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-05-12

### Added
- Process Metadata Form: tribe, role, process type, name, frequency, criticality, data classification, systems, description (FEAT-001)
- AI Maturity Branching Survey: 5-level assessment (L0–L4) with domain-grouped question sets (FEAT-002)
- Client-Centric Domain Matrix: 3×3 visual matrix with completion indicators (FEAT-003, PRD-005)
- Needs Validation Path: 5-question escalation for uncertain AI usage (FEAT-004)
- Real-Time Classification Card: live recommended maturity level with animated pill (FEAT-006)
- Dashboard View: Recharts aggregate visualization of 50-process sample dataset (FEAT-005)
- CI/CD: GitHub Actions lint + build pipeline
- ACE-Framework v2.5.0 documentation layer
- 48+ approved survey questions across all maturity levels
- 3 domains × 3 strategic stages framework (PRD-005)
- `branchingLevels`, `levelPillClass`, `levelIcons`, `levelShortLabels`, `levelDescriptions`, `sectionLabels` exports to `levelConfig.js`

### Changed
- Replaced 4-pillar model with 3-domain Client-Centric framework (ADR-001, ADR-002)
- Flattened `PILLAR_QUESTIONS` → `SECTION_QUESTIONS` in `questions.js`
- Refactored `App.jsx` into modular component/view/logic/data structure
- Tribe name corrected: "Intelligent" → "Intelligent Automation"

### Fixed
- Blank page on initial load caused by missing `levelConfig.js` exports (RCA-001)
- Blank page on AI usage selection caused by `calculateLevel()` calling `.length` on undefined fields (RCA-001)
- Blank page caused by `domainActive` referencing stale removed field names (RCA-001)
- Domain completion indicators broken — `sub.field` → `sub.fields` array (RCA-001)
- CI lint failure — removed unused `React`, `FINAL_QUESTIONS`, `sectionLabels` imports

---

## [0.3.0] — 2026-05-11

### Added
- Enterprise Assessment Redesign: 5-section survey flow (PRD-004)
- Constrained maturity progression — option sets scoped per level
- Evidence textarea at every maturity level (L0–L4)
- Needs Validation path expanded to 5 questions
- 30+ new form fields added to `initialForm`
- Transition & Evidence subsections for L1–L3

---

## [0.2.0] — 2026-04

### Added
- Pillar-based question structure: 4 pillars per maturity level (PRD-002)
- Dual AI detection signals (primary + secondary) (PRD-003)
- Maturity scoring logic with supplementary signal nudges
- Outcome & Value Measurement section
- Standalone outcome JSX block

---

## [0.1.0] — 2026-03

### Added
- Initial React + Vite project scaffold
- Basic survey form with AI usage branching
- Initial App.jsx from ChatGPT prototype
- ACE-Framework v2.5.0 initialized
- GitHub repository created (`paulosolis-ai/ai-baselining-app`)
