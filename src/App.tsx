import React, { useState } from 'react';
import { Router, Route, Switch, Link, useLocation } from 'wouter';

// Icons as simple SVGs to avoid any external dependencies
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="16" r="1"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">J</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="text-red-500">JABV</span>Labs
          </h1>
          <p className="text-gray-400">Client Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to access your projects</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 focus:border-opacity-50 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 focus:border-opacity-50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-red-600 bg-white bg-opacity-5 border-white border-opacity-10 rounded focus:ring-red-500 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-red-950 bg-opacity-20 border border-red-800 border-opacity-20 rounded-lg">
            <h4 className="text-sm font-medium text-red-400 mb-2">Demo Credentials</h4>
            <div className="text-xs space-y-1 text-gray-300">
              <p>Email: <span className="text-red-400">john.doe@company.com</span></p>
              <p>Password: <span className="text-red-400">ClientPortal123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Projects</p>
              <p className="text-3xl font-bold text-white mt-1">4</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-600 bg-opacity-20 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Completed Tasks</p>
              <p className="text-3xl font-bold text-white mt-1">127</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-green-600 bg-opacity-20 flex items-center justify-center">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Team Members</p>
              <p className="text-3xl font-bold text-white mt-1">8</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-purple-600 bg-opacity-20 flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Hours</p>
              <p className="text-3xl font-bold text-white mt-1">2,340</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-yellow-600 bg-opacity-20 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-gray-700 bg-opacity-30 rounded-xl">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium">Project milestone completed</p>
              <p className="text-gray-400 text-sm">E-commerce Platform</p>
              <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-gray-700 bg-opacity-30 rounded-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium">New message from team</p>
              <p className="text-gray-400 text-sm">Mobile App Development</p>
              <p className="text-gray-500 text-xs mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-gray-700 bg-opacity-30 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium">File uploaded to project</p>
              <p className="text-gray-400 text-sm">Website Redesign</p>
              <p className="text-gray-500 text-xs mt-1">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-gray-400">Manage your active projects and view progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">E-commerce Platform</h3>
              <p className="text-gray-400 text-sm">Full-stack e-commerce solution with payment integration</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900 bg-opacity-50 text-green-400 border border-green-700 border-opacity-50">
              On Track
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium text-white">85%</span>
            </div>
            <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Due: Feb 15, 2024</span>
              <span className="text-gray-400">4 members</span>
            </div>
            <button className="text-red-400 hover:text-red-300 font-medium">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Mobile App Development</h3>
              <p className="text-gray-400 text-sm">React Native app for iOS and Android platforms</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900 bg-opacity-50 text-blue-400 border border-blue-700 border-opacity-50">
              In Progress
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium text-white">62%</span>
            </div>
            <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Due: Mar 01, 2024</span>
              <span className="text-gray-400">3 members</span>
            </div>
            <button className="text-red-400 hover:text-red-300 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure your account and preferences.</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <div>
                <h4 className="text-white font-medium">John Doe</h4>
                <p className="text-gray-400">john.doe@company.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-opacity-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm">Receive updates about your projects</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">SMS Notifications</p>
                <p className="text-gray-400 text-sm">Get text messages for urgent updates</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
              </button>
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
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`} onClick={() => setIsOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 bg-opacity-95 backdrop-blur-xl border-r border-gray-700 border-opacity-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50"
              onClick={() => setIsOpen(false)}
            >
              <XIcon />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <h1 className="text-xl font-bold text-white">JABV Labs</h1>
            </div>
            
            <nav className="mt-5 flex-1 px-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-base font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 hover:text-white'
                    }`}
                  >
                    <Icon />
                    <span className="ml-4">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto px-3 pt-4 border-t border-gray-700 border-opacity-50">
              <div className="flex items-center px-3 py-3 mb-3 bg-gray-700 bg-opacity-30 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>
                  <p className="text-xs text-gray-400 truncate">john.doe@company.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 hover:text-white rounded-lg transition-colors"
              >
                <LogOutIcon />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800 bg-opacity-95 backdrop-blur-xl border-r border-gray-700 border-opacity-50">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <h1 className="text-xl font-bold text-white">JABV Labs</h1>
            </div>
            
            <nav className="mt-5 flex-1 px-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 hover:text-white'
                    }`}
                  >
                    <Icon />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto px-3 pt-4 border-t border-gray-700 border-opacity-50">
              <div className="flex items-center px-3 py-3 mb-3 bg-gray-700 bg-opacity-30 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>  
                  <p className="text-xs text-gray-400 truncate">john.doe@company.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 hover:text-white rounded-lg transition-colors"
              >
                <LogOutIcon />
                <span className="ml-3">Sign Out</span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-800 bg-opacity-50 backdrop-blur-sm border-b border-gray-700 border-opacity-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
        
        <main className="flex-1">
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
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
              <Link href="/" className="text-red-400 hover:text-red-300">
                Return to Login
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}