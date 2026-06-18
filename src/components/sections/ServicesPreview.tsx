'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSettings } from '@/components/providers/SettingsProvider';
import { Button } from '@/components/ui/Button';

export function ServicesPreview() {
  const { settings, isLoading: settingsLoading } = useSettings();

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto">
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
            className="text-muted-foreground text-lg mb-10"
          >
            {!settingsLoading && (settings.services_subtitle || "Chaque soirée est différente. Je m'adapte à votre style, votre salle, votre public. Découvrez toutes les prestations que j'apporte à la table.")}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/services">
              <Button className="py-6 px-10 text-lg bg-primary text-black font-bold hover:scale-105 transition-transform duration-300">
                Voir toutes mes prestations
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
