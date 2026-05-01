/*
  # Delete two accounts

  Removes all data for:
  - jose.nilton.us@gmail.com (16d4a9f3-a122-47b0-b362-c705c9d1eef5)
  - gozzzztest@gmail.com     (015be4dc-7bfa-437e-ada5-138afc64a5d3)

  Deletes from all public tables in FK-safe order, then removes auth.users records.
*/

DO $$
DECLARE
  v_uids uuid[] := ARRAY[
    '16d4a9f3-a122-47b0-b362-c705c9d1eef5',
    '015be4dc-7bfa-437e-ada5-138afc64a5d3'
  ];
BEGIN
  IF to_regclass('public.user_progress') IS NOT NULL THEN
    DELETE FROM public.user_progress WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.lesson_feedback') IS NOT NULL THEN
    DELETE FROM public.lesson_feedback WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.consent_records') IS NOT NULL THEN
    DELETE FROM public.consent_records WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.data_deletion_requests') IS NOT NULL THEN
    DELETE FROM public.data_deletion_requests WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.data_export_requests') IS NOT NULL THEN
    DELETE FROM public.data_export_requests WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.email_confirmations') IS NOT NULL THEN
    DELETE FROM public.email_confirmations WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.email_tokens') IS NOT NULL THEN
    DELETE FROM public.email_tokens WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.password_reset_tokens') IS NOT NULL THEN
    DELETE FROM public.password_reset_tokens WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.gift_codes') IS NOT NULL THEN
    UPDATE public.gift_codes SET used_by = NULL, used_at = NULL WHERE used_by = ANY(v_uids);
  END IF;
  IF to_regclass('public.user_roles') IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = ANY(v_uids);
  END IF;
  IF to_regclass('public.profiles') IS NOT NULL THEN
    DELETE FROM public.profiles WHERE id = ANY(v_uids);
  END IF;
  DELETE FROM auth.users                    WHERE id = ANY(v_uids);
END $$;
