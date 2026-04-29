/*
  # Create pricing table

  Stores pricing information for different plans and currencies.
  Allows dynamic pricing updates without code changes.

  - `id` (uuid, primary key)
  - `plan_type` (text): 'annual' or 'monthly'
  - `currency` (text): 'BRL' or 'USD'
  - `price` (decimal): numeric price value
  - `label` (text): formatted price label (e.g., 'R$ 147' or '$24.99')
  - `equiv` (text): descriptive text (e.g., 'lifetime access')
  - `note` (text): payment info (e.g., 'one-time payment')
  - `is_active` (boolean): whether this pricing is current
  - `created_at` (timestamptz): creation timestamp
*/

CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_type text NOT NULL CHECK (plan_type = ANY (ARRAY['annual'::text, 'monthly'::text])),
  currency text NOT NULL CHECK (currency = ANY (ARRAY['BRL'::text, 'USD'::text])),
  price decimal NOT NULL,
  label text NOT NULL,
  equiv text,
  note text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(plan_type, currency)
);

ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing"
  ON pricing FOR SELECT
  TO public
  USING (is_active = true);

INSERT INTO pricing (plan_type, currency, price, label, equiv, note, is_active)
VALUES
  ('annual', 'BRL', 147, 'R$ 147', 'acesso vitalício', 'pagamento único', true),
  ('annual', 'USD', 24.99, '$24.99', 'lifetime access', 'one-time payment', true)
ON CONFLICT (plan_type, currency) DO UPDATE SET
  price = EXCLUDED.price,
  label = EXCLUDED.label,
  equiv = EXCLUDED.equiv,
  note = EXCLUDED.note,
  is_active = EXCLUDED.is_active;
