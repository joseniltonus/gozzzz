/*
  # Add chronotype field to profiles table
  
  1. New Field
    - `chronotype` (text) - User's sleep chronotype (lion, bear, wolf, dolphin)
  
  2. Changes
    - Add chronotype column with DEFAULT 'bear'
    - Create index for faster queries
  
  3. Security
    - RLS already enabled on profiles table
    - Users can update their own chronotype via existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'chronotype'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN chronotype text DEFAULT 'bear' 
    CHECK (chronotype IN ('lion', 'bear', 'wolf', 'dolphin'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_profiles_chronotype ON profiles(chronotype);