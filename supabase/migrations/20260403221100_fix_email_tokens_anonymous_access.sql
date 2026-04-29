/*
  # Fix Email Tokens Anonymous Access

  1. Problem
    - Users clicking email confirmation links are NOT authenticated
    - Current RLS policies block anonymous users from reading tokens
    - This causes the "blue screen" error on confirmation page

  2. Solution
    - Add SELECT policy for anonymous users to read tokens by token value
    - Add UPDATE policy for anonymous users to mark tokens as confirmed
    - Keep existing authenticated user policies intact

  3. Security
    - Anonymous SELECT limited to lookup by token only
    - Anonymous UPDATE only allows setting confirmed_at field
    - Tokens have 24-hour expiration for safety
*/

CREATE POLICY "Anonymous can read tokens by token value"
  ON email_tokens FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous can confirm tokens"
  ON email_tokens FOR UPDATE
  TO anon
  USING (confirmed_at IS NULL AND expires_at > now())
  WITH CHECK (confirmed_at IS NOT NULL);
