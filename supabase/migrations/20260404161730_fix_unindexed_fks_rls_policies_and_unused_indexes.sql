/*
  # Fix unindexed foreign keys, RLS no-policy tables, and unused indexes

  1. Unindexed Foreign Keys
     - Add covering indexes for user_id FK columns on:
       consent_records, data_deletion_requests, data_export_requests,
       email_confirmations, email_tokens, password_reset_tokens

  2. Unused Index
     - Drop idx_user_progress_lesson_id (flagged as unused by the advisor)

  3. RLS Enabled No Policy — password_reset_tokens
     - Add a SELECT policy so authenticated users can view their own tokens
     - Add a DELETE policy so authenticated users can delete their own tokens
       (e.g. after a successful reset)
     - INSERT and UPDATE remain service-role-only (edge functions use the
       service role key which bypasses RLS, so no extra policies are needed)

  4. Auth DB Connection Strategy
     - This is a project-level setting and cannot be changed via SQL migration.
       Update it in the Supabase dashboard under
       Project Settings → Database → Connection pooling → Auth connections.
*/

-- ============================================================
-- 1. Add indexes for unindexed foreign keys
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_consent_records_user_id
  ON public.consent_records(user_id);

CREATE INDEX IF NOT EXISTS idx_data_deletion_requests_user_id
  ON public.data_deletion_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_data_export_requests_user_id
  ON public.data_export_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_email_confirmations_user_id
  ON public.email_confirmations(user_id);

CREATE INDEX IF NOT EXISTS idx_email_tokens_user_id
  ON public.email_tokens(user_id);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id
  ON public.password_reset_tokens(user_id);

-- ============================================================
-- 2. Drop unused index
-- ============================================================

DROP INDEX IF EXISTS public.idx_user_progress_lesson_id;

-- ============================================================
-- 3. Add RLS policies for password_reset_tokens
--    (table has RLS enabled but zero policies)
-- ============================================================

CREATE POLICY "Users can view own password reset tokens"
  ON public.password_reset_tokens
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own password reset tokens"
  ON public.password_reset_tokens
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);
