import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

export default function HeroWithBanner({ loadingComplete }: { loadingComplete?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  
  // Use refs to persist animation state across re-renders
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const componentMountedRef = useRef(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!componentMountedRef.current) {
      componentMountedRef.current = true;
    }
    
    setIsVisible(true);
    
    // Use DOM manipulation for banner to avoid re-render during animation
    const delay = setTimeout(() => {
      const bannerEl = document.querySelector('[data-banner]') as HTMLElement;
      if (bannerEl) {
        bannerEl.style.display = 'block';
        bannerEl.style.opacity = '1';
      }
    }, 1400);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  // Complete typewriter effect sequence using DOM manipulation to avoid re-renders
  useEffect(() => {
    if (loadingComplete !== true) {
      return;
    }
    
    if (animationStartedRef.current) {
      return;
    }
    
    animationStartedRef.current = true;
    
    // Start typewriter sequence with pure DOM manipulation (no React state updates)
    const startDelay = setTimeout(() => {
      const taglineEl = document.getElementById('typewriter-tagline');
      const taglineCursor = document.getElementById('tagline-cursor');
      const jabvLabsEl = document.getElementById('typewriter-jabv-labs');
      const jabvEl = document.getElementById('typewriter-jabv');
      const jabvCursor = document.getElementById('jabv-cursor');
      const labsEl = document.getElementById('typewriter-labs');
      const labsCursor = document.getElementById('labs-cursor');
      
      if (!taglineEl || !jabvLabsEl || !jabvEl || !labsEl) {
        console.error('Required DOM elements not found for typewriter animation');
        return;
      }
      
      // Step 1: Clear text and show tagline with cursor
      taglineEl.textContent = '';
      if (taglineCursor) taglineCursor.style.display = 'inline';
      
      const taglineText = 'Build Your Future with';
      let taglineIndex = 0;
      
      const typeTagline = () => {
        if (taglineIndex < taglineText.length) {
          const currentText = taglineText.substring(0, taglineIndex + 1);
          taglineEl.textContent = currentText;
          taglineIndex++;
          const timeout = setTimeout(typeTagline, 60 + Math.random() * 30);
          timeoutsRef.current.push(timeout);
        } else {
          // Hide tagline cursor and show second line
          if (taglineCursor) taglineCursor.style.display = 'none';
          jabvLabsEl.style.opacity = '1';
          
          setTimeout(() => {
            // Clear JABV and Labs text, show JABV cursor
            jabvEl.textContent = '';
            labsEl.textContent = '';
            if (jabvCursor) jabvCursor.style.display = 'inline';
            
            const jabvText = 'JABV';
            let jabvIndex = 0;
            
            const typeJABV = () => {
              if (jabvIndex < jabvText.length) {
                const currentText = jabvText.substring(0, jabvIndex + 1);
                jabvEl.textContent = currentText;
                jabvIndex++;
                const timeout = setTimeout(typeJABV, 80 + Math.random() * 40);
                timeoutsRef.current.push(timeout);
              } else {
                // Hide JABV cursor, show Labs cursor
                if (jabvCursor) jabvCursor.style.display = 'none';
                if (labsCursor) labsCursor.style.display = 'inline';
                
                const labsText = 'Labs';
                let labsIndex = 0;
                
                const typeLabs = () => {
                  if (labsIndex < labsText.length) {
                    const currentText = labsText.substring(0, labsIndex + 1);
                    labsEl.textContent = currentText;
                    labsIndex++;
                    const timeout = setTimeout(typeLabs, 80 + Math.random() * 40);
                    timeoutsRef.current.push(timeout);
                  } else {
                    // JABV Labs typing complete - trigger dramatic fade-in for content below
                    setTimeout(() => {
                      const heroContentEl = document.getElementById('hero-content');
                      if (heroContentEl) {
                        heroContentEl.style.opacity = '1';
                        heroContentEl.style.transform = 'translateY(0)';
                      }
                      
                      // Hide cursor after content fades in
                      setTimeout(() => {
                        if (labsCursor) labsCursor.style.display = 'none';
                      }, 800);
                    }, 300); // Brief pause before content appears
                  }
                };
                typeLabs();
              }
            };
            
            setTimeout(typeJABV, 100);
          }, 500); // 400-600ms pause as requested
        }
      };
      
      typeTagline();
    }, 200);
    
    timeoutsRef.current.push(startDelay);
    
    // Only cleanup on unmount, not on re-renders
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [loadingComplete]);

  return (
    <>
      {/* Customer banner */}
      <div 
        data-banner
        className="fixed top-16 left-0 right-0 z-40 bg-black text-white shadow-md animate-slide-down"
        style={{ display: 'none', opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
      >
        <div className="flex items-center justify-center px-4 py-2 relative">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-light">Already a customer?</span>
            <a
              href="https://portal.jabvlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full font-medium text-xs text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition duration-200 shadow-sm hover:shadow-md"
            >
              Login to your portal
            </a>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 text-gray-400 hover:text-red-500"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ paddingTop: showBanner ? '120px' : '80px' }}
      >
        {/* Background & overlay */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`bg-dot-${i}`}
              className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`float-particle-${i}`}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-neutral-900/50 to-black/60 pointer-events-none z-0" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="block text-white text-4xl md:text-6xl mb-2">
                <span id="typewriter-tagline"></span>
                <span id="tagline-cursor" className="animate-pulse" style={{ display: 'none' }}>|</span>
              </span>
              <span 
                id="typewriter-jabv-labs" 
                className="block min-h-[1.2em] bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
                style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
              >
                <span id="typewriter-jabv" className="text-white"></span>
                <span id="jabv-cursor" className="animate-pulse text-white" style={{ display: 'none' }}>|</span>
                <span id="typewriter-labs" className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"></span>
                <span id="labs-cursor" className="animate-pulse bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent" style={{ display: 'none' }}>|</span>
              </span>
            </h1>

            <div 
              id="hero-content" 
              className="opacity-0 transition-all duration-1000 ease-out transform translate-y-8"
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Custom mobile apps and websites that drive results. No templates — just premium development tailored to your business.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs md:text-sm">
                {[
                  'Tailored Software Solutions',
                  'iOS & Android App Development',
                  'Responsive Web Apps',
                  'Scalable Architecture',
                  'Pixel-Perfect UI/UX',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex justify-center items-center mb-8">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-red-500/25 min-w-[200px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get a Quote
                    <div className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">→</div>
                  </span>
                </button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400 text-sm">
                <a href="tel:7758005850" className="flex items-center gap-2 hover:text-red-400 transition-colors duration-200">
                  <Phone className="w-4 h-4" /> (775) 800-5850
                </a>
                <a href="mailto:contact@jabvlabs.com" className="flex items-center gap-2 hover:text-red-400 transition-colors duration-200">
                  <Mail className="w-4 h-4" /> contact@jabvlabs.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </section>
    </>
  );
}
