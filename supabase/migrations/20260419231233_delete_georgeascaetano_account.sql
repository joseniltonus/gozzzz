
/*
  # Delete georgeascaetano@gmail.com account and all associated data

  1. Removes all user data and related records
  2. Deletes the user from auth.users
*/

DO $$
DECLARE
  v_user_id uuid := '4d76fcdd-d1c4-46b7-a4fb-4da2c262b076';
BEGIN
  IF to_regclass('public.password_reset_tokens') IS NOT NULL THEN
    DELETE FROM public.password_reset_tokens WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.email_tokens') IS NOT NULL THEN
    DELETE FROM public.email_tokens WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.email_confirmations') IS NOT NULL THEN
    DELETE FROM public.email_confirmations WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.user_progress') IS NOT NULL THEN
    DELETE FROM public.user_progress WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.lesson_feedback') IS NOT NULL THEN
    DELETE FROM public.lesson_feedback WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.consent_records') IS NOT NULL THEN
    DELETE FROM public.consent_records WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.data_deletion_requests') IS NOT NULL THEN
    DELETE FROM public.data_deletion_requests WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.data_export_requests') IS NOT NULL THEN
    DELETE FROM public.data_export_requests WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.gift_codes') IS NOT NULL THEN
    DELETE FROM public.gift_codes WHERE used_by = v_user_id;
  END IF;
  IF to_regclass('public.user_roles') IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = v_user_id;
  END IF;
  IF to_regclass('public.profiles') IS NOT NULL THEN
    DELETE FROM public.profiles WHERE id = v_user_id;
  END IF;
  DELETE FROM auth.users WHERE id = v_user_id;
END $$;
