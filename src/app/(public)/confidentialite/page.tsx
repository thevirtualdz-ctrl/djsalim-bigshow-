import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | DJ Salim BigShow Pro',
  description: 'Politique de confidentialité et protection des données personnelles du site DJ Salim BigShow Pro.',
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="section-container max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">
          Politique de <span className="text-gradient-gold">Confidentialité</span>
        </h1>

        <div className="prose prose-lg max-w-none space-y-10">
          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lorsque vous utilisez le formulaire de contact sur notre site, nous collectons les données 
              suivantes : nom, adresse email, numéro de téléphone, type d'événement et message.
              Ces données sont collectées uniquement dans le but de répondre à votre demande de devis 
              et ne sont jamais transmises à des tiers.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont utilisées exclusivement pour :
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Répondre à vos demandes de devis et d'information</li>
              <li>Vous recontacter dans le cadre de votre projet événementiel</li>
              <li>Améliorer la qualité de nos services</li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">3. Conservation des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans 
              à compter de votre dernière interaction avec nous, conformément à la réglementation 
              en vigueur (RGPD).
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">4. Vos droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
              des droits suivants :
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong className="text-foreground">Droit de rectification</strong> : modifier vos données si elles sont inexactes</li>
              <li><strong className="text-foreground">Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong className="text-foreground">Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
              <li><strong className="text-foreground">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@djsalimbigshow.pro" className="text-primary hover:underline">contact@djsalimbigshow.pro</a>
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement 
              (préférence de thème sombre/clair). Aucun cookie de traçage ou publicitaire n'est utilisé. 
              Votre préférence de thème est stockée localement dans votre navigateur (localStorage).
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-bold mb-4">6. Sécurité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
              pour protéger vos données personnelles contre tout accès non autorisé, modification, 
              divulgation ou destruction. Le site utilise le protocole HTTPS pour sécuriser 
              les échanges de données.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
