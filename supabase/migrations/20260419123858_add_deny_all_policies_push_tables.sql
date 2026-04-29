/*
  # Add explicit deny-all policies for push notification tables

  Both `vapid_keys` and `push_subscriptions` are accessed exclusively via Edge
  Functions using the service role key, which bypasses RLS by design. No
  authenticated or anonymous user should ever access these tables directly.

  Adding explicit deny-all policies (USING (false) / WITH CHECK (false)):
  - Resolves the "RLS Enabled No Policy" linter warning
  - Documents the intentional lockdown
  - Service role access continues to work unaffected (bypasses RLS)

  Tables:
    - `vapid_keys`: stores VAPID public/private keys for web push
    - `push_subscriptions`: stores browser push subscription objects

  Security:
    - All 4 operations (SELECT, INSERT, UPDATE, DELETE) are explicitly denied
      for authenticated users on both tables
*/

-- vapid_keys: deny all direct access
CREATE POLICY "No direct access - service role only (select)"
  ON vapid_keys FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "No direct access - service role only (insert)"
  ON vapid_keys FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "No direct access - service role only (update)"
  ON vapid_keys FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No direct access - service role only (delete)"
  ON vapid_keys FOR DELETE
  TO authenticated
  USING (false);

-- push_subscriptions: deny all direct access
CREATE POLICY "No direct access - service role only (select)"
  ON push_subscriptions FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "No direct access - service role only (insert)"
  ON push_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "No direct access - service role only (update)"
  ON push_subscriptions FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No direct access - service role only (delete)"
  ON push_subscriptions FOR DELETE
  TO authenticated
  USING (false);
