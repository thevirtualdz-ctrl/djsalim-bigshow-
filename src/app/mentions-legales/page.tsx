import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales et informations juridiques de DJ Salim BigShow Pro.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="section-container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-gradient-gold">
          Mentions Légales
        </h1>
        
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>DJ Salim BigShow Pro</strong> est édité par :<br />
              Nom : DJ Salim BigShow<br />
              Adresse : Alger, Algérie<br />
              Email de contact : thevirtualdz@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong><br />
              Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA<br />
              Site web : https://vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Propriété Intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, extraits musicaux, logos, et design) est la propriété exclusive de DJ Salim BigShow Pro, sauf mention contraire.
              Toute reproduction, distribution, modification ou utilisation, même partielle, de ces éléments est strictement interdite sans l'accord préalable et écrit de l'éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Protection des données personnelles</h2>
            <p>
              Les informations recueillies via le formulaire de contact (nom, email, numéro de téléphone, détails de l'événement) sont utilisées exclusivement dans le but de traiter votre demande de devis et de réservation. 
              Ces données ne sont jamais vendues, cédées ou louées à des tiers. Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant directement par email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Responsabilité</h2>
            <p>
              L'éditeur s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
