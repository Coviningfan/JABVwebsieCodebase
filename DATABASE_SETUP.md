# Database Setup Instructions

## How to Set Up Your Database

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Click on "SQL Editor" in the left sidebar

2. **Run the Migration**
   - Click "New query" button
   - Copy ALL the contents from `supabase/migrations/002_new_initial_schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" button

3. **Verify Setup**
   - After running, you should see "Success" message
   - Check the "Table Editor" to confirm all tables are created

## What This Creates

The migration will create these tables matching your existing `clients` table:
- `projects` - Store client projects
- `project_messages` - Project communications
- `tasks` - Task assignments
- `project_files` - File management
- `invoices` - Billing records
- `support_tickets` - Support requests
- `activity_log` - Activity tracking
- `knowledge_base_articles` - Help articles
- `notifications` - User notifications

## Important Notes

- The migration is designed to work with your existing `clients` table
- It includes sample data for testing (2 clients and 3 projects)
- All tables use UUID primary keys for consistency
- Row Level Security (RLS) policies are included for data protection

## Test Credentials

Once the migration is complete, you can log in with:
- Email: `john@example.com`
- Password: `password123`

Or:
- Email: `sarah@example.com`  
- Password: `password123`