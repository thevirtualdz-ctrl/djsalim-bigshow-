'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/components/providers/SettingsProvider';

export function Hero() {
  const { settings, isLoading } = useSettings();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-28 pb-20">
      {/* Arrière-plan animé (Image du DJ avec effets CSS "Pseudo-Vidéo") */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050505]">
        {/* 1. L'image du DJ avec effet Ken Burns sur desktop uniquement */}
        <div className="absolute inset-[-5%] w-[110%] h-[110%] lg:animate-ken-burns">
          <Image 
            src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1600&q=80" 
            alt="DJ Salim BigShow - Performance Live"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70 grayscale-[30%]"
          />
        </div>
        
        {/* 2. Overlay Sombre & Dégradé pour garantir la lisibilité du texte (Gris foncé/Noir) */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-secondary/30 md:mix-blend-multiply" />
        
        {/* 3. Faisceaux d'éclairage dynamiques (Light Sweep doré) */}
        <div className="absolute inset-0 opacity-40 md:mix-blend-color-dodge pointer-events-none">
          <div className="w-[200%] h-full absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-light-sweep" />
        </div>

        {/* 4. Texture / Grain pour un effet "Live Club" premium */}
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10 md:mix-blend-overlay pointer-events-none" />

        {/* 5. Reflets (Glows) et Étincelles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Étincelles qui montent (masqué sur mobile pour perfs) */}
          <div className="absolute inset-0 bg-sparkles animate-float-up opacity-40 mix-blend-screen hidden lg:block" />
          
          {/* Grosse lueur dorée douce */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-gold mix-blend-screen hidden md:block"
          />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left order-1 lg:order-1 mt-8 lg:mt-0 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full glass border border-primary/30"
            >
              <span className="text-sm font-medium text-primary">
                {!isLoading && (settings.hero_tagline || "DJ & Ingénieur Son — Disponible sur toute l'Algérie")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight mb-6 text-white leading-[1.1]"
            >
              {!isLoading && (
                <>
                  {settings.hero_title_line1} <br className="hidden xl:block" />
                  {settings.hero_title_line2} <br className="hidden xl:block" />
                  <span className="text-gradient-gold">{settings.hero_title_highlight}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10"
            >
              {!isLoading && (settings.hero_subtitle || "Mariages, galas, soirées privées — je transforme chaque événement en une expérience sonore et visuelle dont vos invités parleront pendant des mois.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">
                <Link href="/contact">Réserver ma date</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto bg-white/5 border-white/10 hover:bg-white/10 md:backdrop-blur-sm">
                <Link href="/#portfolio">Voir mes soirées</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: Pioneer CDJ-2000 Nexus Style Jog Wheel (Hidden on mobile for performance) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="hidden lg:flex order-2 lg:order-2 relative w-full lg:max-w-[460px] mx-auto justify-end xl:justify-center z-10 lg:opacity-100"
          >
            <div className="relative aspect-square w-full">
              {/* Soft Aura behind the element */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-primary/80 to-accent rounded-full blur-[90px] opacity-20 animate-pulse-gold -z-10" />
              
              {/* Bague Acier Extérieure (Plus fine, style acier brossé CDJ) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8a8a8a] via-[#e8e8e8] to-[#4a4a4a] shadow-[0_30px_60px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,0.8)] border border-[#ffffff]/40">
                 {/* Effet de brillance acier (conic reflection très contrasté) */}
                 <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg_at_50%_50%,rgba(0,0,0,0.2)_0%,rgba(255,255,255,0.9)_15%,rgba(0,0,0,0.1)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.1)_70%,rgba(255,255,255,0.7)_85%,rgba(0,0,0,0.2)_100%)] mix-blend-overlay" />
                 {/* Inner border shadow separator (pour la démarcation avec le plateau noir) */}
                 <div className="absolute inset-[1.5%] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] border border-black/60" />
              </div>

              {/* Outer CDJ Jog Wheel Base - Le plateau noir (Rétréci avec inset-[1.5%] pour affiner l'anneau acier) */}
              <div className="absolute inset-[1.5%] rounded-full bg-[#080808] shadow-[0_0_15px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.05),inset_0_20px_30px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
                
                {/* 1. ROTATING LAYER: Base plastic & Dimples */}
                <div className="absolute inset-0 rounded-full bg-[#111] animate-spin-slow">
                   {/* Le cercle extérieur avec les crans (12 grands ronds + 3 petits points) */}
                   {Array.from({ length: 12 }).map((_, i) => {
                     const baseAngle = i * 30; // 360 degrés / 12 groupes
                     return (
                       <div key={i} className="absolute inset-0 pointer-events-none">
                         {/* Grand rond avec profondeur accentuée et reflet or discret */}
                         <div
                           className="absolute inset-0"
                           style={{ transform: `rotate(${baseAngle}deg)` }}
                         >
                           <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[6.5%] aspect-square rounded-full bg-gradient-to-b from-[#000] to-[#151515] shadow-[inset_0_6px_10px_rgba(0,0,0,1),inset_0_-2px_4px_rgba(215,175,60,0.25),0_2px_4px_rgba(215,175,60,0.05)]" />
                         </div>
                         
                         {/* Petit point 1 */}
                         <div
                           className="absolute inset-0"
                           style={{ transform: `rotate(${baseAngle + 7.5}deg)` }}
                         >
                           <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[1.5%] aspect-square rounded-full bg-gradient-to-b from-[#000] to-[#151515] shadow-[inset_0_2px_4px_rgba(0,0,0,1),inset_0_-1px_2px_rgba(215,175,60,0.25)]" />
                         </div>

                         {/* Petit point 2 */}
                         <div
                           className="absolute inset-0"
                           style={{ transform: `rotate(${baseAngle + 15}deg)` }}
                         >
                           <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[1.5%] aspect-square rounded-full bg-gradient-to-b from-[#000] to-[#151515] shadow-[inset_0_2px_4px_rgba(0,0,0,1),inset_0_-1px_2px_rgba(215,175,60,0.25)]" />
                         </div>

                         {/* Petit point 3 */}
                         <div
                           className="absolute inset-0"
                           style={{ transform: `rotate(${baseAngle + 22.5}deg)` }}
                         >
                           <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[1.5%] aspect-square rounded-full bg-gradient-to-b from-[#000] to-[#151515] shadow-[inset_0_2px_4px_rgba(0,0,0,1),inset_0_-1px_2px_rgba(215,175,60,0.25)]" />
                         </div>
                       </div>
                     );
                   })}
                </div>

                {/* 2. STATIC LIGHTING LAYER (Ne tourne pas avec la platine = effet 3D hyper réaliste) */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_35%,rgba(215,175,60,0.05)_37.5%,transparent_40%,transparent_70%,rgba(215,175,60,0.05)_80%,rgba(215,175,60,0.2)_85%,rgba(255,225,120,0.5)_87.5%,rgba(215,175,60,0.2)_90%,rgba(215,175,60,0.05)_95%,transparent_100%)] pointer-events-none z-10 mix-blend-screen" />
                 
                {/* Petit point lumineux (Specular dot, pas de blanc, or clair, intensité adoucie) */}
                <div className="absolute top-[15.2%] left-[15.2%] w-[1.5%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,225,120,1)_0%,rgba(215,175,60,1)_50%,transparent_80%)] mix-blend-screen opacity-60 pointer-events-none z-20 shadow-[0_0_10px_rgba(215,175,60,0.8)]" />
                
                {/* Inner radial gradient to simulate the slope sinking towards the center (corrigé pour ne pas cacher les crans) */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,1)_83%,rgba(0,0,0,0.5)_87%,transparent_92%,transparent_100%)] pointer-events-none z-10" />

                {/* Rim outer glow highlight (Bevel global - OR) */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(215,175,60,0.25),inset_0_-6px_15px_rgba(0,0,0,0.9)] pointer-events-none z-10" />

                {/* Silver Separation Ring (Plus fin, même couleur acier que l'extérieur) */}
                <div className="absolute inset-[13%] rounded-full bg-gradient-to-br from-[#8a8a8a] via-[#e8e8e8] to-[#4a4a4a] shadow-[0_0_15px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.5)] z-10 pointer-events-none" />

                {/* Inner Vinyl Platter */}
                <div className="absolute inset-[13.5%] rounded-full bg-[#111] shadow-[inset_0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden animate-spin-slow">
                  {/* Vinyl grooves texture */}
                  <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle_at_center,#050505_0px,#050505_2px,#111_3px,#111_4px)] opacity-60" />
                  {/* Conic light reflection on vinyl */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#222_0%,#555_25%,#111_50%,#555_75%,#222_100%)] opacity-30 mix-blend-screen" />
                </div>

                {/* Center Display (LCD) - CDJ-1000/2000 style */}
                <div className="relative w-[48%] aspect-square rounded-full border-[2px] border-[#050505] shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black z-20 flex items-center justify-center overflow-hidden">
                  
                  {/* Dark grey background for the LCD */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />

                  {/* Fond de l'anneau central */}
                  <div className="absolute inset-[8%] rounded-full border-[10px] border-[#020202] shadow-[inset_0_2px_10px_rgba(0,0,0,1)]" />

                  {/* Anneau rotatif sophistiqué : 3/4 de cercle de barres radiales (style CDJ) */}
                  <div className="absolute inset-[10%] rounded-full animate-spin-slow">
                    {Array.from({ length: 48 }).map((_, i) => {
                      // 3/4 de cercle : on saute le quart inférieur (de la barre 18 à 30 par ex)
                      if (i > 17 && i < 31) return null;
                      return (
                        <div
                          key={i}
                          className="absolute inset-0 flex justify-center"
                          style={{ transform: `rotate(${i * 7.5}deg)` }} // 360 / 48 = 7.5
                        >
                          {/* Chaque barre (trait radial) */}
                          <div className="w-[2.5px] h-[10px] bg-[#d4af37] opacity-90 shadow-[0_0_8px_rgba(212,175,55,0.6)] rounded-sm" />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Halo lumineux sous les barres */}
                  <div className="absolute inset-[10%] rounded-full border-[2px] border-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />

                  {/* Le marqueur de lecture rouge vif au milieu de la piste */}
                  <div className="absolute inset-[10%] rounded-full animate-spin-slow">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[1px] w-[5px] h-[12px] bg-red-500 rounded-sm shadow-[0_0_12px_red]" />
                  </div>

                  {/* Inner Silver Ring framing the logo */}
                  <div className="absolute inset-[28%] rounded-full bg-gradient-to-b from-[#f0f0f0] via-[#aaa] to-[#555] shadow-[0_5px_15px_rgba(0,0,0,0.9)] p-[2px]">
                    
                    {/* The Logo inside the silver center */}
                    <div className="relative w-full h-full bg-[#0a0a0a] rounded-full flex flex-col items-center justify-center p-2 sm:p-3 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]">
                       <Image 
                          src="/images/logo-v2.png" 
                          fill
                          className="object-contain p-3 sm:p-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" 
                          alt="Logo DJ Salim BigShow Pro" 
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating glass badge (stays fixed) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-2 -left-4 sm:bottom-4 sm:-left-8 glass px-5 py-3 sm:px-6 sm:py-4 rounded-3xl border border-primary/30 shadow-2xl backdrop-blur-md z-20"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-gold border border-primary/20">
                    <span className="text-xl sm:text-2xl">🎧</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base leading-tight">En cabine</p>
                    <p className="text-primary text-xs">Ambiance garantie</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
