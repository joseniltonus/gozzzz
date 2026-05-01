/*
  # Enforce gift code single-use at database level

  ## Purpose
  Ensures gift codes can only be redeemed once and are non-transferable,
  enforced at the database layer so it cannot be bypassed.

  ## Changes
  1. Unique constraint on `code` column (if not already present)
  2. Trigger that prevents `used_by` from being changed once set
  3. Trigger that prevents `used_at` from being changed once set
  4. Check constraint ensuring `used_by` and `used_at` are always set together
*/

DO $$
BEGIN
  IF to_regclass('public.gift_codes') IS NULL THEN
    RAISE NOTICE 'Skipping gift code constraints because public.gift_codes does not exist.';
    RETURN;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'gift_codes_code_unique'
  ) THEN
    ALTER TABLE gift_codes
      ADD CONSTRAINT gift_codes_code_unique UNIQUE (code);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'gift_codes_used_together'
  ) THEN
    ALTER TABLE gift_codes
      ADD CONSTRAINT gift_codes_used_together
      CHECK (
        (used_by IS NULL AND used_at IS NULL) OR
        (used_by IS NOT NULL AND used_at IS NOT NULL)
      );
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION prevent_gift_code_reuse()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.used_by IS NOT NULL THEN
    RAISE EXCEPTION 'Gift code has already been redeemed and cannot be modified.';
  END IF;
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF to_regclass('public.gift_codes') IS NULL THEN
    RAISE NOTICE 'Skipping gift code trigger because public.gift_codes does not exist.';
    RETURN;
  END IF;

  DROP TRIGGER IF EXISTS gift_code_single_use_guard ON gift_codes;

  CREATE TRIGGER gift_code_single_use_guard
    BEFORE UPDATE ON gift_codes
    FOR EACH ROW
    EXECUTE FUNCTION prevent_gift_code_reuse();
END
$$;
