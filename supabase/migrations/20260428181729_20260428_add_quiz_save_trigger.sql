/*
  # Add trigger to auto-set quiz_completed_at

  1. Purpose
    - Ensure quiz_completed_at is set when quiz_completed changes to true
    - Prevents null timestamps even if frontend forgets to set it
    - Provides audit trail for when quiz was actually completed

  2. Changes
    - Add trigger to auto-update quiz_completed_at
    - Simplifies frontend logic (doesn't need to calculate timestamp)
    - Ensures consistency across all update methods
*/

-- Create trigger function to set quiz_completed_at when quiz_completed is set to true
CREATE OR REPLACE FUNCTION update_quiz_completed_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  -- If quiz_completed is being set to true and timestamp not provided, set it now
  IF NEW.quiz_completed = true AND OLD.quiz_completed = false THEN
    IF NEW.quiz_completed_at IS NULL THEN
      NEW.quiz_completed_at = NOW();
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS profiles_quiz_completed_timestamp_trigger ON profiles;

-- Create trigger
CREATE TRIGGER profiles_quiz_completed_timestamp_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_quiz_completed_timestamp();

-- Index for finding users by quiz completion status and chronotype
CREATE INDEX IF NOT EXISTS idx_profiles_quiz_status_chronotype 
ON profiles(quiz_completed, chronotype) 
WHERE quiz_completed = true;
