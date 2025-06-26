import React, { useState } from 'react';
import { Router, Route, Switch, Link, useLocation } from 'wouter';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/dashboard';
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
          <span style={{ color: '#dc2626' }}>JABV</span>Labs
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

          {/* Sign In Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#dc2626',
              color: 'white',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#b91c1c';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#dc2626';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Sign In
          </button>

          {/* Forgot Password */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <a href="#" style={{
              color: '#a1a1aa',
              fontSize: '14px',
              textDecoration: 'none'
            }}>
              Forgot your password?
            </a>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(63, 63, 70, 0.4)'
            }}></div>
            <span style={{
              padding: '0 16px',
              color: '#71717a',
              fontSize: '14px'
            }}>
              New to JABV Labs?
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(63, 63, 70, 0.4)'
            }}></div>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            style={{
              width: '100%',
              background: 'transparent',
              color: '#a1a1aa',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              border: '1px solid rgba(63, 63, 70, 0.8)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(113, 113, 122, 0.8)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(63, 63, 70, 0.8)';
              e.target.style.color = '#a1a1aa';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Create Account
          </button>
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

function Dashboard() {
  return (
    <div style={{ flex: 1, padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#9ca3af' }}>Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          { name: 'Active Projects', value: '4', color: '#3b82f6' },
          { name: 'Completed Tasks', value: '127', color: '#10b981' },
          { name: 'Team Members', value: '8', color: '#8b5cf6' },
          { name: 'Total Hours', value: '2,340', color: '#f59e0b' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500' }}>{stat.name}</p>
                <p style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginTop: '4px' }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: stat.color,
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>
          Recent Activity
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { action: 'Project milestone completed', project: 'E-commerce Platform', time: '2 hours ago', color: '#dc2626' },
            { action: 'New message from team', project: 'Mobile App Development', time: '4 hours ago', color: '#3b82f6' },
            { action: 'File uploaded to project', project: 'Website Redesign', time: '6 hours ago', color: '#10b981' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: activity.color,
                borderRadius: '50%',
                marginTop: '8px'
              }}></div>
              <div>
                <p style={{ color: 'white', fontWeight: '500' }}>{activity.action}</p>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{activity.project}</p>
                <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div style={{ flex: 1, padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Projects
        </h1>
        <p style={{ color: '#9ca3af' }}>Manage your active projects and view progress.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {[
          { name: 'E-commerce Platform', progress: 85, status: 'On Track', deadline: 'Feb 15, 2024', team: 4, statusColor: '#10b981' },
          { name: 'Mobile App Development', progress: 62, status: 'In Progress', deadline: 'Mar 01, 2024', team: 3, statusColor: '#3b82f6' }
        ].map((project, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>
                  {project.name}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Full-stack solution with modern design</p>
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${project.statusColor}20`,
                color: project.statusColor,
                border: `1px solid ${project.statusColor}30`
              }}>
                {project.status}
              </span>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>Progress</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{project.progress}%</span>
              </div>
              <div style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                height: '8px'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  height: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.5s ease'
                }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#9ca3af' }}>Due: {project.deadline}</span>
                <span style={{ color: '#9ca3af' }}>{project.team} members</span>
              </div>
              <button style={{
                color: '#dc2626',
                background: 'none',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
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
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Projects', href: '/projects', icon: '📁' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
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
            background: 'rgba(31, 41, 55, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
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
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>JABV Labs</h1>
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
          background: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
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
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>JABV Labs</h1>
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
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)'
    }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div style={{
        paddingLeft: window.innerWidth >= 768 ? '256px' : '0',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: window.innerWidth < 768 ? 'block' : 'none',
          padding: '4px 12px',
          background: 'rgba(31, 41, 55, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            type="button"
            style={{
              height: '48px',
              width: '48px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: '#d1d5db',
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
              e.target.style.color = '#d1d5db';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
        
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} />
        <Route path="/dashboard">
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </Route>
        <Route path="/projects">
          <AppLayout>
            <Projects />
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