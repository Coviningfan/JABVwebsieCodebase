import React, { useState } from 'react';
import { Router, Route, Switch, Link, useLocation } from 'wouter';
import { Menu, X, Home, FolderOpen, Settings, LogOut } from 'lucide-react';

// Ultra-modern professional login screen
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Professional animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.03),transparent_40%)]"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-red-600/20 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/25 mb-8">
              <span className="text-white font-bold text-3xl">J</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="text-red-500">JABV</span>Labs
            </h1>
            <p className="text-gray-400 text-lg">Client Portal</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to access your projects</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-500 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122L3 3m6.878 6.878L12 12" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-500 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500/50 border-gray-600 rounded bg-white/10"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-red-400 hover:text-red-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 focus:ring-offset-slate-950 transition-all duration-200 shadow-xl shadow-red-600/25 hover:shadow-2xl hover:shadow-red-600/40 transform hover:scale-[1.02]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  <svg className="h-5 w-5 text-red-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
                Sign In
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="bg-red-950/30 border border-red-800/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Demo Credentials
                </h4>
                <div className="space-y-1 text-sm font-mono">
                  <p className="text-gray-300">Email: <span className="text-red-400">john.doe@company.com</span></p>
                  <p className="text-gray-300">Password: <span className="text-red-400">ClientPortal123</span></p>
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
    { name: 'Active Projects', value: '4', icon: FolderOpen, color: 'text-blue-400' },
    { name: 'Completed Tasks', value: '127', icon: Settings, color: 'text-green-400' },
    { name: 'Team Members', value: '8', icon: Settings, color: 'text-purple-400' },
    { name: 'Total Hours', value: '2,340', icon: Settings, color: 'text-yellow-400' },
  ];

  const recentActivity = [
    { id: 1, action: 'Project milestone completed', project: 'E-commerce Platform', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'New message from team', project: 'Mobile App Development', time: '4 hours ago', type: 'message' },
    { id: 3, action: 'File uploaded to project', project: 'Website Redesign', time: '6 hours ago', type: 'file' },
    { id: 4, action: 'Meeting scheduled', project: 'API Integration', time: '1 day ago', type: 'calendar' },
  ];

  const projects = [
    { name: 'E-commerce Platform', progress: 85, status: 'On Track', deadline: '2024-02-15', team: 4 },
    { name: 'Mobile App Development', progress: 62, status: 'In Progress', deadline: '2024-03-01', team: 3 },
    { name: 'Website Redesign', progress: 94, status: 'Almost Done', deadline: '2024-01-30', team: 2 },
    { name: 'API Integration', progress: 38, status: 'Planning', deadline: '2024-04-15', team: 5 },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-700/30 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.project}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Project Progress</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="p-4 bg-gray-700/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <span className="text-sm text-gray-400">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-600/50 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Due: {project.deadline}</span>
                  <span className="text-gray-400">{project.team} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
      <p className="text-gray-400">Manage your active projects and view progress.</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      <p className="text-gray-400">Configure your account and preferences.</p>
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
            <div className="flex-shrink-0 flex items-center px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <h1 className="text-xl font-bold text-white">JABV Labs</h1>
              </div>
            </div>
            
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
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <h1 className="text-xl font-bold text-white">JABV Labs</h1>
              </div>
            </div>
            
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors"
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