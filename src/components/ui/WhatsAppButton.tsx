'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  // Numéro WhatsApp (avec code pays, sans le 0)
  const phoneNumber = '213600000000';
  const message = "Bonjour Salim, je vous contacte depuis votre site web pour des informations concernant vos prestations.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      {/* Tooltip visible au survol (sur desktop) */}
      <span className="absolute left-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap border border-white/10 pointer-events-none">
        Discutons sur WhatsApp !
      </span>
    </a>
  );
}
