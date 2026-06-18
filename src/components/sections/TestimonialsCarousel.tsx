'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

type Testimonial = {
  id: string;
  content: string;
  author_name: string;
  author_role: string | null;
  rating: number;
};

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchTestimonials() {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setTestimonials(data);
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const supabase = createClient() as any;
    const { error } = await supabase.from('testimonials').insert([{
      author_name: authorName,
      content: content,
      rating: rating,
      is_featured: false, // En attente de validation
    }]);

    setIsSubmitting(false);

    if (!error) {
      setIsSuccess(true);
      setAuthorName('');
      setContent('');
      setRating(5);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } else {
      alert("Une erreur s'est produite lors de l'envoi de votre témoignage.");
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none">
        <Quote className="w-full h-full text-white" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Témoignages
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white"
          >
            Ce que disent <span className="text-gradient-gold">mes clients</span>
          </motion.h3>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            Aucun témoignage pour le moment. Soyez le premier à en laisser un !
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                className="absolute w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-12 cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>
                <div>
                  <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].author_name}</h4>
                  {testimonials[currentIndex].author_role && (
                    <p className="text-primary">{testimonials[currentIndex].author_role}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-0 sm:-left-12 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors z-20"
                  onClick={() => paginate(-1)}
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="absolute top-1/2 right-0 sm:-right-12 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors z-20"
                  onClick={() => paginate(1)}
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8 mb-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Formulaire d'avis */}
        <div className="max-w-3xl mx-auto mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">Laissez votre témoignage</h3>
              <p className="text-muted-foreground">Votre retour est précieux et aide les futurs clients.</p>
            </div>
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 fill-current" />
                  </div>
                  <p className="text-xl font-medium text-white">Merci pour votre message !</p>
                  <p className="text-muted-foreground mt-2">Il sera visible sur le site après validation.</p>
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
                  <div className="flex flex-col items-center mb-6">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Quelle note donnez-vous à la prestation ?</label>
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
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <textarea 
                      placeholder="Votre message..." 
                      required
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                        Soumettre mon témoignage
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
