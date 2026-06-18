-- ============================================================
-- DJ SALIM BIGSHOW PRO — Création des tables portfolio et bookings
-- ============================================================

CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artistes VARCHAR(255) NOT NULL,
  lieu VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(512),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  event_type VARCHAR(255),
  event_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  price_quoted DECIMAL(10, 2),
  admin_validated BOOLEAN DEFAULT false NOT NULL,
  client_validated BOOLEAN DEFAULT false NOT NULL,
  receipt_url VARCHAR(512),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de Row Level Security (RLS)
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Politiques portfolio
CREATE POLICY "Allow public select portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes portfolio" ON public.portfolio USING (auth.role() = 'authenticated');

-- Politiques bookings
CREATE POLICY "Allow public select bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated changes bookings" ON public.bookings USING (auth.role() = 'authenticated');

-- Storage buckets creation
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow public inserts receipts" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'receipts');
CREATE POLICY "Allow public selects receipts" ON storage.objects FOR SELECT USING (bucket_id = 'receipts');
CREATE POLICY "Allow auth receipts" ON storage.objects USING (bucket_id = 'receipts' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public selects media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Allow auth inserts media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Allow auth media" ON storage.objects USING (bucket_id = 'media' AND auth.role() = 'authenticated');
