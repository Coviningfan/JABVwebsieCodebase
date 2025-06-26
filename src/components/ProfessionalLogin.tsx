import React, { useState } from 'react';

export default function ProfessionalLogin() {
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
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-red-500/5 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center px-16 py-24 max-w-lg mx-auto">
            <div className="mb-16">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/20">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white leading-tight">JABV Labs</h1>
                  <p className="text-red-400 font-medium text-lg">Client Portal</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Welcome to your dedicated project workspace. Monitor progress, collaborate with our team, and access all your project resources in one secure location.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 shadow-lg shadow-red-500/50"></div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Real-time Project Tracking</h3>
                  <p className="text-gray-400">Monitor milestones, deadlines, and team progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 shadow-lg shadow-blue-500/50"></div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Secure Communication</h3>
                  <p className="text-gray-400">Direct messaging with your project team</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 shadow-lg shadow-green-500/50"></div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">File Management</h3>
                  <p className="text-gray-400">Access documents, assets, and deliverables</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-700/30">
              <p className="text-gray-500 text-sm">
                Trusted by 500+ companies worldwide • Enterprise-grade security
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile header */}
            <div className="text-center mb-12 lg:hidden">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <h1 className="text-3xl font-bold text-white">JABV Labs</h1>
              </div>
              <p className="text-gray-400 text-lg">Client Portal Access</p>
            </div>
            
            {/* Login Form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/25">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/25">
                  <span className="text-white font-bold text-3xl">J</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
                <p className="text-gray-400 text-lg">Sign in to access your projects</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-4">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full pl-14 pr-4 py-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-4">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full pl-14 pr-16 py-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
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
                      className="h-5 w-5 text-red-600 focus:ring-red-500/50 border-gray-500 rounded bg-white/10 backdrop-blur-sm"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300 font-medium">
                      Keep me signed in
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-semibold text-red-400 hover:text-red-300 transition-colors duration-200">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center items-center py-5 px-8 border border-transparent text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 focus:ring-offset-transparent transition-all duration-300 shadow-xl shadow-red-600/25 hover:shadow-2xl hover:shadow-red-600/40 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center space-x-3">
                      <span>Sign In to Portal</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 text-center mb-4">
                  New to JABV Labs?{' '}
                  <a href="#" className="font-semibold text-red-400 hover:text-red-300 transition-colors">
                    Request Access
                  </a>
                </p>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Demo Credentials
                  </h4>
                  <div className="space-y-2 font-mono text-sm">
                    <p className="text-gray-300">Email: <span className="text-red-400">john.doe@company.com</span></p>
                    <p className="text-gray-300">Password: <span className="text-red-400">ClientPortal123</span></p>
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