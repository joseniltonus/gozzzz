/*
  # Fix profiles RLS policies and add missing DELETE policy

  ## Changes
  - Adds a DELETE policy for profiles so users can delete their own profile row
    (needed for account deletion flow)
  - Ensures the upsert trigger function creates profiles automatically
    when a new auth user is created, eliminating the race condition where
    the client-side insert fails before the session is established

  ## Security
  - All policies remain restricted to the authenticated user's own data
  - The trigger runs as SECURITY DEFINER to bypass RLS for the initial profile creation
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Users can delete own profile'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can delete own profile"
      ON profiles FOR DELETE
      TO authenticated
      USING (id = ( SELECT auth.uid() AS uid))';
  END IF;
END $$;
