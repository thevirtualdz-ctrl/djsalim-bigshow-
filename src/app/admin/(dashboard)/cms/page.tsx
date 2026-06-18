'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/types/database';
import { Plus, Trash2, Edit, Upload, Save, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function CMSPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Project> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      category: 'Mariage',
      client_name: '',
      event_date: '',
      image_url: '',
      display_order: projects.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingItem(project);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingItem) return;
    setUploadingImage(true);

    const file = e.target.files[0];
    const supabase = createClient();
    // Unique name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media') // Assurez-vous que le bucket "media" existe et est public
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Erreur lors de l'upload de l'image.");
      setUploadingImage(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    
    setEditingItem({ ...editingItem, image_url: data.publicUrl });
    toast.success("Image téléchargée avec succès !");
    setUploadingImage(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    const supabase = createClient() as any;
    
    // Validation
    if (!editingItem.title || !editingItem.image_url) {
      toast.error("Le titre et l'image sont obligatoires.");
      return;
    }

    if (editingItem.id) {
      const { error } = await supabase.from('projects').update(editingItem).eq('id', editingItem.id);
      if (!error) {
        setIsModalOpen(false);
        toast.success("Projet modifié avec succès !");
      } else toast.error("Erreur de modification");
    } else {
      const { error } = await supabase.from('projects').insert([editingItem]);
      if (!error) {
        setIsModalOpen(false);
        toast.success("Projet ajouté au portfolio !");
      } else toast.error("Erreur lors de l'ajout");
    }
    fetchProjects();
  };

  const handleDelete = (id: string) => {
    toast("Supprimer ce projet du portfolio définitivement ?", {
      action: {
        label: "Supprimer",
        onClick: async () => {
          const supabase = createClient();
          const { error } = await supabase.from('projects').delete().eq('id', id);
          if (!error) {
            toast.success("Projet supprimé.");
            setProjects((prev) => prev.filter(p => p.id !== id));
          } else {
            toast.error("Erreur de suppression.");
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
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">CMS Vitrine (Portfolio)</h1>
          <p className="text-zinc-400">Gérez les projets, photos et événements affichés dans votre galerie.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2 bg-primary text-black">
          <Plus className="w-4 h-4" /> Ajouter un Projet
        </Button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-400 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p>Chargement des projets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300 min-w-[800px]">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-zinc-400">
                <tr>
                  <th className="px-6 py-4 w-20">Ordre</th>
                  <th className="px-6 py-4 w-24">Image</th>
                  <th className="px-6 py-4">Titre & Détails</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucun projet dans le portfolio.</td>
                  </tr>
                ) : projects.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-500">{item.display_order}</td>
                    <td className="px-6 py-4">
                      {item.image_url ? (
                        <div className="w-16 h-12 relative rounded overflow-hidden border border-white/10">
                          <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-zinc-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-xs text-zinc-500 flex gap-2">
                        {item.client_name && <span>{item.client_name}</span>}
                        {item.client_name && item.event_date && <span>•</span>}
                        {item.event_date && <span>{item.event_date}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-xs font-medium border border-white/10">
                        {item.category || 'Non classé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-2xl relative animate-in fade-in zoom-in-95 my-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-6 font-heading text-white">{editingItem.id ? 'Modifier' : 'Ajouter'} un Projet</h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Upload d'image */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">Image du projet *</label>
                <div className="flex items-start gap-6">
                  {editingItem.image_url ? (
                    <div className="w-32 h-32 relative rounded-xl overflow-hidden border border-white/10 shrink-0 group">
                      <Image src={editingItem.image_url} alt="Aperçu" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer text-white flex flex-col items-center">
                          <Upload className="w-5 h-5 mb-1" />
                          <span className="text-xs font-bold">Changer</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-colors shrink-0">
                      {uploadingImage ? (
                        <div className="w-6 h-6 border-2 border-primary/50 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-zinc-500 mb-2" />
                          <span className="text-xs text-zinc-400 font-medium text-center px-2">Ajouter une image</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-zinc-400 mb-2">L'image sera recadrée automatiquement dans la galerie. Privilégiez des images de haute qualité (JPG/PNG).</p>
                    <input 
                      type="url" 
                      value={editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({...editingItem, image_url: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="Ou collez une URL d'image existante..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Titre du Projet *</label>
                  <input 
                    required
                    type="text" 
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Soirée de Gala..."
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Catégorie *</label>
                  <select 
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Mariage">Mariage</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Clubbing">Clubbing</option>
                    <option value="Festival">Festival</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Client / Lieu</label>
                  <input 
                    type="text" 
                    value={editingItem.client_name || ''}
                    onChange={(e) => setEditingItem({...editingItem, client_name: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: L'Oréal, Paris"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Date de l'événement</label>
                  <input 
                    type="text" 
                    value={editingItem.event_date || ''}
                    onChange={(e) => setEditingItem({...editingItem, event_date: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ex: Septembre 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Description</label>
                <textarea 
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[100px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="Détails supplémentaires..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Ordre d'affichage</label>
                <input 
                  type="number" 
                  value={editingItem.display_order ?? 0}
                  onChange={(e) => setEditingItem({...editingItem, display_order: parseInt(e.target.value) || 0})}
                  className="w-full sm:w-1/3 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-white/5">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  disabled={uploadingImage}
                  className="px-8 bg-primary text-black font-bold flex justify-center items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
