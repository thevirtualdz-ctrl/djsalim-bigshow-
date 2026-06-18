import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

// Initialise Resend seulement si la clé est présente et valide
const resend = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, eventType, eventDate, location, guests, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    // --- SAUVEGARDE DANS SUPABASE ---
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (isSupabaseConfigured) {
      try {
        const supabase = (await createClient()) as any;

        // 1. VÉRIFICATION ANTI-SPAM (Blocage silencieux)
        const { data: blockedData } = await supabase
          .from('blocked_emails')
          .select('email')
          .eq('email', email.toLowerCase())
          .single();

        if (blockedData) {
          console.log(`[ANTI-SPAM] Tentative d'envoi bloquée silencieusement pour l'email: ${email}`);
          return NextResponse.json({ success: true, mock: false, note: 'silently blocked' });
        }

        // 2. INSERTION DU MESSAGE
        const { error: dbError } = await supabase.from('contact_messages').insert([{
          name,
          email,
          phone: phone || null,
          subject: `Devis: ${eventType}`,
          message,
          event_type: eventType,
          event_date: eventDate || null,
          budget: null,
          is_read: false,
          is_archived: false
        }]);
        if (dbError) {
          console.error("Erreur Supabase (sauvegarde message):", dbError);
        }
      } catch (e) {
        console.error("Exception Supabase:", e);
      }
    } else {
      console.log('--- MOCK SUPABASE : Message prêt à être sauvegardé ---');
    }

    if (!resend) {
      console.log('--- MOCK EMAIL ENVOYÉ ---');
      console.log(`À: ${email} | Sujet: Confirmation de votre demande de devis`);
      console.log(`À: DJ Salim | Sujet: Nouveau devis de ${name}`);
      console.log('Données:', data);
      return NextResponse.json({ success: true, mock: true });
    }

    const senderEmail = 'DJ Salim BigShow Pro <onboarding@resend.dev>'; // Doit être vérifié en prod
    const adminEmail = process.env.ADMIN_EMAIL || 'salim@example.com';

    // 1. Email pour le Client (Confirmation automatique)
    const { data: clientData, error: clientError } = await resend.emails.send({
      from: senderEmail,
      to: [email],
      subject: 'Confirmation de votre demande de devis - DJ Salim BigShow Pro',
      html: `
        <h2>Bonjour ${name},</h2>
        <p>J'ai bien reçu votre demande de devis pour votre événement (${eventType})${eventDate ? ` prévu le ${eventDate}` : ''} et je vous en remercie !</p>
        <p>Je vais étudier votre message : <br/><i>"${message}"</i><br/> et je vous répondrai sous 24h avec une proposition sur-mesure.</p>
        <br>
        <p>Musicalement,</p>
        <p><strong>Salim</strong><br>DJ Salim BigShow Pro</p>
      `,
    });
    console.log('Client Email Response:', JSON.stringify({ data: clientData, error: clientError }));

    // 2. Email pour l'Admin (DJ Salim)
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: senderEmail,
      to: [adminEmail],
      subject: `NOUVEAU DEVIS : ${name} (${eventType})`,
      html: `
        <h2>Nouvelle demande de devis depuis le site web !</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Type d'événement :</strong> ${eventType}</p>
        <p><strong>Date :</strong> ${eventDate || 'Non renseignée'}</p>
        <p><strong>Lieu :</strong> ${location || 'Non renseigné'}</p>
        <p><strong>Nombre d'invités :</strong> ${guests || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });
    console.log('Admin Email Response:', JSON.stringify({ data: adminData, error: adminError }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API Resend:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}
