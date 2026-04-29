/*
  # Fix RLS Performance, Duplicate Policies, and Index Issues

  ## Summary
  Resolves all security and performance advisories reported by Supabase:

  1. RLS Auth Initialization Plan
     - Replace bare `auth.uid()` calls with `(select auth.uid())` in all affected policies.
       This prevents Postgres from re-evaluating the function for every row, significantly
       improving query performance at scale.
     - Affected tables: user_progress, consent_records, data_deletion_requests, data_export_requests

  2. Duplicate Permissive Policies (Multiple Permissive Policies)
     - `user_progress`: has both English and Portuguese duplicate policies for SELECT, INSERT,
       UPDATE. Drop the older Portuguese-named duplicates that were superseded.
     - `daily_tips`: has two identical SELECT policies. Drop the duplicate Portuguese one.

  3. Unindexed Foreign Key
     - `user_progress.lesson_id` FK has no covering index. Add one.

  4. Unused Indexes
     - Drop unused indexes on consent_records, data_deletion_requests, data_export_requests
       that add write overhead without benefiting any queries.

  ## Security
  No security regressions. All policies maintain the same logical access rules;
  only the evaluation strategy is optimized.
*/

-- ============================================================
-- 1. FIX user_progress RLS POLICIES
-- Drop all existing user_progress policies and recreate cleanly
-- ============================================================

DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem ver seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem inserir seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem deletar seu próprio progresso" ON public.user_progress;

CREATE POLICY "Users can view own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete own progress"
  ON public.user_progress
  FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- ============================================================
-- 2. FIX consent_records RLS POLICIES
-- ============================================================

DROP POLICY IF EXISTS "Users can view their own consents" ON public.consent_records;
DROP POLICY IF EXISTS "Users can insert their own consents" ON public.consent_records;
DROP POLICY IF EXISTS "Users can update their own consents" ON public.consent_records;

CREATE POLICY "Users can view their own consents"
  ON public.consent_records
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own consents"
  ON public.consent_records
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own consents"
  ON public.consent_records
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ============================================================
-- 3. FIX data_deletion_requests RLS POLICIES
-- ============================================================

DROP POLICY IF EXISTS "Users can view their own deletion requests" ON public.data_deletion_requests;
DROP POLICY IF EXISTS "Users can insert their own deletion requests" ON public.data_deletion_requests;

CREATE POLICY "Users can view their own deletion requests"
  ON public.data_deletion_requests
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own deletion requests"
  ON public.data_deletion_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ============================================================
-- 4. FIX data_export_requests RLS POLICIES
-- ============================================================

DROP POLICY IF EXISTS "Users can view their own export requests" ON public.data_export_requests;
DROP POLICY IF EXISTS "Users can insert their own export requests" ON public.data_export_requests;

CREATE POLICY "Users can view their own export requests"
  ON public.data_export_requests
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own export requests"
  ON public.data_export_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ============================================================
-- 5. FIX daily_tips DUPLICATE POLICY
-- ============================================================

DROP POLICY IF EXISTS "Usuários autenticados podem ver dicas" ON public.daily_tips;

-- ============================================================
-- 6. ADD MISSING INDEX ON user_progress.lesson_id
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id
  ON public.user_progress (lesson_id);

-- ============================================================
-- 7. DROP UNUSED INDEXES
-- ============================================================

DROP INDEX IF EXISTS public.idx_consent_records_user_id;
DROP INDEX IF EXISTS public.idx_consent_records_type;
DROP INDEX IF EXISTS public.idx_data_deletion_requests_user_id;
DROP INDEX IF EXISTS public.idx_data_export_requests_user_id;
