/*
  # Setup Email Confirmation Trigger with Resend

  1. Create a function to send confirmation emails via Resend
  2. Create a trigger to automatically send emails on user signup
  3. Handle email resend requests

  This migration sets up the automated email confirmation flow using Resend instead
  of Supabase's default email provider.
*/

-- Create a function to send confirmation emails via the edge function
CREATE OR REPLACE FUNCTION send_confirmation_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the send-email edge function via HTTP
  PERFORM
    net.http_post(
      url := 'https://cmekyhdkenoymfftwjod.supabase.co/functions/v1/send-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZWt5aGRrZW5veW1mZnR3am9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDYyNTYsImV4cCI6MjA4NzU4MjI1Nn0.SlA5juFG5ATnLMjosvgoRAnVRUgdyWxQSp8hFuUDyY8'
      ),
      body := jsonb_build_object(
        'to', NEW.email,
        'subject', 'Confirme seu e-mail - GoZzzz',
        'html', 'Um link de confirmação foi enviado para seu e-mail.'
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on auth.users to send emails (if it doesn't already exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'send_email_on_signup'
    AND tgrelid = 'auth.users'::regclass
  ) THEN
    CREATE TRIGGER send_email_on_signup
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION send_confirmation_email();
  END IF;
END $$;
