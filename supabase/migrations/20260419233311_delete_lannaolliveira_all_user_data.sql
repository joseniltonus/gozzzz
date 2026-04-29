/*
  # Delete all data for lannaolliveira@gmail.com

  1. Deletes all user-related records
    - Removes from profiles table (including chronotype)
    - Removes from user_progress table
    - Removes from email_tokens table
    - Removes from password_reset_tokens table
    - Removes from consent_records table
    - Removes from email_confirmations table
    - Removes from gift_codes usage
    - Removes from data_deletion_requests
    - Removes from data_export_requests
    - Removes from user_roles
    - Removes from lesson_feedback
    - Removes from auth.users table (Supabase Auth)
  
  2. Security
    - Completely removes user identity, chronotype, and all data
    - Clears all learning progress and preferences
*/

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get the user ID
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'lannaolliveira@gmail.com';
  
  IF v_user_id IS NOT NULL THEN
    -- Delete from related tables in order
    DELETE FROM lesson_feedback WHERE user_id = v_user_id;
    DELETE FROM user_roles WHERE user_id = v_user_id;
    DELETE FROM data_export_requests WHERE user_id = v_user_id;
    DELETE FROM data_deletion_requests WHERE user_id = v_user_id;
    DELETE FROM gift_codes WHERE used_by = v_user_id;
    DELETE FROM email_confirmations WHERE user_id = v_user_id;
    DELETE FROM password_reset_tokens WHERE user_id = v_user_id;
    DELETE FROM email_tokens WHERE user_id = v_user_id;
    DELETE FROM consent_records WHERE user_id = v_user_id;
    DELETE FROM user_progress WHERE user_id = v_user_id;
    DELETE FROM profiles WHERE id = v_user_id;
    
    -- Delete from auth.users (this will cascade to auth tables)
    DELETE FROM auth.users WHERE id = v_user_id;
    
    RAISE NOTICE 'Successfully deleted all data for user: %', v_user_id;
  ELSE
    RAISE NOTICE 'User not found: lannaolliveira@gmail.com';
  END IF;
END $$;