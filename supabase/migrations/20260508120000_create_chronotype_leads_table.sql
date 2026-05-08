/*
  # Chronotype lead capture (post-quiz email gate)

  1. New Table
    - `chronotype_leads` — armazena leads capturados no gate de e-mail
      após o quiz de cronótipo (modal nativo + quiz inline na /web/sono-plus).
      Cada linha = uma intenção do visitante de receber o relatório
      personalizado por e-mail.

  2. Columns
    - `id` (uuid)               — PK
    - `email` (text)            — endereço normalizado em lowercase
    - `chronotype` (text)       — lion / bear / wolf / dolphin
    - `quiz_answers` (jsonb)    — respostas brutas do quiz (auditoria + futuro re-segmento)
    - `language` (text)         — 'pt' | 'en' (template do e-mail)
    - `source` (text)           — 'web_quiz_inline' | 'modal_quiz' | etc.
    - `user_id` (uuid)          — opcional: usuário logado quando existir
    - `consent_at` (timestamptz)— momento do opt-in explícito
    - `email_sent_at`           — preenchido pela edge function ao confirmar envio
    - `email_message_id` (text) — id retornado pelo provedor (Resend) — auditoria
    - `email_error` (text)      — erro do provedor, quando houver
    - `ip_hash` (text)          — sha256(ip) para anti-abuso sem armazenar IP cru (LGPD)
    - `user_agent` (text)       — UA truncado, somente diagnóstico
    - `created_at` (timestamptz)

  3. Security
    - RLS habilitado.
    - Nenhuma policy: clientes (anon/authenticated) não conseguem ler nem escrever.
    - Inserção e leitura são exclusivas da edge function `send-chronotype-report`
      via SUPABASE_SERVICE_ROLE_KEY (bypassa RLS).
    - Mesmo padrão de `push_subscriptions`.

  4. Indexes
    - Único parcial em (lower(email), chronotype) considerando inserts dos
      últimos 24h NÃO é viável em SQL puro — dedupe é feito na edge function.
    - Índices comuns: email, chronotype, created_at.
*/

CREATE TABLE IF NOT EXISTS public.chronotype_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  chronotype text NOT NULL CHECK (chronotype IN ('lion', 'bear', 'wolf', 'dolphin')),
  quiz_answers jsonb,
  language text NOT NULL DEFAULT 'pt' CHECK (language IN ('pt', 'en')),
  source text NOT NULL DEFAULT 'web_quiz_inline',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  email_sent_at timestamptz,
  email_message_id text,
  email_error text,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chronotype_leads_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT chronotype_leads_email_lowercase CHECK (email = lower(email))
);

CREATE INDEX IF NOT EXISTS idx_chronotype_leads_email
  ON public.chronotype_leads (email);

CREATE INDEX IF NOT EXISTS idx_chronotype_leads_chronotype
  ON public.chronotype_leads (chronotype);

CREATE INDEX IF NOT EXISTS idx_chronotype_leads_created_at
  ON public.chronotype_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chronotype_leads_email_chronotype_recent
  ON public.chronotype_leads (email, chronotype, created_at DESC);

ALTER TABLE public.chronotype_leads ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.chronotype_leads FROM anon, authenticated;
GRANT ALL ON public.chronotype_leads TO service_role;

COMMENT ON TABLE public.chronotype_leads IS
  'Leads capturados no gate de e-mail pós-quiz. Acesso exclusivo via service_role na edge function send-chronotype-report.';

COMMENT ON COLUMN public.chronotype_leads.ip_hash IS
  'sha256(ip) — armazenado para detectar abuso/rate limit sem reter IP em claro (LGPD).';

COMMENT ON COLUMN public.chronotype_leads.email_message_id IS
  'ID do envio retornado pelo provedor de e-mail (Resend). Permite auditar bounces/complaints.';
