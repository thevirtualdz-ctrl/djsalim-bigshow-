'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSettings } from '@/components/providers/SettingsProvider';

export function AboutPreview() {
  const { settings, isLoading } = useSettings();

  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="hidden md:block absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Biographie
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {!isLoading && (
                <>
                  {settings.about_title || "Mon"} <span className="text-gradient-gold">{settings.about_title_highlight || "Parcours"}</span>
                </>
              )}
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-10">
              <p>
                {!isLoading && (settings.about_text_1 || "Je fais ce métier depuis plus de 10 ans parce que j&apos;aime voir les gens danser.")}
              </p>
              <p>
                {!isLoading && (settings.about_text_2 || "Que ce soit un mariage à Tlemcen, une soirée corporate à Alger ou un anniversaire à Oran...")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-3xl font-bold text-foreground mb-1">
                  {!isLoading && (settings.about_stat_number || "200+")}
                </h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {!isLoading && (settings.about_stat_label || "Soirées animées")}
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-3xl font-bold text-foreground mb-1">100%</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Clients satisfaits</p>
              </div>
            </div>

            <Link 
              href="/a-propos" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium uppercase tracking-wider text-sm transition-colors group"
            >
              Découvrir mon histoire
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Image (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-border/50 shadow-gold-lg group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <Image 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                alt="DJ Salim BigShow en prestation premium"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="glass px-4 py-2 rounded-lg inline-block border-primary/30 backdrop-blur-md">
                  <span className="text-primary font-bold text-lg">+10 ans</span>
                  <span className="text-white text-sm ml-2">d&apos;expérience</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
