import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

export default function HeroWithBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [typewriterJABV, setTypewriterJABV] = useState('');
  const [typewriterLabs, setTypewriterLabs] = useState('');
  const [showJABVCursor, setShowJABVCursor] = useState(false);
  const [showLabsCursor, setShowLabsCursor] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const delay = setTimeout(() => setShowBanner(true), 1400);
    return () => clearTimeout(delay);
  }, []);

  // Typewriter effect for JABV Labs
  useEffect(() => {
    const jabvText = 'JABV';
    const labsText = 'Labs';
    
    // Start typewriter after hero becomes visible
    const startDelay = setTimeout(() => {
      setShowJABVCursor(true);
      
      // Type "JABV" first
      jabvText.split('').forEach((char, index) => {
        setTimeout(() => {
          setTypewriterJABV(prev => prev + char);
        }, index * 100);
      });
      
      // After "JABV" is complete, hide cursor and start "Labs"
      setTimeout(() => {
        setShowJABVCursor(false);
        setShowLabsCursor(true);
        
        // Start typing "Labs" after 400ms delay
        setTimeout(() => {
          labsText.split('').forEach((char, index) => {
            setTimeout(() => {
              setTypewriterLabs(prev => prev + char);
            }, index * 100);
          });
          
          // Hide "Labs" cursor after completion
          setTimeout(() => {
            setShowLabsCursor(false);
          }, labsText.length * 100 + 500);
        }, 400);
      }, jabvText.length * 100 + 200);
    }, 800); // Sync with hero fade-in
    
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <>
      {/* Top fixed container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Customer banner */}
        {showBanner && (
          <div className="bg-black text-white shadow-md animate-slide-down">
            <div className="flex items-center justify-between px-4 py-2">
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
                className="text-gray-400 hover:text-red-500"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Persistent Nav Bar */}
        <div className="bg-black shadow-md border-t border-white/10">
          <div className="flex justify-center items-center gap-6 py-3 text-sm md:text-base text-white uppercase font-medium tracking-wide">
            <button onClick={() => scrollToSection('home')} className="hover:text-red-400 transition">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-red-400 transition">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-red-400 transition">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-red-400 transition">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ paddingTop: showBanner ? '112px' : '56px' }}
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
              <span className="block">Build Your Future with</span>
              <span className="block min-h-[1.2em]">
                <span className="text-white">
                  {typewriterJABV}
                  {showJABVCursor && <span className="animate-pulse">|</span>}
                </span>
                {typewriterJABV.length === 4 && (
                  <>
                    <span className="text-white"> </span>
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                      {typewriterLabs}
                      {showLabsCursor && <span className="animate-pulse text-red-500">|</span>}
                    </span>
                  </>
                )}
              </span>
            </h1>

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
