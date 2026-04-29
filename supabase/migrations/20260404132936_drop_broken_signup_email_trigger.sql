/*
  # Drop broken signup email trigger

  The send_email_on_signup trigger was sending a useless email with no
  confirmation link. Email sending is now handled entirely in the application
  layer via AuthContext, which generates a proper token and sends a real
  confirmation link. This trigger caused duplicate, broken emails on signup.
*/

DROP TRIGGER IF EXISTS send_email_on_signup ON auth.users;
DROP FUNCTION IF EXISTS send_confirmation_email();
