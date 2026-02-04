-- ============================================
-- BETTER FIT EXPO - SUPABASE SETUP SQL
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para criar as tabelas necessárias para o app Expo

-- ============================================
-- 1. CRIAR TABELA EXERCISES
-- ============================================
CREATE TABLE IF NOT EXISTS exercises (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('home', 'gym')),
  description TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CRIAR TABELA MEALS
-- ============================================
CREATE TABLE IF NOT EXISTS meals (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  time TEXT NOT NULL,
  calories INTEGER NOT NULL,
  ingredients TEXT[] DEFAULT '{}',
  day TEXT NOT NULL CHECK (day IN ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CRIAR TABELA AUDIOS
-- ============================================
CREATE TABLE IF NOT EXISTS audios (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('treinar', 'ansiedade', 'corpo')),
  thumbnail TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

-- RLS para exercises
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercícios são públicos para leitura"
  ON exercises FOR SELECT
  USING (true);

-- RLS para meals
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Refeições são públicas para leitura"
  ON meals FOR SELECT
  USING (true);

-- RLS para audios
ALTER TABLE audios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Áudios são públicos para leitura"
  ON audios FOR SELECT
  USING (true);

-- ============================================
-- 5. INSERIR DADOS DE EXEMPLO - EXERCISES
-- ============================================

-- Exercícios Em Casa (type = 'home')
INSERT INTO exercises (title, type, description, video_url) VALUES
  (
    'Agachamento Livre',
    'home',
    'Agachamento com peso corporal. Pés na largura dos ombros, desça dobrando os joelhos.',
    'https://www.youtube.com/embed/aclHkVaku9U'
  ),
  (
    'Flexão',
    'home',
    'Flexão com as mãos no chão. Mantenha o corpo reto do calcanhar até a cabeça.',
    'https://www.youtube.com/embed/IODxDxX7oi4'
  ),
  (
    'Prancha',
    'home',
    'Prancha frontal. Mantenha por 30-60 segundos, corpo reto.',
    'https://www.youtube.com/embed/pSHjTRCQxIw'
  ),
  (
    'Afundo',
    'home',
    'Afundo alternado com peso corporal. Alterne as pernas a cada repetição.',
    'https://www.youtube.com/embed/D-kJtg9sAad'
  ),
  (
    'Polichinelo',
    'home',
    'Salto com abertura de pernas e braços. Exercício cardiovascular intenso.',
    'https://www.youtube.com/embed/c4bLlHuFfrs'
  );

-- Exercícios Academia (type = 'gym')
INSERT INTO exercises (title, type, description, video_url) VALUES
  (
    'Leg Press',
    'gym',
    'Máquina de leg press. Peso moderado, 12 repetições por série.',
    'https://www.youtube.com/embed/IZxyjW7MIAI'
  ),
  (
    'Cadeira Extensora',
    'gym',
    'Extensão de pernas na máquina. Foque na contração do quadríceps.',
    'https://www.youtube.com/embed/YyvSfVjQeL4'
  ),
  (
    'Supino Máquina',
    'gym',
    'Supino na máquina. Trabalha o peitoral, ombros e tríceps.',
    'https://www.youtube.com/embed/rT7DgCr-3pg'
  ),
  (
    'Puxada Frontal',
    'gym',
    'Puxada frontal na máquina. Trabalha as costas e bíceps.',
    'https://www.youtube.com/embed/CAwf7n6Luuc'
  ),
  (
    'Rosca Direta',
    'gym',
    'Rosca direta com halteres. Trabalha o bíceps.',
    'https://www.youtube.com/embed/ykJmroCEZH0'
  );

-- ============================================
-- 6. INSERIR DADOS DE EXEMPLO - MEALS
-- ============================================

-- Segunda (seg)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '08:00', 350, ARRAY['Ovos', 'Pão integral', 'Manteiga'], 'seg'),
  ('Almoço', '12:30', 650, ARRAY['Frango', 'Arroz', 'Feijão', 'Salada'], 'seg'),
  ('Lanche', '15:00', 200, ARRAY['Maçã', 'Iogurte grego'], 'seg'),
  ('Jantar', '19:00', 500, ARRAY['Salmão', 'Batata doce', 'Brócolis'], 'seg');

-- Terça (ter)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '08:00', 380, ARRAY['Aveia', 'Banana', 'Mel'], 'ter'),
  ('Almoço', '12:30', 680, ARRAY['Carne vermelha', 'Arroz integral', 'Legumes'], 'ter'),
  ('Lanche', '15:00', 220, ARRAY['Granola', 'Iogurte'], 'ter'),
  ('Jantar', '19:00', 520, ARRAY['Peito de frango', 'Abóbora', 'Salada verde'], 'ter');

-- Quarta (qua)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '08:00', 360, ARRAY['Pão francês', 'Queijo', 'Café'], 'qua'),
  ('Almoço', '12:30', 620, ARRAY['Peixe', 'Arroz', 'Vegetais'], 'qua'),
  ('Lanche', '15:00', 210, ARRAY['Castanhas', 'Fruta'], 'qua'),
  ('Jantar', '19:00', 480, ARRAY['Frango grelhado', 'Batata', 'Espinafre'], 'qua');

-- Quinta (qui)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '08:00', 370, ARRAY['Iogurte', 'Granola', 'Mel'], 'qui'),
  ('Almoço', '12:30', 660, ARRAY['Carne', 'Macarrão integral', 'Tomate'], 'qui'),
  ('Lanche', '15:00', 230, ARRAY['Banana', 'Pasta de amendoim'], 'qui'),
  ('Jantar', '19:00', 510, ARRAY['Tilápia', 'Arroz integral', 'Brócolis'], 'qui');

-- Sexta (sex)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '08:00', 340, ARRAY['Ovos mexidos', 'Pão', 'Suco'], 'sex'),
  ('Almoço', '12:30', 700, ARRAY['Frango', 'Batata frita', 'Salada'], 'sex'),
  ('Lanche', '15:00', 240, ARRAY['Proteína em pó', 'Leite'], 'sex'),
  ('Jantar', '19:00', 530, ARRAY['Carne moída', 'Abóbora', 'Salada'], 'sex');

-- Sábado (sab)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '09:00', 400, ARRAY['Panqueca', 'Mel', 'Frutas'], 'sab'),
  ('Almoço', '13:00', 750, ARRAY['Churrasco', 'Arroz', 'Farofa'], 'sab'),
  ('Lanche', '16:00', 250, ARRAY['Bolo caseiro', 'Café'], 'sab'),
  ('Jantar', '20:00', 550, ARRAY['Peixe', 'Batata doce', 'Vegetais'], 'sab');

-- Domingo (dom)
INSERT INTO meals (name, time, calories, ingredients, day) VALUES
  ('Café da Manhã', '10:00', 420, ARRAY['Omelete', 'Pão integral', 'Suco'], 'dom'),
  ('Almoço', '14:00', 800, ARRAY['Frango assado', 'Arroz branco', 'Feijão'], 'dom'),
  ('Lanche', '17:00', 260, ARRAY['Pudim', 'Leite'], 'dom'),
  ('Jantar', '19:30', 480, ARRAY['Carne vermelha', 'Batata', 'Salada'], 'dom');

-- ============================================
-- 7. INSERIR DADOS DE EXEMPLO - AUDIOS
-- ============================================

-- Áudios para treinar (treinar)
INSERT INTO audios (title, duration, category, url) VALUES
  (
    'Motivação para Treino',
    '15:30',
    'treinar',
    'https://www.youtube.com/embed/motivacao1'
  ),
  (
    'Música Energética',
    '22:45',
    'treinar',
    'https://www.youtube.com/embed/musica1'
  ),
  (
    'Podcast de Fitness',
    '35:20',
    'treinar',
    'https://www.youtube.com/embed/podcast1'
  );

-- Áudios para acalmar ansiedade (ansiedade)
INSERT INTO audios (title, duration, category, url) VALUES
  (
    'Meditação Guiada',
    '10:15',
    'ansiedade',
    'https://www.youtube.com/embed/meditacao1'
  ),
  (
    'Sons da Natureza',
    '20:00',
    'ansiedade',
    'https://www.youtube.com/embed/natureza1'
  ),
  (
    'Respiração Profunda',
    '8:30',
    'ansiedade',
    'https://www.youtube.com/embed/respiracao1'
  );

-- Áudios sobre o corpo (corpo)
INSERT INTO audios (title, duration, category, url) VALUES
  (
    'Anatomia do Treino',
    '25:40',
    'corpo',
    'https://www.youtube.com/embed/anatomia1'
  ),
  (
    'Nutrição Explicada',
    '18:20',
    'corpo',
    'https://www.youtube.com/embed/nutricao1'
  ),
  (
    'Recuperação Muscular',
    '12:50',
    'corpo',
    'https://www.youtube.com/embed/recuperacao1'
  );

-- ============================================
-- 8. CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_exercises_type ON exercises(type);
CREATE INDEX IF NOT EXISTS idx_meals_day ON meals(day);
CREATE INDEX IF NOT EXISTS idx_audios_category ON audios(category);

-- ============================================
-- SETUP COMPLETO!
-- ============================================
-- Agora o app Expo pode:
-- 1. Carregar exercícios por tipo (home/gym)
-- 2. Carregar refeições por dia da semana
-- 3. Carregar áudios por categoria
-- 4. Exibir dados em tempo real com loading/error states
-- ============================================
