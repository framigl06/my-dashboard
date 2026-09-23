-- PERSONAL DASHBOARD - SUPABASE SCHEMA
create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text default '#ffffff',
  created_at timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  lesson_date date not null,
  start_time time,
  end_time time,
  topic text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  title text not null,
  description text,
  due_date date,
  priority text default 'normal',
  completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists exams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  exam_date date,
  exam_type text,
  grade numeric,
  notes text,
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null,
  transaction_type text not null check (transaction_type in ('income','expense')),
  category text,
  transaction_date date default current_date,
  description text,
  created_at timestamptz default now()
);

create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  category text default 'Generale',
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  event_type text default 'personal',
  notes text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table subjects enable row level security;
alter table lessons enable row level security;
alter table tasks enable row level security;
alter table exams enable row level security;
alter table transactions enable row level security;
alter table links enable row level security;
alter table events enable row level security;

create policy "profiles own" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "subjects own" on subjects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "lessons own" on lessons for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks own" on tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "exams own" on exams for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "transactions own" on transactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "links own" on links for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "events own" on events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
