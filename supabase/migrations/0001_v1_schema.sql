-- ============================================================
-- CyberAcademy V1 — Schéma de base de données
-- Périmètre : boucle d'apprentissage (auth → profil → roadmap
-- → cours → exercices → quiz → labs → XP → recommandations IA)
--
-- HORS PÉRIMÈTRE V1 (non créés) : paiements, subscriptions,
-- marketplace, réseaux sociaux, plateforme CTF complète.
-- ============================================================

create extension if not exists pgcrypto;
-- pgvector : prévu pour l'architecture RAG des assistants IA (V1 §19)
create extension if not exists vector;

-- ------------------------------------------------------------
-- PROFIL
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  avatar_url text,
  goal text default 'Junior Pentester',
  level int not null default 0,
  xp int not null default 0,
  streak int not null default 0,
  assessment_done boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- CONTENU PÉDAGOGIQUE (référentiel — en V1 le contenu vit aussi
-- dans le code TS, ces tables sont prêtes pour la migration)
-- ------------------------------------------------------------
create table public.levels (
  id int primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  xp int not null default 0
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text not null,
  description text
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  level_id int references public.levels (id) on delete cascade,
  slug text unique not null,
  title text not null,
  duration int,
  xp int not null default 0,
  order_index int not null default 0
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete cascade,
  title text not null,
  type text not null check (type in ('theory', 'example', 'exercise', 'quiz')),
  content jsonb not null default '[]'::jsonb,
  order_index int not null default 0,
  xp int not null default 0
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons (id) on delete cascade,
  prompt text not null,
  expected text,
  order_index int not null default 0
);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  level_id int references public.levels (id) on delete cascade,
  slug text unique not null,
  title text not null,
  pass_threshold int not null default 80
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references public.quizzes (id) on delete cascade,
  question text not null,
  type text not null default 'multiple' check (type in ('multiple', 'true_false', 'short')),
  options jsonb not null default '[]'::jsonb,
  answer text not null,
  skill text,
  order_index int not null default 0
);

create table public.labs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  level_id int references public.levels (id) on delete cascade,
  title text not null,
  description text,
  category text not null check (category in ('linux', 'networking', 'web')),
  difficulty text not null default 'facile' check (difficulty in ('facile', 'intermédiaire', 'avancé')),
  duration text,
  objectives jsonb not null default '[]'::jsonb,
  skills text[] not null default '{}',
  steps jsonb not null default '[]'::jsonb,
  flag text,
  xp int not null default 0,
  success_rate numeric(5,2)
);

create table public.lab_hints (
  id uuid primary key default gen_random_uuid(),
  lab_id uuid references public.labs (id) on delete cascade,
  level int not null check (level between 1 and 4),
  content text not null,
  is_solution boolean not null default false
);

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  description text,
  icon text,
  criteria text
);

-- ------------------------------------------------------------
-- ÉTAT UTILISATEUR
-- ------------------------------------------------------------
create table public.user_progress (
  user_id uuid references auth.users (id) on delete cascade,
  level_id int references public.levels (id) on delete cascade,
  status text not null default 'in_progress' check (status in ('locked', 'in_progress', 'completed')),
  progress_pct int not null default 0,
  completed_at timestamptz,
  primary key (user_id, level_id)
);

create table public.user_skills (
  user_id uuid references auth.users (id) on delete cascade,
  skill_id uuid references public.skills (id) on delete cascade,
  mastery int not null default 0 check (mastery between 0 and 100),
  primary key (user_id, skill_id)
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  quiz_id uuid references public.quizzes (id) on delete cascade,
  score int not null default 0,
  max_score int not null default 0,
  passed boolean not null default false,
  attempted_at timestamptz not null default now()
);

create table public.lab_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  lab_id uuid references public.labs (id) on delete cascade,
  status text not null default 'started' check (status in ('started', 'completed', 'failed')),
  time_spent_sec int not null default 0,
  attempts int not null default 0,
  hints_used int not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  amount int not null,
  label text not null,
  type text not null check (type in ('course', 'exercise', 'quiz', 'lab', 'badge', 'streak', 'assessment')),
  created_at timestamptz not null default now()
);

create table public.user_badges (
  user_id uuid references auth.users (id) on delete cascade,
  badge_id uuid references public.badges (id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table public.initial_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  score_by_domain jsonb not null default '{}'::jsonb,
  recommended_level int not null default 0,
  completed_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- IA (Mentor / Coach / Lab Assistant)
-- ------------------------------------------------------------
create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  title text,
  mode text not null default 'mentor' check (mode in ('mentor', 'lab', 'coach')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.ai_conversations (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table public.ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  type text not null check (type in ('lesson', 'lab', 'review', 'quiz')),
  title text not null,
  description text,
  reason text,
  dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- TRIGGER : création automatique du profil à l'inscription
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- RLS — activation + politiques
-- ------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.skills enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.exercises enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.labs enable row level security;
alter table public.lab_hints enable row level security;
alter table public.badges enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_skills enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.lab_attempts enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.user_badges enable row level security;
alter table public.initial_assessments enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.ai_recommendations enable row level security;

-- Contenu pédagogique : lecture pour les utilisateurs connectés
create policy "Content read for authenticated" on public.levels
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.skills
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.courses
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.lessons
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.exercises
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.quizzes
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.quiz_questions
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.labs
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.lab_hints
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.badges
  for select to authenticated using (true);

-- Données utilisateur : chaque utilisateur accède à ses propres lignes
create policy "Own profile" on public.profiles
  for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Own progress" on public.user_progress
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own skills" on public.user_skills
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own quiz attempts" on public.quiz_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own lab attempts" on public.lab_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own xp" on public.xp_transactions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own badges" on public.user_badges
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own assessments" on public.initial_assessments
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own conversations" on public.ai_conversations
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own messages" on public.ai_messages
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own recommendations" on public.ai_recommendations
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- SEED — niveaux V1 (5 niveaux)
-- ------------------------------------------------------------
insert into public.levels (id, slug, title, subtitle, description, xp) values
  (0, 'computer-fundamentals', 'Computer Fundamentals', 'Fondamentaux informatiques', 'Bases du fonctionnement d''un ordinateur : matériel, OS, fichiers.', 250),
  (1, 'linux-fundamentals', 'Linux Fundamentals', 'Maîtriser la ligne de commande', 'Terminal, fichiers, permissions, utilisateurs, processus, Bash basique.', 400),
  (2, 'networking-fundamentals', 'Networking Fundamentals', 'Protocoles et architecture réseau', 'IP, ports, DNS, TCP/UDP, HTTP.', 450),
  (3, 'web-fundamentals', 'Web Fundamentals', 'Comment fonctionne le web', 'Requêtes HTTP, headers, cookies, paramètres.', 400),
  (4, 'web-security', 'Introduction to Web Security', 'Premières failles web', 'OWASP Top 10, injections, XSS, sessions.', 500)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- SEED — badges V1 (6 badges)
-- ------------------------------------------------------------
insert into public.badges (key, name, description, icon, criteria) values
  ('first-quiz', 'First Quiz', 'Terminer votre premier quiz', '✅', 'Terminer un quiz'),
  ('first-lab', 'First Lab', 'Valider votre premier lab', '🛡️', 'Valider un lab'),
  ('linux-beginner', 'Linux Beginner', 'Valider le niveau Linux', '🐧', 'Valider le niveau 1'),
  ('network-explorer', 'Network Explorer', 'Valider le niveau Réseau', '🌐', 'Valider le niveau 2'),
  ('http-apprentice', 'HTTP Apprentice', 'Comprendre les fondamentaux du web', '🕸️', 'Valider le niveau 3'),
  ('streak-7', '7 Day Streak', 'Apprendre 7 jours d''affilée', '🔥', 'Série de 7 jours')
on conflict (key) do nothing;

-- ------------------------------------------------------------
-- SEED — compétences de référence
-- ------------------------------------------------------------
insert into public.skills (name, category, description) values
  ('Terminal Linux', 'linux', 'Naviguer et manipuler via la ligne de commande'),
  ('Permissions', 'linux', 'Comprendre chmod, chown et les bits spéciaux'),
  ('find & grep', 'linux', 'Rechercher des fichiers et filtrer du texte'),
  ('TCP/IP', 'networking', 'Comprendre le modèle TCP/IP et le handshake'),
  ('DNS', 'networking', 'Comprendre la résolution de noms'),
  ('HTTP', 'web', 'Comprendre les requêtes et réponses HTTP'),
  ('SQL Injection', 'web', 'Détecter et exploiter les injections SQL')
on conflict (name) do nothing;
