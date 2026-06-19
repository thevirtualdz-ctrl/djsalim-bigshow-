'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getTourDates } from '@/lib/supabase/tourDates';
import type { TourDate } from '@/types/database';

export function TourSection() {
  const [dates, setDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDates() {
      try {
        const data = await getTourDates();
        // Filtrer pour n'afficher que les dates futures ou toutes les dates configurées
        setDates(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDates();
  }, []);

  // Formatter la date (Ex: 15 Juil 2026)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleDateString('fr-FR', { month: 'short' });
    const year = d.getFullYear();
    return { day, month, year };
  };

  return (
    <section className="section-container py-12 md:py-24 relative" id="tour">
      {/* Glows de fond */}
      <div className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Titre */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-current" /> Shows & Tournée
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Prochaines <span className="text-gradient-gold">Dates</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base">
            Mes prochaines apparitions en club, festival et événements privés à travers l'Algérie. Réservez vos places !
          </p>
        </div>

        {/* Liste des Dates */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-zinc-500">Chargement des dates de tournée...</p>
          </div>
        ) : dates.length === 0 ? (
          <div className="glass p-12 rounded-3xl border border-white/5 text-center text-zinc-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune date de tournée planifiée pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            {dates.map((item, index) => {
              const { day, month, year } = formatDate(item.date);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass group p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-primary/20 hover:bg-white/[0.02] transition-all flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
                >
                  {/* Effet lumineux de survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.01] to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Date Block */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-xl md:rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <span className="text-2xl font-black font-heading text-gradient-gold leading-none">{day}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-1 leading-none">{month}</span>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                        {item.venue}
                      </h3>
                      <p className="text-sm text-zinc-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-600" /> {item.city}
                      </p>
                    </div>
                  </div>

                  {/* Actions / Status Block */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Badge Sold Out */}
                    {item.is_sold_out ? (
                      <div className="relative flex items-center justify-center py-2 px-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 font-bold text-xs uppercase tracking-widest overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                        <span className="absolute inset-0 bg-red-500/10 animate-pulse" />
                        <span className="relative flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          Complet
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        Places Libres
                      </div>
                    )}

                    {/* Ticket Link Button */}
                    {!item.is_sold_out ? (
                      <Button 
                        asChild 
                        variant="default" 
                        size="sm" 
                        className="py-2.5 px-5 text-xs font-bold shrink-0 bg-primary hover:scale-[1.03] active:scale-95 transition-all text-black flex items-center gap-2"
                      >
                        <a 
                          href={item.ticket_link || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Ticket className="w-3.5 h-3.5" /> Tickets
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        disabled 
                        variant="outline" 
                        size="sm" 
                        className="py-2.5 px-5 text-xs font-bold border-white/5 bg-white/5 text-zinc-500 cursor-not-allowed shrink-0"
                      >
                        Complet
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
