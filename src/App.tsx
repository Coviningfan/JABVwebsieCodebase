import React, { useState } from 'react';
import { Router, Route, Switch, Link, useLocation } from 'wouter';
import { Menu, X, Home, FolderOpen, Settings, LogOut } from 'lucide-react';

// Modern login screen with professional design
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.01"%3E%3Ccircle cx="10" cy="10" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="flex min-h-screen">
        {/* Left side - Professional branding */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-red-500/2 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center px-20 py-24 max-w-2xl">
            <div className="mb-20">
              <div className="flex items-center space-x-5 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/25 ring-1 ring-white/10">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <div>
                  <h1 className="text-6xl font-bold text-white leading-none tracking-tight">JABV Labs</h1>
                  <p className="text-red-400 font-semibold text-xl mt-1">Client Portal</p>
                </div>
              </div>
              <p className="text-2xl text-gray-300 leading-relaxed font-light">
                Your centralized workspace for project collaboration, real-time updates, and seamless communication with our development team.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-3 shadow-lg shadow-red-500/50 ring-2 ring-red-500/20"></div>
                <div>
                  <h3 className="text-white font-semibold text-xl mb-2">Project Intelligence</h3>
                  <p className="text-gray-400 text-lg">Real-time progress tracking, milestone management, and automated reporting</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-3 shadow-lg shadow-blue-500/50 ring-2 ring-blue-500/20"></div>
                <div>
                  <h3 className="text-white font-semibold text-xl mb-2">Secure Collaboration</h3>
                  <p className="text-gray-400 text-lg">End-to-end encrypted messaging and file sharing with your dedicated team</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-3 shadow-lg shadow-green-500/50 ring-2 ring-green-500/20"></div>
                <div>
                  <h3 className="text-white font-semibold text-xl mb-2">Asset Management</h3>
                  <p className="text-gray-400 text-lg">Centralized access to all project deliverables, documentation, and resources</p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 pt-8 border-t border-gray-700/30">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-gray-500 text-sm">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-gray-500 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-500 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Premium login form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-20">
          <div className="w-full max-w-lg">
            {/* Mobile header */}
            <div className="text-center mb-16 lg:hidden">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <h1 className="text-4xl font-bold text-white">JABV Labs</h1>
              </div>
              <p className="text-gray-400 text-xl">Client Portal Access</p>
            </div>
            
            {/* Premium login form */}
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl shadow-black/40 ring-1 ring-white/5">
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/30 ring-1 ring-white/10">
                  <span className="text-white font-bold text-4xl">J</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome Back</h2>
                <p className="text-gray-400 text-xl">Access your project workspace</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-8">
                  <div>
                    <label htmlFor="email" className="block text-base font-semibold text-gray-200 mb-4">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full pl-16 pr-5 py-6 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 focus:bg-white/[0.05] transition-all duration-300 ring-1 ring-white/5"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-base font-semibold text-gray-200 mb-4">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full pl-16 pr-16 py-6 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 focus:bg-white/[0.05] transition-all duration-300 ring-1 ring-white/5"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center focus:outline-none group"
                      >
                        {showPassword ? (
                          <svg className="h-6 w-6 text-gray-400 hover:text-gray-300 focus:text-red-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122L3 3m6.878 6.878L12 12" />
                          </svg>
                        ) : (
                          <svg className="h-6 w-6 text-gray-400 hover:text-gray-300 focus:text-red-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-red-600 focus:ring-red-500/50 border-gray-500 rounded bg-white/10 backdrop-blur-sm ring-1 ring-white/5"
                    />
                    <label htmlFor="remember-me" className="ml-4 block text-base text-gray-300 font-medium">
                      Keep me signed in
                    </label>
                  </div>

                  <div className="text-base">
                    <a href="#" className="font-semibold text-red-400 hover:text-red-300 transition-colors duration-200">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center items-center py-6 px-8 border border-transparent text-xl font-semibold rounded-2xl text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 focus:ring-offset-transparent transition-all duration-300 shadow-2xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/50 transform hover:scale-[1.02] active:scale-[0.98] ring-1 ring-white/10"
                  >
                    <span className="flex items-center space-x-4">
                      <span>Access Portal</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-base text-gray-400 text-center mb-6">
                  New to JABV Labs?{' '}
                  <a href="#" className="font-semibold text-red-400 hover:text-red-300 transition-colors">
                    Request Access
                  </a>
                </p>

                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 ring-1 ring-white/5">
                  <h4 className="text-base font-semibold text-gray-200 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Demo Credentials
                  </h4>
                  <div className="space-y-3 font-mono text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-red-400 font-medium">john.doe@company.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Password:</span>
                      <span className="text-red-400 font-medium">ClientPortal123</span>
                    </div>
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

function Dashboard() {
  const stats = [
    { name: 'Active Projects', value: '3', change: '+12%', trend: 'up', icon: '📊', color: 'text-red-500' },
    { name: 'Messages', value: '12', change: '+4', trend: 'up', icon: '💬', color: 'text-blue-500' },
    { name: 'Files Shared', value: '24', change: '+8', trend: 'up', icon: '📁', color: 'text-green-500' },
    { name: 'Team Members', value: '5', change: '+1', trend: 'up', icon: '👥', color: 'text-purple-500' }
  ];

  const recentProjects = [
    { name: 'Website Redesign', progress: 75, status: 'In Progress', deadline: '2 days', priority: 'high' },
    { name: 'Mobile App', progress: 25, status: 'Planning', deadline: '1 week', priority: 'medium' },
    { name: 'Brand Identity', progress: 100, status: 'Completed', deadline: 'Completed', priority: 'low' }
  ];

  const recentActivity = [
    { action: 'New message from Project Manager', time: '2 minutes ago', type: 'message' },
    { action: 'File uploaded: design-mockups.pdf', time: '1 hour ago', type: 'file' },
    { action: 'Project milestone completed', time: '3 hours ago', type: 'milestone' },
    { action: 'Team meeting scheduled', time: '1 day ago', type: 'event' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-gray-400">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'} font-medium`}>
                {stat.change}
              </span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <Link href="/projects" className="text-red-400 hover:text-red-300 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-600/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{project.progress}% complete</span>
                    <span>{project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'message' ? 'bg-blue-500' :
                    activity.type === 'file' ? 'bg-green-500' :
                    activity.type === 'milestone' ? 'bg-red-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { 
      id: 1, 
      name: 'Website Redesign', 
      status: 'In Progress', 
      progress: 75,
      client: 'Tech Corp',
      deadline: 'Dec 30, 2025',
      team: ['John D.', 'Sarah M.', 'Mike R.'],
      description: 'Complete overhaul of the company website with modern design and improved UX.',
      priority: 'high'
    },
    { 
      id: 2, 
      name: 'Mobile App Development', 
      status: 'Planning', 
      progress: 25,
      client: 'StartupCo',
      deadline: 'Feb 15, 2026',
      team: ['Alex K.', 'Lisa P.'],
      description: 'Native iOS and Android app for customer engagement and loyalty.',
      priority: 'medium'
    },
    { 
      id: 3, 
      name: 'Brand Identity Package', 
      status: 'Completed', 
      progress: 100,
      client: 'Creative Agency',
      deadline: 'Completed',
      team: ['Emma T.', 'David L.'],
      description: 'Complete brand identity including logo, guidelines, and marketing materials.',
      priority: 'low'
    },
    { 
      id: 4, 
      name: 'E-commerce Platform', 
      status: 'In Progress', 
      progress: 60,
      client: 'Retail Plus',
      deadline: 'Jan 20, 2026',
      team: ['Chris B.', 'Anna W.', 'Tom H.'],
      description: 'Custom e-commerce solution with advanced inventory management.',
      priority: 'high'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status.toLowerCase().replace(' ', '') === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: projects.length,
    planning: projects.filter(p => p.status === 'Planning').length,
    inprogress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-gray-400">Manage and track all your active projects</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + New Project
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All', count: statusCounts.all },
            { key: 'planning', label: 'Planning', count: statusCounts.planning },
            { key: 'inprogress', label: 'In Progress', count: statusCounts.inprogress },
            { key: 'completed', label: 'Completed', count: statusCounts.completed }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{project.name}</h3>
                    <p className="text-gray-400 text-sm">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      project.priority === 'high' ? 'bg-red-500' :
                      project.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-600/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Due: {project.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span>Team: {project.team.join(', ')}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex lg:flex-col gap-2">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No projects found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
}

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue="client@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue="Example Corp"
            />
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [location] = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, count: null },
    { name: 'Projects', href: '/projects', icon: FolderOpen, count: 4 },
    { name: 'Settings', href: '/settings', icon: Settings, count: null },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-900/75 backdrop-blur-sm ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`} onClick={() => setIsOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800/95 backdrop-blur-xl border-r border-gray-700/50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <h1 className="text-xl font-bold text-white">JABV Labs</h1>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between px-3 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-4 h-5 w-5" />
                      {item.name}
                    </div>
                    {item.count && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* User section */}
            <div className="mt-auto px-3 pt-4 border-t border-gray-700/50">
              <div className="flex items-center px-3 py-3 mb-3 bg-gray-700/30 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>
                  <p className="text-xs text-gray-400 truncate">john.doe@company.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800/95 backdrop-blur-xl border-r border-gray-700/50">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <h1 className="text-xl font-bold text-white">JABV Labs</h1>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    {item.count && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* User section */}
            <div className="mt-auto px-3 pt-4 border-t border-gray-700/50">
              <div className="flex items-center px-3 py-3 mb-3 bg-gray-700/30 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>
                  <p className="text-xs text-gray-400 truncate">john.doe@company.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
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
    <div className="min-h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-900">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
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
        <Route path="/login" component={LoginScreen} />
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
            <Settings />
          </AppLayout>
        </Route>
        <Route>
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404</h1>
              <p className="text-gray-400 mb-4">Page not found</p>
              <Link href="/dashboard" className="text-red-500 hover:text-red-400">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}