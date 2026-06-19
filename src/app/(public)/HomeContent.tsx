'use client';

import { HeroMixer } from '@/components/sections/HeroMixer';
import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';
import { TourSection } from '@/components/sections/TourSection';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function HomeContent() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <PortfolioGallery />
      <AboutPreview />
      <ServicesPreview />
      <TestimonialsCarousel />
      <TourSection />
      <ContactCTA />
    </main>
  );
}


