/*
  # Push Notifications Infrastructure

  1. New Tables
    - `vapid_keys` — stores VAPID public/private key pair for web push
    - `push_subscriptions` — stores browser push subscriptions per user

  2. Extensions
    - `pg_net` — async HTTP calls from SQL
    - `pg_cron` — scheduled jobs

  3. Cron Job
    - Runs every 30 minutes to trigger send-push-notifications edge function

  4. Security
    - No RLS: both tables accessed exclusively via service role key inside edge functions
    - Private VAPID key never returned to client
*/

CREATE TABLE IF NOT EXISTS vapid_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_key text NOT NULL,
  private_key text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text UNIQUE NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  chronotype text NOT NULL DEFAULT 'bear',
  lang text NOT NULL DEFAULT 'pt',
  onboarding_date bigint NOT NULL DEFAULT 0,
  utc_offset integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_chronotype ON push_subscriptions (chronotype);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_utc_offset ON push_subscriptions (utc_offset);

CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'send-push-notifications-every-30min'
  ) THEN
    PERFORM cron.schedule(
      'send-push-notifications-every-30min',
      '*/30 * * * *',
      $cron$
      SELECT extensions.http_post(
        'https://placeholder.supabase.co/functions/v1/send-push-notifications',
        '{}',
        'application/json'
      );
      $cron$
    );
  END IF;
END $$;
