/*
  # GDPR/LGPD Compliance: Consent Records and Data Rights

  ## Purpose
  Adds database infrastructure required for GDPR (EU/UK) and LGPD (Brazil) compliance.

  ## New Tables

  ### consent_records
  Stores explicit user consent for each processing activity with timestamp and IP/source context.
  - user_id: links to auth.users
  - consent_type: 'terms', 'privacy', 'marketing', 'data_processing'
  - granted: whether consent was given (true) or withdrawn (false)
  - consent_at: timestamp when consent was recorded
  - ip_hint: optional partial IP for audit trail
  - version: version of the policy consented to

  ### data_deletion_requests
  Tracks user requests to delete their account/data (right to erasure under GDPR Art. 17 / LGPD Art. 18).
  - user_id: links to auth.users
  - status: 'pending', 'processing', 'completed'
  - requested_at: when the request was made
  - completed_at: when deletion was finalised

  ### data_export_requests
  Tracks user requests to export their data (right to data portability under GDPR Art. 20 / LGPD Art. 18).
  - user_id: links to auth.users
  - status: 'pending', 'processing', 'completed'
  - requested_at: when the request was made
  - completed_at: when export was provided

  ## Security
  - RLS enabled on all tables
  - Users can only read/write their own records
  - Admins (service role) can access all records for compliance operations
*/

CREATE TABLE IF NOT EXISTS consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type text NOT NULL CHECK (consent_type IN ('terms', 'privacy', 'marketing', 'data_processing')),
  granted boolean NOT NULL DEFAULT false,
  consent_at timestamptz NOT NULL DEFAULT now(),
  policy_version text NOT NULL DEFAULT '1.0',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consents"
  ON consent_records FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consents"
  ON consent_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consents"
  ON consent_records FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


CREATE TABLE IF NOT EXISTS data_deletion_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  reason text DEFAULT '',
  requested_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE data_deletion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own deletion requests"
  ON data_deletion_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deletion requests"
  ON data_deletion_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);


CREATE TABLE IF NOT EXISTS data_export_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  requested_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE data_export_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own export requests"
  ON data_export_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own export requests"
  ON data_export_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_consent_records_user_id ON consent_records(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_type ON consent_records(user_id, consent_type);
CREATE INDEX IF NOT EXISTS idx_data_deletion_requests_user_id ON data_deletion_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_data_export_requests_user_id ON data_export_requests(user_id);
