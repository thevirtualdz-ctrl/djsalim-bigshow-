/* ============================================================
   DJ SALIM BIGSHOW PRO — Constantes de l'Application
   ============================================================ */

// ============================================================
// Informations du site
// ============================================================

export const SITE_CONFIG = {
  name: 'DJ Salim BigShow Pro',
  tagline: 'DJ de Prestige & Ingénieur Son — Événements d\'Exception en Algérie',
  description:
    'DJ de prestige et ingénieur du son basé en Algérie. Prestations haut de gamme sur-mesure pour mariages, galas, événements corporate et soirées privées.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://djsalim-bigshow.vercel.app',
  locale: 'fr_FR',
  language: 'fr',
} as const;

// ============================================================
// Navigation publique
// ============================================================

export const PUBLIC_NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'À Propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Témoignages', href: '/temoignages' },
  { label: 'Contact', href: '/contact' },
] as const;

// ============================================================
// Navigation admin
// ============================================================

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: 'layout-dashboard' },
  { label: 'Services', href: '/admin/services', icon: 'briefcase' },
  { label: 'Projets', href: '/admin/projects', icon: 'folder-open' },
  { label: 'Témoignages', href: '/admin/testimonials', icon: 'message-square-quote' },
  { label: 'Tarifs', href: '/admin/pricing', icon: 'credit-card' },
  { label: 'Messages', href: '/admin/messages', icon: 'mail' },
  { label: 'Paramètres', href: '/admin/settings', icon: 'settings' },
] as const;

// ============================================================
// Catégories de projets
// ============================================================

export const PROJECT_CATEGORIES = [
  'Mariage',
  'Corporate',
  'Festival',
  'Privé',
  'Club',
  'Concert',
  'Autre',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// ============================================================
// Types d'événements (pour le formulaire de contact)
// ============================================================

export const EVENT_TYPES = [
  'Mariage',
  'Soirée corporate',
  'Anniversaire',
  'Festival',
  'Soirée privée',
  'Inauguration',
  'Team building',
  'Concert',
  'Autre',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

// ============================================================
// Options de budget (pour le formulaire de contact)
// ============================================================

export const BUDGET_OPTIONS = [
  'Moins de 10 000 DA',
  '10 000 DA - 15 000 DA',
  '15 000 DA - 20 000 DA',
  '20 000 DA - 30 000 DA',
  'Plus de 30 000 DA',
  'À discuter',
] as const;

// ============================================================
// Icônes de services disponibles (Lucide React)
// ============================================================

export const SERVICE_ICONS = [
  'music',
  'speaker',
  'sparkles',
  'heart',
  'briefcase',
  'headphones',
  'mic',
  'radio',
  'disc',
  'volume-2',
  'party-popper',
  'star',
  'zap',
  'camera',
  'video',
] as const;

// ============================================================
// Pagination par défaut
// ============================================================

export const DEFAULT_PAGE_SIZE = 10;

// ============================================================
// Breakpoints (correspondance Tailwind)
// ============================================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
