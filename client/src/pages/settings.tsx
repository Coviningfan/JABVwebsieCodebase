import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function Settings() {
  const [, setLocation] = useLocation();
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@company.com');
  const [companyName, setCompanyName] = useState('TechCorp Solutions');

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Save changes logic would go here
    alert('Changes saved successfully!');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">
              <span className="text-red-500">JABV</span>Labs
            </h1>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setLocation('/dashboard')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                📊 Dashboard
              </button>
              <button 
                onClick={() => setLocation('/projects')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                📁 Projects
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                ⚙️ Settings
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              User
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Menu */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Settings Menu</h3>
              <div className="space-y-2">
                <button className="w-full text-left bg-red-500 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  👤 Profile Settings
                </button>
                <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  🔒 Security (Coming Soon)
                </button>
                <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  🔔 Notifications (Coming Soon)
                </button>
                <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  🎨 Appearance (Coming Soon)
                </button>
              </div>
            </div>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Settings */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl text-white">
                      👤
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Profile Settings</h2>
                      <p className="text-gray-400 text-sm">Update your personal information</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveChanges} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                        disabled
                      />
                      <p className="text-gray-500 text-xs mt-1">Email cannot be changed for security reasons</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter your company name"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        💾 Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Account Type:</p>
                      <p className="font-medium">Client</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Member Since:</p>
                      <p className="font-medium">N/A</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Updated:</p>
                      <p className="font-medium">N/A</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-sm transition-colors">
                      🔑 Change Password
                    </button>
                    <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-sm transition-colors">
                      📧 Update Email Preferences
                    </button>
                    <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-sm transition-colors">
                      📱 Two-Factor Authentication
                    </button>
                    <button className="w-full text-left bg-red-900 hover:bg-red-800 text-red-200 p-3 rounded-lg text-sm transition-colors">
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}