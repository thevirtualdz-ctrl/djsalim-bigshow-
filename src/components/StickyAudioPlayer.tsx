'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Disc, Headphones, X } from 'lucide-react';

export function StickyAudioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'soundcloud' | 'spotify'>('soundcloud');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed z-[100] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled 
          ? 'top-4 right-4 sm:right-6 lg:right-8' // Aligné en haut à droite pour s'intégrer visuellement
          : 'top-[35vh] lg:top-[40vh] right-4 sm:right-8' // Flottant au milieu à droite
      }`}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button 
             key="button"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             onClick={() => setIsExpanded(true)}
             className={`flex items-center gap-3 glass rounded-full border border-primary/30 hover:border-primary transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.15)] group ${
               isScrolled ? 'px-3 py-2 sm:px-4 sm:py-2' : 'px-4 py-3 sm:px-6 sm:py-4 bg-black/90 md:bg-black/40 md:backdrop-blur-md'
             }`}
          >
             <div className="relative flex items-center justify-center">
                <div className={`absolute rounded-full bg-primary/20 animate-ping group-hover:bg-primary/40 ${isScrolled ? 'w-5 h-5' : 'w-8 h-8'}`} />
                <Disc className={`text-primary animate-spin [animation-duration:4s] ${isScrolled ? 'w-5 h-5' : 'w-8 h-8'}`} />
             </div>
             <span className={`font-bold tracking-widest uppercase text-white hidden sm:block ${isScrolled ? 'text-xs' : 'text-sm'}`}>
               Écouter mes sons
             </span>
          </motion.button>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden md:backdrop-blur-xl bg-black/90 md:bg-black/80 flex flex-col w-[320px] sm:w-[380px] ${
              isScrolled ? 'max-h-[80px]' : 'max-h-[300px]'
            } transition-all duration-500`}
          >
            {/* Header / Mini Player Bar */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white truncate max-w-[180px]">
                    {activeTab === 'soundcloud' ? 'Mix Session' : 'Playlist Hits'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Onglets */}
            <div className="flex justify-center gap-2 p-3 bg-black/40">
              <button
                onClick={() => setActiveTab('soundcloud')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'soundcloud' ? 'bg-primary text-black' : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                SoundCloud
              </button>
              <button
                onClick={() => setActiveTab('spotify')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'spotify' ? 'bg-primary text-black' : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Spotify
              </button>
            </div>

            {/* Iframe Panel */}
            <div className="p-0.5 bg-black/60">
              {activeTab === 'soundcloud' ? (
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay; encrypted-media"
                  src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F216540875&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
                  title="SoundCloud Player"
                />
              ) : (
                <iframe
                  style={{ borderRadius: '0px' }}
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
