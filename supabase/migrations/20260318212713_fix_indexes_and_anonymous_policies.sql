
/*
  # Fix Security Issues: Indexes, Anonymous Policies, and Unused Index

  ## Changes

  1. Missing FK Indexes
    - Add index on `consent_records.user_id` to cover the foreign key
    - Add index on `data_deletion_requests.user_id` to cover the foreign key
    - Add index on `data_export_requests.user_id` to cover the foreign key

  2. Unused Index
    - Drop `idx_user_progress_lesson_id` which is unused and redundant (already covered by the composite unique index on user_id, lesson_id)

  3. Anonymous Access Policies
    - `daily_tips`: Replace the "IS NOT NULL" check policy (which could allow anonymous access) with a strict `TO authenticated` role-scoped policy
    - `lessons`: Same fix — replace permissive IS NOT NULL check with proper authenticated-only policy

  ## Security Notes
  - Policies using `auth.uid() IS NOT NULL` in the USING clause without specifying `TO authenticated` 
    can be matched by the `anon` role if anonymous sign-ins are enabled, creating unintended access
  - Using `TO authenticated` at the role level is the correct and explicit way to restrict access
*/

-- 1. Add missing FK indexes
CREATE INDEX IF NOT EXISTS idx_consent_records_user_id
  ON public.consent_records (user_id);

CREATE INDEX IF NOT EXISTS idx_data_deletion_requests_user_id
  ON public.data_deletion_requests (user_id);

CREATE INDEX IF NOT EXISTS idx_data_export_requests_user_id
  ON public.data_export_requests (user_id);

-- 2. Drop unused index (covered by user_progress_user_id_lesson_id_key composite unique index)
DROP INDEX IF EXISTS public.idx_user_progress_lesson_id;

-- 3. Fix anonymous access policies on daily_tips
DROP POLICY IF EXISTS "Authenticated users can read daily tips" ON public.daily_tips;

CREATE POLICY "Authenticated users can read daily tips"
  ON public.daily_tips
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- 4. Fix anonymous access policies on lessons
DROP POLICY IF EXISTS "Authenticated users can view lessons" ON public.lessons;

CREATE POLICY "Authenticated users can view lessons"
  ON public.lessons
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);
