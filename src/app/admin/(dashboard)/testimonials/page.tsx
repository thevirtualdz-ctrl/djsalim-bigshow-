'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle2, XCircle, MessageSquareQuote, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Testimonial } from '@/types/database';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(error);
      toast.error("Erreur de chargement des témoignages.");
    } else if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string) => {
    const supabase = createClient() as any;
    const { error } = await supabase
      .from('testimonials')
      .update({ is_featured: true })
      .eq('id', id);

    if (error) {
      toast.error("Erreur lors de l'approbation.");
    } else {
      toast.success("Témoignage approuvé !");
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_featured: true } : t));
    }
  };

  const handleUnapprove = async (id: string) => {
    const supabase = createClient() as any;
    const { error } = await supabase
      .from('testimonials')
      .update({ is_featured: false })
      .eq('id', id);

    if (error) {
      toast.error("Erreur lors du retrait de l'approbation.");
    } else {
      toast.success("Témoignage retiré du site public !");
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_featured: false } : t));
    }
  };

  const handleDelete = (id: string) => {
    toast("Supprimer ce témoignage définitivement ?", {
      action: {
        label: "Supprimer",
        onClick: async () => {
          const supabase = createClient();
          const { error } = await supabase.from('testimonials').delete().eq('id', id);
          if (error) {
            toast.error("Erreur de suppression.");
          } else {
            toast.success("Témoignage supprimé !");
            setTestimonials((prev) => prev.filter(t => t.id !== id));
          }
        }
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Gestion des Témoignages</h1>
        <p className="text-zinc-400">Validez ou supprimez les avis laissés par vos clients sur le site.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p>Chargement des témoignages...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass p-6 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden">
              {/* Status indicator */}
              {!testimonial.is_featured && (
                <div className="absolute top-0 right-0 bg-amber-500/20 text-amber-500 px-3 py-1 text-xs font-bold rounded-bl-xl border-l border-b border-amber-500/20">
                  À VALIDER
                </div>
              )}
              {testimonial.is_featured && (
                <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-500 px-3 py-1 text-xs font-bold rounded-bl-xl border-l border-b border-emerald-500/20">
                  PUBLIÉ
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.author_name}</h3>
                  <p className="text-xs text-zinc-500">{testimonial.event_type || 'Client'}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'fill-zinc-800 text-zinc-800'}`} 
                  />
                ))}
              </div>

              <p className="text-sm text-zinc-300 italic mb-6 flex-1">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-white/10 mt-auto">
                {!testimonial.is_featured ? (
                  <Button 
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border-none" 
                    onClick={() => handleApprove(testimonial.id)}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approuver
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2 text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400" 
                    onClick={() => handleUnapprove(testimonial.id)}
                  >
                    <XCircle className="w-4 h-4" /> Retirer
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="px-3 flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-400/50 hover:bg-red-500/10"
                  onClick={() => handleDelete(testimonial.id)}
                  title="Supprimer définitivement"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {testimonials.length === 0 && (
            <div className="col-span-full glass p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-zinc-500">
              <MessageSquareQuote className="w-12 h-12 mb-4 opacity-50" />
              <p>Aucun témoignage pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
