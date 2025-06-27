-- Fix Data Isolation Issue
-- Run this SQL in Supabase SQL Editor to ensure proper data isolation

-- First, check which users exist and their projects
SELECT 
  c.id as user_id,
  c.email,
  c.full_name,
  COUNT(p.id) as project_count
FROM clients c
LEFT JOIN projects p ON c.id = p.client_id
GROUP BY c.id, c.email, c.full_name
ORDER BY c.created_at;

-- If you need to assign existing projects to specific users, use these queries:
-- Update projects to belong to john.doe@company.com (replace with actual user ID)
-- UPDATE projects 
-- SET client_id = (SELECT id FROM clients WHERE email = 'john.doe@company.com')
-- WHERE client_id IS NULL OR client_id NOT IN (SELECT id FROM clients);

-- Create sample projects for john.doe@company.com only
INSERT INTO projects (client_id, project_name, description, status, progress, start_date, end_date)
SELECT 
  c.id,
  'Enterprise Website Redesign',
  'Complete overhaul of corporate website with modern design and improved UX',
  'in_progress',
  65,
  '2025-01-15',
  '2025-03-30'
FROM clients c 
WHERE c.email = 'john.doe@company.com'
AND NOT EXISTS (
  SELECT 1 FROM projects p 
  WHERE p.client_id = c.id 
  AND p.project_name = 'Enterprise Website Redesign'
);

INSERT INTO projects (client_id, project_name, description, status, progress, start_date, end_date)
SELECT 
  c.id,
  'Mobile App Development',
  'Native iOS and Android app for customer engagement',
  'in_progress',
  40,
  '2025-02-01',
  '2025-05-15'
FROM clients c 
WHERE c.email = 'john.doe@company.com'
AND NOT EXISTS (
  SELECT 1 FROM projects p 
  WHERE p.client_id = c.id 
  AND p.project_name = 'Mobile App Development'
);

INSERT INTO projects (client_id, project_name, description, status, progress, start_date, end_date)
SELECT 
  c.id,
  'Cloud Infrastructure Migration',
  'Migrate on-premise systems to AWS cloud infrastructure',
  'planning',
  10,
  '2025-03-01',
  '2025-06-30'
FROM clients c 
WHERE c.email = 'john.doe@company.com'
AND NOT EXISTS (
  SELECT 1 FROM projects p 
  WHERE p.client_id = c.id 
  AND p.project_name = 'Cloud Infrastructure Migration'
);

-- Verify data isolation
SELECT 
  c.email,
  p.project_name,
  p.status,
  p.progress
FROM clients c
LEFT JOIN projects p ON c.id = p.client_id
ORDER BY c.email, p.created_at;