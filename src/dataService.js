import { db } from './database.js';
import { authService } from './authService.js';
import { demoProjects, demoTasks, demoMessages, demoActivity, demoUser } from './demoData.js';

// Database operations with demo mode support
class DataService {
  constructor() {
    this.currentUserId = null;
    this.demoMode = false; // Switch to production mode
    this.init();
  }

  async init() {
    try {
      if (this.demoMode) {
        this.currentUserId = demoUser.id;
        return;
      }
      
      const user = await authService.getCurrentUser();
      if (user && user.profile) {
        this.currentUserId = user.id;
      }
    } catch (error) {
      console.error('DataService initialization failed:', error);
    }
  }

  // Force refresh user context when user changes
  async refreshUserContext() {
    this.currentUserId = null;
    await this.init();
  }

  // Get current user
  async getCurrentUser() {
    if (!this.currentUserId) {
      const user = await authService.getCurrentUser();
      if (user && user.profile) {
        this.currentUserId = user.id;
        return user.profile;
      }
      return null;
    }
    
    try {
      return await db.getUser(this.currentUserId);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get user projects
  async getUserProjects(userId = null) {
    // Always get fresh user ID from auth service
    const actualUserId = userId || await this.getFreshUserId();
    if (!actualUserId) return [];
    
    if (this.demoMode) {
      return demoProjects.filter(project => project.client_id === actualUserId);
    }
    
    try {
      return await db.getProjects(actualUserId);
    } catch (error) {
      console.error('Error getting user projects:', error);
      return [];
    }
  }

  // Get fresh user ID from auth service
  async getFreshUserId() {
    const user = await authService.getCurrentUser();
    if (user && user.id) {
      this.currentUserId = user.id;
      return user.id;
    }
    return null;
  }

  // Get project stats
  async getProjectStats(userId = this.currentUserId) {
    const projects = await this.getUserProjects(userId);
    
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'in_progress' || p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      planning: projects.filter(p => p.status === 'planning').length
    };
  }

  // Get recent activity
  async getRecentActivity(userId = null, limit = 10) {
    const actualUserId = userId || await this.getFreshUserId();
    if (!actualUserId) return [];
    
    if (this.demoMode) {
      return demoActivity
        .filter(activity => activity.user_id === actualUserId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, limit)
        .map(activity => ({
          ...activity,
          time_ago: this.getTimeAgo(activity.created_at)
        }));
    }

    try {
      return await db.getRecentActivity(actualUserId, limit);
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }

  // Get project messages
  getProjectMessages(projectId) {
    if (this.demoMode) {
      return demoMessages
        .filter(message => message.project_id === projectId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(message => ({
          ...message,
          time_ago: this.getTimeAgo(message.created_at)
        }));
    }

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