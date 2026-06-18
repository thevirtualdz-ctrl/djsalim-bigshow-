import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://abzkdosylaejnyevirwt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiemtkb3N5bGFlam55ZXZpcnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MjUwNzAsImV4cCI6MjA5NzMwMTA3MH0.IpBvP2Gs0HhMk4C7TRvXmO-JmGnQ9v4YH3c_V5LMMRQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testSupabase() {
  console.log("=== TESTS SUPABASE ===");

  // 1. Tester l'authentification
  console.log("\\n1. Test Authentification...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'thevirtualdz@gmail.com',
    password: 'SalimBigg31.',
  });

  if (authError) {
    console.error("❌ Erreur Auth:", authError.message);
  } else {
    console.log("✅ Auth réussie pour", authData.user?.email);
  }

  // 2. Tester la table contact_messages
  console.log("\\n2. Test table 'contact_messages'...");
  const { data: messages, error: msgError } = await supabase.from('contact_messages').select('*').limit(1);
  if (msgError) {
    console.error("❌ Erreur contact_messages:", msgError.message);
  } else {
    console.log(`✅ Table contact_messages opérationnelle (${messages.length} messages trouvés)`);
  }

  // 3. Tester la table site_settings
  console.log("\\n3. Test table 'site_settings'...");
  const { data: settings, error: settingsError } = await supabase.from('site_settings').select('*').limit(1);
  if (settingsError) {
    console.error("❌ Erreur site_settings:", settingsError.message);
  } else {
    console.log(`✅ Table site_settings opérationnelle (${settings.length} réglages trouvés)`);
  }

  // 4. Tester la table portfolio
  console.log("\\n4. Test table 'portfolio'...");
  const { data: portfolio, error: portfolioError } = await supabase.from('portfolio').select('*').limit(1);
  if (portfolioError) {
    console.error("❌ Erreur portfolio:", portfolioError.message);
  } else {
    console.log(`✅ Table portfolio opérationnelle (${portfolio.length} événements trouvés)`);
  }

  console.log("\\n=== FIN DES TESTS ===");
}

testSupabase();
