# ADR-003: Domain-Grouped Question Rendering in SurveyView

## Status
Accepted

## Date
2026-05-12

## Context
After removing the pillar structure (ADR-001) and adopting the 3-domain framework (ADR-002), a decision was needed on how to render the per-level questions in the survey form. Two options were evaluated:

1. **Fully flat** — Questions rendered one after another with no visual grouping, matching the ADR-001 removal intent.
2. **Domain-grouped** — Questions grouped by domain (`clientCentric`, `operatingModel`, `people`) using bordered cards, with the domain title as a section header.

## Decision
Adopt domain-grouped rendering. Within each maturity level, questions are iterated over the three domain IDs in order (`clientCentric` → `operatingModel` → `people`). Questions belonging to each domain are collected and rendered inside a shared card with the domain title.

This was implemented in `SurveyView.jsx` using:
```js
["clientCentric", "operatingModel", "people"].map((domainId) => {
  const domainQuestions = questions.filter((q) => q.domain === domainId);
  ...
})
```

## Rationale
- The DomainCards matrix at the top of the page introduces the 3-domain structure visually. Domain-grouped questions in the form body reinforce that same structure, giving respondents a consistent mental model.
- Flat rendering after a structured matrix header would create a disconnect between the orientation UI and the input UI.
- Domain cards already exist — grouping questions by domain creates spatial consistency at near-zero additional implementation cost.

## Alternatives Considered
- **Fully flat:** Simpler code path, but creates visual inconsistency with the domain matrix. Rejected.
- **Subcategory grouping:** More granular but adds complexity without user-visible benefit at this stage. Deferred to a future PRD.

## Consequences

### Positive
- Consistent visual language between matrix header and form body.
- Questions naturally cluster by organizational concern (client, delivery, people).
- Domain cards show completion state that directly mirrors the answered domain sections.

### Negative
- If a domain has no questions at a given level, it is silently skipped — requires the `if (domainQuestions.length === 0) return null` guard.
- Domain order is hardcoded; a future reorder would require a code change.

## Implementation
- `SurveyView.jsx` — domain loop with per-domain card
- `questions.js` — each question carries `domain` field
- `levelConfig.js` — `domains` array provides title and metadata
