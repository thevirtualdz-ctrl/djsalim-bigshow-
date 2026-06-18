import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SettingsProvider } from '@/components/providers/SettingsProvider';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import './globals.css';

// ============================================================
// Polices Google
// ============================================================

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

// ============================================================
// Métadonnées SEO globales
// ============================================================

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: 'DJ professionnel en Algérie (Alger et déplacements). Spécialiste de l\'animation de mariages, soirées, et événements privés. Sonorisation et ambiance inoubliable avec DJ Salim BigShow.',
  keywords: [
    'dj',
    'dj alger',
    'dj salim bigshow',
    'dj mariage algerie',
    'dj algerie',
    'animation musicale alger',
    'dj professionnel',
    'soirée alger',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE_CONFIG.language}
      className={`${inter.variable} ${outfit.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <SettingsProvider>
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </SettingsProvider>
        </ThemeProvider>
        
        {/* Données structurées pour le SEO Local (Google) */}
        <Script id="schema-local-business" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "DJ Salim BigShow Pro",
              "image": "${process.env.NEXT_PUBLIC_SITE_URL || 'https://djsalim-bigshow.vercel.app'}/og-image.jpg",
              "description": "DJ professionnel en Algérie (Alger et déplacements). Spécialiste de l'animation de mariages, soirées, et événements privés.",
              "url": "${process.env.NEXT_PUBLIC_SITE_URL || 'https://djsalim-bigshow.vercel.app'}",
              "telephone": "06 00 00 00 00",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Alger",
                "addressCountry": "DZ"
              },
              "priceRange": "$$",
              "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 09:00-20:00"
            }
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
