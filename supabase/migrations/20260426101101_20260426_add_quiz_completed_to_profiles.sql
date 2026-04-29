/*
  # Add quiz_completed column to profiles table

  ## Description
  Adds a boolean `quiz_completed` column to track whether users have completed the onboarding quiz.
  This replaces unreliable local storage with a single source of truth in the database.

  ## Changes
  - profiles table: Add `quiz_completed` column (boolean, default false)
  
  ## Security
  - RLS unchanged: users can only read/write their own profile
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'quiz_completed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN quiz_completed boolean DEFAULT false;
  END IF;
END $$;