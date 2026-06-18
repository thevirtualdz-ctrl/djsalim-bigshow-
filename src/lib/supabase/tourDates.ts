import { createClient } from './client';
import type { TourDate, TourDateInsert, TourDateUpdate } from '@/types/database';

export const DEFAULT_TOUR_DATES: TourDate[] = [
  {
    id: 'tour_1',
    date: '2026-07-04',
    city: 'Alger',
    venue: 'Crystal Lounge',
    ticket_link: 'https://tickets.example.com/alger',
    is_sold_out: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'tour_2',
    date: '2026-07-18',
    city: 'Oran',
    venue: 'Le Méridien Beach Club',
    ticket_link: 'https://tickets.example.com/oran',
    is_sold_out: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'tour_3',
    date: '2026-08-01',
    city: 'Béjaïa',
    venue: 'La Brise Marine',
    ticket_link: '',
    is_sold_out: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'tour_4',
    date: '2026-08-15',
    city: 'Constantine',
    venue: 'Zénith Amphithéâtre',
    ticket_link: 'https://tickets.example.com/constantine',
    is_sold_out: true,
    created_at: new Date().toISOString()
  }
];

// Vérifie si Supabase est correctement configuré
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && !url.includes('placeholder'));
}

// Lit les dates de concert (depuis Supabase ou localStorage/Mocks)
export async function getTourDates(): Promise<TourDate[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from('tour_dates')
        .select('*')
        .order('date', { ascending: true });

      if (!error && data) {
        return data as TourDate[];
      }
      console.warn('Erreur lors du fetch Supabase (fallback activé) :', error);
    } catch (e) {
      console.warn('Exception lors de la connexion Supabase (fallback activé) :', e);
    }
  }

  // Fallback client-side : localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dj_salim_tour_dates');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TourDate[];
        // Trier par date
        return parsed.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('dj_salim_tour_dates', JSON.stringify(DEFAULT_TOUR_DATES));
      return DEFAULT_TOUR_DATES;
    }
  }

  return DEFAULT_TOUR_DATES;
}

// Ajoute une date de concert
export async function createTourDate(insertData: TourDateInsert): Promise<TourDate> {
  const newDate: TourDate = {
    id: insertData.id || 'tour_' + Date.now(),
    date: insertData.date,
    city: insertData.city,
    venue: insertData.venue,
    ticket_link: insertData.ticket_link || null,
    is_sold_out: insertData.is_sold_out || false,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from('tour_dates')
        .insert([insertData])
        .select()
        .single();

      if (!error && data) {
        return data as TourDate;
      }
      console.error('Erreur insertion Supabase (écriture locale) :', error);
    } catch (e) {
      console.error(e);
    }
  }

  // Fallback client-side
  if (typeof window !== 'undefined') {
    const current = await getTourDates();
    const updated = [...current, newDate];
    localStorage.setItem('dj_salim_tour_dates', JSON.stringify(updated));
  }
  return newDate;
}

// Modifie une date de concert
export async function updateTourDate(id: string, updateData: TourDateUpdate): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from('tour_dates')
        .update(updateData)
        .eq('id', id);

      if (!error) return true;
      console.error('Erreur modif Supabase (écriture locale) :', error);
    } catch (e) {
      console.error(e);
    }
  }

  // Fallback client-side
  if (typeof window !== 'undefined') {
    const current = await getTourDates();
    const updated = current.map(item => 
      item.id === id ? { ...item, ...updateData } : item
    );
    localStorage.setItem('dj_salim_tour_dates', JSON.stringify(updated));
    return true;
  }
  return false;
}

// Supprime une date de concert
export async function deleteTourDate(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from('tour_dates')
        .delete()
        .eq('id', id);

      if (!error) return true;
      console.error('Erreur suppression Supabase (écriture locale) :', error);
    } catch (e) {
      console.error(e);
    }
  }

  // Fallback client-side
  if (typeof window !== 'undefined') {
    const current = await getTourDates();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem('dj_salim_tour_dates', JSON.stringify(updated));
    return true;
  }
  return false;
}
