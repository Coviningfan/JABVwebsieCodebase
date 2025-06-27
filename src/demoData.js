// Demo data for testing the portal without database dependency
export const demoUser = {
  id: 'demo-user-123',
  email: 'demo@jabvlabs.com',
  profile: {
    id: 'demo-user-123',
    full_name: 'John Smith',
    role: 'client',
    company: 'Tech Innovations Corp',
    phone: '(555) 123-4567',
    avatar_url: null,
    created_at: '2024-01-15T00:00:00Z'
  }
};

export const demoProjects = [
  {
    id: 'proj-1',
    name: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with advanced features',
    status: 'in_progress',
    progress: 75,
    start_date: '2024-01-15',
    end_date: '2024-03-30',
    budget: 45000,
    spent: 33750,
    client_id: 'demo-user-123',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application',
    status: 'planning',
    progress: 25,
    start_date: '2024-02-01',
    end_date: '2024-05-15',
    budget: 60000,
    spent: 15000,
    client_id: 'demo-user-123',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const demoTasks = [
  {
    id: 'task-1',
    title: 'Review Homepage Design',
    description: 'Please review the new homepage layout and provide feedback',
    status: 'pending',
    priority: 'high',
    due_date: '2024-12-30',
    project_id: 'proj-1',
    assigned_to: 'demo-user-123',
    created_at: '2024-12-26T00:00:00Z'
  },
  {
    id: 'task-2',
    title: 'Test Payment Integration',
    description: 'Test the new payment gateway integration',
    status: 'in_progress',
    priority: 'medium',
    due_date: '2025-01-05',
    project_id: 'proj-1',
    assigned_to: 'demo-user-123',
    created_at: '2024-12-25T00:00:00Z'
  }
];

export const demoMessages = [
  {
    id: 'msg-1',
    project_id: 'proj-1',
    user_id: 'team-member-1',
    message: 'The homepage design is ready for your review. Please check the latest mockups.',
    attachments: null,
    created_at: '2024-12-26T10:30:00Z',
    sender_name: 'Sarah Wilson',
    sender_role: 'designer'
  },
  {
    id: 'msg-2',
    project_id: 'proj-1',
    user_id: 'demo-user-123',
    message: 'Looks great! I have a few minor suggestions for the color scheme.',
    attachments: null,
    created_at: '2024-12-26T14:15:00Z',
    sender_name: 'John Smith',
    sender_role: 'client'
  }
];

export const demoActivity = [
  {
    id: 'activity-1',
    user_id: 'demo-user-123',
    project_id: 'proj-1',
    activity_type: 'task_assigned',
    description: 'New task assigned: Review Homepage Design',
    created_at: '2024-12-26T09:00:00Z'
  },
  {
    id: 'activity-2',
    user_id: 'demo-user-123',
    project_id: 'proj-1',
    activity_type: 'message_received',
    description: 'New message from Sarah Wilson',
    created_at: '2024-12-26T10:30:00Z'
  }
];