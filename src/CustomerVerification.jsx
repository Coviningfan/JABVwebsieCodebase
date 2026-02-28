import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './database.js';

export default function CustomerVerification() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verification, setVerification] = useState(null);

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const { data: verificationData, error } = await supabase
        .from('customer_verifications')
        .select('*')
        .eq('verification_token', token)
        .eq('status', 'pending')
        .single();

      if (error || !verificationData) {
        setError('Invalid or expired verification link');
        setLoading(false);
        return;
      }

      if (new Date(verificationData.expires_at) < new Date()) {
        setError('Verification link has expired');
        setLoading(false);
        return;
      }

      setVerification(verificationData);
      setLoading(false);
    } catch (error) {
      console.error('Token validation error:', error);
      setError('An error occurred while validating your verification link');
      setLoading(false);
    }
  };

  const handlePasswordSetup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: verification.email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (authError) throw authError;

      const { error: updateError } = await supabase
        .from('customer_verifications')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString()
        })
        .eq('verification_token', token);

      if (updateError) throw updateError;

      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);

    } catch (error) {
      console.error('Password setup error:', error);
      setError(error.message || 'An error occurred while setting up your password');
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #333',
            borderTop: '4px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
            Validating verification link...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: '#1a1a1a',
          padding: '48px',
          borderRadius: '12px',
          border: '1px solid #333',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#dc2626',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '24px'
          }}>
            ✕
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '16px' }}>
            Verification Failed
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: '#1a1a1a',
          padding: '48px',
          borderRadius: '12px',
          border: '1px solid #333',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#16a34a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '24px'
          }}>
            ✓
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '16px' }}>
            Account Verified!
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '24px' }}>
            Your account has been successfully verified. You can now access the JABV Labs client portal.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Redirecting to login page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '24px'
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
            Set up your password
          </p>
        </div>

        <div style={{
          background: '#0a0a0a',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #333',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0' }}>
            Welcome! Please create a secure password for your account:
          </p>
          <p style={{ color: '#ffffff', fontSize: '14px', margin: '8px 0 0 0', fontWeight: '600' }}>
            {verification?.email}
          </p>
        </div>

        <form onSubmit={handlePasswordSetup}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: '100%',
                padding: '12px',
                background: '#000000',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
              placeholder="Enter your password"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: '100%',
                padding: '12px',
                background: '#000000',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
              placeholder="Confirm your password"
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
            {loading ? 'Setting up account...' : 'Complete Setup'}
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
            margin: '0',
            textAlign: 'center'
          }}>
            Password must be at least 8 characters long
          </p>
        </div>
      </div>
    </div>
  );
}
