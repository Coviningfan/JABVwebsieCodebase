import { sampleData } from './initDatabase.js';

// Simulate database operations with the sample data
class DataService {
  constructor() {
    this.data = sampleData;
    this.currentUserId = '550e8400-e29b-41d4-a716-446655440001'; // John Doe
  }

  // Get current user
  getCurrentUser() {
    return this.data.users.find(user => user.id === this.currentUserId);
  }

  // Get user projects
  getUserProjects(userId = this.currentUserId) {
    const userProjectIds = this.data.project_members
      .filter(member => member.user_id === userId)
      .map(member => member.project_id);
    
    return this.data.projects.filter(project => 
      userProjectIds.includes(project.id)
    );
  }

  // Get project stats
  getProjectStats(userId = this.currentUserId) {
    const projects = this.getUserProjects(userId);
    
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'in_progress' || p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      planning: projects.filter(p => p.status === 'planning').length
    };
  }

  // Get recent activity
  getRecentActivity(userId = this.currentUserId, limit = 10) {
    return this.data.activity_log
      .filter(activity => activity.user_id === userId || 
        this.getUserProjects(userId).some(p => p.id === activity.project_id))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit)
      .map(activity => {
        const project = this.data.projects.find(p => p.id === activity.project_id);
        const user = this.data.users.find(u => u.id === activity.user_id);
        
        return {
          ...activity,
          project_name: project?.name,
          user_name: user?.name,
          time_ago: this.getTimeAgo(activity.created_at)
        };
      });
  }

  // Get project messages
  getProjectMessages(projectId) {
    return this.data.project_messages
      .filter(message => message.project_id === projectId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(message => {
        const user = this.data.users.find(u => u.id === message.user_id);
        return {
          ...message,
          user_name: user?.name,
          user_role: user?.role,
          time_ago: this.getTimeAgo(message.created_at)
        };
      });
  }

  // Helper function to calculate time ago
  getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return minutes <= 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }
  }

  // Send message (simulate)
  async sendMessage(projectId, message) {
    const newMessage = {
      id: `msg-${Date.now()}`,
      project_id: projectId,
      user_id: this.currentUserId,
      message,
      attachments: null,
      created_at: new Date().toISOString()
    };
    
    this.data.project_messages.push(newMessage);
    
    // Log activity
    this.logActivity(projectId, 'message', 'New message sent');
    
    return newMessage;
  }

  // Log activity (simulate)
  logActivity(projectId, activityType, description) {
    const newActivity = {
      id: `activity-${Date.now()}`,
      user_id: this.currentUserId,
      project_id: projectId,
      activity_type: activityType,
      description,
      metadata: {},
      created_at: new Date().toISOString()
    };
    
    this.data.activity_log.unshift(newActivity);
  }

  // Authenticate user (simulate)
  async authenticateUser(email, password) {
    const user = this.data.users.find(u => u.email === email);
    if (user) {
      this.currentUserId = user.id;
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  }
}

// Export singleton instance
export const dataService = new DataService();