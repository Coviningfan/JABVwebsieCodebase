import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';
import { authService } from './authService.js';
import { setupDatabase, seedDatabase } from './setupDatabase.js';
import { MessageCenter } from './MessageCenter.jsx';
import { ProjectDetails } from './ProjectDetails.jsx';
import { InvoicePage } from './InvoicePage.jsx';
import { FilesPage } from './FilesPage.jsx';
import { SupportPage } from './SupportPage.jsx';
import { TasksPage } from './TasksPage.jsx';
import { KnowledgeBasePage } from './KnowledgeBasePage.jsx';
import { NotificationsCenter } from './NotificationsCenter.jsx';
import { ClientDashboard } from './ClientDashboard.jsx';
import { Router, Route, Switch, Link, useLocation } from 'wouter';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize database on component mount
  useEffect(() => {
    // Database setup should be done manually via Supabase SQL Editor
    // using the migration file at supabase/migrations/001_initial_schema.sql
    console.log('Please run the SQL migration in Supabase SQL Editor');
    setIsInitializing(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        console.log('Authentication successful');
        window.location.href = '/dashboard';
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          color: 'white',
          margin: '0 0 16px 0',
          letterSpacing: '-0.025em'
        }}>
          <span style={{ color: 'white' }}>JABV</span><span style={{ color: '#dc2626' }}>Labs</span>
        </h1>
        <p style={{ 
          color: '#a1a1aa', 
          fontSize: '18px',
          margin: 0,
          fontWeight: '400'
        }}>
          Sign in to access your projects
        </p>
      </div>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Test Account Setup Banner */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#F59E0B', fontSize: '14px', margin: '0 0 8px 0', fontWeight: '500' }}>Test Login:</p>
          <p style={{ color: 'white', fontSize: '14px', fontFamily: 'monospace', margin: '2px 0' }}>john@example.com</p>
          <p style={{ color: 'white', fontSize: '14px', fontFamily: 'monospace', margin: '2px 0' }}>password123</p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 8px 0',
            letterSpacing: '-0.025em'
          }}>
            Welcome back
          </h2>
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '16px',
            margin: 0
          }}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#71717a',
                zIndex: 1
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(63, 63, 70, 0.8)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your email"
                required
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(63, 63, 70, 0.8)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#71717a',
                zIndex: 1
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(63, 63, 70, 0.8)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your password"
                required
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(63, 63, 70, 0.8)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#71717a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#ef4444',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Loading Display */}
          {isInitializing && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#3b82f6',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Setting up database... Please wait.
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading || isInitializing}
            style={{
              width: '100%',
              background: (isLoading || isInitializing) ? '#6b7280' : '#dc2626',
              color: 'white',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: (isLoading || isInitializing) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: (isLoading || isInitializing) ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading && !isInitializing) {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && !isInitializing) {
                e.target.style.background = '#dc2626';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10,17 15,12 10,7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            )}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Forgot Password */}
          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{
              color: '#a1a1aa',
              fontSize: '14px',
              textDecoration: 'none'
            }}>
              Forgot your password?
            </a>
          </div>
        </form>
      </div>

      {/* Demo Credentials */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        background: 'rgba(220, 38, 38, 0.1)',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        borderRadius: '8px',
        maxWidth: '420px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#dc2626',
            margin: 0
          }}>Demo Credentials</h4>
        </div>
        <div style={{ fontSize: '14px', color: '#fca5a5' }}>
          <p style={{ margin: '0 0 4px 0' }}>
            Email: john.doe@company.com
          </p>
          <p style={{ margin: 0 }}>
            Password: ClientPortal123
          </p>
        </div>
      </div>
    </div>
  );
}

// Enhanced MetricsCard Component
function MetricsCard({ title, value, icon, color = 'primary' }) {
  const getColorStyles = (colorType) => {
    switch (colorType) {
      case 'primary':
        return { iconBg: 'rgba(239, 68, 68, 0.1)', iconColor: '#ef4444' };
      case 'success':
        return { iconBg: 'rgba(34, 197, 94, 0.1)', iconColor: '#22c55e' };
      case 'warning':
        return { iconBg: 'rgba(251, 146, 60, 0.1)', iconColor: '#fb923c' };
      case 'info':
        return { iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' };
      default:
        return { iconBg: 'rgba(239, 68, 68, 0.1)', iconColor: '#ef4444' };
    }
  };

  const colorStyles = getColorStyles(color);

  return (
    <div style={{
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      padding: '24px',
      transition: 'all 0.2s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '14px', 
            fontWeight: '500',
            margin: '0 0 8px 0' 
          }}>
            {title}
          </p>
          <p style={{ 
            color: 'white', 
            fontSize: '32px', 
            fontWeight: '700', 
            margin: 0 
          }}>
            {value}
          </p>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          background: colorStyles.iconBg,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ color: colorStyles.iconColor }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onProjectClick }) {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    stats: null,
    projects: [],
    activities: []
  });

  useEffect(() => {
    // Load dashboard data
    const loadDashboardData = () => {
      const user = dataService.getCurrentUser();
      const stats = dataService.getProjectStats();
      const projects = dataService.getUserProjects();
      const activities = dataService.getRecentActivity();

      setDashboardData({
        user,
        stats,
        projects,
        activities
      });
    };

    loadDashboardData();
  }, []);

  if (!dashboardData.user) {
    return <div style={{ color: 'white', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'white',
          margin: '0 0 8px 0'
        }}>
          Welcome back, {dashboardData.user.name}!
        </h1>
        <p style={{
          color: '#a1a1aa',
          fontSize: '16px',
          margin: 0
        }}>
          Here's an overview of your projects and recent activity.
        </p>
      </div>

      {/* Enhanced Stats Cards using MetricsCard component */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <MetricsCard
          title="Total Projects"
          value={dashboardData.stats?.total || 0}
          color="primary"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          }
        />
        
        <MetricsCard
          title="Active Projects"
          value={dashboardData.stats?.active || 0}
          color="warning"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          }
        />
        
        <MetricsCard
          title="Completed Projects"
          value={dashboardData.stats?.completed || 0}
          color="success"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          }
        />
      </div>

      {/* Projects and Activity Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px'
      }}>
        {/* Your Projects */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>Your Projects</h2>
            <a href="#" style={{
              color: '#dc2626',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: '500'
            }}>View All →</a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {dashboardData.projects.slice(0, 4).map((project) => {
              const getStatusConfig = (status) => {
                switch (status) {
                  case 'in_progress':
                    return { color: '#dc2626', label: 'In Progress' };
                  case 'active':
                    return { color: '#f59e0b', label: 'Active' };
                  case 'completed':
                    return { color: '#22c55e', label: 'Completed' };
                  case 'planning':
                    return { color: '#3b82f6', label: 'Planning' };
                  default:
                    return { color: '#6b7280', label: 'Unknown' };
                }
              };

              const statusConfig = getStatusConfig(project.status);

              return (
                <div 
                  key={project.id} 
                  onClick={() => onProjectClick && onProjectClick(project.id)}
                  style={{
                    background: 'rgba(24, 24, 27, 0.8)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = statusConfig.color;
                    e.currentTarget.style.boxShadow = `0 10px 25px ${statusConfig.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: statusConfig.color,
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      marginBottom: '12px'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      {statusConfig.label}
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'white',
                      margin: '0 0 4px 0',
                      transition: 'color 0.2s ease'
                    }}>{project.name}</h3>
                    <p style={{
                      color: '#a1a1aa',
                      fontSize: '14px',
                      margin: 0
                    }}>{project.client_company}</p>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: '0 0 16px 0'
                  }}>{project.description}</p>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Progress</span>
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{project.progress}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(63, 63, 70, 0.4)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${statusConfig.color} 0%, ${statusConfig.color}80 100%)`,
                        borderRadius: '3px',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#a1a1aa'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{project.start_date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10,8 16,12 10,16 10,8"/>
                      </svg>
                      <span>{project.end_date}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile App Development */}
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#f59e0b',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginBottom: '12px'
                }}>Client Review</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 4px 0'
                }}>Mobile App Development</h3>
                <p style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  margin: 0
                }}>TechCorp Solutions</p>
              </div>
              <p style={{
                color: '#a1a1aa',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: '0 0 16px 0'
              }}>Native mobile application for iOS and Android platforms with real-time synchronization</p>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Progress</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>90%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(63, 63, 70, 0.4)',
                  borderRadius: '3px'
                }}>
                  <div style={{
                    width: '90%',
                    height: '100%',
                    background: '#f59e0b',
                    borderRadius: '3px'
                  }}></div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#a1a1aa'
              }}>
                <span>📅 Jan 31, 2024</span>
                <span>🎯 Apr 14, 2024</span>
              </div>
            </div>

            {/* Database Migration */}
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#22c55e',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginBottom: '12px'
                }}>Completed</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 4px 0'
                }}>Database Migration</h3>
                <p style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  margin: 0
                }}>TechCorp Solutions</p>
              </div>
              <p style={{
                color: '#a1a1aa',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: '0 0 16px 0'
              }}>Migration of legacy database to modern cloud infrastructure with improved performance</p>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Progress</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>100%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(63, 63, 70, 0.4)',
                  borderRadius: '3px'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#22c55e',
                    borderRadius: '3px'
                  }}></div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#a1a1aa'
              }}>
                <span>📅 Oct 31, 2023</span>
                <span>🎯 Jan 7, 2024</span>
              </div>
            </div>

            {/* Security Audit */}
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#6b7280',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginBottom: '12px'
                }}>Pending</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 4px 0'
                }}>Security Audit</h3>
                <p style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  margin: 0
                }}>TechCorp Solutions</p>
              </div>
              <p style={{
                color: '#a1a1aa',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: '0 0 16px 0'
              }}>Comprehensive security assessment and implementation of security best practices</p>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Progress</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>0%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(63, 63, 70, 0.4)',
                  borderRadius: '3px'
                }}>
                  <div style={{
                    width: '0%',
                    height: '100%',
                    background: '#6b7280',
                    borderRadius: '3px'
                  }}></div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#a1a1aa'
              }}>
                <span>📅 Mar 31, 2024</span>
                <span>🎯 May 14, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>Recent Activity</h2>
            <a href="#" style={{
              color: '#dc2626',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: '500'
            }}>View All</a>
          </div>

          <div style={{
            background: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dashboardData.activities.map((activity) => {
                const getActivityIcon = (type) => {
                  switch (type) {
                    case 'message':
                      return (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      );
                    case 'file_upload':
                      return (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14,2 14,8 20,8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10,9 9,9 8,9"/>
                        </svg>
                      );
                    case 'status_update':
                      return (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      );
                    default:
                      return (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      );
                  }
                };

                const getActivityColor = (type) => {
                  switch (type) {
                    case 'message':
                      return { bg: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', color: '#dc2626' };
                    case 'file_upload':
                      return { bg: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', color: '#f59e0b' };
                    case 'status_update':
                      return { bg: 'linear-gradient(135deg, #22c55e 0%, #34d399 100%)', color: '#22c55e' };
                    default:
                      return { bg: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)', color: '#6b7280' };
                  }
                };

                const colorConfig = getActivityColor(activity.activity_type);

                return (
                  <div key={activity.id} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: colorConfig.bg,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 2px 8px ${colorConfig.color}40`
                    }}>
                      {getActivityIcon(activity.activity_type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        margin: '0 0 4px 0'
                      }}>{activity.description}</p>
                      <p style={{
                        color: '#a1a1aa',
                        fontSize: '13px',
                        margin: '0 0 4px 0',
                        lineHeight: '1.4'
                      }}>{activity.metadata?.message || activity.project_name}</p>
                      <p style={{
                        color: '#71717a',
                        fontSize: '12px',
                        margin: 0
                      }}>{activity.time_ago}</p>
                    </div>
                    {activity.activity_type === 'message' && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: colorConfig.color,
                        borderRadius: '50%',
                        marginTop: '8px'
                      }}></div>
                    )}
                  </div>
                );
              })}

              {/* Activity Item 2 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '0 0 4px 0'
                  }}>Design mockups uploaded</p>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '13px',
                    margin: '0 0 4px 0',
                    lineHeight: '1.4'
                  }}>Mobile App Development wireframes available</p>
                  <p style={{
                    color: '#71717a',
                    fontSize: '12px',
                    margin: 0
                  }}>1 day ago</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #34d399 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '0 0 4px 0'
                  }}>Project status updated</p>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '13px',
                    margin: '0 0 4px 0',
                    lineHeight: '1.4'
                  }}>Database Migration marked as completed</p>
                  <p style={{
                    color: '#71717a',
                    fontSize: '12px',
                    margin: 0
                  }}>3 days ago</p>
                </div>
              </div>
            </div>

            {/* View Messages Button */}
            <button style={{
              width: '100%',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              View Messages
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 24px 0'
        }}>Quick Actions</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {/* View Messages */}
          <div style={{
            background: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 8px 0'
            }}>View Messages</h3>
            <p style={{
              color: '#a1a1aa',
              fontSize: '14px',
              margin: 0
            }}>Check project communications</p>
          </div>

          {/* Access Files */}
          <div style={{
            background: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 8px 0'
            }}>Access Files</h3>
            <p style={{
              color: '#a1a1aa',
              fontSize: '14px',
              margin: 0
            }}>Download project documents</p>
          </div>

          {/* View Progress */}
          <div style={{
            background: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 8px 0'
            }}>View Progress</h3>
            <p style={{
              color: '#a1a1aa',
              fontSize: '14px',
              margin: 0
            }}>Track project milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [projectsData, setProjectsData] = useState({
    projects: [],
    selectedProject: null
  });

  useEffect(() => {
    const projects = dataService.getUserProjects();
    setProjectsData({
      projects,
      selectedProject: projects[0] || null
    });
  }, []);

  const handleProjectSelect = (project) => {
    setProjectsData(prev => ({
      ...prev,
      selectedProject: project
    }));
  };

  return (
    <div>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: 'white',
        margin: '0 0 32px 0'
      }}>
        Projects
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px'
      }}>
        {/* Projects List */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 20px 0'
          }}>Your Projects</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projectsData.projects.map((project) => {
              const isSelected = projectsData.selectedProject?.id === project.id;
              const getStatusColor = (status) => {
                switch (status) {
                  case 'in_progress': return '#dc2626';
                  case 'active': return '#f59e0b';
                  case 'completed': return '#22c55e';
                  case 'planning': return '#3b82f6';
                  default: return '#6b7280';
                }
              };

              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  style={{
                    padding: '16px',
                    background: isSelected ? 'rgba(220, 38, 38, 0.1)' : 'rgba(63, 63, 70, 0.2)',
                    border: `1px solid ${isSelected ? '#dc2626' : 'rgba(63, 63, 70, 0.4)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.2)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: 0
                    }}>{project.name}</h3>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: getStatusColor(project.status),
                      borderRadius: '50%'
                    }}></div>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    margin: '0 0 8px 0'
                  }}>{project.client_company}</p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#71717a',
                      fontSize: '12px'
                    }}>Progress: {project.progress}%</span>
                    <span style={{
                      color: getStatusColor(project.status),
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>{project.status.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Center */}
        <MessageCenter projectId={projectsData.selectedProject?.id} />
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div style={{ flex: 1, padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Settings
        </h1>
        <p style={{ color: '#9ca3af' }}>Configure your account and preferences.</p>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
            Profile Information
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>JD</span>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '500' }}>John Doe</h4>
              <p style={{ color: '#9ca3af' }}>john.doe@company.com</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
            Preferences
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'white', fontWeight: '500' }}>Email Notifications</p>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Receive updates about your projects</p>
              </div>
              <div style={{
                width: '44px',
                height: '24px',
                background: '#dc2626',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  transition: 'all 0.2s ease'
                }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'white', fontWeight: '500' }}>SMS Notifications</p>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Get text messages for urgent updates</p>
              </div>
              <div style={{
                width: '44px',
                height: '24px',
                background: '#6b7280',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  transition: 'all 0.2s ease'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [location] = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    { 
      name: 'Projects', 
      href: '/projects', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
        </svg>
      )
    },
    { 
      name: 'Invoices', 
      href: '/invoices', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    { 
      name: 'Messages', 
      href: '/messages', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      )
    },
    { 
      name: 'Files', 
      href: '/files', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
          <polyline points="13,2 13,9 20,9"/>
        </svg>
      )
    },
    { 
      name: 'Tasks', 
      href: '/tasks', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,11 12,14 22,4"/>
          <path d="M21,12v7a2,2 0 01-2,2H5a2,2 0 01-2-2V5a2,2 0 012-2h11"/>
        </svg>
      )
    },
    { 
      name: 'Support', 
      href: '/support', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      )
    },
    { 
      name: 'Knowledge Base', 
      href: '/knowledge-base', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      )
    }
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: '0',
          display: 'flex',
          zIndex: 40
        }}>
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.75)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }} onClick={() => setIsOpen(false)} />
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '320px',
            width: '100%',
            background: '#000000',
            borderRight: '1px solid rgba(63, 63, 70, 0.4)',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '-48px'
            }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  background: 'rgba(31, 41, 55, 0.8)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingTop: '20px',
              paddingBottom: '16px',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>J</span>
                </div>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                  <span style={{ color: 'white' }}>JABV</span><span style={{ color: '#dc2626' }}>Labs</span>
                </h1>
              </div>
              
              <nav style={{ marginTop: '20px', flex: 1, padding: '0 12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {navigation.map((item) => {
                    const isActive = location === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          fontSize: '16px',
                          fontWeight: '500',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          background: isActive 
                            ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' 
                            : 'transparent',
                          color: isActive ? 'white' : '#d1d5db'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#d1d5db';
                          }
                        }}
                      >
                        <span style={{ marginRight: '16px', fontSize: '20px' }}>{item.icon}</span>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </nav>
              
              <div style={{
                marginTop: 'auto',
                padding: '0 12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <span style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>JD</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: 0 }}>John Doe</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>john.doe@company.com</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#d1d5db',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#d1d5db';
                  }}
                >
                  <span style={{ marginRight: '12px' }}>↪️</span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div style={{
        display: window.innerWidth >= 768 ? 'flex' : 'none',
        width: '256px',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          background: '#000000',
          borderRight: '1px solid rgba(63, 63, 70, 0.4)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingTop: '20px',
            paddingBottom: '16px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>J</span>
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: 'white' }}>JABV</span><span style={{ color: '#dc2626' }}>Labs</span>
              </h1>
            </div>
            
            <nav style={{ marginTop: '20px', flex: 1, padding: '0 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navigation.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        background: isActive 
                          ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' 
                          : 'transparent',
                        color: isActive ? 'white' : '#d1d5db'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.target.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#d1d5db';
                        }
                      }}
                    >
                      <span style={{ marginRight: '12px', fontSize: '16px' }}>{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
            
            <div style={{
              marginTop: 'auto',
              padding: '0 12px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                marginBottom: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>JD</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: 0 }}>John Doe</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>john.doe@company.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#d1d5db',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#d1d5db';
                }}
              >
                <span style={{ marginRight: '12px' }}>↪️</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div style={{
        paddingLeft: window.innerWidth >= 768 ? '256px' : '0',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Top Navigation Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          padding: '16px 24px',
          background: '#000000',
          borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {window.innerWidth < 768 && (
              <button
                type="button"
                style={{
                  height: '40px',
                  width: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: '#a1a1aa',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSidebarOpen(true)}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#a1a1aa';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            )}
            
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/dashboard" style={{
                color: '#a1a1aa',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Dashboard
              </a>
            </nav>
          </div>
          
          {/* User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#dc2626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>U</span>
              </div>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>User</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.5">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
          </div>
        </div>
        
        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-details');
  };

  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
    setCurrentView('dashboard');
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setCurrentView('projects');
  };

  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} />
        <Route path="/dashboard">
          <AppLayout>
            {currentView === 'dashboard' && (
              <ClientDashboard 
                onProjectClick={handleProjectClick} 
                onNavigate={(path) => window.location.href = path}
              />
            )}
            {currentView === 'project-details' && selectedProjectId && (
              <ProjectDetails 
                projectId={selectedProjectId} 
                onBack={handleBackToDashboard} 
              />
            )}
          </AppLayout>
        </Route>
        <Route path="/projects">
          <AppLayout>
            {currentView === 'projects' && (
              <Projects />
            )}
            {currentView === 'project-details' && selectedProjectId && (
              <ProjectDetails 
                projectId={selectedProjectId} 
                onBack={handleBackToProjects} 
              />
            )}
          </AppLayout>
        </Route>
        <Route path="/invoices">
          <AppLayout>
            <InvoicePage />
          </AppLayout>
        </Route>
        <Route path="/messages">
          <AppLayout>
            <MessageCenter />
          </AppLayout>
        </Route>
        <Route path="/files">
          <AppLayout>
            <FilesPage />
          </AppLayout>
        </Route>
        <Route path="/tasks">
          <AppLayout>
            <TasksPage />
          </AppLayout>
        </Route>
        <Route path="/support">
          <AppLayout>
            <SupportPage />
          </AppLayout>
        </Route>
        <Route path="/knowledge-base">
          <AppLayout>
            <KnowledgeBasePage />
          </AppLayout>
        </Route>
        <Route path="/settings">
          <AppLayout>
            <SettingsPage />
          </AppLayout>
        </Route>
        <Route>
          <div style={{
            minHeight: '100vh',
            background: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
                404 - Page Not Found
              </h1>
              <Link href="/" style={{ color: '#dc2626', textDecoration: 'none' }}>
                Return to Login
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}