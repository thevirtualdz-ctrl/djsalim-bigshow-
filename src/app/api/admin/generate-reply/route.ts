import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // 1. VÉRIFICATION DE LA SÉCURITÉ (Uniquement l'admin)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')) {
      const cookieStore = await cookies();
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
      }
    }

    // 2. RÉCUPÉRATION DES DONNÉES
    const { clientName, eventType, message } = await req.json();

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('placeholder')) {
      return NextResponse.json({
        reply: `Bonjour ${clientName},\n\nJe vous remercie pour votre demande concernant votre événement (${eventType}).\nJ'ai bien lu votre message avec attention :\n"${message}"\n\n[MOCK : Ceci est une réponse d'exemple générée car aucune clé OpenAI n'est configurée. L'IA aurait rédigé une réponse parfaite et détaillée ici.]\n\nJe vous propose que l'on s'appelle pour en discuter plus en détails.\n\nMusicalement,\n\nDJ Salim BigShow Pro`,
      });
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: `Tu es DJ Salim BigShow Pro, un DJ professionnel et haut de gamme. 
Rédige une réponse par email parfaite, professionnelle et chaleureuse à un client qui te contacte pour un devis.
Le ton doit être confiant, accueillant et montrer ton expertise. Ne donne pas de tarif exact (tu devras le remplir plus tard ou en parler de vive voix).
Invite le client à échanger par téléphone.
Termine toujours par :
"Musicalement,

DJ Salim BigShow Pro
salimbigshow.com"`,
      prompt: `Le client s'appelle ${clientName}. 
Il organise un événement de type "${eventType}". 
Voici son message original : "${message}". 
Rédige ta réponse.`,
    });

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Erreur génération email IA:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération de la réponse' }, { status: 500 });
  }
}
