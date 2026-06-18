'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Service } from '@/types/database';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Service> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error("Erreur lors du chargement des services");
    } else if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      icon: 'Star', // Icone par défaut
      is_featured: false,
      price: '',
      display_order: services.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingItem(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast("Voulez-vous vraiment supprimer cette prestation ?", {
      action: {
        label: "Supprimer",
        onClick: async () => {
          const supabase = createClient();
          const { error } = await supabase.from('services').delete().eq('id', id);
          
          if (error) {
            toast.error("Erreur lors de la suppression");
          } else {
            toast.success("Prestation supprimée");
            setServices((prev) => prev.filter(s => s.id !== id));
          }
        }
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };

  const handleToggleFeatured = async (service: Service) => {
    const supabase = createClient() as any;
    const { error } = await supabase
      .from('services')
      .update({ is_featured: !service.is_featured })
      .eq('id', service.id);
      
    if (error) {
      toast.error("Erreur lors de la modification");
    } else {
      toast.success(service.is_featured ? "Retiré de l'accueil" : "Ajouté à l'accueil");
      setServices(services.map(s => s.id === service.id ? { ...s, is_featured: !s.is_featured } : s));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSubmitting(true);
    const supabase = createClient() as any;

    if (editingItem.id) {
      // Update
      const { error } = await supabase
        .from('services')
        .update(editingItem)
        .eq('id', editingItem.id);
        
      if (error) {
        toast.error("Erreur lors de la mise à jour");
      } else {
        toast.success("Service mis à jour");
        setIsModalOpen(false);
        fetchServices();
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('services')
        .insert([editingItem]);
        
      if (error) {
        toast.error("Erreur lors de la création");
      } else {
        toast.success("Service créé avec succès");
        setIsModalOpen(false);
        fetchServices();
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Prestations & Services</h1>
          <p className="text-zinc-400">Gérez les services que vous proposez et choisissez lesquels afficher sur la page d'accueil.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2 bg-primary text-black">
          <Plus className="w-4 h-4" /> Ajouter un Service
        </Button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p>Chargement des services...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300 min-w-[700px]">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Ordre</th>
                  <th className="px-6 py-4">Nom du Service</th>
                  <th className="px-6 py-4">Icône</th>
                  <th className="px-6 py-4">Prix (Optionnel)</th>
                  <th className="px-6 py-4 text-center">Affiché sur l'Accueil</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">Aucun service défini.</td>
                  </tr>
                ) : services.map((service) => (
                  <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-500">{service.display_order}</td>
                    <td className="px-6 py-4 font-bold text-white">
                      {service.title}
                      <p className="font-normal text-xs text-zinc-500 line-clamp-1 max-w-[200px] mt-1">{service.description}</p>
                    </td>
                    <td className="px-6 py-4 text-primary font-mono text-xs">{service.icon}</td>
                    <td className="px-6 py-4">{service.price || <span className="text-zinc-600 italic">Non spécifié</span>}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleToggleFeatured(service)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          service.is_featured 
                            ? 'bg-primary/20 text-primary border border-primary/30 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30' 
                            : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30'
                        }`}
                        title={service.is_featured ? "Retirer de l'accueil" : "Mettre en avant sur l'accueil"}
                      >
                        <Star className={`w-3 h-3 ${service.is_featured ? 'fill-primary' : ''}`} />
                        {service.is_featured ? 'OUI' : 'NON'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(service)}
                        className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold mb-6 font-heading text-white">{editingItem.id ? 'Modifier' : 'Ajouter'} un Service</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Titre du Service *</label>
                <input 
                  required
                  type="text" 
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: DJ Show & Animation"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Description *</label>
                <textarea 
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[100px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="Détaillez la prestation..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Icône (Lucide)</label>
                  <input 
                    type="text" 
                    value={editingItem.icon || ''}
                    onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Music, Speaker, Zap..."
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Noms valides de <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-primary hover:underline">lucide-react</a>.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Tarif indicatif</label>
                  <input 
                    type="text" 
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Sur devis, Dès 500€..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Ordre d'affichage</label>
                  <input 
                    type="number" 
                    value={editingItem.display_order ?? 0}
                    onChange={(e) => setEditingItem({...editingItem, display_order: parseInt(e.target.value) || 0})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="flex flex-col justify-end pb-1">
                  <label className="flex items-center gap-3 p-3 border border-white/10 rounded-xl bg-black/40 cursor-pointer hover:border-primary/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={editingItem.is_featured || false}
                      onChange={(e) => setEditingItem({...editingItem, is_featured: e.target.checked})}
                      className="w-5 h-5 accent-primary bg-black"
                    />
                    <span className="text-sm font-medium text-white">Afficher sur l'accueil</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-white/5">
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
                  className="flex-1 bg-primary text-black font-bold flex justify-center items-center"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
