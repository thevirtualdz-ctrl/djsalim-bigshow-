'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Users, MapPin, Calendar } from 'lucide-react';
import { Portfolio } from '@/types/database';

export function PortfolioPreview() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setItems(data);
      }
      setLoading(false);
    }
    fetchPortfolio();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" id="portfolio">
      <div className="hidden md:block absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />

      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
            >
              Palmarès
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold"
            >
              Mon <span className="text-gradient-gold">Palmarès</span>
            </motion.h3>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucun événement pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-auto bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:border-primary/50 transition-colors"
              >
                <div className="p-6">
                  {/* Artistes */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Artiste(s)</p>
                      <h4 className="text-lg font-bold text-foreground">{item.artistes}</h4>
                    </div>
                  </div>

                  {/* Lieu & Date */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.date}</span>
                    </div>
                  </div>
                  
                  {item.description && (
                    <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
