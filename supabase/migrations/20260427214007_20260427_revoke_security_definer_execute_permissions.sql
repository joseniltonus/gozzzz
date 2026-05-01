/*
  # Revoke SECURITY DEFINER Execute Permissions

  1. Security Issue
    - Four internal trigger functions were callable by anon and authenticated users
    - These should only execute via their triggers, not directly via RPC

  2. Functions Fixed
    - `public.handle_new_user()` - Creates profile on user signup
    - `public.prevent_gift_code_reuse()` - Enforces single-use gift codes
    - `public.update_lesson_feedback_updated_at()` - Updates feedback timestamps
    - `public.update_updated_at_column()` - Generic updated_at trigger

  3. Changes
    - Revoke EXECUTE permission from anon and authenticated roles
    - Keep functions as SECURITY DEFINER (they need superuser context for their work)
    - Functions remain callable only via their defined triggers
*/

DO $$
BEGIN
  -- Revoke execute on handle_new_user
  IF to_regprocedure('public.handle_new_user()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
  END IF;
  
  -- Revoke execute on prevent_gift_code_reuse
  IF to_regprocedure('public.prevent_gift_code_reuse()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.prevent_gift_code_reuse() FROM anon, authenticated, public;
  END IF;
  
  -- Revoke execute on update_lesson_feedback_updated_at
  IF to_regprocedure('public.update_lesson_feedback_updated_at()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.update_lesson_feedback_updated_at() FROM anon, authenticated, public;
  END IF;
  
  -- Revoke execute on update_updated_at_column
  IF to_regprocedure('public.update_updated_at_column()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
  END IF;
END $$;
