'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Music, Speaker, Sparkles, Heart, Mic, PartyPopper, Star, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/components/providers/SettingsProvider';
import { createClient } from '@/lib/supabase/client';

// Map des icônes Lucide disponibles pour les services
const iconMap: Record<string, any> = {
  Music,
  Speaker,
  Sparkles,
  Heart,
  Mic,
  PartyPopper,
  Star,
  Shield
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function ServicesPreview() {
  const { settings, isLoading: settingsLoading } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

      if (data) {
        setServices(data);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Prestations
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6"
          >
            {!settingsLoading && (
              <>
                {settings.services_title || "L'Excellence"} <span className="text-gradient-gold">{settings.services_title_highlight || "Technique & Artistique"}</span> {settings.services_title_end || "au service de votre événement"}
              </>
            )}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {!settingsLoading && (settings.services_subtitle || "Chaque soirée est différente. Je m'adapte à votre style, votre salle, votre public. Voici ce que j'apporte à la table.")}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            Aucun service mis en avant pour le moment.
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon] || HelpCircle;
              return (
                <motion.div 
                  key={service.id} 
                  variants={itemVariants}
                  className="glass p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium uppercase tracking-wider text-sm transition-colors group"
          >
            Voir le détail des prestations
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
