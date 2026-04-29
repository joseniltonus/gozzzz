/*
  # Add session_token to profiles

  ## Summary
  Adds a `session_token` UUID column to the `profiles` table to support
  concurrent session detection. When a user logs in on a new device, a new
  token is generated and stored here. Any existing session with a different
  token will be signed out automatically.

  ## Changes
  - `profiles` table: new nullable `session_token uuid` column

  ## Security
  No RLS changes needed — existing policies already allow authenticated users
  to read and update their own profile row, which covers this column.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'session_token'
  ) THEN
    ALTER TABLE profiles ADD COLUMN session_token uuid;
  END IF;
END $$;
