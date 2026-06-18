'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AvailabilityCalendar } from '../AvailabilityCalendar';

export function ContactFormFull() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      eventType: formData.get('eventType'),
      eventDate: selectedDate || formData.get('eventDate'),
      location: formData.get('location'),
      guests: formData.get('guests'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem('dj_salim_last_submission', Date.now().toString());
        setCooldownRemaining(5);
        formElement.reset();
        setSelectedDate('');
      } else {
        alert("Une erreur est survenue lors de l'envoi de votre demande.");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Infos */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Discutons de <span className="text-gradient-gold">votre projet</span></h2>
              <p className="text-zinc-400 leading-relaxed">
                Chaque événement est unique. Remplissez le formulaire avec un maximum de détails pour que je puisse vous proposer une offre parfaitement adaptée à vos attentes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Téléphone direct</p>
                  <a href="tel:+213550000000" className="text-lg font-medium hover:text-primary transition-colors">+213 (0) 550 00 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Email</p>
                  <a href="mailto:contact@djsalimbigshow.pro" className="text-lg font-medium hover:text-primary transition-colors">contact@djsalimbigshow.pro</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Zone d'intervention</p>
                  <p className="text-lg font-medium">Alger, Oran, Constantine, Tlemcen & toute l'Algérie</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Suivez-moi</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full glass border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.facebook.com/salim.bigshow.khalfa" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Formulaire */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-2xl">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4">Demande envoyée !</h3>
                  <p className="text-zinc-400 text-lg max-w-md mb-6">
                    Merci pour votre message. Je reviens vers vous sous 24h avec une proposition sur-mesure pour votre événement.
                  </p>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-zinc-500">
                      Pour éviter le spam, l'envoi est bloqué pendant {cooldownRemaining} minute(s).
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1">Nom & Prénom <span className="text-primary">*</span></label>
                      <input type="text" name="name" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Amine Benali" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1">Téléphone <span className="text-primary">*</span></label>
                      <input type="tel" name="phone" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="05 50 00 00 00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Email <span className="text-primary">*</span></label>
                    <input type="email" name="email" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="amine@exemple.com" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1">Type d'événement <span className="text-primary">*</span></label>
                      <select name="eventType" required defaultValue="" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option value="" disabled>Sélectionner...</option>
                        <option value="mariage">Mariage</option>
                        <option value="corporate">Événement d'Entreprise</option>
                        <option value="anniversaire">Anniversaire / Soirée Privée</option>
                        <option value="club">Club / Festival</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1 flex justify-between items-center">
                        <span>Date de l'événement</span>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(!showCalendar)}
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {showCalendar ? 'Masquer le calendrier' : 'Vérifier les disponibilités'}
                        </button>
                      </label>
                      <input 
                        type="date" 
                        name="eventDate" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]" 
                      />

                      <AnimatePresence>
                        {showCalendar && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-3 p-4 bg-black/60 border border-white/10 rounded-2xl"
                          >
                            <AvailabilityCalendar 
                              onSelectDate={(date) => {
                                setSelectedDate(date);
                                setShowCalendar(false);
                              }} 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1">Lieu / Ville</label>
                      <input type="text" name="location" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Alger, Hydra" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 ml-1">Nombre d'invités estimé</label>
                      <select name="guests" defaultValue="" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option value="" disabled>Sélectionner...</option>
                        <option value="<50">Moins de 50</option>
                        <option value="50-150">50 à 150</option>
                        <option value="150-300">150 à 300</option>
                        <option value=">300">Plus de 300</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Détails de votre demande <span className="text-primary">*</span></label>
                    <textarea name="message" required rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Décrivez l'ambiance souhaitée, le déroulé, vos besoins spécifiques en matériel..." />
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Envoyer ma demande
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
