import React, { useState } from 'react';
import { adminAuthService } from './adminAuthService.js';

export default function AdminLayout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Projects', href: '/admin/projects', icon: '📁' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' }
  ];

  const handleLogout = async () => {
    await adminAuthService.signOut();
    onLogout();
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000000' }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        background: '#1a1a1a',
        borderRight: '1px solid #333',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #333'
        }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0
          }}>
            JABV <span style={{ color: '#dc2626' }}>Labs</span>
          </h1>
          <p style={{
            color: '#9ca3af',
            fontSize: '14px',
            margin: '4px 0 0 0'
          }}>
            Admin Portal
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '24px 0' }}>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                color: window.location.pathname === item.href ? '#dc2626' : '#9ca3af',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRight: window.location.pathname === item.href ? '3px solid #dc2626' : 'none',
                background: window.location.pathname === item.href ? 'rgba(220, 38, 38, 0.1)' : 'transparent'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>

        {/* User section */}
        <div style={{
          padding: '24px',
          borderTop: '1px solid #333'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold'
            }}>
              S
            </div>
            <div>
              <p style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                margin: 0
              }}>
                Scooter
              </p>
              <p style={{
                color: '#9ca3af',
                fontSize: '12px',
                margin: 0
              }}>
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px 16px',
              background: '#333',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
