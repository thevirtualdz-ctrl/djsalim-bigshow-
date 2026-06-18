import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions Générales de Vente (CGV) des prestations de DJ Salim BigShow Pro.',
};

export default function CGVPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="section-container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-gradient-gold">
          Conditions Générales de Vente
        </h1>
        
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <p className="italic text-sm">Dernière mise à jour : Juin 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 1 - Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) définissent les droits et obligations des parties dans le cadre de la vente de prestations d'animation musicale et de sonorisation événementielle proposées par DJ Salim BigShow Pro (le "Prestataire") au client (le "Client").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 2 - Devis et Réservation</h2>
            <p>
              Toute prestation fait l'objet d'un devis préalable, gratuit et sans engagement. La réservation est considérée comme ferme et définitive uniquement après la signature du devis et le versement de l'acompte convenu (généralement 30% du montant total).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 3 - Tarifs et Paiement</h2>
            <p>
              Les prix sont indiqués en Dinars Algériens (DA). Le paiement du solde de la prestation doit être effectué au plus tard le jour de l'événement, avant le début de la prestation, sauf accord préalable différent mentionné sur le devis. Les modes de paiement acceptés sont : espèces, virement bancaire ou paiement en ligne sécurisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 4 - Annulation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Annulation par le client :</strong> En cas d'annulation de la part du client moins de 30 jours avant la date de l'événement, l'acompte versé reste acquis au Prestataire à titre de dédommagement.</li>
              <li><strong>Annulation par le prestataire :</strong> En cas de force majeure ou d'incapacité (maladie, accident), le Prestataire s'engage à rembourser intégralement l'acompte et, dans la mesure du possible, à proposer un confrère de remplacement de qualité équivalente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 5 - Besoins techniques et Logistique</h2>
            <p>
              Pour assurer le bon déroulement de la prestation, le Client s'engage à fournir un espace adapté (minimum 3x2m), un accès à une prise de courant sécurisée à proximité immédiate (220V), et à protéger le matériel en cas de prestation en extérieur (barnum étanche, sol plat et dur).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Article 6 - Responsabilité</h2>
            <p>
              Le Client est responsable de ses invités. Tout dégât matériel causé par les convives sur l'équipement de sonorisation ou d'éclairage du Prestataire fera l'objet d'une facturation au coût de remplacement ou de réparation du matériel endommagé.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
