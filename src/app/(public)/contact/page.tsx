import type { Metadata } from 'next';
import { ContactFormFull } from '@/components/forms/ContactFormFull';

export const metadata: Metadata = {
  title: 'Contact & Devis | DJ Salim BigShow Pro',
  description: 'Demandez un devis gratuit pour votre événement. DJ Salim BigShow Pro anime vos mariages, soirées privées et événements d\'entreprise.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32">
      {/* Header Section */}
      <section className="relative px-4 mb-16">
        <div className="absolute top-[-50%] left-[10%] w-[40%] h-[100%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-3 block">Contact</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6">
            Demander un <span className="text-gradient-gold">Devis</span>
          </h1>
        </div>
      </section>

      {/* Formulaire de Contact Complet */}
      <ContactFormFull />
    </main>
  );
}
