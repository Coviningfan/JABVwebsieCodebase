import React, { useState } from 'react';
import { adminAuthService } from './adminAuthService.js';

export default function AdminLogin({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await adminAuthService.signIn(formData.email, formData.password);
    
    if (result.success) {
      onLoginSuccess(result.admin);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      <div style={{
        background: '#1a1a1a',
        padding: '48px',
        borderRadius: '12px',
        border: '1px solid #333',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            JABV <span style={{ color: '#dc2626' }}>Labs</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: '#000000',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: '#000000',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
            />
          </div>

          {error && (
            <div style={{
              color: '#dc2626',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#666' : '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#0a0a0a',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '12px',
            margin: '0 0 8px 0',
            fontWeight: '500'
          }}>
            Demo Credentials:
          </p>
          <p style={{
            color: '#ffffff',
            fontSize: '12px',
            margin: '0',
            fontFamily: 'monospace'
          }}>
            scooter@jabvlabs.com<br />
            AdminPortal123!
          </p>
        </div>
      </div>
    </div>
  );
}
