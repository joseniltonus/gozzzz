/*
  # Delete test account gozzzztest@gmail.com

  Removes all data associated with the test account:
  - Deletes the auth user (cascades to profiles and related tables via FK)
  - User ID: 728d6b6c-ee86-465a-904c-58e33d8fb7fc
*/

DELETE FROM auth.users WHERE id = '728d6b6c-ee86-465a-904c-58e33d8fb7fc';