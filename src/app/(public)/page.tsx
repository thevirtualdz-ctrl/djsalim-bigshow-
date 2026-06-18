import HomeContent from './HomeContent';

// Force le rendu dynamique (évite le pré-rendu statique qui échoue avec ThemeProvider)
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <HomeContent />;
}
