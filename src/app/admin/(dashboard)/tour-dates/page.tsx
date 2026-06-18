'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Database, 
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { 
  getTourDates, 
  createTourDate, 
  updateTourDate, 
  deleteTourDate, 
  isSupabaseConfigured 
} from '@/lib/supabase/tourDates';
import type { TourDate } from '@/types/database';
import { toast } from 'sonner';

export default function AdminTourDatesPage() {
  const [dates, setDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSupabase, setIsSupabase] = useState(false);

  // États du modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TourDate | null>(null);

  // Formulaire
  const [dateVal, setDateVal] = useState('');
  const [cityVal, setCityVal] = useState('');
  const [venueVal, setVenueVal] = useState('');
  const [ticketVal, setTicketVal] = useState('');
  const [soldOutVal, setSoldOutVal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setIsSupabase(isSupabaseConfigured());
    loadDates();
  }, []);

  async function loadDates() {
    setLoading(true);
    try {
      const data = await getTourDates();
      setDates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Ouvrir pour création
  const handleOpenAdd = () => {
    setEditingItem(null);
    setDateVal('');
    setCityVal('');
    setVenueVal('');
    setTicketVal('');
    setSoldOutVal(false);
    setIsModalOpen(true);
  };

  // Ouvrir pour édition
  const handleOpenEdit = (item: TourDate) => {
    setEditingItem(item);
    setDateVal(item.date);
    setCityVal(item.city);
    setVenueVal(item.venue);
    setTicketVal(item.ticket_link || '');
    setSoldOutVal(item.is_sold_out);
    setIsModalOpen(true);
  };

  // Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateVal || !cityVal || !venueVal) {
      toast.error('Veuillez remplir les champs obligatoires (Date, Ville, Salle).');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        // Mode modification
        const success = await updateTourDate(editingItem.id, {
          date: dateVal,
          city: cityVal,
          venue: venueVal,
          ticket_link: ticketVal || null,
          is_sold_out: soldOutVal
        });
        if (success) {
          setIsModalOpen(false);
          toast.success('Date modifiée avec succès.');
          loadDates();
        } else {
          toast.error('Erreur lors de la modification.');
        }
      } else {
        // Mode création
        await createTourDate({
          date: dateVal,
          city: cityVal,
          venue: venueVal,
          ticket_link: ticketVal || null,
          is_sold_out: soldOutVal
        });
        toast.success('Nouvelle date ajoutée avec succès.');
        setIsModalOpen(false);
        loadDates();
      }
    } catch (err) {
      console.error(err);
      toast.error('Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    toast("Voulez-vous vraiment supprimer cette date de concert ?", {
      action: {
        label: "Supprimer",
        onClick: async () => {
          try {
            const success = await deleteTourDate(id);
            if (success) {
              toast.success('Date supprimée.');
              loadDates();
            } else {
              toast.error('Erreur lors de la suppression.');
            }
          } catch (err) {
            console.error(err);
            toast.error('Une erreur est survenue.');
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Dates de Tournée</h1>
          <p className="text-zinc-400">Gérez les apparitions publiques, clubs et festivals de Salim.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2 self-start bg-primary text-black">
          <Plus className="w-4 h-4" /> Ajouter un Show
        </Button>
      </div>

      {/* Info Database Mode Status */}
      <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-sm ${
        isSupabase 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
          : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
      }`}>
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold">{isSupabase ? 'Base de données Supabase Cloud active' : 'Mode Démo Hors-ligne (LocalStorage)'}</p>
            <p className="text-xs opacity-80">
              {isSupabase 
                ? 'Toutes les modifications sont sauvegardées directement dans la base de données cloud de production.'
                : 'Les modifications sont stockées dans le navigateur local. Pour connecter Supabase, configurez les variables d\'environnement dans .env.local.'
              }
            </p>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
          isSupabase ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
        }`}>
          {isSupabase ? 'Connecté' : 'Hors-ligne'}
        </span>
      </div>

      {/* Table CRUD */}
      <div className="glass rounded-3xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p>Chargement des dates...</p>
          </div>
        ) : dates.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
            <Calendar className="w-12 h-12 opacity-30 text-zinc-400 mb-2" />
            <p className="font-medium text-white">Aucune date configurée</p>
            <p className="text-xs">Commencez par ajouter votre premier show en cliquant sur le bouton ci-dessus.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-black/40">
                  <th className="p-5 text-sm font-semibold text-zinc-400">Date du Show</th>
                  <th className="p-5 text-sm font-semibold text-zinc-400">Ville</th>
                  <th className="p-5 text-sm font-semibold text-zinc-400">Salle / Club</th>
                  <th className="p-5 text-sm font-semibold text-zinc-400">Lien Billetterie</th>
                  <th className="p-5 text-sm font-semibold text-zinc-400">Statut</th>
                  <th className="p-5 text-sm font-semibold text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-5 font-semibold text-white">
                      {new Date(item.date).toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-5 text-zinc-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        <span>{item.city}</span>
                      </div>
                    </td>
                    <td className="p-5 text-zinc-300 font-medium">{item.venue}</td>
                    <td className="p-5 text-zinc-400 max-w-[200px] truncate">
                      {item.ticket_link ? (
                        <a 
                          href={item.ticket_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline text-xs flex items-center gap-1.5"
                        >
                          <Globe className="w-3.5 h-3.5" /> Voir le lien
                        </a>
                      ) : (
                        <span className="text-zinc-600 italic">Aucun lien</span>
                      )}
                    </td>
                    <td className="p-5">
                      {item.is_sold_out ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Sold Out
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                          title="Modifier le show"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Supprimer le show"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal d'édition/création */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="glass p-8 max-w-md w-full rounded-3xl border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold font-heading mb-6">
              {editingItem ? 'Modifier la Date' : 'Ajouter un Show'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Date du Concert *</label>
                <input 
                  type="date" 
                  required
                  value={dateVal}
                  onChange={(e) => setDateVal(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Ville *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Alger, Paris..."
                  value={cityVal}
                  onChange={(e) => setCityVal(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Salle / Club / Festival *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Crystal Lounge, Zenith..."
                  value={venueVal}
                  onChange={(e) => setVenueVal(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Lien Billetterie (Optionnel)</label>
                <input 
                  type="url" 
                  placeholder="Ex: https://..."
                  value={ticketVal}
                  onChange={(e) => setTicketVal(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Sold Out Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <span className="text-sm font-semibold text-white block">Événement Complet</span>
                  <span className="text-xs text-zinc-500">Cochez cette case si les billets sont épuisés.</span>
                </div>
                <input 
                  type="checkbox"
                  checked={soldOutVal}
                  onChange={(e) => setSoldOutVal(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer rounded bg-black/60 border-white/10"
                />
              </div>

              {/* Actions du formulaire */}
              <div className="flex gap-3 pt-4 border-t border-white/5 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 bg-primary text-black font-bold flex items-center justify-center gap-2"
                >
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
