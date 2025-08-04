-- Estrutura das tabelas para o NutriApp
-- Execute este SQL no Supabase SQL Editor

-- Habilitar RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Tabela de usuários (complementa auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'personal_trainer', 'client')),
  phone_number VARCHAR(20),
  avatar TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  permissions JSONB DEFAULT '{}',
  profile JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de personal trainers
CREATE TABLE IF NOT EXISTS public.personal_trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  specialization TEXT,
  crn VARCHAR(20),
  experience TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_clients INTEGER DEFAULT 0,
  total_diets INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  subscription_plan VARCHAR(50) DEFAULT 'basic',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  birth_date DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  activity_level VARCHAR(20) CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  goal VARCHAR(50) CHECK (goal IN ('lose_weight', 'gain_weight', 'maintain_weight', 'gain_muscle', 'improve_health')),
  medical_conditions TEXT[],
  allergies TEXT[],
  food_preferences TEXT[],
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dietas
CREATE TABLE IF NOT EXISTS public.diets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_calories INTEGER,
  target_protein DECIMAL(6,2),
  target_carbs DECIMAL(6,2),
  target_fat DECIMAL(6,2),
  meals JSONB DEFAULT '[]',
  duration_days INTEGER DEFAULT 30,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens (para integração WhatsApp)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'document', 'audio')),
  whatsapp_message_id VARCHAR(255),
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_uid ON public.users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_personal_trainers_user_id ON public.personal_trainers(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_personal_trainer_id ON public.clients(personal_trainer_id);
CREATE INDEX IF NOT EXISTS idx_diets_client_id ON public.diets(client_id);
CREATE INDEX IF NOT EXISTS idx_diets_personal_trainer_id ON public.diets(personal_trainer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_personal_trainer_id ON public.appointments(personal_trainer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON public.messages(recipient_id);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_trainers_updated_at BEFORE UPDATE ON public.personal_trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diets_updated_at BEFORE UPDATE ON public.diets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = uid);
CREATE POLICY "Admins can view all users" ON public.users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE uid = auth.uid() AND role = 'admin'
  )
);

-- Políticas para personal trainers
CREATE POLICY "Personal trainers can view own data" ON public.personal_trainers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE uid = auth.uid() AND id = personal_trainers.user_id
  )
);

-- Políticas para clientes
CREATE POLICY "Personal trainers can view own clients" ON public.clients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.personal_trainers pt
    JOIN public.users u ON u.id = pt.user_id
    WHERE u.uid = auth.uid() AND pt.id = clients.personal_trainer_id
  )
);

-- Função para criar usuário completo
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (uid, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), COALESCE(NEW.raw_user_meta_data->>'role', 'client'));
  
  -- Se for personal trainer, criar registro na tabela personal_trainers
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'client') = 'personal_trainer' THEN
    INSERT INTO public.personal_trainers (user_id)
    SELECT id FROM public.users WHERE uid = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Inserir usuário admin padrão (execute apenas uma vez)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
-- VALUES (
--   gen_random_uuid(),
--   'admin@nutriapp.com',
--   crypt('admin123', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW(),
--   '{"full_name": "Administrador", "role": "admin"}'
-- );