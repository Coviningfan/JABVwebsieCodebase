-- Check Data Isolation
-- Run this SQL in Supabase SQL Editor to verify data isolation

-- 1. List all clients/users
SELECT id, email, full_name, created_at 
FROM clients 
ORDER BY created_at DESC;

-- 2. List all projects and their owners
SELECT 
  p.id,
  p.project_name,
  p.client_id,
  c.email as client_email,
  p.status,
  p.created_at
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
ORDER BY p.created_at DESC;

-- 3. Count projects per client
SELECT 
  c.email,
  c.full_name,
  COUNT(p.id) as project_count
FROM clients c
LEFT JOIN projects p ON c.id = p.client_id
GROUP BY c.id, c.email, c.full_name
ORDER BY project_count DESC;

-- 4. Check if there are any projects without valid client_id
SELECT * FROM projects WHERE client_id IS NULL;

-- 5. Check if there are any projects with client_ids that don't exist in clients table
SELECT p.* 
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
WHERE c.id IS NULL AND p.client_id IS NOT NULL;