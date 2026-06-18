/* ============================================================
   DJ SALIM BIGSHOW PRO — Fonctions Utilitaires
   ============================================================ */

import { type ClassValue, clsx } from 'clsx';

/**
 * Combine des classes CSS conditionnellement.
 * Alternative légère à `clsx` + `twMerge` pour Tailwind CSS v4
 * qui gère nativement les conflits de classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formate un prix en euros.
 */
export function formatPrice(price: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formate une date en français.
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('fr-FR', options).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

/**
 * Formate une date relative (il y a X minutes, heures, jours...).
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days}j`;
  return formatDate(d);
}

/**
 * Tronque un texte à une longueur maximale.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Génère un slug URL-friendly à partir d'un texte.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Génère les initiales à partir d'un nom.
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Délai d'attente (utile pour les animations).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Vérifie si on est côté client.
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}
