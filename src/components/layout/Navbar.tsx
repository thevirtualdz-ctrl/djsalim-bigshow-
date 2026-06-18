'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { PUBLIC_NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { StickyAudioPlayer } from '@/components/StickyAudioPlayer';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-white/10 shadow-sm py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo Textuel Premium */}
        <Link href="/" className="relative z-50 flex items-center gap-2">
          <span className="font-heading font-bold text-xl md:text-2xl tracking-wide">
            <span className="text-gradient-gold">Salim</span> BigShow Pro
          </span>
        </Link>

        {/* Right Controls Container */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 relative">
            <ul className="flex items-center gap-6">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary relative group py-2 ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button asChild variant="default" className="rounded-full">
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full glass-dark border-t border-border/50 shadow-2xl py-6 px-4 md:hidden flex flex-col gap-4"
            >
              <ul className="flex flex-col gap-2">
                {PUBLIC_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block p-3 rounded-lg text-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Button asChild className="w-full mt-4" size="lg">
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
