-- Fix User ID Mismatch
-- Run this SQL in Supabase SQL Editor to update client records with actual auth user IDs

-- First, let's see what auth users exist
SELECT id, email, created_at FROM auth.users ORDER BY created_at;

-- Update the clients table to match the actual auth user IDs
-- Replace the UUIDs below with the actual auth.users IDs from the query above

-- Example update (you'll need to replace with actual IDs):
-- UPDATE clients SET id = 'actual-auth-user-id-1' WHERE email = 'john@example.com';
-- UPDATE clients SET id = 'actual-auth-user-id-2' WHERE email = 'sarah@example.com';

-- Also update related tables to maintain referential integrity:
-- UPDATE projects SET client_id = 'actual-auth-user-id-1' WHERE client_id = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE projects SET client_id = 'actual-auth-user-id-2' WHERE client_id = '550e8400-e29b-41d4-a716-446655440001';

-- Update other related tables similarly:
-- UPDATE tasks SET assigned_to = 'actual-auth-user-id-1' WHERE assigned_to = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE tasks SET assigned_to = 'actual-auth-user-id-2' WHERE assigned_to = '550e8400-e29b-41d4-a716-446655440001';

-- UPDATE project_messages SET sender_id = 'actual-auth-user-id-1' WHERE sender_id = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE project_messages SET sender_id = 'actual-auth-user-id-2' WHERE sender_id = '550e8400-e29b-41d4-a716-446655440001';

-- UPDATE project_files SET uploaded_by = 'actual-auth-user-id-1' WHERE uploaded_by = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE project_files SET uploaded_by = 'actual-auth-user-id-2' WHERE uploaded_by = '550e8400-e29b-41d4-a716-446655440001';

-- UPDATE activity_log SET user_id = 'actual-auth-user-id-1' WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE activity_log SET user_id = 'actual-auth-user-id-2' WHERE user_id = '550e8400-e29b-41d4-a716-446655440001';

-- UPDATE support_tickets SET user_id = 'actual-auth-user-id-1' WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE support_tickets SET user_id = 'actual-auth-user-id-2' WHERE user_id = '550e8400-e29b-41d4-a716-446655440001';

-- UPDATE invoices SET client_id = 'actual-auth-user-id-1' WHERE client_id = '550e8400-e29b-41d4-a716-446655440000';
-- UPDATE invoices SET client_id = 'actual-auth-user-id-2' WHERE client_id = '550e8400-e29b-41d4-a716-446655440001';