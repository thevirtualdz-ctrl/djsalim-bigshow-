import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const imagesByCategory = {
  'Mariages': [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8892b07439?w=800&q=80'
  ],
  'Corporate': [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e325?w=800&q=80',
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80'
  ],
  'Festivals': [
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c092bb4ace4?w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
  ],
  'Clubs': [
    'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    'https://images.unsplash.com/photo-1558317751-bc3ed6f85f72?w=800&q=80'
  ]
};

async function updatePortfolio() {
  const { data: projects, error: fetchError } = await supabase.from('projects').select('*');
  
  if (fetchError) {
    console.error('Error fetching projects:', fetchError);
    return;
  }
  
  if (!projects || projects.length === 0) {
    console.log('No projects found in database. Seed needed?');
    // Si aucun projet, on va en créer quelques-uns pour le palmarès
    const sampleProjects = [
      { title: "Mariage au Château", category: "Mariages", description: "Une soirée inoubliable", image_url: imagesByCategory['Mariages'][0] },
      { title: "Gala d'Entreprise", category: "Corporate", description: "Soirée de fin d'année", image_url: imagesByCategory['Corporate'][0] },
      { title: "Festival Electro", category: "Festivals", description: "Main stage set", image_url: imagesByCategory['Festivals'][0] },
      { title: "Soirée Club VIP", category: "Clubs", description: "Mix urbain et house", image_url: imagesByCategory['Clubs'][0] },
      { title: "Mariage Domaine de l'Or", category: "Mariages", description: "Mariage oriental et moderne", image_url: imagesByCategory['Mariages'][1] },
      { title: "Lancement de Produit", category: "Corporate", description: "Ambiance lounge", image_url: imagesByCategory['Corporate'][1] },
    ];
    for (const p of sampleProjects) {
       await supabase.from('projects').insert(p);
    }
    console.log('Inserted sample projects with optimized images.');
    return;
  }

  let catCounts = { 'Mariages': 0, 'Corporate': 0, 'Festivals': 0, 'Clubs': 0 };

  for (const project of projects) {
    const cat = project.category;
    if (imagesByCategory[cat]) {
      const imgIndex = catCounts[cat] % imagesByCategory[cat].length;
      const newImageUrl = imagesByCategory[cat][imgIndex];
      catCounts[cat]++;
      
      const { error: updateError } = await supabase
        .from('projects')
        .update({ image_url: newImageUrl })
        .eq('id', project.id);
        
      if (updateError) {
        console.error(`Error updating project ${project.id}:`, updateError);
      } else {
        console.log(`Updated project ${project.title} (${cat}) with new image.`);
      }
    }
  }
  console.log('Portfolio update complete!');
}

updatePortfolio();
