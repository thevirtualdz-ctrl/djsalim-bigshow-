'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Booking } from '@/types/database';
import { Check, Edit, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReservationsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [priceInput, setPriceInput] = useState('');
  
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openQuoteModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setPriceInput(booking.price_quoted?.toString() || '');
    setIsQuoteModalOpen(true);
  };

  const submitQuote = async () => {
    if (!selectedBooking) return;
    const supabase = createClient() as any;
    const { error } = await supabase
      .from('bookings')
      .update({ price_quoted: parseFloat(priceInput), admin_validated: true })
      .eq('id', selectedBooking.id);
      
    if (!error) {
      fetchBookings();
      setIsQuoteModalOpen(false);
      toast.success("Devis envoyé au client !");
    }
  };

  const openReceiptModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsReceiptModalOpen(true);
  };

  const confirmPayment = async () => {
    if (!selectedBooking) return;
    const supabase = createClient() as any;
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', selectedBooking.id);
      
    if (!error) {
      fetchBookings();
      setIsReceiptModalOpen(false);
      toast.success("Paiement confirmé !");
    }
  };

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === 'confirmed') return <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">Confirmé</span>;
    if (booking.status === 'waiting_verification') return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs">Vérif. Paiement</span>;
    if (booking.status === 'waiting_payment') return <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded text-xs">Attente Paiement</span>;
    if (booking.admin_validated) return <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">Devis Envoyé</span>;
    return <span className="px-2 py-1 bg-zinc-500/20 text-zinc-400 rounded text-xs">Nouveau</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Gestion des Réservations</h1>
          <p className="text-zinc-400">Gérez les demandes de devis et les acomptes.</p>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300 min-w-[700px]">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Événement</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucune réservation pour le moment.</td>
                  </tr>
                ) : bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {booking.client_name}<br/>
                      <span className="text-xs text-zinc-500">{booking.email}</span>
                    </td>
                    <td className="px-6 py-4">{booking.event_type}</td>
                    <td className="px-6 py-4">{new Date(booking.event_date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4">{getStatusBadge(booking)}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {/* Envoyer devis */}
                      <button 
                        onClick={() => openQuoteModal(booking)}
                        className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                        title="Envoyer le devis"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Confirmer paiement */}
                      {booking.receipt_url && booking.status !== 'confirmed' && (
                        <button 
                          onClick={() => openReceiptModal(booking)}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors"
                          title="Vérifier le reçu"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Devis */}
      {isQuoteModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold mb-4">Envoyer un devis</h3>
            <p className="text-sm text-zinc-400 mb-6">Fixez le prix pour la réservation de {selectedBooking.client_name}. Le client pourra ensuite valider depuis son lien unique.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Prix (DZD)</label>
              <input 
                type="number" 
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="Ex: 50000"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={submitQuote}
                className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover transition-colors"
              >
                Valider et envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reçu */}
      {isReceiptModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold mb-4">Vérification du reçu de paiement</h3>
            
            <div className="flex-1 overflow-auto bg-black rounded-xl border border-white/10 flex items-center justify-center p-2 mb-6 min-h-[300px]">
              {selectedBooking.receipt_url?.endsWith('.pdf') ? (
                <a href={selectedBooking.receipt_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">Voir le PDF</a>
              ) : (
                <img src={selectedBooking.receipt_url || ''} alt="Reçu" className="max-w-full max-h-[50vh] object-contain" />
              )}
            </div>
            
            <div className="flex gap-3 justify-end mt-auto">
              <button 
                onClick={() => setIsReceiptModalOpen(false)}
                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                Fermer
              </button>
              <button 
                onClick={confirmPayment}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-5 h-5" />
                Confirmer le paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
