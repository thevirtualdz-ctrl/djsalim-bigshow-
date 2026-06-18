import { Mail, MessageSquareQuote, MousePointerClick, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Demandes de devis', value: '12', change: '+2 ce mois', icon: Mail },
  { label: 'Avis en attente', value: '3', change: 'À modérer', icon: MessageSquareQuote },
  { label: 'Visites du site', value: '1,204', change: '+15% ce mois', icon: MousePointerClick },
  { label: 'Taux de conversion', value: '3.4%', change: '+0.5%', icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Bienvenue, <span className="text-gradient-gold">Salim</span></h1>
        <p className="text-zinc-400">Voici un aperçu de l'activité de votre site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center border border-white/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                  <span className="text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-1 rounded-md">{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activité Récente (Mock) */}
      <div className="glass p-8 rounded-3xl border border-white/5 mt-8">
        <h2 className="text-xl font-bold mb-6">Activité Récente</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium">Nouvelle demande de devis : <span className="text-primary">Mariage (200 pers)</span></p>
              <p className="text-sm text-zinc-500">Il y a 2 heures par Jean Dupont</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium">Nouveau témoignage en attente de validation</p>
              <p className="text-sm text-zinc-500">Il y a 1 jour par Sophie & Julien</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
