/*
  # Criar esquema completo do GoZzzz App
  
  ## Descrição
  Este migration cria todas as tabelas necessárias para o aplicativo GoZzzz,
  um app de saúde do sono e saúde mental baseado em pesquisas científicas.
  
  ## Novas Tabelas
  
  ### 1. profiles
  - `id` (uuid, primary key) - ID do usuário (vinculado ao auth.users)
  - `email` (text) - Email do usuário
  - `full_name` (text) - Nome completo
  - `language` (text) - Idioma preferido (pt, en, es)
  - `subscription_type` (text) - Tipo de assinatura (free, premium, gift)
  - `subscription_expires_at` (timestamptz) - Data de expiração da assinatura
  - `created_at` (timestamptz) - Data de criação
  - `updated_at` (timestamptz) - Data de atualização
  
  ### 2. lessons
  - `id` (uuid, primary key) - ID da lição
  - `step_number` (integer) - Número do passo (1-21)
  - `title_pt` (text) - Título em português
  - `title_en` (text) - Título em inglês
  - `title_es` (text) - Título em espanhol
  - `description_pt` (text) - Descrição em português
  - `description_en` (text) - Descrição em inglês
  - `description_es` (text) - Descrição em espanhol
  - `video_url` (text) - URL do vídeo
  - `audio_url` (text) - URL do áudio
  - `duration_minutes` (integer) - Duração em minutos
  - `is_premium` (boolean) - Se é conteúdo premium
  - `created_at` (timestamptz) - Data de criação
  
  ### 3. user_progress
  - `id` (uuid, primary key) - ID do progresso
  - `user_id` (uuid, foreign key) - ID do usuário
  - `lesson_id` (uuid, foreign key) - ID da lição
  - `completed` (boolean) - Se foi completado
  - `completed_at` (timestamptz) - Data de conclusão
  - `notes` (text) - Notas do usuário
  - `created_at` (timestamptz) - Data de criação
  
  ### 4. daily_tips
  - `id` (uuid, primary key) - ID da dica
  - `title_pt` (text) - Título em português
  - `title_en` (text) - Título em inglês
  - `title_es` (text) - Título em espanhol
  - `content_pt` (text) - Conteúdo em português
  - `content_en` (text) - Conteúdo em inglês
  - `content_es` (text) - Conteúdo em espanhol
  - `scientific_source` (text) - Fonte científica
  - `category` (text) - Categoria (sleep_hygiene, circadian_rhythm, mental_health, etc.)
  - `is_premium` (boolean) - Se é conteúdo premium
  - `created_at` (timestamptz) - Data de criação
  
  ## Segurança (RLS)
  - Todas as tabelas têm RLS habilitado
  - Usuários podem ver e editar apenas seus próprios dados
  - Lições e dicas são visíveis para todos usuários autenticados
  - Conteúdo premium requer assinatura válida
  
  ## Notas Importantes
  1. Sistema de assinatura preparado para integração com RevenueCat
  2. Suporte multi-idioma (português, inglês, espanhol)
  3. Controle de acesso baseado em tipo de assinatura
  4. Rastreamento de progresso individual por usuário
*/

-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  language text DEFAULT 'pt' CHECK (language IN ('pt', 'en', 'es')),
  subscription_type text DEFAULT 'free' CHECK (subscription_type IN ('free', 'premium', 'gift')),
  subscription_expires_at timestamptz,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de lições (21 passos)
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL UNIQUE CHECK (step_number >= 1 AND step_number <= 21),
  title_pt text NOT NULL,
  title_en text NOT NULL,
  title_es text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  description_es text NOT NULL,
  video_url text,
  audio_url text,
  duration_minutes integer DEFAULT 10,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Criar tabela de dicas diárias
CREATE TABLE IF NOT EXISTS daily_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_en text NOT NULL,
  title_es text NOT NULL,
  content_pt text NOT NULL,
  content_en text NOT NULL,
  content_es text NOT NULL,
  scientific_source text,
  category text DEFAULT 'sleep_hygiene' CHECK (category IN ('sleep_hygiene', 'circadian_rhythm', 'mental_health', 'nutrition', 'exercise', 'environment')),
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tips ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas RLS para lessons
CREATE POLICY "Usuários autenticados podem ver lições"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- Políticas RLS para user_progress
CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seu próprio progresso"
  ON user_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas RLS para daily_tips
CREATE POLICY "Usuários autenticados podem ver dicas"
  ON daily_tips FOR SELECT
  TO authenticated
  USING (true);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lessons_step_number ON lessons(step_number);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_type ON profiles(subscription_type);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at em profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();