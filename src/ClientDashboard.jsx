import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

// Client-focused metric card
function ClientMetricCard({ title, value, description, icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.background = 'rgba(24, 24, 27, 0.95)';
          e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.4)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.background = 'rgba(24, 24, 27, 0.8)';
          e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '12px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'rgba(220, 38, 38, 0.1)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        <div>
          <div style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '1'
          }}>
            {value}
          </div>
          <div style={{
            color: '#a1a1aa',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {title}
          </div>
        </div>
      </div>
      <div style={{
        color: '#d1d5db',
        fontSize: '14px',
        lineHeight: '1.4'
      }}>
        {description}
      </div>
    </div>
  );
}

// Project status card for client view
function ProjectCard({ project, onClick }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return '#10b981';
      case 'in progress': return '#f59e0b';
      case 'review': return '#8b5cf6';
      case 'completed': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  return (
    <div 
      onClick={() => onClick && onClick(project)}
      style={{
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '20px',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(24, 24, 27, 0.95)';
        e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(24, 24, 27, 0.8)';
        e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: '600',
          margin: 0
        }}>
          {project.name}
        </h3>
        <div style={{
          background: getStatusColor(project.status),
          color: 'white',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {project.status}
        </div>
      </div>
      
      <p style={{
        color: '#a1a1aa',
        fontSize: '14px',
        margin: '0 0 16px 0',
        lineHeight: '1.5'
      }}>
        {project.description}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <svg width="16" height="16" fill="none" stroke="#a1a1aa" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span style={{
              color: '#a1a1aa',
              fontSize: '13px'
            }}>
              Due {project.dueDate}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <svg width="16" height="16" fill="none" stroke="#a1a1aa" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span style={{
              color: '#a1a1aa',
              fontSize: '13px'
            }}>
              {project.completedTasks || 0}/{project.totalTasks || 0} tasks
            </span>
          </div>
        </div>
        
        <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// Quick action button
function QuickActionButton({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(24, 24, 27, 0.8)';
        e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        background: 'rgba(220, 38, 38, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '2px'
        }}>
          {title}
        </div>
        <div style={{
          color: '#a1a1aa',
          fontSize: '12px'
        }}>
          {description}
        </div>
      </div>
    </button>
  );
}

// Recent activity item
function ActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_completed':
        return (
          <svg width="16" height="16" fill="none" stroke="#10b981" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'file_uploaded':
        return (
          <svg width="16" height="16" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'message_received':
        return (
          <svg width="16" height="16" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" fill="none" stroke="#a1a1aa" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid rgba(63, 63, 70, 0.2)'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {getActivityIcon(activity.type)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '4px'
        }}>
          {activity.title}
        </div>
        <div style={{
          color: '#a1a1aa',
          fontSize: '13px',
          marginBottom: '4px'
        }}>
          {activity.description}
        </div>
        <div style={{
          color: '#71717a',
          fontSize: '12px'
        }}>
          {activity.time}
        </div>
      </div>
    </div>
  );
}

export function ClientDashboard({ onProjectClick, onNavigate }) {
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      activeProjects: 3,
      pendingTasks: 8,
      unreadMessages: 2,
      upcomingDeadlines: 1
    },
    projects: [
      {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete overhaul of company website with modern design and improved user experience',
        status: 'In Progress',
        dueDate: 'Jan 15, 2025',
        completedTasks: 12,
        totalTasks: 18
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Native iOS and Android app for customer engagement and service management',
        status: 'Active',
        dueDate: 'Feb 28, 2025',
        completedTasks: 5,
        totalTasks: 24
      },
      {
        id: 3,
        name: 'Brand Identity Package',
        description: 'Logo design, brand guidelines, and marketing materials for product launch',
        status: 'Review',
        dueDate: 'Dec 30, 2024',
        completedTasks: 8,
        totalTasks: 10
      }
    ],
    recentActivity: [
      {
        type: 'task_completed',
        title: 'Homepage design approved',
        description: 'Website Redesign project milestone completed',
        time: '2 hours ago'
      },
      {
        type: 'message_received',
        title: 'New message from project team',
        description: 'Update on mobile app wireframe progress',
        time: '4 hours ago'
      },
      {
        type: 'file_uploaded',
        title: 'Brand guidelines uploaded',
        description: 'Final brand identity documents are ready for review',
        time: '1 day ago'
      }
    ]
  });

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'white',
          margin: '0 0 8px 0'
        }}>
          Welcome Back
        </h1>
        <p style={{
          color: '#a1a1aa',
          fontSize: '16px',
          margin: 0
        }}>
          Here's an overview of your projects and recent activity.
        </p>
      </div>

      {/* Client Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <ClientMetricCard
          title="Active Projects"
          value={dashboardData.metrics.activeProjects}
          description="Projects currently in development"
          onClick={() => onNavigate && onNavigate('/projects')}
          icon={
            <svg width="24" height="24" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        
        <ClientMetricCard
          title="Pending Tasks"
          value={dashboardData.metrics.pendingTasks}
          description="Tasks awaiting your review or input"
          onClick={() => onNavigate && onNavigate('/tasks')}
          icon={
            <svg width="24" height="24" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
        
        <ClientMetricCard
          title="Unread Messages"
          value={dashboardData.metrics.unreadMessages}
          description="New messages from your project team"
          onClick={() => onNavigate && onNavigate('/messages')}
          icon={
            <svg width="24" height="24" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
        />
        
        <ClientMetricCard
          title="Upcoming Deadlines"
          value={dashboardData.metrics.upcomingDeadlines}
          description="Project milestones due this week"
          onClick={() => onNavigate && onNavigate('/projects')}
          icon={
            <svg width="24" height="24" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Current Projects */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          Your Projects
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {dashboardData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Recent Activity */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            margin: '0 0 20px 0'
          }}>
            Recent Activity
          </h3>
          
          <div>
            {dashboardData.recentActivity.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            margin: '0 0 20px 0'
          }}>
            Quick Actions
          </h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            <QuickActionButton
              title="Upload Files"
              description="Share documents with your team"
              onClick={() => onNavigate && onNavigate('/files')}
              icon={
                <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
            />
            
            <QuickActionButton
              title="Contact Support"
              description="Get help with your projects"
              onClick={() => onNavigate && onNavigate('/support')}
              icon={
                <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.196l2.248 4.552a1 1 0 00.75.546l5.02.73a1 1 0 01.554 1.706l-3.636 3.54a1 1 0 00-.288.884l.858 5.003a1 1 0 01-1.451 1.054L12 18.678l-4.487 2.359a1 1 0 01-1.451-1.054l.858-5.003a1 1 0 00-.288-.884L2.996 9.556a1 1 0 01.554-1.706l5.02-.73a1 1 0 00.75-.546L12 2.196z" />
                </svg>
              }
            />
            
            <QuickActionButton
              title="View Invoices"
              description="Check billing and payment status"
              onClick={() => onNavigate && onNavigate('/invoices')}
              icon={
                <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            
            <QuickActionButton
              title="Send Message"
              description="Communicate with your project team"
              onClick={() => onNavigate && onNavigate('/messages')}
              icon={
                <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}