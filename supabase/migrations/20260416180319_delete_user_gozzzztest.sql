/*
  # Delete user gozzzztest@gmail.com and all associated data

  This migration removes all data for the user gozzzztest@gmail.com including:
  - User profile and related data
  - User progress records
  - Email tokens
  - Password reset tokens
  - Auth user account

  Note: The auth.users table deletion is handled by Supabase's cascading deletes
  through foreign key constraints where applicable.
*/

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get the user ID
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'gozzzztest@gmail.com';
  
  IF v_user_id IS NOT NULL THEN
    -- Delete user progress
    DELETE FROM user_progress WHERE user_id = v_user_id;
    
    -- Delete email tokens
    DELETE FROM email_tokens WHERE user_id = v_user_id;
    
    -- Delete password reset tokens
    DELETE FROM password_reset_tokens WHERE user_id = v_user_id;
    
    -- Delete user profile
    DELETE FROM profiles WHERE id = v_user_id;
    
    -- Delete auth user
    DELETE FROM auth.users WHERE id = v_user_id;
  END IF;
END $$;
