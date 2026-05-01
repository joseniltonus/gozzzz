-- Grant full app access (premium) to a specific user by email.
-- Safe to run multiple times.
DO $$
DECLARE
  target_email text := 'gozzzztest@gmail.com';
  target_user_id uuid;
BEGIN
  SELECT u.id
    INTO target_user_id
  FROM auth.users u
  WHERE lower(u.email) = lower(target_email)
  ORDER BY u.created_at DESC
  LIMIT 1;

  IF target_user_id IS NULL THEN
    RAISE NOTICE 'User with email % not found in auth.users. No changes applied.', target_email;
    RETURN;
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    subscription_type,
    subscription_expires_at,
    created_at,
    updated_at
  )
  VALUES (
    target_user_id,
    target_email,
    'premium',
    NULL,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    subscription_type = 'premium',
    subscription_expires_at = NULL,
    updated_at = now();

  RAISE NOTICE 'Premium access granted for % (user_id=%).', target_email, target_user_id;
END $$;
