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
    DELETE FROM lesson_feedback WHERE user_id = v_user_id;
    
    -- Delete from user_roles
    DELETE FROM user_roles WHERE user_id = v_user_id;
    
    -- Delete from email_tokens
    DELETE FROM email_tokens WHERE user_id = v_user_id;
    
    -- Delete from password_reset_tokens
    DELETE FROM password_reset_tokens WHERE user_id = v_user_id;
    
    -- Delete from email_confirmations
    DELETE FROM email_confirmations WHERE user_id = v_user_id;
    
    -- Delete from data_export_requests
    DELETE FROM data_export_requests WHERE user_id = v_user_id;
    
    -- Delete from data_deletion_requests
    DELETE FROM data_deletion_requests WHERE user_id = v_user_id;
    
    -- Delete from consent_records
    DELETE FROM consent_records WHERE user_id = v_user_id;
    
    -- Delete from gift_codes (clear if used by this user)
    UPDATE gift_codes SET used_by = NULL, used_at = NULL WHERE used_by = v_user_id;
    
    -- Delete from user_progress
    DELETE FROM user_progress WHERE user_id = v_user_id;
    
    -- Delete from profiles (cascades to dependent records)
    DELETE FROM profiles WHERE id = v_user_id;
  END LOOP;
END $$;
