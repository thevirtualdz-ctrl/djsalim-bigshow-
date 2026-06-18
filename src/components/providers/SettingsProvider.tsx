'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSiteSettings, settingsToRecord } from '@/lib/supabase/siteSettings';
import type { SiteSetting } from '@/types/database';

interface SettingsContextType {
  settings: Record<string, string>;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await getSiteSettings();
      setSettings(settingsToRecord(data));
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading, refreshSettings: loadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings doit être utilisé à l\'intérieur d\'un SettingsProvider');
  }
  return context;
}
