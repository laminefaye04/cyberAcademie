-- ============================================================
-- CyberAcademy V1 — Hybrid Lab System
-- Unification des activités pédagogiques (spec §24 à §28)
-- type : course / exercise / quiz / native_lab / external_lab
-- Progression : started → completed → verified (spec §25)
-- Anti-cheat : l'XP d'un external lab n'est octroyé qu'après
-- vérification (mini-quiz), jamais sur un simple clic (§26).
-- ============================================================

-- Correction du seed 0001 : niveau 3 = Python / Bash (décision produit)
update public.levels
   set slug = 'python-bash',
       title = 'Python / Bash pour la cybersécurité',
       subtitle = 'Automatiser la reconnaissance'
 where id = 3;

-- ------------------------------------------------------------
-- CATALOGUE UNIFIÉ
-- ------------------------------------------------------------
create table public.learning_activities (
  id uuid primary key default gen_random_uuid(),
  level_id int references public.levels (id) on delete cascade,
  type text not null check (type in ('course', 'exercise', 'quiz', 'native_lab', 'external_lab')),
  slug text unique not null,
  title text not null,
  description text,
  difficulty text not null default 'facile' check (difficulty in ('facile', 'intermédiaire', 'avancé')),
  estimated_duration int,
  xp_reward int not null default 0,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- NATIVE LABS — spécificités (spec §5, §6, §7, §8, §9)
-- ------------------------------------------------------------
create table public.native_labs (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid unique references public.learning_activities (id) on delete cascade,
  environment_type text not null default 'terminal' check (environment_type in ('terminal', 'web_app', 'docker')),
  validation_method text not null default 'flag' check (validation_method in ('flag', 'command', 'http_response', 'state')),
  safety_level text not null default 'isolated' check (safety_level in ('isolated', 'simulated')),
  container_config jsonb not null default '{}'::jsonb,
  reset_strategy text not null default 'on_demand',
  scenario text,
  instructions jsonb not null default '[]'::jsonb,
  hints jsonb not null default '[]'::jsonb,
  solution text,
  machine jsonb not null default '{}'::jsonb,
  tools text[] not null default '{}'
);

-- ------------------------------------------------------------
-- EXTERNAL LABS — références (spec §12, §13, §29)
-- Aucun contenu propriétaire stocké : uniquement un lien et des
-- métadonnées. active = false → plus recommandé automatiquement.
-- ------------------------------------------------------------
create table public.external_labs (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid unique references public.learning_activities (id) on delete cascade,
  platform text not null check (platform in ('TryHackMe', 'Hack The Box', 'Root-Me', 'PortSwigger')),
  external_url text not null,
  external_id text,
  last_verified_at timestamptz,
  active boolean not null default true
);

-- ------------------------------------------------------------
-- ÉTAT UTILISATEUR PAR ACTIVITÉ (spec §25)
-- ------------------------------------------------------------
create table public.learning_activity_states (
  user_id uuid references auth.users (id) on delete cascade,
  activity_id uuid references public.learning_activities (id) on delete cascade,
  status text not null default 'available'
    check (status in ('locked', 'available', 'in_progress', 'started', 'completed', 'verified')),
  progress_pct int not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  verified_at timestamptz,
  primary key (user_id, activity_id)
);

create table public.external_lab_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  activity_id uuid references public.learning_activities (id) on delete cascade,
  status text not null default 'started'
    check (status in ('started', 'declared_completed', 'verified', 'failed')),
  verification_score int not null default 0,
  opened_at timestamptz not null default now(),
  declared_at timestamptz,
  verified_at timestamptz
);

-- ------------------------------------------------------------
-- ANALYTICS (spec §27)
-- ------------------------------------------------------------
create table public.learning_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  activity_id uuid references public.learning_activities (id) on delete cascade,
  event text not null check (event in (
    'lab_viewed',
    'lab_started',
    'lab_completed',
    'lab_verified',
    'hint_requested',
    'external_lab_opened',
    'external_lab_declared_completed',
    'external_lab_verified'
  )),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.learning_activities enable row level security;
alter table public.native_labs enable row level security;
alter table public.external_labs enable row level security;
alter table public.learning_activity_states enable row level security;
alter table public.external_lab_attempts enable row level security;
alter table public.learning_activity_events enable row level security;

create policy "Content read for authenticated" on public.learning_activities
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.native_labs
  for select to authenticated using (true);
create policy "Content read for authenticated" on public.external_labs
  for select to authenticated using (true);

create policy "Own activity states" on public.learning_activity_states
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own external attempts" on public.external_lab_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own activity events" on public.learning_activity_events
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- INDEX
-- ------------------------------------------------------------
create index on public.learning_activities (level_id);
create index on public.learning_activity_events (user_id, event);
create index on public.learning_activity_states (user_id, status);
