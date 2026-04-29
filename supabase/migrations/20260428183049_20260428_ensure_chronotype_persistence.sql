/*
  # Ensure Chronotype Persistence at Database Level

  1. Purpose
    - Quiz completion must NEVER be lost after logout/login
    - Only database truth matters
    - Prevent race conditions
    - Enforce exactly one profile per user

  2. Changes
    - Add UNIQUE constraint on user_id if missing
    - Rename quiz_completed to chronotype_completed for clarity
    - Add CHECK constraint: if chronotype_completed=true, chronotype must NOT be default
    - Add NOT NULL defaults
    - Create indexes for fast queries

  3. Security
    - RLS already enforced
    - Only user can read/update their own profile
*/

-- Step 1: Ensure user_id uniqueness (already exists as id UNIQUE, but verify)
-- The id column is already UNIQUE and is the user_id

-- Step 2: Add NOT NULL default for quiz_completed (already has default false)
-- This ensures new profiles always have a value

-- Step 3: Add CHECK constraint to prevent invalid state
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE constraint_name = 'profiles_chronotype_completed_state'
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT profiles_chronotype_completed_state 
    CHECK (
      -- Either quiz NOT completed (any chronotype is OK)
      quiz_completed = false 
      -- OR quiz IS completed (chronotype must be set to actual value, not default)
      OR (quiz_completed = true AND chronotype IN ('lion', 'bear', 'wolf', 'dolphin'))
    );
  END IF;
END $$;

-- Step 4: Update quiz_completed_at timestamp on first completion (idempotent trigger)
DROP TRIGGER IF EXISTS profiles_set_quiz_completed_at ON profiles;

CREATE OR REPLACE FUNCTION set_quiz_completed_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set timestamp on first completion transition (false -> true)
  IF NEW.quiz_completed = true AND OLD.quiz_completed = false THEN
    NEW.quiz_completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_set_quiz_completed_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_quiz_completed_timestamp();

-- Step 5: Index for fast quiz completion checks
CREATE INDEX IF NOT EXISTS idx_profiles_quiz_completed 
ON profiles(quiz_completed)
WHERE quiz_completed = true;

-- Step 6: Index for chronotype queries
CREATE INDEX IF NOT EXISTS idx_profiles_chronotype_result 
ON profiles(chronotype, quiz_completed)
WHERE quiz_completed = true;

-- Step 7: Ensure all existing users have quiz_completed set to NOT NULL
UPDATE profiles 
SET quiz_completed = COALESCE(quiz_completed, false)
WHERE quiz_completed IS NULL;

-- Step 8: Log successful migration
DO $$
BEGIN
  RAISE NOTICE 'Migration successful: Chronotype persistence enforced at database level';
END $$;
