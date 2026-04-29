
/*
  # Add covering index for user_progress foreign key

  ## Changes
  - Add index on user_progress.lesson_id to cover the foreign key user_progress_lesson_id_fkey
    This improves query performance when joining or filtering user_progress by lesson_id.
*/

CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON public.user_progress (lesson_id);
