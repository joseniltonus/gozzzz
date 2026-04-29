/*
  # Delete account: lannaolliveira@gmail.com

  Removes all data for user ID c041065f-a43e-49a0-a008-9d73bd41b987
  across all public tables, then removes the auth.users record.
  Order respects foreign key constraints (children before parents).
*/

DO $$
DECLARE
  v_uid uuid := 'c041065f-a43e-49a0-a008-9d73bd41b987';
BEGIN
  DELETE FROM public.user_progress       WHERE user_id = v_uid;
  DELETE FROM public.lesson_feedback     WHERE user_id = v_uid;
  DELETE FROM public.consent_records     WHERE user_id = v_uid;
  DELETE FROM public.data_deletion_requests WHERE user_id = v_uid;
  DELETE FROM public.data_export_requests   WHERE user_id = v_uid;
  DELETE FROM public.email_confirmations WHERE user_id = v_uid;
  DELETE FROM public.email_tokens        WHERE user_id = v_uid;
  DELETE FROM public.password_reset_tokens WHERE user_id = v_uid;
  UPDATE public.gift_codes SET used_by = NULL, used_at = NULL WHERE used_by = v_uid;
  DELETE FROM public.user_roles          WHERE user_id = v_uid;
  DELETE FROM public.profiles            WHERE id = v_uid;
  DELETE FROM auth.users                 WHERE id = v_uid;
END $$;
