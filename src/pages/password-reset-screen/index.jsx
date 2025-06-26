import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const PasswordResetScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const { resetPassword } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result?.success) {
        setIsEmailSent(true);
        setCanResend(false);
        
        // Enable resend after 60 seconds
        setTimeout(() => {
          setCanResend(true);
        }, 60000);
      } else {
        setError(result?.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setCanResend(false);
    
    try {
      const result = await resetPassword(email);
      
      if (!result?.success) {
        setError(result?.error || 'Failed to resend email. Please try again.');
      } else {
        // Enable resend after 60 seconds
        setTimeout(() => {
          setCanResend(true);
        }, 60000);
      }
    } catch (err) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo and Header - Updated Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            <span className="text-[#AB1C1C]">JABV</span>
            <span className="text-white ml-1">Labs</span>
          </h1>
          <h2 className="text-xl font-semibold text-white mb-2">Reset Password</h2>
          <p className="text-gray-400 font-body">
            Enter your email address and we will send you a link to reset your password
          </p>
        </div>

        {/* Main Content */}
        <div className="card-dark p-8">
          {!isEmailSent ? (
            /* Reset Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-heading">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Mail" size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-colors bg-black/40 text-white placeholder-gray-300"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-950/20 border border-red-600/30 rounded-lg p-3">
                  <Icon name="AlertCircle" size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#AB1C1C] text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-[#AB1C1C] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Message - Fixed Visibility */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} color="white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 font-heading">Check Your Email</h3>
                <p className="text-gray-300 mb-4 font-body">
                  We have sent a password reset link to <strong className="text-white">{email}</strong>
                </p>
                
                {/* Fixed Instructions Container */}
                <div className="password-reset-instructions">
                  <h4 className="font-medium text-white mb-2 flex items-center space-x-2">
                    <Icon name="Info" size={16} className="text-[#AB1C1C]" />
                    <span>Important Instructions:</span>
                  </h4>
                  <ul className="text-sm text-white space-y-1 text-left">
                    <li>• Check your spam or junk folder if you do not see the email</li>
                    <li>• The reset link will expire in 15 minutes for security</li>
                    <li>• Click the link in the email to create a new password</li>
                    <li>• Contact support if you do not receive the email</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={!canResend || isLoading}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Resending...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="RefreshCw" size={20} />
                      <span>{canResend ? 'Resend Email' : 'Resend Available in 60s'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <Link
                to="/login-screen"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Back to Login</span>
              </Link>
              
              <Link
                to="/registration-screen"
                className="text-[#AB1C1C] hover:text-red-400 font-medium transition-colors"
              >
                Create New Account
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="card-dark p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-green-400 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-white mb-1 font-heading">Security and Privacy</h3>
                <p className="text-sm text-gray-400 font-body">
                  Your data is protected with enterprise-grade security. Reset links are encrypted and expire automatically for your protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetScreen;