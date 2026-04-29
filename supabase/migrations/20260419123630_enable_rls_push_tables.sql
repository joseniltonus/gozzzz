/*
  # Enable RLS on push notification tables

  Both tables are accessed exclusively via Edge Functions using the service role key,
  which bypasses RLS. No public policies are needed — enabling RLS with zero policies
  means the tables are fully locked down from the public API.

  1. Changes
    - Enable RLS on `vapid_keys` (no policies — service role only)
    - Enable RLS on `push_subscriptions` (no policies — service role only)
*/

ALTER TABLE vapid_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
