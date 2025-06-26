import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, authError, clearError } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const getPasswordStrength = (password) => {
    const validation = validatePassword(password);
    const score = [
      validation.minLength,
      validation.hasUpperCase,
      validation.hasLowerCase,
      validation.hasNumbers,
      validation.hasSpecialChar
    ].filter(Boolean).length;

    if (score <= 2) return { strength: 'Weak', color: 'bg-error', width: '33%' };
    if (score <= 4) return { strength: 'Medium', color: 'bg-warning', width: '66%' };
    return { strength: 'Strong', color: 'bg-success', width: '100%' };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password must meet all requirements';
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName
      });

      if (result?.success) {
        // Navigate to dashboard after successful registration
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.fullName.trim() &&
           formData.email.trim() &&
           validateEmail(formData.email) &&
           formData.password &&
           validatePassword(formData.password).isValid &&
           formData.confirmPassword &&
           formData.password === formData.confirmPassword &&
           formData.acceptTerms;
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;
  const passwordValidation = formData.password ? validatePassword(formData.password) : {};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo and Header - Updated Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            <span className="text-[#AB1C1C]">JABV</span>
            <span className="text-white ml-1">Labs</span>
          </h1>
          <p className="text-gray-400 font-body">
            Join our client portal to manage your projects
          </p>
        </div>

        {/* Registration Form */}
        <div className="card-dark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2 font-heading">
                Full Name *
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300 ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-heading">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Mail" size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300 ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2 font-heading">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300 ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showPassword ? "EyeOff" : "Eye"} 
                    size={20} 
                    className="text-gray-400 hover:text-white transition-colors" 
                  />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength === 'Strong' ? 'text-green-400' :
                      passwordStrength.strength === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength === 'Strong' ? 'bg-green-400' :
                        passwordStrength.strength === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                      <Icon name={passwordValidation.minLength ? "Check" : "X"} size={12} className="mr-1" />
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-gray-400'}`}>
                      <Icon name={passwordValidation.hasUpperCase ? "Check" : "X"} size={12} className="mr-1" />
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.hasLowerCase ? 'text-green-400' : 'text-gray-400'}`}>
                      <Icon name={passwordValidation.hasLowerCase ? "Check" : "X"} size={12} className="mr-1" />
                      One lowercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.hasNumbers ? 'text-green-400' : 'text-gray-400'}`}>
                      <Icon name={passwordValidation.hasNumbers ? "Check" : "X"} size={12} className="mr-1" />
                      One number
                    </div>
                    <div className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                      <Icon name={passwordValidation.hasSpecialChar ? "Check" : "X"} size={12} className="mr-1" />
                      One special character
                    </div>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2 font-heading">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={20} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent transition-smooth bg-black/40 text-white placeholder-gray-300 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showConfirmPassword ? "EyeOff" : "Eye"} 
                    size={20} 
                    className="text-gray-400 hover:text-white transition-colors" 
                  />
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-1 text-sm text-green-400 flex items-center">
                  <Icon name="Check" size={16} className="mr-1" />
                  Passwords match
                </p>
              )}
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#AB1C1C] focus:ring-[#AB1C1C] border-white/20 rounded bg-black/40"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-[#AB1C1C] hover:text-red-400 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#AB1C1C] hover:text-red-400 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2 ${
                isFormValid() && !isLoading
                  ? 'bg-[#AB1C1C] text-white hover:bg-red-700' :'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {authError && (
              <div className="bg-red-950/20 border border-red-600/30 rounded-lg p-4">
                <p className="text-sm text-red-400 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-2" />
                  {authError}
                </p>
              </div>
            )}
          </form>

          {/* Mock Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Name:</strong> {mockCredentials.fullName}</p>
              <p><strong>Email:</strong> {mockCredentials.email}</p>
              <p><strong>Password:</strong> {mockCredentials.password}</p>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login-screen" 
                className="text-[#AB1C1C] hover:text-red-400 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;