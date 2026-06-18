'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Calculator, List } from 'lucide-react';
import Link from 'next/link';
import { QuoteSimulator } from '@/components/sections/QuoteSimulator';

const PLANS = [
  {
    name: 'Essentiel',
    price: 'Sur devis',
    description: 'Idéal pour les petits événements et les soirées privées intimistes.',
    features: [
      'Rendez-vous de préparation',
      'Prestation DJ (jusqu\'à 4h)',
      'Sonorisation de base',
      'Éclairage piste de danse simple'
    ],
    highlight: false
  },
  {
    name: 'Premium',
    price: 'Sur devis',
    description: 'Le choix parfait pour les mariages et les grands événements corporate.',
    features: [
      'Tout le pack Essentiel',
      'Prestation DJ (sans limite d\'heure)',
      'Sonorisation haute-fidélité (caisson de basses)',
      'Éclairage architectural de la salle',
      'Machines à effets (brouillard, étincelles)'
    ],
    highlight: true
  },
  {
    name: 'BigShow',
    price: 'Sur devis',
    description: 'L\'expérience ultime pour des événements spectaculaires et de grande envergure.',
    features: [
      'Tout le pack Premium',
      'Sonorisation festival (Line Array)',
      'Light Show programmé sur mesure',
      'Écrans LED ou mur vidéo',
      'Technicien son & lumière dédié'
    ],
    highlight: false
  }
];

export function PricingClient() {
  const [activeTab, setActiveTab] = useState<'plans' | 'simulator'>('plans');

  return (
    <div className="section-container">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          Des formules adaptées à <span className="text-gradient-gold">vos besoins</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Parce que chaque événement a ses propres exigences, je propose différentes formules 
          personnalisables ou un simulateur complet sur-mesure.
        </p>
      </div>

      {/* Système d'onglets (Tabs) */}
      <div className="flex justify-center max-w-md mx-auto mb-16 p-1.5 bg-black/40 border border-white/5 rounded-2xl">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'plans'
              ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.25)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <List className="w-4 h-4" /> Formules Fixes
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'simulator'
              ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.25)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" /> Configuration Sur-Mesure
        </button>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === 'plans' ? (
        <div className="space-y-16 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div 
                key={plan.name} 
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlight 
                    ? 'bg-primary/10 border-2 border-primary shadow-gold-lg transform md:-translate-y-4' 
                    : 'glass border border-border/50'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Recommandé
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm h-12">{plan.description}</p>
                </div>
                
                <div className="mb-8 pb-8 border-b border-border/50">
                  <div className="text-4xl font-bold font-heading">{plan.price}</div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant={plan.highlight ? 'default' : 'outline'} className="w-full">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Section acompte / blocage de date */}
          <div className="mt-20 text-center max-w-2xl mx-auto glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-primary/5 rounded-full blur-2xl" />
            <h2 className="text-2xl font-bold mb-3">Prêt à bloquer votre date ?</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Vous avez convenu des détails de votre événement avec Salim ? Effectuez le versement de l'acompte de réservation de 3 000 DA (par BaridiMob, CCP ou carte) pour bloquer définitivement votre date.
            </p>
            <Button asChild className="px-8 py-5">
              <Link href="/paiement">Bloquer ma date (Acompte 3 000 DA)</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
          <QuoteSimulator />
        </div>
      )}
    </div>
  );
}
