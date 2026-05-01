/*
  Premium + todas as lições concluídas para gozzzztest@gmail.com
  
  Resolve:
  - Passos > 3 bloqueados quando subscription_type não é premium/gift na tabela profiles
  - Conta de teste com progresso marcado como completo nos gráficos / home
  
  Idempotente: pode correr várias vezes.
  Lookup em auth.users por email (maiúsculas/minúsculas indiferentes).
  Se o utilizador não existir, apenas NOTICE (sem erro).
*/

DO $$
DECLARE
  target_email text := 'gozzzztest@gmail.com';
  uid uuid;
BEGIN
  SELECT u.id
  INTO uid
  FROM auth.users u
  WHERE lower(trim(coalesce(u.email, ''))) = lower(trim(target_email))
  ORDER BY u.created_at DESC
  LIMIT 1;

  IF uid IS NULL THEN
    RAISE NOTICE 'grant_gozzzztest: user % não encontrado em auth.users — nada alterado.', target_email;
    RETURN;
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    language,
    subscription_type,
    subscription_expires_at,
    created_at,
    updated_at
  )
  VALUES (
    uid,
    target_email,
    'pt',
    'premium',
    NULL,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    subscription_type = 'premium',
    subscription_expires_at = NULL,
    updated_at = now();

  -- Quiz marcado como concluído na conta teste (idempotente).
  UPDATE public.profiles p
  SET quiz_completed = true,
      quiz_progress = NULL,
      updated_at = now()
  WHERE p.id = uid;

  IF to_regclass('public.lessons') IS NOT NULL
     AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_progress') THEN
    INSERT INTO public.user_progress (
      user_id,
      lesson_id,
      completed,
      completed_at
    )
    SELECT
      uid,
      l.id,
      true,
      now()
    FROM public.lessons l
    ON CONFLICT (user_id, lesson_id) DO UPDATE SET
      completed = true,
      completed_at = COALESCE(user_progress.completed_at, EXCLUDED.completed_at);
  ELSE
    RAISE NOTICE 'grant_gozzzztest: lessons ou user_progress não existem — só premium/perfil foram aplicados.';
  END IF;

  RAISE NOTICE 'grant_gozzzztest: email=% user_id=% — premium e progresso aplicados.', target_email, uid;
END $$;
