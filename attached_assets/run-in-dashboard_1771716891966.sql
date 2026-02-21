-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Create the user_profiles table (stops the 404 spam in your logs)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anon read (so the 404s stop)
CREATE POLICY "Allow public read" ON user_profiles
  FOR SELECT USING (true);

-- 2. Ensure contacts table exists with phone field
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- If contacts table already exists but is missing phone column:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contacts ADD COLUMN phone TEXT;
  END IF;
END $$;
