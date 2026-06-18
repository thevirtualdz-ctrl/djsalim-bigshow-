import type { Metadata } from 'next';
import Image from 'next/image';
import { Disc3, Music, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos | DJ Salim BigShow Pro',
  description: 'Découvrez l\'histoire et la philosophie de DJ Salim BigShow Pro, expert en sonorisation et animation d\'événements.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <section className="relative px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-3 block">Mon Histoire</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6">
            La passion de la <span className="text-gradient-gold">Musique</span>
          </h1>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="px-4 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Portrait */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10 rounded-full" />
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass border border-white/10 relative p-2 shadow-2xl">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  <Image 
                    src="/images/dj_corporate_v3.png" 
                    alt="DJ Salim BigShow Pro" 
                    fill 
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>

            {/* Texte Biographique */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Plus qu'un métier, <br/>une vocation.</h2>
              
              <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
                <p>
                  Depuis de nombreuses années, je parcours les salles de réception, les clubs et les événements corporate avec un seul objectif en tête : faire vibrer les pistes de danse et créer des souvenirs inoubliables.
                </p>
                <p>
                  Mon approche est simple : chaque événement est unique. Je ne propose jamais de playlist pré-enregistrée. Je ressens la foule, j'adapte mes mix en temps réel et j'utilise la musique pour construire l'énergie de votre soirée, heure après heure.
                </p>
                <p>
                  Grâce à une culture musicale extrêmement vaste (House, Hip-Hop, Afrobeats, Pop, Musiques Orientales et Généralistes), je suis capable de fédérer toutes les générations sur le dancefloor.
                </p>
              </div>

              {/* Valeurs / Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                  <Disc3 className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold text-xl text-white mb-1">200+</h4>
                  <p className="text-sm text-zinc-500">Événements animés</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                  <Music className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold text-xl text-white mb-1">100%</h4>
                  <p className="text-sm text-zinc-500">Mix en direct</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold text-xl text-white mb-1">Premium</h4>
                  <p className="text-sm text-zinc-500">Matériel & Show</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-4 mb-24">
        <div className="max-w-4xl mx-auto relative bg-card border border-border/50 rounded-3xl p-8 md:p-12 overflow-hidden text-center shadow-2xl glass">
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Prêt à créer un moment inoubliable ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Parlez-moi de votre projet. Je serai ravi de mettre mon expertise à votre service pour concevoir une prestation à la hauteur de vos exigences en Algérie ou à l&apos;international.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/tarifs" 
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary-hover transition-colors uppercase tracking-wider text-sm shadow-gold"
              >
                Configurer votre événement
              </a>
              <a 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors uppercase tracking-wider text-sm"
              >
                Me Contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
