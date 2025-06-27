import { supabase } from './database.js';

export async function setupDatabase() {
  try {
    console.log('Setting up database tables...');

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('count')
      .limit(1);

    if (testError) {
      console.log('Database tables need to be created manually in Supabase dashboard');
      console.log('Connection test result:', testError.message);
      return { success: false, message: 'Database needs manual setup' };
    }

    console.log('Database connection successful');

    // Create projects table
    const { error: projectsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS projects (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          client_id UUID REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) DEFAULT 'active',
          priority VARCHAR(50) DEFAULT 'medium',
          start_date DATE,
          due_date DATE,
          completion_percentage INTEGER DEFAULT 0,
          budget DECIMAL(10,2),
          spent DECIMAL(10,2) DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (projectsError) {
      console.error('Error creating projects table:', projectsError);
      throw projectsError;
    }

    // Create tasks table
    const { error: tasksError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS tasks (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) DEFAULT 'pending',
          priority VARCHAR(50) DEFAULT 'medium',
          assigned_to UUID REFERENCES users(id),
          due_date TIMESTAMP WITH TIME ZONE,
          estimated_hours INTEGER,
          actual_hours INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (tasksError) {
      console.error('Error creating tasks table:', tasksError);
      throw tasksError;
    }

    // Create messages table
    const { error: messagesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS project_messages (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
          sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
          message TEXT NOT NULL,
          attachments JSONB,
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (messagesError) {
      console.error('Error creating messages table:', messagesError);
      throw messagesError;
    }

    // Create invoices table
    const { error: invoicesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS invoices (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          client_id UUID REFERENCES users(id) ON DELETE CASCADE,
          project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
          invoice_number VARCHAR(50) UNIQUE NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          tax_amount DECIMAL(10,2) DEFAULT 0,
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          due_date DATE,
          paid_date DATE,
          description TEXT,
          line_items JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (invoicesError) {
      console.error('Error creating invoices table:', invoicesError);
      throw invoicesError;
    }

    // Create support tickets table
    const { error: supportError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS support_tickets (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          client_id UUID REFERENCES users(id) ON DELETE CASCADE,
          project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'open',
          priority VARCHAR(50) DEFAULT 'medium',
          category VARCHAR(100),
          assigned_to UUID REFERENCES users(id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (supportError) {
      console.error('Error creating support tickets table:', supportError);
      throw supportError;
    }

    // Create files table
    const { error: filesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS project_files (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
          uploaded_by UUID REFERENCES users(id) ON DELETE CASCADE,
          file_name VARCHAR(255) NOT NULL,
          file_size INTEGER,
          file_type VARCHAR(100),
          file_url TEXT NOT NULL,
          folder VARCHAR(255) DEFAULT 'root',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (filesError) {
      console.error('Error creating files table:', filesError);
      throw filesError;
    }

    // Create activity log table
    const { error: activityError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS activity_log (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
          activity_type VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          metadata JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (activityError) {
      console.error('Error creating activity log table:', activityError);
      throw activityError;
    }

    console.log('Database tables created successfully!');
    return { success: true };

  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}

export async function seedDatabase() {
  try {
    console.log('Seeding database with sample data...');

    // Create sample client user
    const { data: clientUser, error: clientError } = await supabase
      .from('users')
      .insert({
        email: 'client@example.com',
        password_hash: '$2b$10$placeholder', // In real app, this would be properly hashed
        full_name: 'John Smith',
        role: 'client',
        company: 'TechCorp Inc.',
        phone: '+1 (555) 123-4567'
      })
      .select()
      .single();

    if (clientError && !clientError.message.includes('duplicate key')) {
      console.error('Error creating client user:', clientError);
      throw clientError;
    }

    const clientId = clientUser?.id || 'existing-client-id';

    // Create sample admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .insert({
        email: 'admin@jabvlabs.com',
        password_hash: '$2b$10$placeholder',
        full_name: 'JABV Labs Admin',
        role: 'admin',
        company: 'JABV Labs'
      })
      .select()
      .single();

    if (adminError && !adminError.message.includes('duplicate key')) {
      console.error('Error creating admin user:', adminError);
      throw adminError;
    }

    // Create sample projects
    const projects = [
      {
        client_id: clientId,
        title: 'E-commerce Website Redesign',
        description: 'Complete redesign of the company e-commerce platform with modern UI/UX',
        status: 'active',
        priority: 'high',
        start_date: '2024-01-15',
        due_date: '2024-03-30',
        completion_percentage: 75,
        budget: 25000.00,
        spent: 18750.00
      },
      {
        client_id: clientId,
        title: 'Mobile App Development',
        description: 'Native iOS and Android app for customer engagement',
        status: 'active',
        priority: 'medium',
        start_date: '2024-02-01',
        due_date: '2024-05-15',
        completion_percentage: 45,
        budget: 35000.00,
        spent: 15750.00
      },
      {
        client_id: clientId,
        title: 'Brand Identity Package',
        description: 'Logo design, brand guidelines, and marketing materials',
        status: 'completed',
        priority: 'medium',
        start_date: '2023-11-01',
        due_date: '2023-12-31',
        completion_percentage: 100,
        budget: 8000.00,
        spent: 7500.00
      }
    ];

    for (const project of projects) {
      const { error: projectError } = await supabase
        .from('projects')
        .insert(project);

      if (projectError && !projectError.message.includes('duplicate key')) {
        console.error('Error creating project:', projectError);
      }
    }

    console.log('Database seeded successfully!');
    return { success: true };

  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}