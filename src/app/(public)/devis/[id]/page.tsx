'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Booking } from '@/types/database';
import { CheckCircle, Clock, Upload, CreditCard, Receipt } from 'lucide-react';
import { toast } from 'sonner';

export default function DevisPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchBooking = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id as string)
        .single();
        
      if (data) {
        setBooking(data);
      }
      setLoading(false);
    };
    
    fetchBooking();
  }, [id]);

  const handleAcceptQuote = async () => {
    if (!booking) return;
    setLoading(true);
    const supabase = createClient() as any;
    const { data, error } = await supabase
      .from('bookings')
      .update({ client_validated: true, status: 'waiting_payment' })
      .eq('id', booking.id)
      .select()
      .single();
      
    if (data) {
      setBooking(data);
      toast.success("Votre devis a été validé avec succès !");
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !booking) return;
    const file = e.target.files[0];
    
    setUploading(true);
    const supabase = createClient() as any;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${booking.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error('Upload error:', uploadError);
      toast.error("Erreur lors de l'envoi du fichier.");
      setUploading(false);
      return;
    }
    
    const { data } = supabase.storage.from('receipts').getPublicUrl(filePath);
    
    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({ receipt_url: data.publicUrl, status: 'waiting_verification' })
      .eq('id', booking.id)
      .select()
      .single();
      
    if (updatedBooking) {
      setBooking(updatedBooking);
    }
    
    setUploading(false);
  };

  if (loading && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Devis introuvable</h2>
          <p className="text-muted-foreground">Ce lien est invalide ou la demande a été supprimée.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-32 bg-background relative">
      <div className="hidden md:block absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Réservation : <span className="text-primary">{booking.event_type || 'Événement'}</span>
            </h1>
            <p className="text-muted-foreground">
              Client : {booking.client_name} • Date : {new Date(booking.event_date).toLocaleDateString('fr-FR')}
            </p>
          </div>

          {/* Etape A: Attente */}
          {!booking.admin_validated && (
            <div className="text-center py-10">
              <Clock className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold mb-4">Demande en cours d&apos;étude</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Votre demande est en cours d&apos;étude par DJ Salim. Vous recevrez très prochainement une proposition tarifaire sur cette même page.
              </p>
            </div>
          )}

          {/* Etape B: Validation Client */}
          {booking.admin_validated && !booking.client_validated && (
            <div className="text-center py-8">
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-8 inline-block min-w-[300px]">
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Tarif Proposé</p>
                <div className="text-5xl font-bold text-foreground">
                  {booking.price_quoted} <span className="text-2xl text-primary">DZD</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                En acceptant ce devis, vous vous engagez à régler l&apos;acompte ou la totalité via virement CCP / BaridiMob pour bloquer définitivement la date.
              </p>
              
              <button 
                onClick={handleAcceptQuote}
                disabled={loading}
                className="btn-primary w-full md:w-auto text-lg py-4 px-8 flex items-center justify-center gap-2 mx-auto"
              >
                <CheckCircle className="w-5 h-5" />
                ✅ J'accepte le tarif et je valide la date
              </button>
            </div>
          )}

          {/* Etape C: Paiement (waiting_payment ou waiting_verification) */}
          {booking.admin_validated && booking.client_validated && (booking.status === 'waiting_payment' || booking.status === 'waiting_verification') && (
            <div className="py-6">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
                <div className="p-3 bg-primary/20 rounded-full">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Paiement Requis</h3>
                  <p className="text-muted-foreground">Pour verrouiller la date, merci d&apos;effectuer le virement.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-muted/50 p-6 rounded-2xl border border-border">
                  <h4 className="font-bold mb-4 text-primary">Informations BaridiMob / CCP</h4>
                  <div className="space-y-3 text-sm">
                    <p><span className="text-muted-foreground">Titulaire :</span> KHALFA Salim</p>
                    <p><span className="text-muted-foreground">Compte CCP :</span> 20444555 Clé 89</p>
                    <p><span className="text-muted-foreground">RIP (BaridiMob) :</span> 007 99999 0020444555 89</p>
                    <p><span className="text-muted-foreground">Montant dû :</span> <span className="font-bold text-lg text-primary">{booking.price_quoted} DZD</span></p>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-primary/30 flex flex-col justify-center items-center text-center">
                  {booking.status === 'waiting_verification' ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h4 className="font-bold text-green-400 mb-2">Reçu envoyé !</h4>
                      <p className="text-sm text-muted-foreground">En cours de vérification par notre équipe.</p>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-bold mb-4">Envoyer votre reçu</h4>
                      <label className="cursor-pointer group relative">
                        <input 
                          type="file" 
                          accept="image/*,.pdf" 
                          className="hidden" 
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                        <div className={`btn-outline flex items-center gap-2 ${uploading ? 'opacity-50' : ''}`}>
                          <Upload className="w-4 h-4" />
                          {uploading ? 'Envoi en cours...' : 'Uploader la capture'}
                        </div>
                      </label>
                      <p className="text-xs text-muted-foreground mt-3">Formats acceptés : JPG, PNG, PDF</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Etape D: Confirmé */}
          {booking.status === 'confirmed' && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6 border border-green-500/30">
                <Receipt className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">Réservation Confirmée !</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Le paiement a été validé. La date du <strong className="text-primary">{new Date(booking.event_date).toLocaleDateString('fr-FR')}</strong> est définitivement verrouillée pour vous.
              </p>
              <div className="glass inline-block p-6 rounded-2xl border-green-500/30">
                <p className="font-medium text-green-400 flex items-center gap-2 justify-center">
                  <CheckCircle className="w-5 h-5" />
                  Merci de votre confiance.
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </main>
  );
}
