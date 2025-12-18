-- Create a table to store user settings and onboarding data
create table public.user_settings (
  user_id uuid references auth.users(id) on delete cascade primary key,
  target_language text,
  source text,
  learning_goal text,
  proficiency_level text,
  daily_goal_minutes integer,
  current_path_id text,
  notifications_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.user_settings enable row level security;

-- Policies
create policy "Users can view their own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);
