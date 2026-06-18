import type { Metadata } from 'next';
import { Music, Disc, Speaker, Zap, Sparkles, Mic2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services & Prestations | DJ Salim BigShow Pro',
  description: 'Découvrez mes prestations sur mesure pour vos mariages, soirées privées et événements corporate. Sonorisation premium et light show exclusif.',
};

const SERVICES = [
  {
    id: 'mariage',
    title: 'Mariages d\'Exception',
    description: "Parce que votre mariage est le plus beau jour de votre vie, la musique doit être parfaite. J'assure une prestation sur-mesure, de la cérémonie laïque jusqu'au bout de la nuit.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    features: [
      "Rendez-vous préparatoires",
      "Sonorisation de la cérémonie et du vin d'honneur",
      "Éclairage architectural de la salle",
      "Animation musicale jusqu'à l'aube",
      "Machine à étincelles froides (option)",
      "Fumée lourde pour l'ouverture de bal (option)"
    ]
  },
  {
    id: 'corporate',
    title: 'Événements Corporate',
    description: "Donnez une dimension Premium à vos soirées d'entreprise, lancements de produits, séminaires ou galas. Une programmation musicale élégante et adaptée à votre image de marque.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    features: [
      "Sonorisation adaptée à la taille de l'audience",
      "Microphones sans fil pour les discours",
      "Musique d'ambiance lounge/chill pendant le cocktail",
      "Set DJ dynamique pour la soirée dansante",
      "Éclairage scénique et mise en valeur visuelle",
      "Régie technique complète"
    ]
  },
  {
    id: 'club',
    title: 'Clubbing & Festivals',
    description: "Un set DJ explosif et pointu pour faire trembler le dancefloor. Spécialisé dans les musiques urbaines, électroniques et généralistes avec des transitions millimétrées.",
    icon: <Disc className="w-8 h-8 text-primary" />,
    features: [
      "DJ Set de 1h30 à 4h",
      "Mix Live et Mashups exclusifs",
      "Capacité à s'adapter au public en temps réel",
      "Forte interaction avec la foule",
      "Styles: House, EDM, Hip-Hop, Afrobeats, Pop",
      "Possibilité de showcase"
    ]
  }
];

const EQUIPMENT = [
  {
    category: "Sonorisation",
    icon: <Speaker className="w-6 h-6 text-white" />,
    items: ["Système L-Acoustics ou RCF (selon jauge)", "Table de mixage Pioneer DJM-A9", "Platines CDJ-3000", "Micros Shure SM58 Sans Fil"]
  },
  {
    category: "Éclairage & Visuels",
    icon: <Zap className="w-6 h-6 text-white" />,
    items: ["Lyres Wash et Spot professionnelles", "Lasers d'animation 3D", "Éclairage architectural LED (Uplighting)", "Contrôle DMX sur mesure (SoundSwitch/GrandMA)"]
  },
  {
    category: "Effets Spéciaux",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    items: ["Machines à étincelles froides (Sparkular)", "Machine à fumée lourde (ouverture de bal)", "Canons à CO2", "Jets de scène"]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <section className="relative px-4 mb-20">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-3 block">Expertise</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6">
            Des prestations <span className="text-gradient-gold">Premium</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            De l'animation musicale discrète et élégante au show spectaculaire, je m'adapte à la nature de votre événement pour vous offrir une expérience sonore et visuelle inoubliable.
          </p>
        </div>
      </section>

      {/* Services Détaillés */}
      <section className="px-4 mb-24 relative">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-32">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
            >
              {/* Image / Visuel */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square relative rounded-3xl overflow-hidden glass border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-primary/20 group-hover:scale-110 transition-transform duration-700">
                    <Music className="w-48 h-48" />
                  </div>
                  {/* Plus tard, nous remplacerons ceci par de vraies images */}
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-6 border border-white/20">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{service.title}</h2>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-6 text-white">Ce qui est inclus :</h3>
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/contact?service=${service.id}`}>
                  <Button className="py-6 px-8 text-lg">Demander un devis pour ce service</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Équipement */}
      <section className="relative px-4 py-24 bg-secondary">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Un Matériel <span className="text-gradient-gold">Haut de Gamme</span></h2>
            <p className="text-lg text-muted-foreground">
              La qualité d'un événement dépend aussi de la fiabilité et de la performance du matériel utilisé. Je travaille exclusivement avec les meilleures marques de l'industrie de l'événementiel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EQUIPMENT.map((equip, index) => (
              <div key={index} className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center mb-6 border border-white/10 shadow-xl">
                  {equip.icon}
                </div>
                <h3 className="text-xl font-bold mb-6">{equip.category}</h3>
                <ul className="space-y-3">
                  {equip.items.map((item, i) => (
                    <li key={i} className="text-zinc-400 flex items-center gap-3">
                      <Mic2 className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 mt-24">
        <div className="max-w-4xl mx-auto text-center glass p-12 md:p-20 rounded-[3rem] border border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative z-10">Prêt à faire trembler la piste ?</h2>
          <p className="text-xl text-zinc-300 mb-10 relative z-10 max-w-2xl mx-auto">
            Contactez-moi dès maintenant pour discuter de votre projet et obtenir un devis personnalisé sous 24h.
          </p>
          <Link href="/contact" className="relative z-10">
            <Button variant="outline" className="py-6 px-10 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Contactez-moi
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
