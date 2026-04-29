/*
  # Fix RLS performance, unused indexes, and policy issues

  1. RLS Performance — Auth Function Re-evaluation
     - Wrap auth.uid() with (select auth.uid()) in all affected policies to
       prevent per-row re-evaluation and improve query performance at scale.
     - Tables affected: daily_tips, lessons, email_confirmations (3 policies),
       email_tokens (2 policies)

  2. Missing Index
     - Add covering index on user_progress(lesson_id) to support the existing
       foreign key user_progress_lesson_id_fkey

  3. Unused Indexes
     - Drop unused indexes on consent_records, data_deletion_requests,
       data_export_requests, email_confirmations, email_tokens, and
       password_reset_tokens to reduce write overhead

  4. RLS Policy Always True
     - Remove the unrestricted anon INSERT policy on password_reset_tokens.
       The edge function uses the service role key which bypasses RLS, so no
       anon policy is required. This closes the open insert vector for anon.
*/

-- ============================================================
-- 1. Fix RLS Initialization Plan — wrap auth.uid() with select
-- ============================================================

-- daily_tips
DROP POLICY IF EXISTS "Authenticated users can read daily tips" ON public.daily_tips;
CREATE POLICY "Authenticated users can read daily tips"
  ON public.daily_tips
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- lessons
DROP POLICY IF EXISTS "Authenticated users can view lessons" ON public.lessons;
CREATE POLICY "Authenticated users can view lessons"
  ON public.lessons
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- email_confirmations
DROP POLICY IF EXISTS "Users can insert own confirmation" ON public.email_confirmations;
CREATE POLICY "Users can insert own confirmation"
  ON public.email_confirmations
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can read own confirmations" ON public.email_confirmations;
CREATE POLICY "Users can read own confirmations"
  ON public.email_confirmations
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own confirmations" ON public.email_confirmations;
CREATE POLICY "Users can update own confirmations"
  ON public.email_confirmations
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- email_tokens
DROP POLICY IF EXISTS "Users can view own email tokens" ON public.email_tokens;
CREATE POLICY "Users can view own email tokens"
  ON public.email_tokens
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own email tokens" ON public.email_tokens;
CREATE POLICY "Users can insert own email tokens"
  ON public.email_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- ============================================================
-- 2. Add missing index for unindexed foreign key
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON public.user_progress(lesson_id);

-- ============================================================
-- 3. Drop unused indexes
-- ============================================================

DROP INDEX IF EXISTS public.idx_consent_records_user_id;
DROP INDEX IF EXISTS public.idx_data_deletion_requests_user_id;
DROP INDEX IF EXISTS public.idx_data_export_requests_user_id;
DROP INDEX IF EXISTS public.idx_email_confirmations_user_id;
DROP INDEX IF EXISTS public.idx_email_confirmations_code;
DROP INDEX IF EXISTS public.idx_email_confirmations_email;
DROP INDEX IF EXISTS public.idx_email_tokens_user_id;
DROP INDEX IF EXISTS public.idx_email_tokens_token;
DROP INDEX IF EXISTS public.idx_email_tokens_expires_at;
DROP INDEX IF EXISTS public.idx_password_reset_tokens_token;
DROP INDEX IF EXISTS public.idx_password_reset_tokens_user_id;

-- ============================================================
-- 4. Fix password_reset_tokens — remove always-true anon policy
--    (edge function uses service role key which bypasses RLS)
-- ============================================================

DROP POLICY IF EXISTS "Service role manages password reset tokens" ON public.password_reset_tokens;
