'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = ['Tous', 'Mariages', 'Corporate', 'Festivals', 'Clubs'];

type Project = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  video_url?: string | null;
  display_order: number;
};

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeMedia, setActiveMedia] = useState<Project | null>(null);
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (data) {
        setItems(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMedia]);

  const filteredItems = items.filter(item => 
    activeCategory === 'Tous' || item.category === activeCategory
  );

  return (
    <section className="py-24 relative overflow-hidden" id="portfolio">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Galerie
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold"
          >
            Mon <span className="text-gradient-gold">Portfolio</span>
          </motion.h3>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Galerie Masonry (CSS Grid) */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  // Alternance de tailles pour un effet masonry rudimentaire basé sur l'index
                  const isLarge = index % 5 === 0;
                  const isTall = index % 4 === 0 && !isLarge;
                  const spanClass = isLarge ? 'md:col-span-2 md:row-span-2' : isTall ? 'md:col-span-1 md:row-span-2' : 'md:col-span-1 md:row-span-1';

                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setActiveMedia(item)}
                      className={`group relative rounded-3xl overflow-hidden glass border border-white/10 cursor-pointer ${spanClass}`}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-zinc-950">
                        <Image 
                          src={item.image_url || '/images/placeholder.jpg'} 
                          alt={item.title}
                          fill
                          sizes="(max-w-7xl) 33vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                        />
                      </div>

                      {/* Overlay au hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8">
                        <span className="text-primary text-sm font-bold tracking-wider uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {item.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          {item.title}
                        </h3>
                      </div>

                      {/* Icône Play pour les vidéos */}
                      {item.video_url && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-primary/95 flex items-center justify-center text-black transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                Aucun média trouvé pour cette catégorie.
              </div>
            )}
          </>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-8"
              onClick={() => setActiveMedia(null)}
            >
              <button 
                onClick={() => setActiveMedia(null)}
                className="absolute top-6 right-6 text-white hover:text-primary hover:scale-105 transition-all p-2.5 rounded-full bg-white/5 border border-white/10 z-50"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {activeMedia.video_url ? (
                  <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <iframe 
                      className="w-full h-full"
                      src={activeMedia.video_url}
                      title={activeMedia.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
                    <Image 
                      src={activeMedia.image_url} 
                      alt={activeMedia.title}
                      fill
                      className="object-contain" 
                    />
                  </div>
                )}
                <div className="text-center mt-2 select-none">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">{activeMedia.category}</span>
                  <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">{activeMedia.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
