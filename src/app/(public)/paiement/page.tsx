import type { Metadata } from 'next';
import { PaymentClient } from './PaymentClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Paiement Acompte | DJ Salim BigShow Pro',
  description: 'Procédez au paiement de votre acompte pour valider votre réservation.',
};

export default function PaiementPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
       <section className="max-w-2xl w-full mx-auto px-4">
         <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden shadow-2xl">
           <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
           
           <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Valider ma <span className="text-gradient-gold">Réservation</span></h1>
           <p className="text-zinc-400 mb-10 text-lg">
             Afin de bloquer définitivement la date de votre événement, un acompte fixe de <strong className="text-white">3 000 DA</strong> est requis.
           </p>

           <Suspense fallback={<div className="text-zinc-400 text-sm">Chargement du formulaire...</div>}>
             <PaymentClient />
           </Suspense>
         </div>
       </section>
    </main>
  );
}
