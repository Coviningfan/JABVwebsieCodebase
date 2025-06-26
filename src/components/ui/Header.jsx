import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/project-details', icon: 'FolderOpen' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
  ];

  const isAuthenticatedRoute = () => {
    const authenticatedRoutes = ['/dashboard', '/project-details', '/projects', '/settings'];
    return authenticatedRoutes.some(route => location.pathname.startsWith(route));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path || (path === '/project-details' && location.pathname.startsWith('/projects/'));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      navigate('/login-screen');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticatedRoute()) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 z-header">
        <div className="max-w-7xl mx-auto px-header">
          <div className="flex items-center justify-between h-16">
            {/* JABV Labs Logo - Updated Branding */}
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-3 transition-hover hover:opacity-80"
            >
              <div className="font-heading font-bold text-xl">
                <span className="text-[#AB1C1C]">JABV</span>
                <span className="text-white ml-1">Labs</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-interactive text-sm font-medium transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-red' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              {/* User Account Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-interactive text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-red">
                    <Icon name="User" size={16} color="#FFFFFF" />
                  </div>
                  <span className="hidden sm:block">{userProfile?.full_name || user?.email || 'User'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-xl shadow-modal border border-white/20 z-dropdown">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-white/20">
                        <p className="text-sm font-medium text-white font-heading">{userProfile?.full_name || 'User'}</p>
                        <p className="text-xs text-gray-400 font-body">{user?.email}</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-smooth flex items-center space-x-2 font-body"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-smooth flex items-center space-x-2 font-body"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-interactive text-gray-300 hover:text-white hover:bg-white/10 transition-smooth hover:scale-105"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-dropdown md:hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeMobileMenu}></div>
          <div className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-modal">
            <nav className="px-header py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-interactive text-base font-medium transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-red' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;