'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
      toast.success('Mode Simulation: Connexion réussie !');
      router.push('/admin');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Erreur de connexion : Vérifiez votre email et mot de passe.');
      setLoading(false);
    } else {
      toast.success('Connexion réussie !');
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-[#0a0a0a] text-white">
      {/* Effets de fond */}
      <div className="absolute inset-0 bg-black/60 -z-20" />
      <div className="hidden md:block absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen -z-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform">
            <span className="font-heading font-bold text-2xl tracking-wide">
              <span className="text-gradient-gold">Salim</span> BigShow Pro
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Espace Administrateur</h1>
          <p className="text-zinc-400">Connectez-vous pour accéder au back-office.</p>
        </div>

        <div className="glass-dark p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" 
                  placeholder="admin@domaine.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Mot de Passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full py-6 text-lg group">
              {loading ? 'Connexion...' : 'Se connecter'}
              {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
