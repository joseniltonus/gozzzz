/*
  # Backfill missing profiles and ensure handle_new_user trigger exists

  1. Backfill profiles
     - For any auth.users record that does NOT have a matching public.profiles row,
       insert a default profile so the user can log in without errors.

  2. Ensure trigger
     - Re-create the handle_new_user function and on_auth_user_created trigger
       to guarantee every new auth.users row always gets a profile row.
     - The function is SECURITY DEFINER with a locked search_path for safety.

  3. Notes
     - No destructive operations. Only INSERT with ON CONFLICT DO NOTHING.
     - The trigger is re-attached using CREATE OR REPLACE semantics to be idempotent.
*/

INSERT INTO public.profiles (id, email, language, subscription_type, created_at, updated_at)
SELECT u.id, u.email, 'pt', 'free', now(), now()
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
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
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
