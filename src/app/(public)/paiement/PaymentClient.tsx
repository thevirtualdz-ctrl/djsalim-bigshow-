'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CreditCard, Lock } from 'lucide-react';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';
import { useSearchParams } from 'next/navigation';

export function PaymentClient() {
  const searchParams = useSearchParams();
  const urlEventType = searchParams.get('eventType') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventType, setEventType] = useState(urlEventType);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const clientName = formData.get('clientName') as string;
    const clientEmail = formData.get('clientEmail') as string;
    const eventDate = selectedDate || (formData.get('eventDate') as string);

    const data = {
      clientName,
      clientEmail,
      eventType,
      eventDate,
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const { url, error } = await res.json();
      if (url) {
        // Enregistrer temporairement dans localStorage pour simulation
        const stored = localStorage.getItem('dj_salim_reservations');
        const reservations = stored ? JSON.parse(stored) : [];
        const newRes = {
          id: 'res_' + Date.now(),
          clientName,
          clientEmail,
          eventType,
          eventDate,
          amount: 3000,
          status: 'succeeded',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('dj_salim_reservations', JSON.stringify([newRes, ...reservations]));

        window.location.href = url; // Redirection vers Stripe Checkout (ou Mock)
      } else {
        alert(error || 'Erreur lors de la redirection vers le paiement.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue.');
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto items-start">
      {/* Colonne gauche : Formulaire */}
      <div className="lg:col-span-6">
        <form onSubmit={handlePayment} className="space-y-6 text-left">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block">Nom & Prénom</label>
              <input type="text" name="clientName" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block">Adresse Email</label>
              <input type="email" name="clientEmail" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="jean@exemple.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 block">Type d'événement</label>
                <input 
                  type="text" 
                  name="eventType" 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" 
                  placeholder="Ex: Mariage" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 block">Date de réservation</label>
                <input 
                  type="date" 
                  name="eventDate" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]" 
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg group">
            {isLoading ? (
               <span className="flex items-center justify-center gap-2">
                 <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                 Redirection...
               </span>
            ) : (
               <span className="flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Payer l'acompte (3 000 DA)
                </span>
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mt-4">
            <Lock className="w-4 h-4" />
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </form>
      </div>

      {/* Colonne droite : Calendrier */}
      <div className="lg:col-span-6 bg-black/30 border border-white/5 p-6 rounded-3xl">
        <h3 className="text-lg font-bold mb-4 text-white text-center">Calendrier des disponibilités</h3>
        <p className="text-xs text-zinc-500 mb-4 text-center">
          Sélectionnez une date libre (en vert) pour remplir automatiquement le formulaire.
        </p>
        <AvailabilityCalendar onSelectDate={(date) => setSelectedDate(date)} />
      </div>
    </div>
  );
}
