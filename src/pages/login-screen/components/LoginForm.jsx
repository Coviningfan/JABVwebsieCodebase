import React, { useState } from 'react';
import Icon from '../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-heading">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={20} color="#9CA3AF" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-[#AB1C1C] transition-smooth font-body bg-black/40 text-white placeholder-gray-300 ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' :'border-white/20'
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1 font-body">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-2 font-heading">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} color="#9CA3AF" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#AB1C1C] focus:border-[#AB1C1C] transition-smooth font-body bg-black/40 text-white placeholder-gray-300 ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' :'border-white/20'
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-smooth"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? "EyeOff" : "Eye"} 
              size={20} 
              color="#9CA3AF" 
            />
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1 font-body">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 bg-[#AB1C1C] text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-[#AB1C1C] focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed font-heading"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Signing in...
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} className="mr-2" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;