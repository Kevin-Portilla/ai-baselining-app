-- Migration: Production-grade Supabase PostgreSQL schema for AI Baselining
-- Date: 2026-05-14
-- Dedicated business schema: ai_baseline
-- Uses Supabase Auth for user management + RLS for application-level protection

-- Enable UUID generation for PostgreSQL.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a dedicated schema for all AI Baselining business objects.
CREATE SCHEMA IF NOT EXISTS ai_baseline;

-- Grant authenticated users permission to use the ai_baseline schema.
GRANT USAGE ON SCHEMA ai_baseline TO authenticated;

-- Shared enum types for normalized business objects.
DO $$ BEGIN
    CREATE TYPE ai_baseline.user_role_t AS ENUM ('user', 'analyst', 'manager', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_baseline.question_type_t AS ENUM ('text', 'textarea', 'select', 'multiselect', 'boolean', 'rating');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_baseline.assessment_status_t AS ENUM ('draft', 'submitted', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_baseline.maturity_level_t AS ENUM ('no-ai', 'individual', 'connected', 'orchestrated', 'adaptive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_baseline.assessment_event_type_t AS ENUM ('created', 'updated', 'submitted', 'archived', 'scored');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Audit utility: keep updated_at fresh on mutating rows.
CREATE OR REPLACE FUNCTION ai_baseline.updated_at_timestamp()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Organizations enable future multi-tenant segmentation.
CREATE TABLE IF NOT EXISTS ai_baseline.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- User profiles associated with Supabase auth users.
CREATE TABLE IF NOT EXISTS ai_baseline.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES ai_baseline.organizations(id) ON DELETE SET NULL,
  role ai_baseline.user_role_t NOT NULL DEFAULT 'user',
  is_active boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Question catalog metadata, mapped to domains and subcategories.
CREATE TABLE IF NOT EXISTS ai_baseline.domains (
  id serial PRIMARY KEY,
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_baseline.subcategories (
  id serial PRIMARY KEY,
  domain_id integer NOT NULL REFERENCES ai_baseline.domains(id) ON DELETE CASCADE,
  key text NOT NULL,
  name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(domain_id, key)
);

CREATE TABLE IF NOT EXISTS ai_baseline.question_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_id integer NOT NULL REFERENCES ai_baseline.domains(id) ON DELETE RESTRICT,
  subcategory_id integer REFERENCES ai_baseline.subcategories(id) ON DELETE SET NULL,
  external_key text NOT NULL UNIQUE,
  label text NOT NULL,
  hint text,
  field_name text NOT NULL UNIQUE,
  question_type ai_baseline.question_type_t NOT NULL DEFAULT 'text',
  options jsonb,
  maturity_level ai_baseline.maturity_level_t NOT NULL,
  is_required boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_baseline_question_catalog_domain_id ON ai_baseline.question_catalog(domain_id);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_question_catalog_maturity_level ON ai_baseline.question_catalog(maturity_level);

-- Primary assessment storage with structured metadata and scoring payloads.
CREATE TABLE IF NOT EXISTS ai_baseline.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  organization_id uuid REFERENCES ai_baseline.organizations(id) ON DELETE SET NULL,
  status ai_baseline.assessment_status_t NOT NULL DEFAULT 'draft',
  title text,
  process_name text,
  process_type text,
  tribe text,
  role text,
  frequency text,
  client_data text,
  main_systems text,
  process_description text,
  criticality text,
  ai_usage text,
  recommended_level ai_baseline.maturity_level_t,
  scoring_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  level_answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_confidential boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessments_assessor_id ON ai_baseline.assessments(assessor_id);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessments_organization_id ON ai_baseline.assessments(organization_id);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessments_status ON ai_baseline.assessments(status);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessments_recommended_level ON ai_baseline.assessments(recommended_level);

-- Individual answers stored for normalized analytics and auditability.
CREATE TABLE IF NOT EXISTS ai_baseline.assessment_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES ai_baseline.assessments(id) ON DELETE CASCADE,
  question_id uuid REFERENCES ai_baseline.question_catalog(id) ON DELETE SET NULL,
  answer jsonb NOT NULL,
  answer_text text GENERATED ALWAYS AS (answer::text) STORED,
  answered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessment_answers_assessment_id ON ai_baseline.assessment_answers(assessment_id);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessment_answers_question_id ON ai_baseline.assessment_answers(question_id);

-- Event log for audit and workflow transitions.
CREATE TABLE IF NOT EXISTS ai_baseline.assessment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES ai_baseline.assessments(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type ai_baseline.assessment_event_type_t NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessment_events_assessment_id ON ai_baseline.assessment_events(assessment_id);
CREATE INDEX IF NOT EXISTS idx_ai_baseline_assessment_events_actor_id ON ai_baseline.assessment_events(actor_id);

-- Triggers to keep updated_at values synchronized.
CREATE TRIGGER trg_ai_baseline_user_profiles_updated_at
BEFORE UPDATE ON ai_baseline.user_profiles
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_domains_updated_at
BEFORE UPDATE ON ai_baseline.domains
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_subcategories_updated_at
BEFORE UPDATE ON ai_baseline.subcategories
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_question_catalog_updated_at
BEFORE UPDATE ON ai_baseline.question_catalog
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_assessments_updated_at
BEFORE UPDATE ON ai_baseline.assessments
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_assessment_answers_updated_at
BEFORE UPDATE ON ai_baseline.assessment_answers
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

CREATE TRIGGER trg_ai_baseline_organizations_updated_at
BEFORE UPDATE ON ai_baseline.organizations
FOR EACH ROW EXECUTE FUNCTION ai_baseline.updated_at_timestamp();

-- Row-Level Security on all assessment data.
ALTER TABLE ai_baseline.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_baseline.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_baseline.assessment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_baseline.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy helpers.
CREATE OR REPLACE FUNCTION ai_baseline.is_admin_user() RETURNS boolean LANGUAGE sql AS $$
  SELECT EXISTS(
    SELECT 1 FROM ai_baseline.user_profiles WHERE id = auth.uid() AND role = 'admin'
  )
  OR EXISTS(
    SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'ai-baseline-admin@infinite.com'
  );
$$;

CREATE OR REPLACE FUNCTION ai_baseline.is_assessment_owner(_assessment_id uuid) RETURNS boolean LANGUAGE sql AS $$
  SELECT assessor_id = auth.uid() FROM ai_baseline.assessments WHERE id = _assessment_id;
$$;

-- Assessments policies.
CREATE POLICY assessments_select ON ai_baseline.assessments
  FOR SELECT USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    assessor_id = auth.uid()
  );

CREATE POLICY assessments_insert ON ai_baseline.assessments
  FOR INSERT WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    assessor_id = auth.uid()
  );

CREATE POLICY assessments_update ON ai_baseline.assessments
  FOR UPDATE USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    assessor_id = auth.uid()
  ) WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    assessor_id = auth.uid()
  );

CREATE POLICY assessments_delete ON ai_baseline.assessments
  FOR DELETE USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    assessor_id = auth.uid()
  );

-- Answer policies follow assessment ownership.
CREATE POLICY assessment_answers_select ON ai_baseline.assessment_answers
  FOR SELECT USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

CREATE POLICY assessment_answers_insert ON ai_baseline.assessment_answers
  FOR INSERT WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

CREATE POLICY assessment_answers_update ON ai_baseline.assessment_answers
  FOR UPDATE USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  ) WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

CREATE POLICY assessment_answers_delete ON ai_baseline.assessment_answers
  FOR DELETE USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

-- Event policies follow assessment ownership and admin access.
CREATE POLICY assessment_events_select ON ai_baseline.assessment_events
  FOR SELECT USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

CREATE POLICY assessment_events_insert ON ai_baseline.assessment_events
  FOR INSERT WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    ai_baseline.is_assessment_owner(assessment_id)
  );

-- User profile access should be limited to self and admins.
CREATE POLICY user_profiles_select ON ai_baseline.user_profiles
  FOR SELECT USING (
    auth.role() = 'supabase_admin' OR
    id = auth.uid()
  );

CREATE POLICY user_profiles_insert ON ai_baseline.user_profiles
  FOR INSERT WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    (id = auth.uid() AND role = 'user')
  );

CREATE POLICY user_profiles_update ON ai_baseline.user_profiles
  FOR UPDATE USING (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    id = auth.uid()
  ) WITH CHECK (
    auth.role() = 'supabase_admin' OR
    ai_baseline.is_admin_user() OR
    (id = auth.uid() AND role = (
      SELECT role FROM ai_baseline.user_profiles WHERE id = auth.uid()
    ))
  );

-- Allow authenticated users to read active domain and question catalog metadata.
GRANT SELECT ON ai_baseline.domains TO authenticated;
GRANT SELECT ON ai_baseline.subcategories TO authenticated;
GRANT SELECT ON ai_baseline.question_catalog TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ai_baseline.assessments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ai_baseline.assessment_answers TO authenticated;
GRANT SELECT, INSERT ON ai_baseline.assessment_events TO authenticated;
GRANT SELECT, INSERT, UPDATE ON ai_baseline.user_profiles TO authenticated;
GRANT SELECT ON ai_baseline.organizations TO authenticated;

-- Seed baseline domains for the AI Baselining framework.
INSERT INTO ai_baseline.domains (key, name, description)
VALUES
  ('client_centric', 'Client-Centric', 'Questions about client-facing processes and workflow integration.'),
  ('operating_model', 'Operating Model', 'Questions about governance, risk, and operational readiness.'),
  ('people', 'People', 'Questions about AI literacy, adoption, and organizational readiness.')
ON CONFLICT (key) DO NOTHING;
