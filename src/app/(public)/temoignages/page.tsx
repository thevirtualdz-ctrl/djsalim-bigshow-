import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Témoignages | DJ Salim BigShow Pro',
  description: 'Découvrez les retours de mes clients sur leurs événements. Mariages, soirées corporate et fêtes privées.',
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="section-container text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          Ils m'ont fait <span className="text-gradient-gold">confiance</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          La satisfaction de mes clients est ma meilleure carte de visite. 
          Découvrez leurs témoignages après leurs événements.
        </p>
      </div>

      <TestimonialsCarousel />
    </main>
  );
}
