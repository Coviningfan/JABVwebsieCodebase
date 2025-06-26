import { useState, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useLocation } from 'wouter';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToSection } = useSmoothScroll();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (location !== '/') {
      // If not on home page, navigate to home first
      setLocation('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect' : 'bg-black/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={() => setLocation('/')} className="block">
              <h1 className="text-2xl font-bold cursor-pointer">
                <span className="text-white">JABV</span>
                <span className="gradient-text">Labs</span>
              </h1>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavClick('home')}
                className="nav-link text-white hover:text-red-500 transition-all duration-300 px-3 py-2 text-sm font-medium relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => handleNavClick('services')}
                className="nav-link text-white hover:text-red-500 transition-all duration-300 px-3 py-2 text-sm font-medium relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="nav-link text-white hover:text-red-500 transition-all duration-300 px-3 py-2 text-sm font-medium relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => setLocation('/contact')}
                className="nav-link text-white px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative"
                style={{ backgroundColor: '#C82222' }}
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-600 focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="block px-3 py-2 text-base font-medium text-white hover:text-red-600 transition-colors duration-200 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('services')}
              className="block px-3 py-2 text-base font-medium text-white hover:text-red-600 transition-colors duration-200 w-full text-left"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="block px-3 py-2 text-base font-medium text-white hover:text-red-600 transition-colors duration-200 w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => setLocation('/contact')}
              className="block px-4 py-2 text-base font-medium text-white rounded-lg transition-colors duration-200 w-full text-left"
              style={{ backgroundColor: '#C82222' }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
