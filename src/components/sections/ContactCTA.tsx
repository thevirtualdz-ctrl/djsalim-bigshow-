'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MessageSquare, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/components/providers/SettingsProvider';

export function ContactCTA() {
  const { settings, isLoading } = useSettings();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-secondary/50" />
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 shadow-gold">
            <CalendarCheck className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {!isLoading && (
              <>
                {settings.cta_title} <span className="text-gradient-gold">{settings.cta_title_highlight}</span> {settings.cta_title_end}
              </>
            )}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {!isLoading && (settings.cta_subtitle || "Les weekends partent vite, surtout en saison. Envoyez-moi votre date et je vous réponds dans la journée.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href="/contact" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Me contacter maintenant
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4 sm:mt-0 sm:ml-4">
              Réponse rapide garantie
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
