# Director and Services/Products Catalog Specification

**Status:** Draft
**Mode:** PLANNING
**Role:** Architect
**Last Updated:** 2026-05-14
**Related PRD:** `docs/requirements/PRD-006-team-level-assessment-and-notes.md`

---

## Objective

Add Director and Service/Product metadata to the AI Operations Baseline survey so every assessment can be associated with the selected Tribe's Director and relevant Service/Product catalog entries without changing maturity logic.

---

## Requirements

- The survey must include a Director field.
- The survey must include a Service/Product field.
- Director must be automatically populated based on selected Tribe.
- Services/Products must be filtered based on selected Tribe.
- Director and Service/Product must be saved with the survey.
- Director and Service/Product must be shown when viewing or editing a survey.
- Director and Service/Product must be shown in survey output/details if applicable.
- Director and Service/Product must not affect scoring, maturity classification, branching logic, or output generation.
- The catalog must be seeded using the provided Tribe/Director/Services-Products business list.

---

## Director Mapping

| Tribe | Director |
|-------|----------|
| Client Services Tribe | Andrey Brenes |
| Automation Tribe | Jonathan Herrera |
| Infrastructure Tribe | Fernando Golcher |
| Development Tribe | Laura Monge |
| Implementations Tribe | Harold Castillo |
| Professional Services | Adrian Duarte |

---

## Services/Products Catalog

The Service/Product catalog is tribe-scoped reference data. For v1, it should remain static local configuration to preserve ADR-004 local-only architecture.

Required catalog shape:

| Field | Description |
|-------|-------------|
| `tribe` | Canonical Tribe label used by the survey |
| `director` | Director auto-populated for the Tribe |
| `servicesProducts` | List of selectable services/products for that Tribe |

The full Services/Products values were requested but are not present in the current repository context. Implementation must not invent business catalog entries; it must seed the catalog from the supplied business list once available.

---

## Acceptance Criteria

- [ ] Tribe options match the approved business list.
- [ ] Selecting a Tribe auto-populates Director.
- [ ] Director is persisted in survey state and output metadata.
- [ ] Service/Product options are filtered to the selected Tribe.
- [ ] Service/Product is persisted in survey state and output metadata.
- [ ] Changing Tribe clears an invalid Service/Product selection.
- [ ] Director and Service/Product appear in survey view/edit/details surfaces where metadata is displayed.
- [ ] Director and Service/Product do not affect `getCurrentSection()`.
- [ ] Director and Service/Product do not affect `calculateLevel()`.
- [ ] Director and Service/Product do not affect `computeDomainActive()`.
- [ ] Director and Service/Product do not affect maturity classification.
- [ ] Director and Service/Product are included only as metadata in generated/prepared output.
- [ ] No backend, API, or database is introduced for v1.

---

## Business Rules

- Director is derived from selected Tribe and should be read-only unless a future requirement approves manual override.
- Services/Products are filtered by selected Tribe.
- Service/Product must come from the approved catalog or a documented fallback such as `Unlisted / Not sure`.
- Director and Service/Product are metadata only.
- Director and Service/Product must not be scoring signals.
- Director and Service/Product must not determine branch routing.
- Director and Service/Product must not activate domains, quadrants, or maturity indicators.
- Catalog loading must remain local/static under ADR-004 unless a new ADR approves backend/API catalog loading.

---

## Open Questions

- What is the complete Services/Products list per Tribe?
- Are the canonical Tribe labels exactly the labels in the Director mapping?
- Should existing legacy Tribe labels be migrated or aliased?
- Should Director ever be manually overrideable?
- Should Service/Product be single-select or multi-select?
- Who owns future catalog updates?
