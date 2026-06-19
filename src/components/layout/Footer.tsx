import Link from 'next/link';
import { SITE_CONFIG, FOOTER_NAV_ITEMS } from '@/lib/constants';
import { Music2, Mail, Phone, MapPin, Globe, Video, Camera } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/10 pt-16 pb-24">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="font-heading font-bold text-2xl">
              <span className="text-gradient-gold">Salim</span> BigShow
            </h3>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" aria-label="Instagram">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" aria-label="Facebook">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" aria-label="YouTube">
                <Video className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" aria-label="SoundCloud">
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Légal</h4>
            <ul className="space-y-3">
              <li><Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors text-sm">Mentions Légales</Link></li>
              <li><Link href="/cgv" className="text-muted-foreground hover:text-primary transition-colors text-sm">CGV</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Alger, Algérie<br/>Déplacement dans toute l'Algérie</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+213600000000" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +213 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@djsalimbigshow.pro" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  contact@djsalimbigshow.pro
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Mentions Légales
            </Link>
            <Link href="/cgv" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
