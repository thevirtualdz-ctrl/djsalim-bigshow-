'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquareQuote, Mail, LogOut, Menu, X, Calendar, MapPin, Database } from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Messages & Devis', href: '/admin/messages', icon: Mail },
  { label: 'Réservations', href: '/admin/reservations', icon: Calendar },
  { label: 'Dates de Tournée', href: '/admin/tour-dates', icon: MapPin },
  { label: 'Témoignages', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Services', href: '/admin/services', icon: Database },
  { label: 'CMS Vitrine', href: '/admin/cms', icon: LayoutDashboard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside className="w-64 border-r border-white/10 bg-black/50 glass-dark flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <span className="font-heading font-bold text-xl tracking-wide">
              <span className="text-gradient-gold">Salim</span> Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 border-r border-white/10 bg-[#0a0a0a] z-50 flex flex-col transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <span className="font-heading font-bold text-xl tracking-wide">
            <span className="text-gradient-gold">Salim</span> Admin
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header Admin */}
        <header className="h-20 border-b border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium text-zinc-300">
              {ADMIN_NAV.find(item => item.href === pathname)?.label || 'Espace Admin'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
              S
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
