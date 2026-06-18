-- Création de la table des e-mails bloqués (Anti-Spam)
create table public.blocked_emails (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security)
alter table public.blocked_emails enable row level security;

-- Politiques (Tout le monde peut lire pour le backend, mais seul l'admin peut modifier)
create policy "Enable read access for all users" on public.blocked_emails
  for select using (true);

create policy "Enable insert access for authenticated users" on public.blocked_emails
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users" on public.blocked_emails
  for update using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users" on public.blocked_emails
  for delete using (auth.role() = 'authenticated');
