/* ============================================================
   DJ SALIM BIGSHOW PRO — Types de la Base de Données
   Générés manuellement depuis le schéma Supabase
   ============================================================ */

// ============================================================
// Types de base
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================
// Tables
// ============================================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  price: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceInsert {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  image_url?: string | null;
  price?: string | null;
  is_featured?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceUpdate {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
  image_url?: string | null;
  price?: string | null;
  is_featured?: boolean;
  display_order?: number;
  updated_at?: string;
}

// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string | null;
  image_url: string;
  gallery_urls: string[];
  category: string;
  tags: string[];
  client_name: string | null;
  event_date: string | null;
  location: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  id?: string;
  title: string;
  description: string;
  short_description?: string | null;
  image_url: string;
  gallery_urls?: string[];
  category?: string;
  tags?: string[];
  client_name?: string | null;
  event_date?: string | null;
  location?: string | null;
  is_featured?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectUpdate {
  id?: string;
  title?: string;
  description?: string;
  short_description?: string | null;
  image_url?: string;
  gallery_urls?: string[];
  category?: string;
  tags?: string[];
  client_name?: string | null;
  event_date?: string | null;
  location?: string | null;
  is_featured?: boolean;
  display_order?: number;
  updated_at?: string;
}

// ============================================================

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_avatar: string | null;
  content: string;
  rating: number;
  event_type: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialInsert {
  id?: string;
  author_name: string;
  author_role?: string | null;
  author_avatar?: string | null;
  content: string;
  rating?: number;
  event_type?: string | null;
  is_featured?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialUpdate {
  id?: string;
  author_name?: string;
  author_role?: string | null;
  author_avatar?: string | null;
  content?: string;
  rating?: number;
  event_type?: string | null;
  is_featured?: boolean;
  display_order?: number;
  updated_at?: string;
}

// ============================================================

export interface PricingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  duration: string | null;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PricingPlanInsert {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  currency?: string;
  duration?: string | null;
  features?: string[];
  is_popular?: boolean;
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PricingPlanUpdate {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  currency?: string;
  duration?: string | null;
  features?: string[];
  is_popular?: boolean;
  is_active?: boolean;
  display_order?: number;
  updated_at?: string;
}

// ============================================================

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  event_type: string | null;
  event_date: string | null;
  budget: string | null;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageInsert {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  event_type?: string | null;
  event_date?: string | null;
  budget?: string | null;
  is_read?: boolean;
  is_archived?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessageUpdate {
  id?: string;
  is_read?: boolean;
  is_archived?: boolean;
  updated_at?: string;
}

// ============================================================

export type SettingType = 'text' | 'number' | 'boolean' | 'json' | 'image';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: SettingType;
  label: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingInsert {
  id?: string;
  key: string;
  value: string;
  type?: SettingType;
  label?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettingUpdate {
  id?: string;
  key?: string;
  value?: string;
  type?: SettingType;
  label?: string | null;
  description?: string | null;
  updated_at?: string;
}

// ============================================================

export interface Portfolio {
  id: string;
  artistes: string;
  lieu: string;
  date: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface PortfolioInsert {
  id?: string;
  artistes: string;
  lieu: string;
  date: string;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export interface PortfolioUpdate {
  id?: string;
  artistes?: string;
  lieu?: string;
  date?: string;
  description?: string | null;
  image_url?: string | null;
}

// ============================================================

export interface Booking {
  id: string;
  client_name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  status: 'new' | 'waiting_verification' | 'confirmed' | 'cancelled' | 'waiting_payment';
  price_quoted?: number;
  deposit_amount?: number;
  receipt_url?: string;
  admin_validated: boolean;
  client_validated: boolean;
  created_at: string;
}

export interface BlockedEmail {
  id: string;
  email: string;
  reason?: string;
  created_at: string;
}

export interface BookingInsert {
  id?: string;
  client_name: string;
  email: string;
  phone?: string | null;
  event_type?: string | null;
  event_date: string;
  status?: string;
  price_quoted?: number | null;
  admin_validated?: boolean;
  client_validated?: boolean;
  receipt_url?: string | null;
  created_at?: string;
}

export interface BookingUpdate {
  id?: string;
  client_name?: string;
  email?: string;
  phone?: string | null;
  event_type?: string | null;
  event_date?: string;
  status?: string;
  price_quoted?: number | null;
  admin_validated?: boolean;
  client_validated?: boolean;
  receipt_url?: string | null;
}

// ============================================================

export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticket_link: string | null;
  is_sold_out: boolean;
  created_at: string;
}

export interface TourDateInsert {
  id?: string;
  date: string;
  city: string;
  venue: string;
  ticket_link?: string | null;
  is_sold_out?: boolean;
  created_at?: string;
}

export interface TourDateUpdate {
  id?: string;
  date?: string;
  city?: string;
  venue?: string;
  ticket_link?: string | null;
  is_sold_out?: boolean;
}

// ============================================================
// Schéma complet de la base de données
// ============================================================

export interface Database {
  public: {
    Tables: {
      services: {
        Row: Service;
        Insert: ServiceInsert;
        Update: ServiceUpdate;
      };
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      testimonials: {
        Row: Testimonial;
        Insert: TestimonialInsert;
        Update: TestimonialUpdate;
      };
      pricing_plans: {
        Row: PricingPlan;
        Insert: PricingPlanInsert;
        Update: PricingPlanUpdate;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: ContactMessageInsert;
        Update: ContactMessageUpdate;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSettingInsert;
        Update: SiteSettingUpdate;
      };
      tour_dates: {
        Row: TourDate;
        Insert: TourDateInsert;
        Update: TourDateUpdate;
      };
      portfolio: {
        Row: Portfolio;
        Insert: PortfolioInsert;
        Update: PortfolioUpdate;
      };
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
      };
      blocked_emails: {
        Row: BlockedEmail;
        Insert: { email: string; reason?: string; id?: string; created_at?: string; };
        Update: { email?: string; reason?: string; id?: string; created_at?: string; };
      };
    };
  };
}
