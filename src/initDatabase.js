// Database initialization script
export async function initializeDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('DATABASE_URL not found');
    return false;
  }

  try {
    // Parse DATABASE_URL to extract connection details
    const url = new URL(DATABASE_URL);
    
    const config = {
      host: url.hostname,
      port: url.port || 5432,
      database: url.pathname.slice(1), // Remove leading '/'
      username: url.username,
      password: decodeURIComponent(url.password), // Decode URL-encoded password
      ssl: url.searchParams.get('sslmode') === 'require'
    };

    console.log('Database config:', { ...config, password: '[HIDDEN]' });
    
    // For now, we'll use the existing Supabase client approach
    // but with proper URL parsing
    return true;
  } catch (error) {
    console.error('Error parsing DATABASE_URL:', error);
    return false;
  }
}

// Sample data to populate the database
export const sampleData = {
  users: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'client',
      company: 'TechCorp Solutions',
      avatar_url: null
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'jane.smith@jabvlabs.com',
      name: 'Jane Smith',
      role: 'manager',
      company: 'JABV Labs',
      avatar_url: null
    }
  ],
  
  projects: [
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      name: 'E-commerce Platform Redesign',
      description: 'Complete redesign of the e-commerce platform with modern UI/UX and enhanced functionality',
      status: 'in_progress',
      progress: 75,
      start_date: '2024-01-14',
      end_date: '2024-03-29',
      client_company: 'TechCorp Solutions'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440002',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      status: 'planning',
      progress: 25,
      start_date: '2024-02-01',
      end_date: '2024-05-15',
      client_company: 'InnovateCorp'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440003',
      name: 'Database Migration',
      description: 'Migration of legacy database to modern cloud infrastructure',
      status: 'completed',
      progress: 100,
      start_date: '2023-12-01',
      end_date: '2024-01-15',
      client_company: 'DataTech Inc'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440004',
      name: 'API Integration',
      description: 'Integration with third-party APIs and microservices architecture',
      status: 'active',
      progress: 60,
      start_date: '2024-01-20',
      end_date: '2024-04-10',
      client_company: 'TechCorp Solutions'
    }
  ],

  project_members: [
    {
      id: '770e8400-e29b-41d4-a716-446655440001',
      project_id: '660e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      role: 'client'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440002',
      project_id: '660e8400-e29b-41d4-a716-446655440002',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      role: 'client'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440003',
      project_id: '660e8400-e29b-41d4-a716-446655440003',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      role: 'client'
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440004',
      project_id: '660e8400-e29b-41d4-a716-446655440004',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      role: 'client'
    }
  ],

  activity_log: [
    {
      id: '880e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      project_id: '660e8400-e29b-41d4-a716-446655440001',
      activity_type: 'message',
      description: 'New message from Project Manager',
      metadata: { message: 'Updated on E-commerce Platform Redesign progress' },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '880e8400-e29b-41d4-a716-446655440002',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      project_id: '660e8400-e29b-41d4-a716-446655440002',
      activity_type: 'file_upload',
      description: 'Design mockups uploaded',
      metadata: { message: 'Mobile App Development wireframes available' },
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '880e8400-e29b-41d4-a716-446655440003',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      project_id: '660e8400-e29b-41d4-a716-446655440003',
      activity_type: 'status_update',
      description: 'Project status updated',
      metadata: { message: 'Database Migration marked as completed' },
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ],

  project_messages: [
    {
      id: '990e8400-e29b-41d4-a716-446655440001',
      project_id: '660e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      message: 'Hi John, I wanted to update you on the progress of the e-commerce platform redesign. We have completed the user interface mockups and are now working on the backend integration.',
      attachments: null,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '990e8400-e29b-41d4-a716-446655440002',
      project_id: '660e8400-e29b-41d4-a716-446655440001',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      message: 'Thanks for the update! The mockups look great. When do you expect the backend integration to be completed?',
      attachments: null,
      created_at: new Date(Date.now() - 90 * 60 * 1000)
    }
  ]
};