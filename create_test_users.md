# Create Test User Accounts

Since your database is now set up, you need to create actual user accounts in Supabase Auth that correspond to the sample clients in your database.

## Method 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to your project dashboard
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

2. **Create Test Users**
   - Click "Add user" button
   - Create these accounts:

   **User 1:**
   - Email: `john@example.com`
   - Password: `password123`
   - User ID: `550e8400-e29b-41d4-a716-446655440000` (copy this exactly)

   **User 2:**
   - Email: `sarah@example.com`
   - Password: `password123`
   - User ID: `550e8400-e29b-41d4-a716-446655440001` (copy this exactly)

3. **Important Notes**
   - Use the exact User IDs shown above - they match the client IDs in your database
   - The email addresses match the sample data
   - Both users should be automatically confirmed

## Method 2: Using SQL (Alternative)

If the dashboard method doesn't work, you can run this SQL in Supabase SQL Editor:

```sql
-- Insert auth users (this might require admin access)
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password, 
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token,
  recovery_token
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440000',
  'john@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'sarah@example.com', 
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## Test Login Credentials

After creating the accounts, you can log in with:

- **Email:** john@example.com  
  **Password:** password123

- **Email:** sarah@example.com  
  **Password:** password123

These accounts will have access to the sample projects and data created by the migration.