/*
  # Add quiz_progress to profiles

  Adds an integer column to track which question the user is currently on
  in the onboarding quiz. This allows resuming from the correct question
  after a refresh or app restart.

  - `quiz_progress` (integer, default 0): the current screen/question index
    - 0 = not started
    - 1–3 = mid-quiz
    - null = not started or completed (cleared on completion)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'quiz_progress'
  ) THEN
    ALTER TABLE profiles ADD COLUMN quiz_progress integer DEFAULT 0;
  END IF;
END $$;
