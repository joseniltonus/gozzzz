/*
  # Fix Security Issues: Indexes, Policies, and Unused Indexes

  ## Summary
  This migration addresses all security and performance advisories:

  1. **Add missing indexes on foreign key columns**
     - `consent_records.user_id` — missing index on FK to auth.users
     - `data_deletion_requests.user_id` — missing index on FK to auth.users
     - `data_export_requests.user_id` — missing index on FK to auth.users
     These indexes prevent slow sequential scans when joining or filtering by user_id.

  2. **Drop unused index**
     - `idx_user_progress_lesson_id` on `user_progress.lesson_id` — reported as unused.
     The table already has a composite unique index `(user_id, lesson_id)` which covers
     lesson_id lookups adequately. Removing the redundant index reduces write overhead.

  3. **Fix Anonymous Access Policies**
     - `daily_tips` SELECT policy uses `USING (true)` which allows anonymous (unauthenticated)
       access. Replace with `TO authenticated` to restrict to logged-in users only.
     - `lessons` SELECT policy uses `USING (true)` which allows anonymous access.
       Replace with `TO authenticated` to restrict to logged-in users only.

  ## Security Notes
  - All existing RLS is preserved and tightened.
  - No data is modified or removed.
*/

-- 1. Add indexes for unindexed foreign keys

CREATE INDEX IF NOT EXISTS idx_consent_records_user_id
  ON public.consent_records (user_id);

CREATE INDEX IF NOT EXISTS idx_data_deletion_requests_user_id
  ON public.data_deletion_requests (user_id);

CREATE INDEX IF NOT EXISTS idx_data_export_requests_user_id
  ON public.data_export_requests (user_id);

-- 2. Drop the unused index on user_progress.lesson_id
-- The composite unique index (user_id, lesson_id) already covers lesson_id queries.

DROP INDEX IF EXISTS public.idx_user_progress_lesson_id;

-- 3. Fix anonymous access policies on daily_tips

DROP POLICY IF EXISTS "Authenticated users can read daily tips" ON public.daily_tips;

CREATE POLICY "Authenticated users can read daily tips"
  ON public.daily_tips
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- 4. Fix anonymous access policies on lessons

DROP POLICY IF EXISTS "Usuários autenticados podem ver lições" ON public.lessons;

CREATE POLICY "Authenticated users can view lessons"
  ON public.lessons
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);
