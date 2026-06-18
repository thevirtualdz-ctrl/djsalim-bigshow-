'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulation API call (en attendant l'intégration Supabase de l'Étape 4)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Form data:', data);
      setIsSuccess(true);
      reset();
      
      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-16 left-0 w-full p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-500"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Votre demande de devis a été envoyée avec succès. Je vous recontacterai très prochainement.</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-16 left-0 w-full p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Nom complet <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-3 rounded-lg bg-background border ${
                errors.name ? 'border-destructive' : 'border-border/50 focus:border-primary'
              } outline-none transition-colors`}
              placeholder="Amine Benali"
              {...register('name', { required: 'Le nom est requis' })}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 rounded-lg bg-background border ${
                errors.email ? 'border-destructive' : 'border-border/50 focus:border-primary'
              } outline-none transition-colors`}
              placeholder="amine@exemple.com"
              {...register('email', { 
                required: 'L\'email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide'
                }
              })}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Téléphone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Téléphone <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-4 py-3 rounded-lg bg-background border ${
                errors.phone ? 'border-destructive' : 'border-border/50 focus:border-primary'
              } outline-none transition-colors`}
              placeholder="05 50 00 00 00"
              {...register('phone', { required: 'Le téléphone est requis' })}
            />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          {/* Type d'événement */}
          <div className="space-y-2">
            <label htmlFor="eventType" className="text-sm font-medium text-foreground">
              Type d'événement <span className="text-destructive">*</span>
            </label>
            <select
              id="eventType"
              className={`w-full px-4 py-3 rounded-lg bg-background border ${
                errors.eventType ? 'border-destructive' : 'border-border/50 focus:border-primary'
              } outline-none transition-colors appearance-none`}
              {...register('eventType', { required: 'Veuillez sélectionner un type d\'événement' })}
            >
              <option value="">Sélectionnez un type</option>
              <option value="mariage">Mariage</option>
              <option value="corporate">Entreprise / Corporate</option>
              <option value="anniversaire">Anniversaire / Soirée privée</option>
              <option value="club">Club / Festival</option>
              <option value="autre">Autre</option>
            </select>
            {errors.eventType && <p className="text-sm text-destructive mt-1">{errors.eventType.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-foreground">
              Date de l'événement <span className="text-muted-foreground text-xs">(Optionnel)</span>
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary outline-none transition-colors"
              {...register('date')}
            />
          </div>

          {/* Nombre d'invités */}
          <div className="space-y-2">
            <label htmlFor="guests" className="text-sm font-medium text-foreground">
              Nombre d'invités estimé <span className="text-muted-foreground text-xs">(Optionnel)</span>
            </label>
            <select
              id="guests"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary outline-none transition-colors appearance-none"
              {...register('guests')}
            >
              <option value="">Sélectionnez une fourchette</option>
              <option value="1-50">Moins de 50</option>
              <option value="50-100">50 - 100</option>
              <option value="100-200">100 - 200</option>
              <option value="200-500">200 - 500</option>
              <option value="500+">Plus de 500</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Détails de votre demande <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-4 py-3 rounded-lg bg-background border ${
              errors.message ? 'border-destructive' : 'border-border/50 focus:border-primary'
            } outline-none transition-colors resize-none`}
            placeholder="Décrivez-moi vos attentes, l'ambiance souhaitée, le lieu..."
            {...register('message', { required: 'Le message est requis', minLength: { value: 10, message: 'Votre message doit faire au moins 10 caractères' } })}
          />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full text-lg" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer ma demande'
          )}
        </Button>
      </form>
    </div>
  );
}
