/*
  # Delete all data for suporte@gozzzz.app and gozzzztest@gmail.com

  Complete deletion of all user data across all tables for:
  - suporte@gozzzz.app (ID: 566ce89f-c48e-4d44-973b-466ced19a108)
  - gozzzztest@gmail.com (ID: 0d201571-8286-4249-9162-e715caf2bc8c)
*/

DO $$
DECLARE
  v_user_ids UUID[] := ARRAY['566ce89f-c48e-4d44-973b-466ced19a108', '0d201571-8286-4249-9162-e715caf2bc8c'];
  v_user_id UUID;
BEGIN
  FOREACH v_user_id IN ARRAY v_user_ids LOOP
    -- Delete from lesson_feedback
    IF to_regclass('public.lesson_feedback') IS NOT NULL THEN
      DELETE FROM lesson_feedback WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from user_roles
    IF to_regclass('public.user_roles') IS NOT NULL THEN
      DELETE FROM user_roles WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from email_tokens
    IF to_regclass('public.email_tokens') IS NOT NULL THEN
      DELETE FROM email_tokens WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from password_reset_tokens
    IF to_regclass('public.password_reset_tokens') IS NOT NULL THEN
      DELETE FROM password_reset_tokens WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from email_confirmations
    IF to_regclass('public.email_confirmations') IS NOT NULL THEN
      DELETE FROM email_confirmations WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from data_export_requests
    IF to_regclass('public.data_export_requests') IS NOT NULL THEN
      DELETE FROM data_export_requests WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from data_deletion_requests
    IF to_regclass('public.data_deletion_requests') IS NOT NULL THEN
      DELETE FROM data_deletion_requests WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from consent_records
    IF to_regclass('public.consent_records') IS NOT NULL THEN
      DELETE FROM consent_records WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from gift_codes (clear if used by this user)
    IF to_regclass('public.gift_codes') IS NOT NULL THEN
      UPDATE gift_codes SET used_by = NULL, used_at = NULL WHERE used_by = v_user_id;
    END IF;
    
    -- Delete from user_progress
    IF to_regclass('public.user_progress') IS NOT NULL THEN
      DELETE FROM user_progress WHERE user_id = v_user_id;
    END IF;
    
    -- Delete from profiles (cascades to dependent records)
    IF to_regclass('public.profiles') IS NOT NULL THEN
      DELETE FROM profiles WHERE id = v_user_id;
    END IF;
  END LOOP;
END $$;
