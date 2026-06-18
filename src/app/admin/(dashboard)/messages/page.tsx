'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, Users, MapPin, Eye, Trash2, CheckCircle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { ContactMessage } from '@/types/database';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error("Erreur lors du chargement des messages.");
    } else if (data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setGeneratedReply(null);

    // Marquer comme lu
    if (!msg.is_read) {
      const supabase = createClient() as any;
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
      setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
    }
  };

  const handleDeleteMessage = (id: string) => {
    toast("Supprimer définitivement ce message ?", {
      action: {
        label: "Supprimer",
        onClick: async () => {
          const supabase = createClient() as any;
          const { error } = await supabase.from('contact_messages').delete().eq('id', id);
          
          if (error) {
            toast.error("Erreur de suppression.");
          } else {
            toast.success("Message supprimé.");
            setMessages((prev) => prev.filter((m) => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
          }
        }
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };

  const handleBlockEmail = (email: string) => {
    toast(`Bloquer définitivement ${email} ?\n(Cela ne supprime pas les messages existants)`, {
      action: {
        label: "Bloquer",
        onClick: async () => {
          const supabase = createClient() as any;
          const { error } = await supabase.from('blocked_emails').insert([{ email: email.toLowerCase(), reason: 'Blocked from Admin UI' }]);
          
          if (error) {
            if (error.code === '23505') {
              toast.info("Cet e-mail est déjà bloqué.");
            } else {
              toast.error("Erreur lors du blocage de l'e-mail.");
            }
          } else {
            toast.success(`L'e-mail ${email} a été ajouté à la liste noire.`);
          }
        }
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };

  const generateAIReply = async () => {
    if (!selectedMessage) return;
    setIsGenerating(true);
    setGeneratedReply(null);
    try {
      const res = await fetch('/api/admin/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: selectedMessage.name,
          eventType: selectedMessage.event_type,
          message: selectedMessage.message,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setGeneratedReply(data.reply);
      } else {
        toast.error("L'IA n'a pas pu générer de réponse.");
      }
    } catch (err) {
      toast.error("Erreur réseau lors de la génération.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Messages & Devis</h1>
          <p className="text-zinc-400">Gérez les demandes de contact de vos clients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Liste des messages */}
        <div className="xl:col-span-2 glass rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[700px]">
          {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-3">
               <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
               <p>Chargement des messages...</p>
             </div>
          ) : messages.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-12 text-center">
               <Mail className="w-12 h-12 mb-4 opacity-30" />
               <p>Aucun message pour le moment.</p>
             </div>
          ) : (
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 z-10">
                  <tr>
                    <th className="p-4 text-sm font-medium text-zinc-400">Client</th>
                    <th className="p-4 text-sm font-medium text-zinc-400">Événement</th>
                    <th className="p-4 text-sm font-medium text-zinc-400">Date</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr 
                      key={msg.id} 
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${selectedMessage?.id === msg.id ? 'bg-primary/5' : ''}`}
                      onClick={() => handleSelectMessage(msg)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${!msg.is_read ? 'bg-primary shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-transparent'}`} />
                          <div className="min-w-0">
                            <p className={`font-medium truncate ${!msg.is_read ? 'text-white' : 'text-zinc-300'}`}>{msg.name}</p>
                            <p className="text-xs text-zinc-500 truncate">{msg.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${!msg.is_read ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-zinc-400 border-white/10'}`}>
                          {msg.event_type || 'Contact'}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 text-sm whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteMessage(msg.id); }}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Supprimer"
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

        {/* Détail du message sélectionné */}
        <div className="xl:col-span-1">
          {selectedMessage ? (
            <div className="glass p-6 rounded-3xl border border-white/5 sticky top-8 animate-in fade-in slide-in-from-right-4">
              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedMessage.name}</h3>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline text-sm flex items-center gap-2">
                      <Mail className="w-3 h-3" /> {selectedMessage.email}
                    </a>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {selectedMessage.event_type || 'Général'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {selectedMessage.phone && (
                  <div className="flex items-center gap-3 text-zinc-300 text-sm">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      📞
                    </span>
                    <span>Tél : <strong className="text-white">{selectedMessage.phone}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                  </span>
                  <span>Date prévue : <strong className="text-white">{selectedMessage.event_date || 'Non précisée'}</strong></span>
                </div>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 mb-8 relative">
                <div className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-xs font-bold uppercase tracking-wider text-primary">Message du client</div>
                <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">
                  "{selectedMessage.message}"
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={generateAIReply}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-amber-600 text-black border-none shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    "✨ Générer une réponse avec l'IA"
                  )}
                </Button>

                {generatedReply && (
                  <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-primary font-bold uppercase tracking-wider">Brouillon IA :</label>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(generatedReply);
                          toast.success("Réponse copiée !");
                        }}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Copier
                      </button>
                    </div>
                    <textarea 
                      className="w-full h-48 bg-black/50 border border-primary/30 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary/50 resize-none"
                      defaultValue={generatedReply}
                    />
                  </div>
                )}

                <div className="flex gap-3 w-full">
                  <a href={`mailto:${selectedMessage.email}`} className="flex-1">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2 border-white/10 hover:bg-white/5 hover:text-white">
                      <Mail className="w-4 h-4" /> Répondre par Email
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    onClick={() => handleBlockEmail(selectedMessage.email)}
                    className="flex-none px-4 flex justify-center items-center gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50"
                    title="Bloquer cet expéditeur"
                  >
                    <Ban className="w-4 h-4" /> Bloquer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass h-[700px] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center text-zinc-500 p-8">
              <Mail className="w-16 h-16 mb-6 opacity-20 text-white" />
              <p className="text-lg font-medium text-zinc-400 mb-2">Aucun message sélectionné</p>
              <p className="text-sm max-w-[200px] mx-auto">Cliquez sur un message dans la liste pour voir les détails et y répondre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
