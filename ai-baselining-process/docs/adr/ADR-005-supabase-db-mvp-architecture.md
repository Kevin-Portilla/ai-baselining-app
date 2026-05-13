> **Status:** Accepted
> **Date:** 2026-05-13
> **Authors:** Architect + Senior Backend Engineer

---

## Context

The current product is a client-side assessment tool with no persistent backend.
For the next MVP, the app must support authenticated users, question management, question editing, question categorization, assessment responses, and historical submission storage.

Constraints:

- MVP frontend-only: no backend service layer to issue JWTs.
- Keep schema intentionally simple and MVP-focused.
- Support only two RBAC roles: `admin` and `user`.
- Enforce `@infinite.com` registration only.
- Implement row-level security without backend complexity.
- **Database setup via Supabase Dashboard SQL Editor** (no CLI migrations).

---

## Decision

We will use Supabase Auth for authentication + Supabase PostgreSQL with Row-Level Security (RLS) for access control.

The MVP database schema includes:

1. **auth.users** (managed by Supabase Auth)
   - Email, password hashing, session tokens handled by Supabase.
   - Custom claims: `role` (`admin` / `user`).
   - Email domain verification: API constraint to accept `@infinite.com` only.

2. `public.user_profiles`
   - Links `auth.users.id` to `role` and `is_active` status.
   - Enables custom RBAC queries.

3. `public.questions`
   - Stores the assessment question catalog.
   - Includes domain, subcategory, label, field, type, and optional JSON options.
   - No RLS: admin and users can read all questions.

4. `public.assessments`
   - Stores historic submission records.
   - Links each assessment to an assessor (`auth.users.id`).
   - Stores process metadata and answers as JSONB for MVP flexibility.
   - **RLS enabled**: Users can only read/write their own assessments. Admins can read all.

Authentication & authorization decisions:

- Auth provider: Supabase Auth (built-in, secure, battle-tested).
- Frontend client: `@supabase/auth-helpers-react` with JWT auto-refresh.
- Email domain: Validated client-side + server-side via custom claims during signup.
- Access control: RLS policies on `assessments` table using `auth.uid()` and custom claims.
- Admin role: Query `user_profiles.role` via JWT custom claims.
- **Database setup**: Manual SQL execution in Supabase Dashboard (see `db/schema.sql`).

---

## Alternatives Considered

### Alternative 1: Custom backend auth (Node.js + JWT)

- **Pros:** Full control over auth flows and session management.
- **Cons:** Requires backend implementation; deferred to v2+ when business logic moves serverside.
- **Why Rejected (for MVP):** Frontend-only constraint means no backend available.

### Alternative 2: Fully normalized response model with `assessment_responses`

- **Pros:** More relational integrity and queryability.
- **Cons:** Adds join complexity, slower MVP development, and duplicates existing form model.
- **Why Rejected:** The current product is better served by a JSONB-backed assessment record for flexibility and lower complexity.

### Alternative 3: Stateless frontend tokens (localStorage)

- **Pros:** No server involvement; fast.
- **Cons:** Vulnerable to token replay attacks and XSS; users cannot be logged out remotely.
- **Why Rejected:** Supabase Auth provides secure token management with built-in refresh cycles.

---

## Consequences

### Positive

- Supabase Auth is battle-tested and secure; no custom password handling needed.
- RLS provides data isolation without backend logic.
- Frontend-only deployment: React app + Supabase = instant MVP.
- **Manual SQL setup simplifies deployment** (no CLI tooling required).
- JWT auto-refresh manages token lifecycle seamlessly.
- Can migrate to custom backend auth in v2 if needed.

### Negative

- `assessments.metadata` / `assessments.level_answers` are less normalized.
- Dependency on Supabase Auth (though this can be migrated to custom backend in v2).

### Neutral

- Future schema changes can migrate JSONB payloads into relational tables if needed.

---

## Compliance

Verify this decision by:
**Running `db/schema.sql` in Supabase Dashboard SQL Editor**.
- 
- Enabling Supabase Auth in the project settings.
- Configuring SMTP/auth provider to accept `@infinite.com` emails only.
- Applying RLS policies to `assessments` table.
- Setting up `user_profiles` table linked to `auth.users`.
- Testing auth flow in frontend: signup → JWT → access control via RLS.
- Confirming assessments are isolated per user and visible to admins.

---

## References

- `ai-baselining-process/docs/architecture/DATA-MODEL.md`
- `ai-baselining-process/docs/architecture/ARCHITECTURE.md`
- `ai-baselining-process/docs/context/PROJECT_CONTEXT.md`
- Supabase PostgreSQL documentation
