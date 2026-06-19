'use client';

import { motion } from 'framer-motion';

const brands = [
  "Hôtels 5★ Alger",
  "Salles des fêtes VIP",
  "Mariages haut de gamme",
  "Soirées corporate",
  "Événements privés",
];

export function TrustedBy() {
  return (
    <section className="py-6 md:py-12 border-b border-border/50 bg-background/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Là où je mets l'ambiance
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-lg md:text-xl font-heading font-bold text-foreground"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
