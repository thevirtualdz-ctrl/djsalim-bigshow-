'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Calendar, HelpCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Options de tarification (conservées pour calcul interne optionnel, mais masquées à l'utilisateur)
const EVENT_TYPES = [
  { id: 'mariage', label: 'Mariage d\'Exception', price: 10000 },
  { id: 'corporate', label: 'Gala / Entreprise / Corporate', price: 15000 },
  { id: 'anniversaire', label: 'Soirée Privée / Anniversaire', price: 7000 },
  { id: 'club', label: 'Clubbing / Festival / Showcase', price: 12000 },
];

const GUEST_OPTIONS = [
  { id: 'small', label: 'Jauge Intimiste (Moins de 100 invités)', price: 0 },
  { id: 'medium', label: 'Jauge Intermédiaire (100 à 250 invités)', price: 1000 },
  { id: 'large', label: 'Jauge Grande Salle (Plus de 250 invités)', price: 3000 },
];

const SOUND_PACKS = [
  { id: 'std', label: 'Sonorisation Standard ( cocktail / dîner )', price: 0, desc: 'Système bi-amplifié haute définition, idéal pour l\'ambiance et les petits espaces.' },
  { id: 'prem', label: 'Sonorisation Premium ( Avec caisson de basses )', price: 2000, desc: 'Sonorisation puissante avec renfort de basses, parfait pour vibrer sur le dancefloor.' },
  { id: 'fest', label: 'Sonorisation Concert ( Line Array & Sub )', price: 4000, desc: 'Système professionnel haute-fidélité pour les grandes salles et l\'extérieur.' },
];

const LIGHT_PACKS = [
  { id: 'std', label: 'Ambiance LED Standard', price: 0, desc: 'Ambiance colorée dynamique contrôlée pour la piste de danse.' },
  { id: 'prem', label: 'Pack Show Robotisé (Lyres Mobiles)', price: 1500, desc: 'Show robotisé avec lyres asservies intelligentes et effets programmés.' },
  { id: 'club', label: 'Show Laser & Clubbing (Lasers + Brouillard)', price: 2500, desc: 'Show laser 3D géométrique de haute intensité couplé à une diffusion de brouillard.' },
];

const SPECIAL_EFFECTS = [
  { id: 'smoke', label: 'Fumée Lourde (Ouverture de bal)', price: 1000, desc: 'Effet nuage spectaculaire au sol pour l\'ouverture de bal ou l\'entrée des mariés.' },
  { id: 'sparkles', label: 'Étincelles Froides (4 jets synchronisés)', price: 1500, desc: 'Fontaines d\'étincelles froides (100% sécurisées) pour les temps forts.' },
  { id: 'bubbles', label: 'Machine à Bulles Professionnelle', price: 1000, desc: 'Nuée de bulles féérique pour le cocktail en extérieur ou l\'entrée.' },
];

export function QuoteSimulator() {
  // Sélection des états
  const [eventType, setEventType] = useState('mariage');
  const [guests, setGuests] = useState('medium');
  const [soundPack, setSoundPack] = useState('std');
  const [lightPack, setLightPack] = useState('std');
  const [effects, setEffects] = useState<string[]>([]);
  const [unlimitedDuration, setUnlimitedDuration] = useState(false);
  
  // États de l'interface et du formulaire de contact direct
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const lastSub = localStorage.getItem('dj_salim_last_submission');
    if (lastSub) {
      const elapsed = Date.now() - parseInt(lastSub);
      if (elapsed < 300000) { // 5 minutes
        setIsSuccess(true);
        setCooldownRemaining(Math.ceil((300000 - elapsed) / 60000));
      }
    }
  }, []);

  // Recalculer le total en arrière-plan (pour information interne de Salim dans l'email)
  useEffect(() => {
    let sum = 0;
    const ev = EVENT_TYPES.find(e => e.id === eventType);
    if (ev) sum += ev.price;
    const gst = GUEST_OPTIONS.find(g => g.id === guests);
    if (gst) sum += gst.price;
    const snd = SOUND_PACKS.find(s => s.id === soundPack);
    if (snd) sum += snd.price;
    const lgt = LIGHT_PACKS.find(l => l.id === lightPack);
    if (lgt) sum += lgt.price;
    effects.forEach(effectId => {
      const eff = SPECIAL_EFFECTS.find(e => e.id === effectId);
      if (eff) sum += eff.price;
    });
    if (unlimitedDuration) {
      sum += 2000;
    }
    setTotalPrice(sum);
  }, [eventType, guests, soundPack, lightPack, effects, unlimitedDuration]);

  const handleEffectToggle = (id: string) => {
    setEffects(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const evLabel = EVENT_TYPES.find(e => e.id === eventType)?.label || eventType;
    const gstLabel = GUEST_OPTIONS.find(g => g.id === guests)?.label || guests;
    const sndLabel = SOUND_PACKS.find(s => s.id === soundPack)?.label || soundPack;
    const lgtLabel = LIGHT_PACKS.find(l => l.id === lightPack)?.label || lightPack;
    const effs = effects.map(e => SPECIAL_EFFECTS.find(s => s.id === e)?.label).join(', ') || 'Aucun';

    const messageContent = `Bonjour Salim, j'ai configuré mon événement sur-mesure sur le site.\nDétails de mes choix techniques :\n\n- Sonorisation : ${sndLabel}\n- Jeux de Lumières : ${lgtLabel}\n- Effets Spéciaux : ${effs}\n- Horaires Illimités : ${unlimitedDuration ? 'Oui (Jusqu\'au bout de la nuit)' : 'Non (Pack 5h)'}\n\n[Indication budgétaire configurateur : ${totalPrice} DA]`;

    const data = {
      name,
      email,
      phone,
      eventType: evLabel,
      eventDate,
      location: 'Non spécifié (Configurateur)',
      guests: gstLabel,
      message: messageContent,
    };

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        localStorage.setItem('dj_salim_last_submission', Date.now().toString());
        setCooldownRemaining(5);
        setEmail('');
        setName('');
        setPhone('');
        setEventDate('');
      } else {
        alert("Une erreur s'est produite lors de l'envoi de votre demande.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Colonne gauche : Options de configuration sans prix */}
      <div className="lg:col-span-7 space-y-8 text-left bg-black/30 border border-white/5 p-6 sm:p-8 rounded-[2.5rem]">
        
        {/* 1. Type d'événement */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">1. Type d'événement</label>
          <div className="grid grid-cols-2 gap-3">
            {EVENT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setEventType(type.id)}
                className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                  eventType === type.id
                    ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{type.label}</span>
                {eventType === type.id && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Taille de l'événement */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">2. Nombre d'invités</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {GUEST_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setGuests(opt.id)}
                className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between sm:flex-col sm:items-start sm:gap-2 ${
                  guests === opt.id
                    ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{opt.label}</span>
                {guests === opt.id && <Check className="w-4 h-4 text-primary self-end sm:self-start" />}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Matériel de Sonorisation */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">3. Pack Sonorisation</label>
          <div className="space-y-3">
            {SOUND_PACKS.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setSoundPack(pack.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex gap-3 ${
                  soundPack === pack.id
                    ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${soundPack === pack.id ? 'border-primary text-primary' : 'border-zinc-700'}`}>
                  {soundPack === pack.id && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </span>
                <div>
                  <div className="flex justify-between items-center pr-2">
                    <span className="font-semibold text-white text-sm sm:text-base">{pack.label}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{pack.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Show Lumineux */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">4. Pack Light Show</label>
          <div className="space-y-3">
            {LIGHT_PACKS.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setLightPack(pack.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex gap-3 ${
                  lightPack === pack.id
                    ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${lightPack === pack.id ? 'border-primary text-primary' : 'border-zinc-700'}`}>
                  {lightPack === pack.id && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </span>
                <div>
                  <div className="flex justify-between items-center pr-2">
                    <span className="font-semibold text-white text-sm sm:text-base">{pack.label}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{pack.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Effets Spéciaux */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">5. Options Effets Spéciaux (Cumulables)</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SPECIAL_EFFECTS.map((eff) => {
              const isSelected = effects.includes(eff.id);
              return (
                <button
                  key={eff.id}
                  type="button"
                  onClick={() => handleEffectToggle(eff.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-4 h-full ${
                    isSelected
                      ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between w-full items-start">
                    <span className="text-xs font-semibold text-primary">Option</span>
                    <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-black' : 'border-zinc-700'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-xs sm:text-sm block text-white leading-tight mb-1">{eff.label}</span>
                    <p className="text-[10px] text-zinc-500 leading-normal">{eff.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Durée de prestation */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-zinc-500 block">6. Durée du Mix</label>
          <button
            type="button"
            onClick={() => setUnlimitedDuration(!unlimitedDuration)}
            className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              unlimitedDuration
                ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div>
              <span className="font-semibold text-sm sm:text-base text-white block">Prestation illimitée (Jusqu'au bout de la nuit)</span>
              <p className="text-xs text-zinc-500 mt-0.5">Par défaut : Pack 5 heures de mix inclus dans la formule.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${unlimitedDuration ? 'border-primary bg-primary text-black' : 'border-zinc-700'}`}>
                {unlimitedDuration && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Colonne droite : Formulaire de demande de devis en direct */}
      <div className="lg:col-span-5 sticky top-28">
        <div className="glass p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute -left-16 -top-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          
          <div className="text-center mb-6 border-b border-white/5 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Votre Expérience Unique</span>
            <h3 className="text-2xl font-bold font-heading text-white">Demande de Devis</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Remplissez les détails ci-dessous pour recevoir votre proposition tarifaire sous 24h.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Demande transmise !</h4>
                <p className="text-sm text-zinc-400">Salim va étudier votre configuration et vous répondra très rapidement par e-mail.</p>
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-xs text-zinc-500">
                    Pour éviter le spam, le formulaire est bloqué pendant {cooldownRemaining} minute(s).
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4 text-left">
                {/* Inputs du formulaire */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Nom & Prénom</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" 
                    placeholder="Amine Benali" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Numéro de téléphone</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" 
                    placeholder="05 50 00 00 00" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Adresse Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" 
                    placeholder="amine@exemple.com" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Date souhaitée</label>
                  <input 
                    type="date" 
                    required 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]" 
                  />
                </div>

                {/* Recap récapitulatif technique simple */}
                <div className="bg-white/5 rounded-xl p-4 text-xs space-y-2 mt-4">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500">Événement :</span>
                    <span className="text-white font-medium">{EVENT_TYPES.find(e => e.id === eventType)?.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500">Sonorisation :</span>
                    <span className="text-white font-medium max-w-[150px] truncate">{SOUND_PACKS.find(s => s.id === soundPack)?.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500">Lumières :</span>
                    <span className="text-white font-medium max-w-[150px] truncate">{LIGHT_PACKS.find(l => l.id === lightPack)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Durée Mix :</span>
                    <span className="text-white font-medium">{unlimitedDuration ? 'Illimité (Nuit entière)' : 'Pack 5h'}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full py-5 text-sm font-bold bg-primary text-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-6"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Envoyer ma configuration
                    </>
                  )}
                </Button>
              </form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
