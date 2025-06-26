import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

// Simple Chart Components using SVG
function ProgressChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const barHeight = 24;
  const spacing = 8;
  const chartHeight = data.length * (barHeight + spacing);

  return (
    <div style={{
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      padding: '24px'
    }}>
      <h3 style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px',
        margin: 0
      }}>
        {title}
      </h3>
      <div style={{ marginTop: '20px' }}>
        <svg width="100%" height={chartHeight} style={{ overflow: 'visible' }}>
          {data.map((item, index) => {
            const barWidth = (item.value / maxValue) * 100;
            const y = index * (barHeight + spacing);
            
            return (
              <g key={item.label}>
                {/* Background bar */}
                <rect
                  x="0"
                  y={y}
                  width="100%"
                  height={barHeight}
                  fill="rgba(63, 63, 70, 0.3)"
                  rx="4"
                />
                {/* Progress bar */}
                <rect
                  x="0"
                  y={y}
                  width={`${barWidth}%`}
                  height={barHeight}
                  fill="#dc2626"
                  rx="4"
                />
                {/* Label */}
                <text
                  x="8"
                  y={y + barHeight / 2 + 4}
                  fill="white"
                  fontSize="13"
                  fontWeight="500"
                >
                  {item.label}
                </text>
                {/* Value */}
                <text
                  x="98%"
                  y={y + barHeight / 2 + 4}
                  fill="#a1a1aa"
                  fontSize="12"
                  textAnchor="end"
                >
                  {item.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function DonutChart({ data, title, centerText }) {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div style={{
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px',
        margin: 0
      }}>
        {title}
      </h3>
      
      <div style={{ position: 'relative', marginTop: '20px' }}>
        <svg width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(63, 63, 70, 0.3)"
            strokeWidth={strokeWidth}
          />
          
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const rotation = currentAngle;
            currentAngle += (item.value / total) * 360;
            
            return (
              <circle
                key={item.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                style={{
                  transition: 'stroke-dasharray 0.5s ease'
                }}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {centerText}
          </div>
          <div style={{
            color: '#a1a1aa',
            fontSize: '12px',
            marginTop: '4px'
          }}>
            Total Projects
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginTop: '20px',
        justifyContent: 'center'
      }}>
        {data.map((item) => (
          <div key={item.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: item.color
            }} />
            <span style={{
              color: '#d1d5db',
              fontSize: '13px'
            }}>
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon, trend = 'up' }) {
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#a1a1aa';
  
  return (
    <div style={{
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      padding: '24px',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(24, 24, 27, 0.9)';
      e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(24, 24, 27, 0.8)';
      e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{
          background: 'rgba(220, 38, 38, 0.1)',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        {change && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: trendColor,
            fontSize: '12px',
            fontWeight: '500'
          }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={trend === 'up' ? "M7 14l9-9 3 3" : "M17 14l-9-9-3 3"} />
            </svg>
            {change}
          </div>
        )}
      </div>
      
      <div style={{
        color: 'white',
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '8px'
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
  );
}

function ActivityFeed({ activities }) {
  return (
    <div style={{
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      padding: '24px'
    }}>
      <h3 style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px',
        margin: 0
      }}>
        Recent Activity
      </h3>
      
      <div style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
        {activities.map((activity, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '12px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            border: '1px solid rgba(63, 63, 70, 0.2)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#dc2626',
              marginTop: '6px',
              flexShrink: 0
            }} />
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
                marginBottom: '8px'
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
        ))}
      </div>
    </div>
  );
}

export function OptimizedDashboard({ onProjectClick }) {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeProjects: 8,
      completedTasks: 142,
      totalRevenue: '$324,500',
      clientSatisfaction: 98
    },
    projectProgress: [
      { label: 'E-commerce Platform', value: 85 },
      { label: 'Mobile App Development', value: 72 },
      { label: 'Brand Identity Design', value: 94 },
      { label: 'Web Application', value: 63 }
    ],
    projectStatus: [
      { label: 'Active', value: 5, color: '#dc2626' },
      { label: 'In Review', value: 2, color: '#f59e0b' },
      { label: 'Completed', value: 3, color: '#10b981' }
    ],
    recentActivity: [
      {
        title: 'Project Milestone Completed',
        description: 'E-commerce Platform - Payment Integration Phase',
        time: '2 hours ago'
      },
      {
        title: 'New Task Assignment',
        description: 'Mobile App - UI/UX Design Review',
        time: '4 hours ago'
      },
      {
        title: 'Client Feedback Received',
        description: 'Brand Identity - Logo Design Approval',
        time: '6 hours ago'
      },
      {
        title: 'File Upload',
        description: 'Updated project specifications document',
        time: '1 day ago'
      }
    ]
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    if (currentUser) {
      const userProjects = dataService.getUserProjects(currentUser.id);
      setProjects(userProjects);
    }
  }, []);

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'white',
          margin: '0 0 8px 0'
        }}>
          Dashboard
        </h1>
        <p style={{
          color: '#a1a1aa',
          fontSize: '16px',
          margin: 0
        }}>
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <MetricCard
          title="Active Projects"
          value={dashboardData.stats.activeProjects}
          change="+2 this month"
          trend="up"
          icon={
            <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        
        <MetricCard
          title="Completed Tasks"
          value={dashboardData.stats.completedTasks}
          change="+18 this week"
          trend="up"
          icon={
            <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <MetricCard
          title="Total Revenue"
          value={dashboardData.stats.totalRevenue}
          change="+12% from last month"
          trend="up"
          icon={
            <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        
        <MetricCard
          title="Client Satisfaction"
          value={`${dashboardData.stats.clientSatisfaction}%`}
          change="+2% this quarter"
          trend="up"
          icon={
            <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <ProgressChart
          data={dashboardData.projectProgress}
          title="Project Progress"
        />
        
        <DonutChart
          data={dashboardData.projectStatus}
          title="Project Status"
          centerText="10"
        />
      </div>

      {/* Bottom Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        <ActivityFeed activities={dashboardData.recentActivity} />
        
        {/* Quick Actions */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            margin: 0
          }}>
            Quick Actions
          </h3>
          
          <div style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
            {[
              { icon: '📊', title: 'View Reports', desc: 'Generate project analytics' },
              { icon: '💬', title: 'Contact Support', desc: 'Get help with your projects' },
              { icon: '📁', title: 'Upload Files', desc: 'Share documents with your team' },
              { icon: '⚡', title: 'Request Changes', desc: 'Submit project modifications' }
            ].map((action, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(63, 63, 70, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.2)';
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(220, 38, 38, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  <svg width="20" height="20" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '2px'
                  }}>
                    {action.title}
                  </div>
                  <div style={{
                    color: '#a1a1aa',
                    fontSize: '12px'
                  }}>
                    {action.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}