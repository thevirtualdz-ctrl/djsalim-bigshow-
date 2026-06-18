import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// On n'initialise Stripe que si on a une vraie clé pour éviter les crash en test local sans clé
const stripe = process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16' as any,
    })
  : null;

export async function POST(req: Request) {
  try {
    const { clientName, eventType, eventDate } = await req.json();

    const amount = 3000; // Acompte fixe

    // Si on est en mode MOCK (pas de vraie clé Stripe), on simule la redirection
    if (!stripe) {
      console.log('--- MOCK STRIPE SESSION ---');
      console.log('Client:', clientName, 'Event:', eventType, 'Date:', eventDate);
      return NextResponse.json({ url: '/paiement/success?mock=true' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'dzd',
            product_data: {
              name: 'Acompte de Réservation - DJ Salim BigShow Pro',
              description: `Acompte pour l'événement ${eventType} prévu le ${eventDate || 'date à définir'} (Client : ${clientName})`,
            },
            unit_amount: amount * 100, // En centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/paiement?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de la session de paiement.' }, { status: 500 });
  }
}
