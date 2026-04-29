/*
  # Create Email Tokens Table for Confirmation

  1. New Tables
    - `email_tokens` - stores confirmation tokens for email verification
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email` (text) - the email being confirmed
      - `token` (text, unique) - the confirmation token
      - `type` (text) - 'signup' or 'resend'
      - `expires_at` (timestamp) - when the token expires
      - `confirmed_at` (timestamp) - when email was confirmed
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `email_tokens` table
    - Add policy for users to view their own tokens
    - Add policy for service role to manage tokens
*/

CREATE TABLE IF NOT EXISTS email_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  token text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'signup',
  expires_at timestamptz NOT NULL,
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own email tokens"
  ON email_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage email tokens"
  ON email_tokens FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_email_tokens_user_id ON email_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_tokens_token ON email_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_tokens_expires_at ON email_tokens(expires_at);
