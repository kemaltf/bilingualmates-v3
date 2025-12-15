-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  email text,
  display_name text,
  avatar_url text,
  
  -- Gamification fields (Duolingo style)
  xp integer default 0,
  total_xp integer default 0,
  streak_days integer default 0,
  gems integer default 0,
  hearts integer default 5,
  current_course_id text,
  last_activity_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
