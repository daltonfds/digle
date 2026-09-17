create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  language text default 'en',
  role text default 'student',
  created_at timestamptz default now()
);

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  title_en text not null,
  title_pt text not null,
  description_en text,
  description_pt text,
  level text default 'beginner',
  is_published boolean default false,
  is_premium boolean default false,
  created_at timestamptz default now()
);

create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  title_en text not null,
  title_pt text not null,
  position integer default 0
);

create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references modules(id) on delete cascade,
  title_en text not null,
  title_pt text not null,
  content_en text,
  content_pt text,
  audio_url text,
  position integer default 0,
  xp_reward integer default 50,
  is_premium boolean default false
);

create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references lessons(id) on delete cascade,
  question_en text not null,
  question_pt text not null,
  options jsonb not null,
  correct_answer text not null,
  xp_reward integer default 75
);

create table if not exists user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

create table if not exists user_stats (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer default 0,
  level integer default 1,
  hearts integer default 5,
  streak integer default 0,
  last_study_date date,
  updated_at timestamptz default now()
);

create table if not exists purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id),
  status text default 'pending',
  amount numeric(10,2) not null,
  currency text default 'USD',
  payment_reference text,
  created_at timestamptz default now()
);

create table if not exists premium_passes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  status text default 'pending',
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table user_stats enable row level security;
alter table purchases enable row level security;
alter table premium_passes enable row level security;

create policy "Users manage own profile"
on profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users manage own progress"
on user_progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own stats"
on user_stats for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users view own purchases"
on purchases for select
using (auth.uid() = user_id);

create policy "Users view own passes"
on premium_passes for select
using (auth.uid() = user_id);

alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table questions enable row level security;

create policy "Published courses are public"
on courses for select
using (is_published = true);

create policy "Modules are public"
on modules for select
using (true);

create policy "Lessons are public"
on lessons for select
using (true);

create policy "Questions are public"
on questions for select
using (true);
