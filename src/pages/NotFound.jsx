import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="white" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center space-x-2 w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </Link>
          
          <Link
            to="/login-screen"
            className="inline-flex items-center justify-center space-x-2 w-full bg-surface text-text-primary border border-border px-6 py-3 rounded-lg font-medium hover:bg-background transition-colors"
          >
            <Icon name="LogIn" size={20} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;