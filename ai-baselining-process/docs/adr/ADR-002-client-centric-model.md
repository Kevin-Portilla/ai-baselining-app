# ADR-002: Client-Centric Domain Model

## Status
Accepted

## Date
2026-05-12

## Context
Following the removal of the 4-pillar model (ADR-001), the project required a more strategic and client-focused organizational structure. The stakeholder provided a new framework based on three domains — "Client Centric Approach," "Operating Model & Technology," and "People" — organized across three strategic stages (Sense/Benchmark, Scale/Differentiate, Delivery Hub). This framework is defined in full in PRD-005.

## Decision
Implemented a hierarchical domain model that replaced the flattened question list with a structured categorization aligned to the provided framework.

Key architectural changes:
1. **Domain Entities:** Three core domains defined: `clientCentric`, `operatingModel`, and `people`.
2. **Metadata Hierarchy:** Each question is associated with a `domain`, a `subcategory`, and is surfaced under the correct strategic stage in the matrix UI.
3. **Data Schema Update:** `SECTION_QUESTIONS` restructured — each question object carries `{ id, domain, subcategory, label, type, field, options }`.
4. **UI Presentation:** `DomainCards` component renders the 3 × 3 matrix (3 domains × 3 strategic stages) with completion indicators per subcategory.
5. **levelConfig.js:** `domains` and `strategicStages` arrays added as the single source of truth for the matrix structure.

## Alternatives Considered
- **Keeping Flat List:** Rejected — stakeholder explicitly requested the structured 3-domain framework.
- **Using Tags Only:** Rejected — tags allow filtering but do not provide the hierarchical flow required for an enterprise assessment or the visual matrix representation.

## Consequences

### Positive
- Aligns assessment data with business strategy language.
- Provides clearer insights for executive reporting.
- Visual matrix (DomainCards) gives respondents orientation within the framework.
- Allows targeted upskilling and optimization recommendations per domain.

### Negative
- Increased complexity in the data layer (questions carry domain metadata).
- Required re-mapping of all 30+ questions to the new structure.
- `domainActive` computation in App.jsx must reference actual form fields — stale references cause runtime crashes (see RCA-001).

## Implementation
- PRD-005 defines full framework specification.
- Commit: `6aecd2e` — Feat: Integrate Client-Centric Operational Framework (3 Domains, 3 Strategic Stages) as per PRD-005
- Commit: `1839a54` — fix: restore missing levelConfig exports and repair runtime crashes

## Compliance
- All 3 domains (`clientCentric`, `operatingModel`, `people`) present in `levelConfig.js` `domains` array.
- All 3 strategic stages (`sbp`, `sd`, `dh`) defined in `strategicStages` array.
- Each question in `SECTION_QUESTIONS` carries `domain` and `subcategory` fields.
- The L0–L4 progression maintained within the domain structure.
- `DomainCards` matrix renders correctly with completion state derived from actual form field values.
