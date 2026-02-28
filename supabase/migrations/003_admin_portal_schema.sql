-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'manager')) DEFAULT 'admin',
  permissions JSONB DEFAULT '{"customer_create": true, "project_manage": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  verification_token TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES admin_users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  status TEXT CHECK (status IN ('pending', 'verified', 'expired')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES admin_users(id),
  assigned_to UUID REFERENCES clients(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_level TEXT DEFAULT 'full',
  demo_access BOOLEAN DEFAULT false,
  notes TEXT
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can manage all data" ON admin_users FOR ALL USING (true);
CREATE POLICY "Admin users can manage verifications" ON customer_verifications FOR ALL USING (true);
CREATE POLICY "Admin users can manage assignments" ON project_assignments FOR ALL USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
