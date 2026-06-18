import { createClient } from './client';
import type { SiteSetting, SiteSettingUpdate, SettingType } from '@/types/database';

export const DEFAULT_SETTINGS: SiteSetting[] = [
  // --- HERO SECTION ---
  {
    id: 'hero_tagline',
    key: 'hero_tagline',
    value: 'DJ de Prestige & Ingénieur Son — Événements d\'Exception en Algérie',
    type: 'text',
    label: 'Tagline',
    description: 'Le petit texte au-dessus du titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hero_title_line1',
    key: 'hero_title_line1',
    value: 'L\'art du mix,',
    type: 'text',
    label: 'Titre - Ligne 1',
    description: 'Première ligne du grand titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hero_title_line2',
    key: 'hero_title_line2',
    value: 'la science du',
    type: 'text',
    label: 'Titre - Ligne 2',
    description: 'Deuxième ligne du grand titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hero_title_highlight',
    key: 'hero_title_highlight',
    value: 'spectacle',
    type: 'text',
    label: 'Titre - Mot clé (Or)',
    description: 'Le mot final en couleur or',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hero_subtitle',
    key: 'hero_subtitle',
    value: 'Concepteur d\'ambiances sonores et visuelles haut de gamme. Pour vos mariages de prestige, galas et événements corporate d\'envergure.',
    type: 'text',
    label: 'Sous-titre',
    description: 'Le paragraphe sous le grand titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // --- ABOUT SECTION ---
  {
    id: 'about_title',
    key: 'about_title',
    value: 'L\'excellence sonore au service de',
    type: 'text',
    label: 'Titre - Début',
    description: 'Titre de la section À Propos',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_title_highlight',
    key: 'about_title_highlight',
    value: 'vos émotions',
    type: 'text',
    label: 'Titre - Mot clé (Or)',
    description: 'Fin du titre en couleur or',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_text_1',
    key: 'about_text_1',
    value: 'Avec plus de 10 ans d\'expérience sur les scènes les plus prestigieuses, je conçois chaque événement comme une performance artistique et technique sur-mesure. Pas de playlist figée, pas de compromis : j\'analyse en temps réel l\'énergie de vos invités pour maintenir une piste de danse électrique du début à la fin.',
    type: 'text',
    label: 'Paragraphe 1',
    description: 'Premier paragraphe de présentation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_text_2',
    key: 'about_text_2',
    value: 'Que ce soit pour un grand mariage de prestige à Tlemcen, une soirée corporate exclusive à Alger ou un gala à Oran, je me déplace avec un matériel de sonorisation et d\'éclairage de niveau concert pour garantir une clarté acoustique et un show visuel irréprochables.',
    type: 'text',
    label: 'Paragraphe 2',
    description: 'Deuxième paragraphe de présentation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_stat_number',
    key: 'about_stat_number',
    value: '200+',
    type: 'text',
    label: 'Statistique - Chiffre',
    description: 'Ex: 200+',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_stat_label',
    key: 'about_stat_label',
    value: 'Événements d\'Exception',
    type: 'text',
    label: 'Statistique - Label',
    description: 'Ex: Soirées animées',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // --- SERVICES SECTION ---
  {
    id: 'services_title',
    key: 'services_title',
    value: 'Des prestations',
    type: 'text',
    label: 'Titre - Début',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'services_title_highlight',
    key: 'services_title_highlight',
    value: 'd\'exception',
    type: 'text',
    label: 'Titre - Mot clé (Or)',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'services_title_end',
    key: 'services_title_end',
    value: 'sur-mesure',
    type: 'text',
    label: 'Titre - Fin',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'services_subtitle',
    key: 'services_subtitle',
    value: 'Chaque événement a son histoire et ses exigences. De l\'ambiance acoustique raffinée aux shows scéniques les plus spectaculaires, découvrez comment je peux sublimer votre projet.',
    type: 'text',
    label: 'Sous-titre',
    description: 'Paragraphe sous le titre de la section Services',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // --- CTA SECTION ---
  {
    id: 'cta_title',
    key: 'cta_title',
    value: 'Sécurisez votre',
    type: 'text',
    label: 'Titre - Début',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cta_title_highlight',
    key: 'cta_title_highlight',
    value: 'date exclusive',
    type: 'text',
    label: 'Titre - Mot clé (Or)',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cta_title_end',
    key: 'cta_title_end',
    value: 'dès aujourd\'hui',
    type: 'text',
    label: 'Titre - Fin',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cta_subtitle',
    key: 'cta_subtitle',
    value: 'L\'agenda de la saison se remplit rapidement. Envoyez-moi les détails de votre événement pour étudier sa faisabilité et recevoir votre proposition sur-mesure.',
    type: 'text',
    label: 'Sous-titre',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Vérifie si Supabase est correctement configuré
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && !url.includes('placeholder'));
}

// Transforme un tableau de paramètres en dictionnaire clé-valeur
export function settingsToRecord(settings: SiteSetting[]): Record<string, string> {
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

// Lit les paramètres (depuis Supabase ou localStorage)
export async function getSiteSettings(): Promise<SiteSetting[]> {
  try {
    // Mode Supabase
    if (isSupabaseConfigured()) {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) {
        console.error('Erreur Supabase lors du fetch des paramètres:', error);
        throw error;
      }

      if (data && data.length > 0) {
        // Fusionner avec les defaults pour s'assurer que toutes les clés existent
        const merged = [...DEFAULT_SETTINGS];
        (data as SiteSetting[]).forEach((d: SiteSetting) => {
          const index = merged.findIndex(m => m.key === d.key);
          if (index >= 0) {
            merged[index] = { ...merged[index], ...d };
          } else {
            merged.push(d);
          }
        });
        return merged;
      }
    }

    // Mode LocalStorage (Fallback)
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('dj_salim_site_settings');
      if (localData) {
        // Nettoyage si données de test obsolètes présentes
        if (localData.includes('Test Titre') || localData.includes('CMS')) {
          localStorage.removeItem('dj_salim_site_settings');
          return DEFAULT_SETTINGS;
        }
        const parsed = JSON.parse(localData);
        // Fusionner pour garantir les nouvelles clés
        const merged = [...DEFAULT_SETTINGS];
        parsed.forEach((d: SiteSetting) => {
          const index = merged.findIndex(m => m.key === d.key);
          if (index >= 0) {
            merged[index] = { ...merged[index], ...d };
          }
        });
        return merged;
      }
    }

    // Initialisation
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Erreur getSiteSettings:', error);
    return DEFAULT_SETTINGS;
  }
}

// Met à jour une valeur de paramètre
export async function updateSiteSettingValue(key: string, value: string): Promise<boolean> {
  try {
    // Mode Supabase
    if (isSupabaseConfigured()) {
      const supabase = createClient() as any;
      
      // On vérifie d'abord si la clé existe
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', key)
        .single();
        
      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value, updated_at: new Date().toISOString() } as any)
          .eq('key', key);
          
        if (error) throw error;
      } else {
        // Upsert complet si la clé n'existe pas dans la DB
        const defaultSetting = DEFAULT_SETTINGS.find(s => s.key === key);
        if (defaultSetting) {
          const { error } = await supabase
            .from('site_settings')
            .insert([{ ...defaultSetting, value, updated_at: new Date().toISOString() } as any]);
          if (error) throw error;
        }
      }
      return true;
    }

    // Mode LocalStorage
    if (typeof window !== 'undefined') {
      const currentSettings = await getSiteSettings();
      const updatedSettings = currentSettings.map(s => 
        s.key === key ? { ...s, value, updated_at: new Date().toISOString() } : s
      );
      
      localStorage.setItem('dj_salim_site_settings', JSON.stringify(updatedSettings));
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erreur updateSiteSettingValue:', error);
    return false;
  }
}

// Fonction utilitaire pour récupérer une valeur spécifique rapidement
export async function getSettingValue(key: string, defaultValue: string = ''): Promise<string> {
  const settings = await getSiteSettings();
  const setting = settings.find(s => s.key === key);
  return setting ? setting.value : (DEFAULT_SETTINGS.find(s => s.key === key)?.value || defaultValue);
}
