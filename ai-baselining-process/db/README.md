# Database Setup & Migrations

This directory contains PostgreSQL migrations for the AI Baselining MVP using Supabase Auth + RLS.

## Architecture

- **Auth:** Supabase Auth (built-in user management)
- **Database:** Supabase PostgreSQL
- **Access Control:** Row-Level Security (RLS) policies
- **Frontend:** React + `@supabase/auth-helpers-react`

## Prerequisites

1. **Supabase project** created at [supabase.com](https://supabase.com)

2. **Supabase credentials (frontend-safe):**
   - Go to Settings → API → Project URL and Keys
   - Copy `Project URL` and `ANON KEY`
   - ⚠️ Anon key is safe for frontend (limited by RLS)

## Setup

### 1. Create Database Schema

Copy-paste the SQL from `schema.sql` into your Supabase project's **SQL Editor** (Dashboard → SQL Editor → New query).

This file contains the complete database schema with tables, indexes, and RLS policies.

### 2. Enable Supabase Auth

Go to your Supabase Dashboard:

- **Authentication → Providers → Email**
  - Enable email/password auth
  
- **Authentication → Email Templates → Confirm signup**
  - Add email domain validation: require `@infinite.com` addresses
  - Or handle validation in your React signup form

- **Authentication → URL Configuration**
  - Set Redirect URL: `http://localhost:3000/auth/callback` (dev)
  - Production: `https://your-domain.com/auth/callback`

### 4. Create admin user

Go to **Authentication → Users**:

- Click "Add user"
- Email: `admin@infinite.com`
- Password: (secure password)
- Copy the user UUID

Then in **SQL Editor**, run:

```sql
INSERT INTO public.user_profiles (id, role, is_active)
VALUES ('PASTE_UUID_HERE', 'admin', true);
```

### 5. Verify RLS policies

```sql
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

Expected:
- `user_profiles`, `questions`, `assessments` exist
- `assessments` has 3 RLS policies (read, insert, update)

## Migrations

| File | Description |
|------|-------------|
| `001_initial_schema.sql` | Tables + RLS policies |
| `002_seed_admin.sql` | Bootstrap admin profile (manual) |

## Frontend Integration

### Install dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-react @supabase/auth-helpers-nextjs
```

### Setup client

```javascript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)
```

### Login flow

```javascript
// Signup
await supabase.auth.signUp({
  email: 'user@infinite.com',
  password: 'secure-password'
})

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@infinite.com',
  password: 'password'
})

// Get session
const { data: { session } } = await supabase.auth.getSession()
```

### Query with RLS

```javascript
// Automatically filtered by RLS based on logged-in user
const { data: assessments } = await supabase
  .from('assessments')
  .select('*')

// Admins can query all assessments via RLS policy
```

## Environment Variables

**.env.local** (frontend):

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

⚠️ Anon key is publicly visible in React; it's protected by RLS.

## Creating a new migration

```bash
supabase migration new <migration_name>
```

Then push:

```bash
supabase db push
```

## Troubleshooting

**Auth not working?**
- Check Redirect URLs in Authentication settings
- Verify email domain validation is configured
- Test signup at `http://localhost:3000`

**RLS policy blocking access?**
- Verify user is authenticated: `select auth.uid()`
- Check user_profiles has admin role: `select role from public.user_profiles where id = auth.uid()`
- Test in SQL Editor with authenticated context

**Can't see other users' assessments as admin?**
- Ensure user_profiles entry exists with `role = 'admin'`
- Verify RLS policy includes admin check
