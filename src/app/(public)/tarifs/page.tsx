import { PricingClient } from './PricingClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs | DJ Salim BigShow Pro',
  description: 'Découvrez nos forfaits de sonorisation, d\'éclairage et de DJing pour votre événement.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <PricingClient />
    </main>
  );
}
