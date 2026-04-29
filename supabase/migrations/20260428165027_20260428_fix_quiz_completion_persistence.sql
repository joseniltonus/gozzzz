/*
  # Fix Quiz Completion Persistence - Schema & Defaults

  1. Changes
    - Make quiz_completed NOT NULL with DEFAULT false (cannot be null anymore)
    - Make chronotype NOT NULL with DEFAULT 'bear' (ensure default value exists)
    - Add completed_at timestamp to track when quiz was completed
    - Add constraint: if quiz_completed=true, then chronotype must be non-null

  2. Purpose
    - Enforce that quiz_completed has a definitive boolean value (true or false, never null)
    - Guarantee every user has a chronotype once profile is created
    - Prevent ambiguous states where quiz status is unclear
    - Track when the quiz was completed for analytics

  3. Safety
    - Backfill all existing null quiz_completed values to false
    - Backfill all existing null chronotype values to 'bear'
    - No data loss — only adding constraint enforcement
    - Changes are backwards compatible with existing code
*/

-- Backfill quiz_completed NULLs to false
UPDATE profiles 
SET quiz_completed = false 
WHERE quiz_completed IS NULL;

-- Backfill chronotype NULLs to 'bear' (default chronotype)
UPDATE profiles 
SET chronotype = 'bear' 
WHERE chronotype IS NULL;

-- Add completed_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'quiz_completed_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN quiz_completed_at timestamptz;
  END IF;
END $$;

-- Backfill quiz_completed_at for users who have completed the quiz
UPDATE profiles 
SET quiz_completed_at = updated_at 
WHERE quiz_completed = true AND quiz_completed_at IS NULL;

-- Modify quiz_completed to be NOT NULL with DEFAULT false
ALTER TABLE profiles 
ALTER COLUMN quiz_completed SET NOT NULL,
ALTER COLUMN quiz_completed SET DEFAULT false;

-- Modify chronotype to be NOT NULL with DEFAULT 'bear'
ALTER TABLE profiles 
ALTER COLUMN chronotype SET NOT NULL,
ALTER COLUMN chronotype SET DEFAULT 'bear';

-- Add constraint: quiz_completed=true implies chronotype is set
ALTER TABLE profiles
ADD CONSTRAINT profiles_quiz_completed_has_chronotype 
CHECK (NOT quiz_completed OR chronotype IS NOT NULL);

-- Index for quiz completion queries
CREATE INDEX IF NOT EXISTS idx_profiles_quiz_completed 
ON profiles(quiz_completed)
WHERE quiz_completed = false;

-- Index for finding users who completed the quiz with their chronotype
CREATE INDEX IF NOT EXISTS idx_profiles_quiz_completed_chronotype 
ON profiles(quiz_completed, chronotype)
WHERE quiz_completed = true;

-- Comment the columns for documentation
COMMENT ON COLUMN profiles.quiz_completed IS 'Boolean flag: has user completed chronotype quiz? NOT NULL, defaults to false.';
COMMENT ON COLUMN profiles.chronotype IS 'Chronotype result: lion, bear, wolf, or dolphin. NOT NULL, defaults to bear.';
COMMENT ON COLUMN profiles.quiz_completed_at IS 'Timestamp when quiz was completed. NULL if quiz not completed.';
COMMENT ON CONSTRAINT profiles_quiz_completed_has_chronotype ON profiles IS 'Integrity check: if quiz_completed=true, chronotype must be set.';
