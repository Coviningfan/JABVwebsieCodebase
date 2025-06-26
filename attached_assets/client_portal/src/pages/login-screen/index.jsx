import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, authError, clearError } = useAuth();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    clearError();

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Branding - Updated */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            <span className="text-[#AB1C1C]">JABV</span>
            <span className="text-white ml-1">Labs</span>
          </h1>
          <p className="text-gray-400 font-body">Sign in to access your projects</p>
        </div>

        {/* Login Form Container */}
        <div className="card-dark p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2 font-heading">Welcome back</h2>
            <p className="text-gray-400 font-body">Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-6 p-4 bg-red-950/20 border border-red-600/30 rounded-lg flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} color="#EF4444" />
              <p className="text-red-400 text-sm font-body">{authError}</p>
            </div>
          )}

          {/* Login Form */}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          {/* Additional Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link
                to="/password-reset-screen"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors font-body hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400 font-body">New to JABV Labs?</span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/registration-screen"
                className="btn-secondary inline-flex items-center justify-center w-full"
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-red-950/20 border border-red-600/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="#AB1C1C" className="mt-0.5" />
            <div>
              <p className="text-red-400 font-medium text-sm mb-1 font-heading">Demo Credentials</p>
              <p className="text-red-300 text-xs font-body">
                Email: john.doe@company.com<br />
                Password: ClientPortal123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;