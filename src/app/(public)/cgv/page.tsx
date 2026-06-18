import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales de Vente (CGV)',
  description: `CGV des prestations de ${SITE_CONFIG.name}.`,
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-12">Conditions Générales de <span className="text-gradient-gold">Vente</span></h1>
        
        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <div className="p-4 bg-white/5 border border-primary/30 rounded-xl mb-8">
            <p className="text-sm text-primary m-0">
              <strong>À l'attention de l'administrateur :</strong> Ces CGV sont un modèle générique fourni à titre indicatif pour les métiers de l'événementiel en Algérie. Il est de votre responsabilité de les adapter à votre mode de fonctionnement réel.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Objet</h2>
            <p className="text-zinc-300">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>{SITE_CONFIG.name}</strong> (ci-après "Le Prestataire") et toute personne physique ou morale (ci-après "Le Client") sollicitant ses services d'animation musicale, de sonorisation et d'éclairage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Devis et Réservation</h2>
            <p className="text-zinc-300">
              Toute prestation fait l'objet d'un devis gratuit et personnalisé. La réservation de la date n'est définitivement confirmée qu'à la réception d'un acompte (généralement de [30%] du montant total) et de l'acceptation du devis par le Client.
            </p>
            <p className="text-zinc-300">
              En cas de non-réception de l'acompte dans le délai imparti sur le devis, le Prestataire se réserve le droit de libérer la date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Tarifs et Modalités de Paiement</h2>
            <p className="text-zinc-300">
              Les prix sont exprimés en Dinars Algériens (DZD). Le solde de la prestation devra être réglé le jour de l'événement, avant le début ou à la fin de la prestation, selon les accords préalables. Les frais de déplacement hors d'Alger sont calculés et inclus dans le devis initial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Annulation</h2>
            <ul className="text-zinc-300 list-disc pl-5 space-y-2">
              <li><strong>Annulation par le Client :</strong> L'acompte versé reste acquis au Prestataire à titre de dédommagement, sauf cas de force majeure prouvé. Si l'annulation intervient moins de [15] jours avant l'événement, la totalité de la prestation peut être exigée.</li>
              <li><strong>Annulation par le Prestataire :</strong> En cas de force majeure l'empêchant d'assurer la prestation, le Prestataire s'engage à proposer une solution de remplacement de qualité équivalente ou à rembourser intégralement l'acompte versé.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Besoins Techniques & Logistiques</h2>
            <p className="text-zinc-300">
              Le Client doit s'assurer que le lieu de l'événement dispose d'une alimentation électrique sécurisée et suffisante à proximité de l'emplacement du DJ. Un espace minimum de [X] mètres carrés et une table stable doivent être prévus.
            </p>
            <p className="text-zinc-300">
              Un repas devra être prévu pour le Prestataire (et éventuellement son assistant) lors des prestations de longue durée s'étendant sur les heures de repas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Droit à l'Image</h2>
            <p className="text-zinc-300">
              Sauf avis contraire exprimé par écrit par le Client avant l'événement, le Prestataire se réserve le droit de prendre des photos et vidéos de la prestation (ambiance de piste, installation matérielle) pour la promotion de son activité sur son site web et ses réseaux sociaux.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
