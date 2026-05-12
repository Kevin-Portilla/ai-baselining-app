# ADR-004: Local React State Only — No Backend for v1

## Status
Accepted

## Date
2026-05-12

## Context
The AI Operations Baseline Assessment tool needs to collect structured form data across 30+ fields spanning 5 maturity levels. A decision was required on whether to persist this data via a backend service (database + API) or keep everything in local browser state for the initial version.

## Decision
Use local React state only via `useState` in `App.jsx`. No backend, no database, no API calls. Form state is held in memory for the duration of a browser session. Export is handled via a JSON blob download using browser-native `URL.createObjectURL`.

## Rationale
- The primary use case for v1 is facilitated assessments where an assessor fills in the form during a process review meeting and immediately exports the result.
- A backend would introduce authentication, hosting, database schema design, and deployment complexity far beyond v1 scope.
- Local state keeps the tool fully offline-capable and deployable as a static site.
- Future migration to a backend (Supabase or similar) is straightforward — the `initialForm` object maps directly to a database schema.

## Alternatives Considered
- **Supabase (PostgreSQL + Auth):** Correct long-term choice for multi-user, persistent assessments. Deferred to a future major version.
- **LocalStorage persistence:** Would survive page refresh but not cross-device. Not required for v1 facilitated use case. Deferred.
- **Firebase / Firestore:** Real-time sync adds unnecessary complexity for single-session tool. Rejected for v1.

## Consequences

### Positive
- Zero infrastructure dependencies — deploy as static files.
- Instant development velocity — no auth, migrations, or API design needed.
- Fully offline-capable.
- No data privacy concerns about server-side storage.

### Negative
- Data lost on page refresh (by design for v1).
- No multi-user collaboration or history.
- Cannot aggregate results server-side without the export step.
- No undo/redo beyond browser session.

## Future Considerations
When a backend is added:
- `initialForm` in `formConfig.js` maps directly to a `process_assessments` table schema.
- `calculateLevel` in `maturity.js` becomes a server-side scoring function.
- The export mechanism becomes an API endpoint returning JSON or PDF.
