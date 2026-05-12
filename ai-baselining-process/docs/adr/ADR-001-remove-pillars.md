# ADR-001: Removal of Pillar-Based Categorization

## Status
Accepted

## Date
2026-05-12

## Context
The AI Operations Baseline App originally grouped assessment questions into four distinct pillars:
1. AI Literacy & Readiness
2. Operational Process AI Integration
3. AI Governance
4. Technology & Data Enablement

This structure was displayed via "Dimension Cards" at the top of the survey and as accordion-style groupings in the form. The user requested a refactor to remove these specific pillars to simplify the user experience and flatten the assessment flow in preparation for the adoption of the 3-domain Client-Centric framework (see ADR-002).

## Decision
Removed the four-pillar categorization model. The assessment transitioned to a unified flow where questions are presented sequentially based on the maturity path, without explicit pillar-based grouping.

Key changes implemented:
- Removed `DimensionCards` component from the header area.
- Flattened the `PILLAR_QUESTIONS` data structure in `src/data/questions.js` into `SECTION_QUESTIONS`.
- Removed `PillarSection` component in favour of direct question rendering grouped by domain.
- Removed `pillarActive` tracking logic from `App.jsx`.
- All 30+ questions from PRD-004 preserved.
- Branching logic (Level 0–4) maintained intact.

## Alternatives Considered
- **Renaming Pillars:** Rejected — user explicitly requested removal, not renaming.
- **Dynamic Pillars:** Too complex for the current front-end-only scope.

## Consequences

### Positive
- Reduced UI complexity.
- Faster survey completion perception (less scrolling through categories).
- Simplified data management in the `SECTION_QUESTIONS` map.
- Enabled clean migration to the 3-domain framework (ADR-002).

### Negative
- Loss of pillar-based progress tracking granularity.
- Completion percentage no longer weighted by pillar.

## Implementation
- Commit: `009939e` — Refactor: Remove pillar-based categorization and flatten assessment flow as per ADR-001
- Branch: `refactor/remove-pillars` → merged to `develop`

## Compliance
- All 30+ questions from PRD-004 verified present in new flat structure.
- Branching logic (Level 0–4) confirmed intact.
- Build passes with zero lint errors post-implementation.
