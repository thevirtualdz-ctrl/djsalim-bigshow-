-- ============================================================
-- DJ SALIM BIGSHOW PRO — Création des tables manquantes
-- ============================================================

-- 1. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'text' NOT NULL,
  label VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  image_url VARCHAR(512),
  price VARCHAR(100),
  is_featured BOOLEAN DEFAULT false NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url VARCHAR(512) NOT NULL,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  category VARCHAR(100) NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  client_name VARCHAR(255),
  event_date VARCHAR(100),
  location VARCHAR(255),
  is_featured BOOLEAN DEFAULT false NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(255),
  author_avatar VARCHAR(512),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 NOT NULL,
  event_type VARCHAR(100),
  is_featured BOOLEAN DEFAULT false NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PRICING PLANS
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'DZD' NOT NULL,
  duration VARCHAR(100),
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  is_popular BOOLEAN DEFAULT false NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ACTIVATION DE RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- POLITIQUES (Lecture publique, Ecriture admin)
CREATE POLICY "Allow public select site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes site_settings" ON public.site_settings USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public select services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes services" ON public.services USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public select projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes projects" ON public.projects USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public select testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes testimonials" ON public.testimonials USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public select pricing_plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Allow authenticated changes pricing_plans" ON public.pricing_plans USING (auth.role() = 'authenticated');
