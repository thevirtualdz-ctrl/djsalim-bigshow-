import { Metadata } from 'next';
import { Disc, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Écouter mes sons | DJ Salim BigShow Pro',
  description: 'Découvrez les mixes, playlists et sets live de DJ Salim BigShow Pro sur SoundCloud et Spotify.',
};

export default function MusiquePage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full glass border border-primary/30 mb-6 animate-pulse-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Disc className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-spin-slow" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Écouter <span className="text-gradient-gold">Mes Sons</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Plongez dans mon univers musical. De mes mixes exclusifs sur SoundCloud à mes playlists de référence sur Spotify.
          </p>
        </div>

        <div className="space-y-12">
          {/* Spotify Section */}
          <section className="glass p-1 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black/60">
            <div className="p-6 sm:p-8 flex items-center gap-4 border-b border-white/5 bg-black/40">
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.06 10.56 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.261 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Playlists Live</h2>
                <p className="text-zinc-400">Spotify</p>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <iframe
                style={{ borderRadius: '16px' }}
                src="https://open.spotify.com/embed/playlist/7sZbq8QGyMnhKPcLJvCUFD?utm_source=generator&theme=0"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
              />
            </div>
          </section>

          {/* SoundCloud Section */}
          <section className="glass p-1 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black/60">
            <div className="p-6 sm:p-8 flex items-center gap-4 border-b border-white/5 bg-black/40">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mixes Exclusifs</h2>
                <p className="text-zinc-400">SoundCloud</p>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay; encrypted-media"
                src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fdj-snake&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
                title="SoundCloud Player"
                className="rounded-2xl"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
