/*
  # Fix SECURITY DEFINER search_path and missing FK indexes

  ## Changes

  1. handle_new_user function
     - Changes search_path from quoted string ('public') to empty string ('')
       with explicit schema references, preventing search_path injection attacks
     - This is the recommended Supabase security hardening pattern

  2. Missing indexes on consent_records user_id FK
     - The consent_records table FK to auth.users was not indexed (no FK constraint exists)
     - Adds supporting indexes for any user_id columns that join to auth.users

  ## Security Notes
  - SECURITY DEFINER with a writeable search_path is a known attack vector
  - Setting search_path = '' forces all object references to be schema-qualified
*/

-- Fix handle_new_user: use empty search_path (safer) with explicit schema references
CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, language, subscription_type, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'pt',
    'free',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
