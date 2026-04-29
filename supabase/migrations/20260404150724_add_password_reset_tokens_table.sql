/*
  # Add password_reset_tokens table

  1. New Tables
    - `password_reset_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text)
      - `token` (text, unique)
      - `expires_at` (timestamptz)
      - `used_at` (timestamptz, nullable — set when consumed)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Anonymous users can insert (needed to request reset without being logged in)
    - No SELECT policy — tokens are only verified server-side via service role
    - Authenticated users cannot read or modify tokens (service role only)

  3. Notes
    - Tokens expire after 1 hour
    - Once used_at is set the token is invalid
    - The edge function uses service role key to verify and consume tokens
*/

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages password reset tokens"
  ON password_reset_tokens
  FOR INSERT
  TO anon
  WITH CHECK (true);
