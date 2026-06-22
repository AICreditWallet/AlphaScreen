# AlphaScreen Database Schema
# Paste this into your Supabase SQL Editor (https://supabase.com/dashboard)

-- 1. Projects (Movies)
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  script_raw text,
  status text default 'planning', -- planning, production, completed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Characters (Actors)
create table characters (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects on delete cascade not null,
  name text not null,
  role text,
  physical_description text,
  face_reference_url text,
  lora_trigger text,
  voice_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Scenes
create table scenes (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects on delete cascade not null,
  sequence_number integer not null,
  location text,
  time_of_day text,
  continuity_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Shots
create table shots (
  id uuid default gen_random_uuid() primary key,
  scene_id uuid references scenes on delete cascade not null,
  shot_number integer not null,
  camera_angle text,
  lens text,
  lighting text,
  visual_description text,
  dialogue_text text,
  prompt text,
  video_url text,
  render_status text default 'idle', -- idle, rendering, completed, failed
  qa_status text default 'pending', -- pending, pass, fail
  qa_score integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Waitlist (Market Validation)
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  production_interest text, -- 'short' or 'full'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table characters enable row level security;
alter table scenes enable row level security;
alter table shots enable row level security;
alter table waitlist enable row level security;

-- Add policies
create policy "Users can manage their own projects" on projects for all using (auth.uid() = user_id);
create policy "Anyone can join waitlist" on waitlist for insert with check (true);
