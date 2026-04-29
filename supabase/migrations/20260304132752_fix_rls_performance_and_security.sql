
/*
  # Fix RLS Performance and Security Issues

  ## Changes
  1. RLS Policy Optimization - Replace auth.uid() with (select auth.uid()) in all policies
     for tables: profiles, user_progress
     This prevents re-evaluation of auth functions for each row, improving query performance.

  2. Remove Unused Indexes
     - idx_user_progress_user_id
     - idx_user_progress_lesson_id
     - idx_lessons_step_number
     - idx_profiles_subscription_type

  3. Fix Function Search Path - Set stable search_path for update_updated_at_column
*/

-- =============================================
-- FIX RLS POLICIES: profiles table
-- =============================================

DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem inserir seu próprio perfil" ON public.profiles;

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- =============================================
-- FIX RLS POLICIES: user_progress table
-- =============================================

DROP POLICY IF EXISTS "Usuários podem ver seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem inserir seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio progresso" ON public.user_progress;
DROP POLICY IF EXISTS "Usuários podem deletar seu próprio progresso" ON public.user_progress;

CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON public.user_progress FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Usuários podem inserir seu próprio progresso"
  ON public.user_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
  ON public.user_progress FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Usuários podem deletar seu próprio progresso"
  ON public.user_progress FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- =============================================
-- REMOVE UNUSED INDEXES
-- =============================================

DROP INDEX IF EXISTS public.idx_user_progress_user_id;
DROP INDEX IF EXISTS public.idx_user_progress_lesson_id;
DROP INDEX IF EXISTS public.idx_lessons_step_number;
DROP INDEX IF EXISTS public.idx_profiles_subscription_type;

-- =============================================
-- FIX FUNCTION SEARCH PATH
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
