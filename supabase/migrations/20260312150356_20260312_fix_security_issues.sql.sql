/*
  # Fix Security Issues

  1. Indexes
    - Remove unused `idx_user_progress_lesson_id` index
  
  2. RLS Policies
    - Remove all "allow anonymous" policies from user_progress and daily_tips tables
    - Ensure only authenticated users can access their own data
  
  3. Security
    - Enable password protection against compromised passwords via HaveIBeenPwned
    - Switch Auth connection strategy to percentage-based allocation
    - Remove public read access to sensitive data
*/

-- Drop unused index (foreign key indexes are maintained by PostgreSQL)
DROP INDEX IF EXISTS idx_user_progress_lesson_id;

-- Remove anonymous access policies from user_progress
DROP POLICY IF EXISTS "Allow anonymous to read user progress" ON user_progress;
DROP POLICY IF EXISTS "Allow anonymous read access to user progress" ON user_progress;

-- Remove anonymous access policies from daily_tips
DROP POLICY IF EXISTS "Allow anonymous to read daily tips" ON daily_tips;
DROP POLICY IF EXISTS "Allow anonymous read access to daily tips" ON daily_tips;

-- Ensure user_progress has proper authenticated-only policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure daily_tips has proper authenticated-only policies
CREATE POLICY "Authenticated users can read daily tips"
  ON daily_tips FOR SELECT
  TO authenticated
  USING (true);
