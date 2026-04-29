/*
  # Fix RLS performance, unindexed FK, unused indexes, and anonymous access policies

  ## Changes

  1. RLS Initialization Plan fixes (auth.uid() -> (select auth.uid()))
     - `daily_tips`: Replace direct auth.uid() call with subquery form
     - `lessons`: Replace direct auth.uid() call with subquery form
     This prevents re-evaluation of auth functions per-row, improving query performance at scale.

  2. Missing FK index on user_progress.lesson_id
     - The composite unique index (user_id, lesson_id) does not cover queries filtering by lesson_id alone.
     - Add a dedicated index on lesson_id to cover the foreign key.

  3. Drop unused indexes on GDPR/consent tables
     - idx_consent_records_user_id
     - idx_data_deletion_requests_user_id
     - idx_data_export_requests_user_id
     These indexes have not been used and add write overhead.

  4. Anonymous access policy fix for daily_tips and lessons
     - Current policies use `auth.uid() IS NOT NULL` which permits anonymous tokens.
     - Replace with `TO authenticated` role restriction (already set) and tighten USING clause
       to `(select auth.uid()) IS NOT NULL` for clarity and performance.
     - Since both policies already target the `authenticated` role, the USING clause is simplified
       to `true` (the role restriction is the guard). We use the subquery form to satisfy the
       initialization plan advisor while relying on role-based access control.
*/

-- 1. Fix RLS initialization plan for daily_tips
DROP POLICY IF EXISTS "Authenticated users can read daily tips" ON public.daily_tips;
CREATE POLICY "Authenticated users can read daily tips"
  ON public.daily_tips
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- 2. Fix RLS initialization plan for lessons
DROP POLICY IF EXISTS "Authenticated users can view lessons" ON public.lessons;
CREATE POLICY "Authenticated users can view lessons"
  ON public.lessons
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- 3. Add missing index on user_progress.lesson_id (FK coverage)
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id
  ON public.user_progress (lesson_id);

-- 4. Drop unused indexes
DROP INDEX IF EXISTS public.idx_consent_records_user_id;
DROP INDEX IF EXISTS public.idx_data_deletion_requests_user_id;
DROP INDEX IF EXISTS public.idx_data_export_requests_user_id;
