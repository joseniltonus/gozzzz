/*
  # Add Email Confirmation Flow

  1. New Tables
    - `email_confirmations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email` (text)
      - `code` (text, 6-digit code)
      - `confirmed_at` (timestamp, null until confirmed)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)
  
  2. Security
    - Enable RLS on `email_confirmations` table
    - Add policy for users to insert their own records
    - Add policy for users to read/update their own records
*/

CREATE TABLE IF NOT EXISTS email_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  code text NOT NULL,
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  CONSTRAINT valid_code CHECK (length(code) = 6 AND code ~ '^\d+$')
);

CREATE INDEX IF NOT EXISTS idx_email_confirmations_user_id ON email_confirmations(user_id);
CREATE INDEX IF NOT EXISTS idx_email_confirmations_code ON email_confirmations(code);
CREATE INDEX IF NOT EXISTS idx_email_confirmations_email ON email_confirmations(email);

ALTER TABLE email_confirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own confirmation"
  ON email_confirmations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own confirmations"
  ON email_confirmations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own confirmations"
  ON email_confirmations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
