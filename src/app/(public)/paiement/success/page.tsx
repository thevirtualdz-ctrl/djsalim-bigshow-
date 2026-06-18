import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paiement Validé | DJ Salim BigShow Pro',
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; mock?: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
         <div className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
           <CheckCircle2 className="w-12 h-12" />
         </div>
         
         <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Paiement <span className="text-success">Validé !</span></h1>
         
         <p className="text-zinc-400 mb-8 text-lg">
           Merci pour votre paiement. Votre réservation est désormais officiellement confirmée. Je vous recontacterai très prochainement pour faire le point sur votre événement.
         </p>

         {resolvedParams.mock === 'true' && (
           <div className="bg-primary/20 text-primary border border-primary/30 rounded-lg p-4 mb-8 text-sm text-left">
             <strong>Mode Démo :</strong> Ceci est un succès simulé car aucune clé Stripe valide n'est configurée dans le fichier d'environnement.
           </div>
         )}

         <Link href="/" className="block">
           <Button className="w-full py-6 text-lg">Retour à l'accueil</Button>
         </Link>
      </div>
    </main>
  );
}
