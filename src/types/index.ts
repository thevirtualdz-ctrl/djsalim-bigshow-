export type {
  Database,
  Service,
  ServiceInsert,
  ServiceUpdate,
  Project,
  ProjectInsert,
  ProjectUpdate,
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate,
  PricingPlan,
  PricingPlanInsert,
  PricingPlanUpdate,
  ContactMessage,
  ContactMessageInsert,
  ContactMessageUpdate,
  SiteSetting,
  SiteSettingInsert,
  SiteSettingUpdate,
  SettingType,
  Json,
} from './database';

// ============================================================
// Types utilitaires
// ============================================================

/** Réponse standard pour les opérations CRUD */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Options de pagination */
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

/** Résultat paginé */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Navigation item */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}

/** Statistiques du dashboard admin */
export interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalTestimonials: number;
  totalMessages: number;
  unreadMessages: number;
  averageRating: number;
}
