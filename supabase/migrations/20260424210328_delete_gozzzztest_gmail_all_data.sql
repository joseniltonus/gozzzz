/*
  # Delete gozzzztest@gmail.com account and all data

  This migration deletes all data associated with the user account gozzzztest@gmail.com,
  including their profile, progress records, preferences, and the auth account itself.

  User ID: c3bf9667-7e89-42d8-ad4d-2145a288157d
  Email: gozzzztest@gmail.com
*/

DO $$
DECLARE
  target_user_id uuid := 'c3bf9667-7e89-42d8-ad4d-2145a288157d';
BEGIN
  -- Delete user progress records
  DELETE FROM user_progress WHERE user_id = target_user_id;

  -- Delete user profile
  DELETE FROM profiles WHERE id = target_user_id;

  -- Delete auth user (cascades to dependent records)
  DELETE FROM auth.users WHERE id = target_user_id;

  RAISE NOTICE 'Successfully deleted all data for user: %', target_user_id;
END $$;