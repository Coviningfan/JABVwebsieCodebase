-- Location: supabase/migrations/20241216150000_jabv_client_portal.sql

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'client');
CREATE TYPE public.project_status AS ENUM ('pending', 'in_progress', 'client_review', 'completed');

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'client'::public.user_role,
    company_name TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Business tables (✅ Reference user_profiles, not auth.users)
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    industry TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    status public.project_status DEFAULT 'pending'::public.project_status,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.project_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_project_messages_project_id ON public.project_messages(project_id);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- 4. Safe Helper Functions
CREATE OR REPLACE FUNCTION public.is_client_owner(client_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.clients c
    JOIN public.user_profiles up ON c.user_id = up.id
    WHERE c.id = client_uuid AND up.id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_project(project_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.projects p
    JOIN public.clients c ON p.client_id = c.id
    WHERE p.id = project_uuid AND public.is_client_owner(c.id)
)
$$;

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'client'::public.user_role)
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "client_access_own_data" ON public.clients FOR ALL
USING (public.is_client_owner(id)) WITH CHECK (public.is_client_owner(id));

CREATE POLICY "project_access_control" ON public.projects FOR ALL
USING (public.can_access_project(id)) WITH CHECK (public.can_access_project(id));

CREATE POLICY "message_access_control" ON public.project_messages FOR ALL
USING (public.can_access_project(project_id)) WITH CHECK (public.can_access_project(project_id));

-- 6. Complete Mock Data
DO $$
DECLARE
    client_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    project1_uuid UUID := gen_random_uuid();
    project2_uuid UUID := gen_random_uuid();
    project3_uuid UUID := gen_random_uuid();
    project4_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth user with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.doe@company.com', crypt('ClientPortal123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Doe"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create client
    INSERT INTO public.clients (id, user_id, company_name, industry) VALUES
        (client_uuid, user_uuid, 'TechCorp Solutions', 'Technology');

    -- Create projects
    INSERT INTO public.projects (id, name, description, client_id, status, progress, start_date, end_date) VALUES
        (project1_uuid, 'E-commerce Platform Redesign', 'Complete redesign of the e-commerce platform with modern UI/UX and enhanced functionality', client_uuid, 'in_progress'::public.project_status, 75, '2024-01-15', '2024-03-30'),
        (project2_uuid, 'Mobile App Development', 'Native mobile application for iOS and Android platforms with real-time synchronization', client_uuid, 'client_review'::public.project_status, 90, '2024-02-01', '2024-04-15'),
        (project3_uuid, 'Database Migration', 'Migration of legacy database to modern cloud infrastructure with improved performance', client_uuid, 'completed'::public.project_status, 100, '2023-11-01', '2024-01-10'),
        (project4_uuid, 'Security Audit', 'Comprehensive security assessment and implementation of security best practices', client_uuid, 'pending'::public.project_status, 0, '2024-04-01', '2024-05-15');

    -- Create sample messages
    INSERT INTO public.project_messages (project_id, sender_id, content) VALUES
        (project1_uuid, user_uuid, 'Thank you for the update on the e-commerce platform. The progress looks great!'),
        (project2_uuid, user_uuid, 'When can we expect the mobile app beta version?');
END $$;