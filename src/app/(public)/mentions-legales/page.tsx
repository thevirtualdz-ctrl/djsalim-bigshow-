import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | DJ Salim BigShow Pro',
  description: 'Mentions légales du site DJ Salim BigShow Pro.',
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="section-container max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">
          Mentions <span className="text-gradient-gold">Légales</span>
        </h1>

        <div className="prose prose-lg max-w-none space-y-10">
          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le présent site est édité par <strong className="text-foreground">DJ Salim BigShow Pro</strong>, 
              entreprise individuelle spécialisée dans l'animation musicale et la sonorisation d'événements.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Responsable de la publication :</strong> Salim KHALFA</li>
              <li><strong className="text-foreground">Adresse :</strong> Alger, Algérie</li>
              <li><strong className="text-foreground">Email :</strong> contact@djsalimbigshow.pro</li>
              <li><strong className="text-foreground">Téléphone :</strong> +213 (0) 550 00 00 00</li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">2. Hébergement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ce site est hébergé par <strong className="text-foreground">Vercel Inc.</strong>,
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">3. Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est protégé par le droit 
              d'auteur. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, 
              de l'un quelconque de ces éléments est strictement interdite sans l'accord écrit préalable de 
              DJ Salim BigShow Pro.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">4. Responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              DJ Salim BigShow Pro s'efforce de fournir des informations aussi précises que possible. 
              Cependant, il ne pourra être tenu responsable des omissions, des inexactitudes et des 
              carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers 
              partenaires qui lui fournissent ces informations.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">5. Liens hypertextes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le site peut contenir des liens vers d'autres sites internet. DJ Salim BigShow Pro 
              n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité 
              quant à leur contenu.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
