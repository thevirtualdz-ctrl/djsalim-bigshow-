'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export const HeroMixer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-background pt-24 lg:pt-32 pb-16">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-full blur-[120px] opacity-60 animate-pulse-gold" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center z-10 relative">
        
        {/* Top: Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ y: yParallax }}
          className="text-center max-w-3xl mb-12 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-primary uppercase">DJ Professionnel</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Salim <span className="text-primary text-glow">BigShow Pro</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Sound Designer spécialisé. Créateur d'atmosphères musicales sur-mesure pour événements corporate, festivals et mariages de prestige.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="btn-primary group">
              Réserver une date
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#portfolio" className="px-8 py-4 rounded-full font-bold text-white border border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Écouter les mix
            </Link>
          </div>
        </motion.div>

        {/* Bottom: The Mixer Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center"
        >
          {/* Left Deck */}
          <Deck rotate={rotate} />

          {/* Center Mixer (Hidden on small mobile to avoid clutter) */}
          <div className="hidden md:flex flex-col items-center justify-center h-64 glass rounded-3xl border border-white/5 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            
            {/* EQ Knobs */}
            <div className="absolute top-6 flex gap-8 z-10">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-inner relative group">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-800" />
                   {/* Marker */}
                   <div className="w-1 h-3 bg-primary rounded-full absolute top-1" style={{ transform: `rotate(${i * 20 - 20}deg)`, transformOrigin: 'bottom center' }} />
                 </div>
               ))}
            </div>

            {/* Faders */}
            <div className="flex gap-4 lg:gap-6 z-10 w-full justify-center h-full mt-10">
               {[1, 2, 3, 4].map((i) => (
                 <Fader key={i} delay={i * 0.2} />
               ))}
            </div>
            
            <div className="absolute bottom-3 text-[10px] text-zinc-500 font-mono tracking-widest">MASTER OUT</div>
          </div>

          {/* Right Deck */}
          <Deck rotate={rotateReverse} />

        </motion.div>

      </div>
    </section>
  );
};

const Deck = ({ rotate }: { rotate: any }) => (
  <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto animate-float">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-[60px] opacity-20 -z-10" />
    
    <div className="absolute inset-0 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center">
      <motion.div 
        style={{ rotate }}
        className="absolute inset-4 rounded-full"
      >
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(212,175,55,0.15)_90deg,transparent_180deg,rgba(212,175,55,0.15)_270deg,transparent_360deg)]" />
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,1)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
      </motion.div>

      {/* Abstract Static Center */}
      <div className="relative w-[75%] aspect-square rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 border border-white/10 ring-4 ring-black/40 flex items-center justify-center bg-zinc-900">
        {/* Grooves */}
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div className="absolute inset-6 rounded-full border border-white/5" />
        <div className="absolute inset-10 rounded-full border border-white/5" />
        
        {/* Center label */}
        <div className="w-1/3 aspect-square rounded-full border border-primary/30 flex items-center justify-center bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)] z-10">
          <div className="w-2 h-2 rounded-full bg-zinc-500" />
        </div>
        
        {/* Light sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/60" />
      </div>
    </div>
  </div>
);

const Fader = ({ delay }: { delay: number }) => (
  <div className="relative w-8 h-full bg-black/50 rounded-full border border-white/5 shadow-inner flex justify-center py-4">
    <div className="absolute w-[2px] h-[80%] bg-zinc-800" />
    <motion.div 
      animate={{ y: [0, -20, 15, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute bottom-1/2 w-6 h-10 bg-zinc-400 border-y-2 border-primary rounded-sm shadow-[0_5px_10px_rgba(0,0,0,0.8)] z-10 flex items-center"
    >
      <div className="w-full h-[2px] bg-white/50" />
    </motion.div>
  </div>
);
