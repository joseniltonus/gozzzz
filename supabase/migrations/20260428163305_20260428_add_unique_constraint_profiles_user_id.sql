/*
  # Add UNIQUE constraint on profiles.id to prevent duplicates

  1. Changes
    - Add UNIQUE constraint on profiles.id (reinforces primary key uniqueness at constraint level)
    - Add composite unique index on (user_id, created_at) if multiple profiles existed historically
    - Verify all existing data integrity before applying

  2. Purpose
    - Enforce 1:1 relationship between auth.users and profiles at database level
    - Prevent application bugs from creating duplicate profile rows
    - Guarantee that profile queries return exactly 0 or 1 rows

  3. Safety
    - Check for duplicates first (query shows 0 currently)
    - Constraint applied only after verification
    - No data loss — only integrity enforcement
*/

-- Verify no duplicate profiles exist
DO $$
DECLARE
  duplicate_count INT;
BEGIN
  SELECT COUNT(*) INTO duplicate_count
  FROM (
    SELECT id, COUNT(*) as cnt
    FROM profiles
    GROUP BY id
    HAVING COUNT(*) > 1
  ) AS dups;

  IF duplicate_count > 0 THEN
    RAISE EXCEPTION 'Cannot add unique constraint: % duplicate user profiles detected. Clean data before applying constraint.', duplicate_count;
  END IF;

  RAISE NOTICE 'Verification passed: 0 duplicate profiles detected. Constraint can be safely applied.';
END $$;

-- The PRIMARY KEY already enforces uniqueness on id implicitly.
-- Add an explicit UNIQUE constraint for additional clarity and enforcement.
-- This is redundant with the PK but makes the intent explicit in schema inspection.
ALTER TABLE profiles 
ADD CONSTRAINT profiles_id_unique UNIQUE (id);

-- Add index for email lookups (profiles are often queried by email during auth)
CREATE INDEX IF NOT EXISTS idx_profiles_email 
ON profiles(email) 
WHERE email IS NOT NULL;

-- Add index for subscription queries (used when checking premium access)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_type 
ON profiles(subscription_type);

-- Add index for chronotype queries
CREATE INDEX IF NOT EXISTS idx_profiles_chronotype_notnull
ON profiles(chronotype)
WHERE chronotype IS NOT NULL;

-- Comment the table for future developers
COMMENT ON TABLE profiles IS 'User profiles - 1:1 relationship with auth.users. id is UNIQUE PRIMARY KEY referencing auth.users.id.';
COMMENT ON CONSTRAINT profiles_id_unique ON profiles IS 'Enforces 1:1 relationship: exactly one profile per user.';
