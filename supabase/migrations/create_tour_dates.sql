-- ============================================================
-- DJ SALIM BIGSHOW PRO — Création de la table tour_dates
-- ============================================================

CREATE TABLE IF NOT EXISTS public.tour_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  city VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  ticket_link VARCHAR(512),
  is_sold_out BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de Row Level Security (RLS)
ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;

-- Politique d'accès en lecture : Tout le monde (visiteurs de la vitrine)
CREATE POLICY "Allow public select" ON public.tour_dates
  FOR SELECT USING (true);

-- Politique d'accès en écriture/modif : Utilisateurs authentifiés (Salim)
CREATE POLICY "Allow authenticated changes" ON public.tour_dates
  USING (auth.role() = 'authenticated');
