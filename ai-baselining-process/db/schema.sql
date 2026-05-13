-- Migration: Initial Supabase PostgreSQL schema for AI Baselining MVP
-- Date: 2026-05-13
-- Uses Supabase Auth for user management + RLS for access control

-- Enable UUID generation for PostgreSQL.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- User profiles linked to auth.users
-- Stores custom role and active status for each user.
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Question catalog for assessment management.
CREATE TABLE IF NOT EXISTS public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL,
  subcategory text NOT NULL,
  label text NOT NULL,
  field text NOT NULL UNIQUE,
  type text NOT NULL DEFAULT 'text',
  options jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Historical assessment submissions and response storage.
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  assessor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  title text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommended_level text,
  level_answers jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Indexes for query performance.
CREATE INDEX IF NOT EXISTS idx_assessments_assessor_id ON public.assessments (assessor_id);
CREATE INDEX IF NOT EXISTS idx_questions_domain ON public.questions (domain);

-- Row-Level Security (RLS) Policies for assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Users can read their own assessments and admins can read all assessments
CREATE POLICY "users_can_read_own_assessments" ON public.assessments
  FOR SELECT USING (
    (assessor_id = auth.uid()) OR
    ((SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin')
  );

-- Users can insert their own assessments
CREATE POLICY "users_can_insert_own_assessments" ON public.assessments
  FOR INSERT WITH CHECK (assessor_id = auth.uid());

-- Users can update their own assessments (before submitted)
CREATE POLICY "users_can_update_own_assessments" ON public.assessments
  FOR UPDATE USING (assessor_id = auth.uid());

-- Questions table is readable by all authenticated users (no RLS needed for MVP)
-- Restrict to authenticated users only via security filters at application layer