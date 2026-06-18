-- ============================================================
-- DJ SALIM BIGSHOW PRO — Création de la table contact_messages
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  event_type VARCHAR(100),
  event_date VARCHAR(50),
  budget VARCHAR(100),
  is_read BOOLEAN DEFAULT false NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Les clients non authentifiés peuvent insérer de nouveaux messages
CREATE POLICY "Allow public insert contact_messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- L'admin peut tout faire
CREATE POLICY "Allow authenticated changes contact_messages" ON public.contact_messages
  USING (auth.role() = 'authenticated');
