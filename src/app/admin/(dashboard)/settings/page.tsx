'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, RefreshCw, Type, LayoutTemplate, MessageSquare, Info } from 'lucide-react';
import { getSiteSettings, updateSiteSettingValue, DEFAULT_SETTINGS } from '@/lib/supabase/siteSettings';
import type { SiteSetting } from '@/types/database';
import { Button } from '@/components/ui/Button';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'cta'>('hero');

  // Valeurs locales pendant l'édition
  const [localValues, setLocalValues] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await getSiteSettings();
      setSettings(data);
      
      // Initialiser les valeurs locales
      const initialValues: Record<string, string> = {};
      data.forEach(s => {
        initialValues[s.key] = s.value;
      });
      setLocalValues(initialValues);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage(null);
      
      // Sauvegarder uniquement les champs modifiés
      const promises = [];
      for (const key of Object.keys(localValues)) {
        const originalValue = settings.find(s => s.key === key)?.value;
        if (originalValue !== localValues[key]) {
          promises.push(updateSiteSettingValue(key, localValues[key]));
        }
      }
      
      if (promises.length > 0) {
        await Promise.all(promises);
        setSaveMessage({ type: 'success', text: 'Paramètres mis à jour avec succès.' });
        await loadSettings(); // Recharger pour avoir l'état frais
      } else {
        setSaveMessage({ type: 'success', text: 'Aucune modification à sauvegarder.' });
      }
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      setSaveMessage({ type: 'error', text: 'Une erreur est survenue lors de la sauvegarde.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleChange = (key: string, value: string) => {
    setLocalValues(prev => ({ ...prev, [key]: value }));
  };

  // Group settings by section (prefix)
  const groupedSettings = {
    hero: DEFAULT_SETTINGS.filter(s => s.key.startsWith('hero_')),
    about: DEFAULT_SETTINGS.filter(s => s.key.startsWith('about_')),
    services: DEFAULT_SETTINGS.filter(s => s.key.startsWith('services_')),
    cta: DEFAULT_SETTINGS.filter(s => s.key.startsWith('cta_')),
  };

  const tabs = [
    { id: 'hero', label: 'Section Accueil (Hero)', icon: LayoutTemplate },
    { id: 'about', label: 'Section À Propos', icon: Info },
    { id: 'services', label: 'Section Services', icon: Type },
    { id: 'cta', label: 'Appel à l\'action (CTA)', icon: MessageSquare },
  ] as const;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Gestion du Contenu (CMS)</h1>
          <p className="text-zinc-400">
            Modifiez le texte affiché sur le site public sans toucher au code source.
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-black hover:bg-primary-hover shadow-gold"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </div>

      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-3 border ${
            saveMessage.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {saveMessage.type === 'success' ? <Save className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {saveMessage.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-black shadow-gold'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Formulaire Actif */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass border border-white/10 rounded-2xl p-6 md:p-8"
      >
        <div className="space-y-6">
          {groupedSettings[activeTab].map(settingDef => (
            <div key={settingDef.key} className="space-y-2">
              <label htmlFor={settingDef.key} className="block text-sm font-medium text-white">
                {settingDef.label}
              </label>
              {settingDef.description && (
                <p className="text-xs text-zinc-400">{settingDef.description}</p>
              )}
              
              {/* Si la valeur est longue (plus de 60 caractères), on affiche un textarea */}
              {localValues[settingDef.key] && localValues[settingDef.key].length > 60 ? (
                <textarea
                  id={settingDef.key}
                  value={localValues[settingDef.key] || ''}
                  onChange={(e) => handleChange(settingDef.key, e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all min-h-[120px]"
                />
              ) : (
                <input
                  type="text"
                  id={settingDef.key}
                  value={localValues[settingDef.key] || ''}
                  onChange={(e) => handleChange(settingDef.key, e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
