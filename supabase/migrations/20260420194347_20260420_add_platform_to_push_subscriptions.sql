/*
  # Add platform column to push_subscriptions

  1. Modified Tables
    - `push_subscriptions`
      - Added `platform` column to track device type (web, ios, android)
  
  2. Purpose
    - Support push notifications for iOS, Android, and web platforms
    - Enable platform-specific notification handling
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'push_subscriptions' AND column_name = 'platform'
  ) THEN
    ALTER TABLE push_subscriptions ADD COLUMN platform text DEFAULT 'web';
  END IF;
END $$;
