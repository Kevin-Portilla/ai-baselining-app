# ADR-005: Support Team-Level AI Maturity Assessment

> **Status:** Proposed
> **Date:** 2026-05-13

---

## Context

The original AI Operations Baseline Assessment flow is process-oriented. The metadata, wording, future schema examples, dashboard language, and entity model all center on a single operational process. This matched the v1 facilitated-assessment use case, where an assessor reviews how AI is used in a process and receives a recommended maturity level.

Don Fran requested that the assessment work at team level because AI maturity may need to represent how a team operates, not only how one process uses AI. A team may use AI across multiple activities, services, products, workflows, or delivery responsibilities. If the model remains process-only, the final maturity diagnosis may be too narrow or misleading for stakeholders who want to baseline team capability.

PRD-006 therefore requires team-level evaluation support. Process information may remain useful, but it should become supporting context when the assessment target is a team.

---

## Decision

The system will support team-level AI maturity assessment as the primary or configurable assessment context.

The assessment model will include an explicit assessment scope, such as `Team` or `Process`, so the final maturity diagnosis clearly identifies what it represents. Team-level assessments may include process-level fields as supporting context, but the maturity result must be attributable to the selected team when the scope is team-level.

Process-level assessment remains supported for continuity with v1 and for cases where a single process is the intended target.

---

## Alternatives Considered

### Alternative 1: Keep Process-Level Assessment Only

Continue treating each assessment as a single `ProcessAssessment`.

- **Pros:** Minimal change; preserves current implementation and data model.
- **Cons:** Does not satisfy stakeholder feedback; team maturity can be misrepresented by one process; output remains process-biased.
- **Why Rejected:** The new requirement explicitly asks for team-level assessment capability.

### Alternative 2: Replace Process Assessment Entirely with Team Assessment

Remove process-level semantics and make every assessment team-level.

- **Pros:** Simplifies future wording around team maturity; aligns strongly with Don Fran's feedback.
- **Cons:** Breaks v1 continuity; loses useful process context; may reduce precision for process-specific reviews.
- **Why Rejected:** Process information remains useful as supporting evidence and should stay available.

### Alternative 3: Add Configurable Assessment Scope

Introduce an explicit scope field and allow the final diagnosis to represent either a team or a process.

- **Pros:** Satisfies team-level requirement while preserving process-level compatibility; supports clearer output labels and future schema evolution.
- **Cons:** Requires updates to metadata, output labels, export shape, dashboard language, and future schema planning.
- **Why Accepted:** This is the most flexible path and minimizes disruption to the current app.

---

## Consequences

### Positive

- The maturity diagnosis can represent a team's AI operating model instead of only one workflow.
- Process details can still be captured as supporting evidence.
- Export and dashboard outputs can be made clearer by labeling the assessment scope.
- Future backend schema can evolve toward a more general `assessments` or `assessment_targets` model.

### Negative

- Some current process-oriented labels and docs must be revised.
- Scoring interpretation may need careful review to ensure team-level and process-level assessments remain comparable.
- Completion and domain indicators may need scope-aware semantics.

### Neutral

- The v1 local-state architecture can remain unchanged if scope metadata is stored in `initialForm`.
- No backend or API change is required unless future persistence or catalog integration is approved.

---

## Compliance / Validation Rules

- Every final maturity output must identify its assessment scope.
- Team-level assessments must include enough metadata to identify the team being assessed.
- Process fields may be optional supporting context when scope is `Team`.
- User-facing labels must not imply that every assessment result is process-level.
- Export shape must include `assessmentScope` and team metadata when applicable.
- Dashboard and classification views must be reviewed for scope-aware wording.
- `calculateLevel()` must not silently change scoring behavior based on scope unless a future ADR explicitly approves scope-specific scoring.
- Tests or QA walkthroughs must verify both Team and Process scope display paths.

---

## References

- `docs/requirements/PRD-006-team-level-assessment-and-notes.md`
- `docs/planning/implementation_plan.md`
- `.ace/knowledge/entities.md`
- `.ace/knowledge/business-rules.md`
- `docs/architecture/DATA-MODEL.md`
- ADR-004: Local React State Only - No Backend for v1

