import React, { useState, useEffect } from 'react';
import { dataService } from './dataService';
import { supabase } from './database';

export default function ProfileSettings({ onClose }) {
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    company_name: '',
    phone: '',
    profile_picture_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = dataService.getCurrentUser();
      if (user) {
        setProfileData({
          full_name: user.full_name || '',
          email: user.email || '',
          company_name: user.company_name || '',
          phone: user.phone || '',
          profile_picture_url: user.profile_picture_url || ''
        });
        setNameChanged(user.name_changed || false);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.data.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update profile with new picture URL
      setProfileData(prev => ({ ...prev, profile_picture_url: publicUrl }));
      setSuccess('Profile picture uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload profile picture');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Not authenticated');

      // Check if name is being changed and if it's allowed
      const currentUser = dataService.getCurrentUser();
      if (currentUser?.full_name !== profileData.full_name && nameChanged) {
        setError('You can only change your name once');
        setSaving(false);
        return;
      }

      // Update profile in database
      const { error: updateError } = await supabase
        .from('clients')
        .update({
          full_name: profileData.full_name,
          company_name: profileData.company_name,
          phone: profileData.phone,
          profile_picture_url: profileData.profile_picture_url,
          name_changed: currentUser?.full_name !== profileData.full_name ? true : nameChanged
        })
        .eq('id', user.data.user.id);

      if (updateError) throw updateError;

      // Refresh user context
      await dataService.refreshUserContext();
      
      setSuccess('Profile updated successfully');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save profile changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}>
        <div style={{
          background: '#18181b',
          borderRadius: '12px',
          padding: '32px',
          color: 'white'
        }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '20px'
    }}>
      <div style={{
        background: '#18181b',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '1px solid rgba(63, 63, 70, 0.4)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, color: 'white', fontSize: '24px' }}>Profile Settings</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#ef4444'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#22c55e'
          }}>
            {success}
          </div>
        )}

        {/* Profile Picture */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#e5e7eb', fontSize: '14px' }}>
            Profile Picture
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: profileData.profile_picture_url ? 'transparent' : '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid rgba(63, 63, 70, 0.4)'
            }}>
              {profileData.profile_picture_url ? (
                <img
                  src={profileData.profile_picture_url}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>
                  {profileData.full_name ? 
                    profileData.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 
                    'U'}
                </span>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{ display: 'none' }}
                id="profile-picture-input"
              />
              <label
                htmlFor="profile-picture-input"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.5 : 1,
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                {uploading ? 'Uploading...' : 'Change Picture'}
              </label>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#e5e7eb', fontSize: '14px' }}>
            Full Name {nameChanged && <span style={{ color: '#ef4444' }}>(Cannot be changed again)</span>}
          </label>
          <input
            type="text"
            value={profileData.full_name}
            onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
            disabled={nameChanged}
            style={{
              width: '100%',
              padding: '12px',
              background: nameChanged ? 'rgba(24, 24, 27, 0.5)' : '#27272a',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '6px',
              color: nameChanged ? '#6b7280' : 'white',
              fontSize: '14px',
              cursor: nameChanged ? 'not-allowed' : 'text'
            }}
          />
        </div>

        {/* Email (Read-only) */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#e5e7eb', fontSize: '14px' }}>
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            disabled
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(24, 24, 27, 0.5)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '6px',
              color: '#6b7280',
              fontSize: '14px',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Company Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#e5e7eb', fontSize: '14px' }}>
            Company Name
          </label>
          <input
            type="text"
            value={profileData.company_name}
            onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              background: '#27272a',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '6px',
              color: 'white',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#e5e7eb', fontSize: '14px' }}>
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              background: '#27272a',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '6px',
              color: 'white',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '6px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(63, 63, 70, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 24px',
              background: '#dc2626',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: saving ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!saving) e.currentTarget.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              if (!saving) e.currentTarget.style.background = '#dc2626';
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}