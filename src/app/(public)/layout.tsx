import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyAudioPlayer } from '@/components/StickyAudioPlayer';
import { SettingsProvider } from '@/components/providers/SettingsProvider';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettingsProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyAudioPlayer />
      </div>
    </SettingsProvider>
  );
}
