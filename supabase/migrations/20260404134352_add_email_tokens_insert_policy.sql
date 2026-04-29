/*
  # Add INSERT policy for email_tokens

  1. Problem
    - After supabase.auth.signUp(), the user is authenticated
    - The email_tokens table has no INSERT policy for authenticated users
    - The INSERT silently fails with an RLS violation
    - No token is ever stored, so every confirmation link returns "token not found"

  2. Solution
    - Add an INSERT policy allowing authenticated users to insert a token for their own user_id

  3. Security
    - WITH CHECK (auth.uid() = user_id) ensures users can only insert tokens for themselves
*/

CREATE POLICY "Users can insert own email tokens"
  ON email_tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
