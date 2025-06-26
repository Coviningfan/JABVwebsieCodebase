import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - accept any credentials
    setLocation('/dashboard');
  };

  const useDemoCredentials = () => {
    setEmail('john.doe@company.com');
    setPassword('ClientPortal123');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-red-500">JABV</span>Labs
          </h1>
          <p className="text-gray-400">Sign in to access your projects</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-red-500 transition-colors"
                />
                <svg className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:border-red-500 transition-colors"
                />
                <svg className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-red-400 hover:text-red-300 text-sm">
              Forgot your password?
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm mb-4">New to JABV Labs?</p>
            <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-red-900/20 border border-red-800/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-red-400 font-medium text-sm mb-1">Demo Credentials</h3>
              <p className="text-red-300/80 text-xs mb-2">
                Email: john.doe@company.com<br />
                Password: ClientPortal123
              </p>
              <button
                onClick={useDemoCredentials}
                className="text-red-400 hover:text-red-300 text-xs underline"
              >
                Use these credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}