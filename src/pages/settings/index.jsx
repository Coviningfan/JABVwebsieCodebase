import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, userProfile, updateProfile, authError, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    email: user?.email || '',
    companyName: userProfile?.company_name || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    clearError();

    try {
      const result = await updateProfile({
        full_name: formData.fullName,
        company_name: formData.companyName
      });

      if (result?.success) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.log('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">Settings</h1>
          <p className="text-gray-400 font-body">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-heading">Settings Menu</h3>
              <nav className="space-y-2">
                <button className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg bg-[#AB1C1C] text-white">
                  <Icon name="User" size={16} />
                  <span>Profile Settings</span>
                </button>
                <button className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-smooth cursor-not-allowed opacity-50">
                  <Icon name="Lock" size={16} />
                  <span>Security (Coming Soon)</span>
                </button>
                <button className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-smooth cursor-not-allowed opacity-50">
                  <Icon name="Bell" size={16} />
                  <span>Notifications (Coming Soon)</span>
                </button>
                <button className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-smooth cursor-not-allowed opacity-50">
                  <Icon name="Palette" size={16} />
                  <span>Appearance (Coming Soon)</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Profile Settings Form */}
          <div className="lg:col-span-2">
            <div className="card-dark p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white font-heading">Profile Settings</h2>
                  <p className="text-gray-400 text-sm font-body mt-1">Update your personal information</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-red">
                  <Icon name="User" size={32} color="white" />
                </div>
              </div>

              {/* Success Message */}
              {message && (
                <div className="mb-6 p-4 bg-green-950/20 border border-green-600/30 rounded-lg flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} color="#10B981" />
                  <p className="text-green-400 text-sm font-body">{message}</p>
                </div>
              )}

              {/* Error Message */}
              {authError && (
                <div className="mb-6 p-4 bg-red-950/20 border border-red-600/30 rounded-lg flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} color="#EF4444" />
                  <p className="text-red-400 text-sm font-body">{authError}</p>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2 font-heading">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="User" size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-heading">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Mail" size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-gray-800/40 text-gray-400 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 font-body">Email cannot be changed for security reasons</p>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2 font-heading">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Building2" size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-smooth font-medium font-body"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-[#AB1C1C] text-white rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-[#AB1C1C] focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-heading"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Save" size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Account Information */}
            <div className="card-dark p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-heading">Account Information</h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Type:</span>
                  <span className="text-white capitalize">{userProfile?.role || 'Client'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span className="text-white">
                    {userProfile?.created_at 
                      ? new Date(userProfile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white">
                    {userProfile?.updated_at 
                      ? new Date(userProfile.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;