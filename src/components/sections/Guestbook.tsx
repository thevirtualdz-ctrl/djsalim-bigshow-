'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Faux avis pour la démonstration (en attendant la base de données)
const DUMMY_REVIEWS = [
  {
    id: 1,
    name: 'Sarah & Thomas',
    date: '12 Juin 2025',
    rating: 5,
    text: "Un DJ exceptionnel ! Salim a su mettre le feu à notre mariage du début à la fin. Les transitions étaient parfaites et la piste de danse ne s'est jamais vidée. Un grand merci !",
  },
  {
    id: 2,
    name: 'Événementiel Corporate - TechCorp',
    date: '03 Mai 2025',
    rating: 5,
    text: "Prestation très professionnelle pour notre soirée d'entreprise. Le matériel son et lumière est haut de gamme, et l'adaptation au public était remarquable.",
  },
  {
    id: 3,
    name: 'Julie M.',
    date: '28 Avril 2025',
    rating: 5,
    text: "Ambiance de folie pour mes 30 ans ! Salim est à l'écoute, réactif et très pro. Je recommande les yeux fermés.",
  }
];

export function Guestbook() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="livre-dor" className="py-20 relative overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="section-container relative z-10 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Livre d'<span className="text-gradient-gold">Or</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les retours de mes clients et n'hésitez pas à laisser le vôtre après notre événement !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Colonne de gauche : Formulaire pour laisser un avis */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden h-full">
              <h3 className="text-2xl font-heading font-bold mb-6">Laisser un message</h3>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center h-48 text-center"
                  >
                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
                      <Star className="w-8 h-8 fill-current" />
                    </div>
                    <p className="text-xl font-medium text-white">Merci pour votre message !</p>
                    <p className="text-muted-foreground mt-2">Il sera visible après validation.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Votre Note</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`transition-colors focus:outline-none ${
                              star <= rating ? 'text-primary' : 'text-zinc-600 hover:text-primary/50'
                            }`}
                          >
                            <Star className={`w-8 h-8 ${star <= rating ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <input 
                        type="text" 
                        placeholder="Votre Nom ou Prénom" 
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <textarea 
                        placeholder="Votre message..." 
                        required
                        rows={4}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-6 group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Publier mon message
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Colonne de droite : Liste des avis */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {DUMMY_REVIEWS.map((review, index) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative group hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
