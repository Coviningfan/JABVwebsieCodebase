import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

export default function HeroWithBanner({ loadingComplete }: { loadingComplete?: boolean }) {
  console.log('🔄 HeroWithBanner component rendering with loadingComplete:', loadingComplete);
  
  // Use refs to persist animation state across re-renders
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [typewriterTagline, setTypewriterTagline] = useState('');
  const [typewriterJABV, setTypewriterJABV] = useState('');
  const [typewriterLabs, setTypewriterLabs] = useState('');
  const [showTaglineCursor, setShowTaglineCursor] = useState(false);
  const [showJABVCursor, setShowJABVCursor] = useState(false);
  const [showLabsCursor, setShowLabsCursor] = useState(false);
  const [taglineComplete, setTaglineComplete] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  console.log('📊 Current states:', {
    typewriterTagline,
    typewriterJABV,
    typewriterLabs,
    taglineComplete,
    animationComplete,
    animationStarted: animationStartedRef.current
  });

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

  // Complete typewriter effect sequence
  useEffect(() => {
    const timestamp = Date.now();
    console.log(`[${timestamp}] Typewriter useEffect triggered:`, { 
      loadingComplete, 
      animationStarted: animationStartedRef.current,
      isVisible,
      showBanner 
    });
    
    if (loadingComplete !== true) {
      console.log(`[${timestamp}] Skipped: loadingComplete is not true (${loadingComplete})`);
      return;
    }
    
    if (animationStartedRef.current) {
      console.log(`[${timestamp}] Skipped: animation already started`);
      return;
    }
    
    console.log(`[${timestamp}] ✅ CONDITIONS MET - Starting typewriter animation sequence...`);
    animationStartedRef.current = true;
    
    const taglineText = 'Build Your Future with';
    const jabvText = 'JABV';
    const labsText = 'Labs';
    
    console.log(`[${timestamp}] Setting up typewriter delays and animations...`);
    
    // Start typewriter sequence after component is ready
    const startDelay = setTimeout(() => {
      console.log(`[${timestamp}] 🎯 Starting tagline typing animation`);
      setShowTaglineCursor(true);
      
      // Step 1: Type the tagline "Build Your Future with"
      let taglineIndex = 0;
      const typeTagline = () => {
        if (taglineIndex < taglineText.length) {
          const currentText = taglineText.substring(0, taglineIndex + 1);
          console.log(`[${timestamp}] Typing tagline: "${currentText}"`);
          setTypewriterTagline(currentText);
          taglineIndex++;
          const timeout = setTimeout(typeTagline, 60 + Math.random() * 30);
          timeoutsRef.current.push(timeout);
        } else {
          console.log(`[${timestamp}] ✅ Tagline complete: "${taglineText}"`);
          // Tagline complete, brief pause then hide cursor
          setTimeout(() => {
            setShowTaglineCursor(false);
            setTaglineComplete(true);
            console.log(`[${timestamp}] 🎯 Starting JABV typing animation`);
            
            // Step 2: Brief pause (100ms) then start "JABV Labs"
            setTimeout(() => {
              setShowJABVCursor(true);
              
              // Type "JABV" character by character
              let jabvIndex = 0;
              const typeJABV = () => {
                if (jabvIndex < jabvText.length) {
                  const currentText = jabvText.substring(0, jabvIndex + 1);
                  console.log(`[${timestamp}] Typing JABV: "${currentText}"`);
                  setTypewriterJABV(currentText);
                  jabvIndex++;
                  const timeout = setTimeout(typeJABV, 80 + Math.random() * 40);
                  timeoutsRef.current.push(timeout);
                } else {
                  console.log(`[${timestamp}] ✅ JABV complete: "${jabvText}"`);
                  // JABV complete, transition to Labs immediately
                  setTimeout(() => {
                    setShowJABVCursor(false);
                    setShowLabsCursor(true);
                    console.log(`[${timestamp}] 🎯 Starting Labs typing animation`);
                    
                    // Type "Labs" character by character
                    let labsIndex = 0;
                    const typeLabs = () => {
                      if (labsIndex < labsText.length) {
                        const currentText = labsText.substring(0, labsIndex + 1);
                        console.log(`[${timestamp}] Typing Labs: "${currentText}"`);
                        setTypewriterLabs(currentText);
                        labsIndex++;
                        const timeout = setTimeout(typeLabs, 80 + Math.random() * 40);
                        timeoutsRef.current.push(timeout);
                      } else {
                        console.log(`[${timestamp}] ✅ Labs complete: "${labsText}"`);
                        console.log(`[${timestamp}] 🎉 ENTIRE TYPEWRITER SEQUENCE COMPLETE!`);
                        // Labs complete, hide cursor after 2 seconds
                        setTimeout(() => {
                          setShowLabsCursor(false);
                          setAnimationComplete(true);
                          console.log(`[${timestamp}] Final cursor hidden, animation complete`);
                        }, 2000);
                      }
                    };
                    typeLabs();
                  }, 50);
                }
              };
              
              typeJABV();
            }, 100);
          }, 200);
        }
      };
      
      typeTagline();
    }, 1000);
    
    timeoutsRef.current.push(startDelay);
    
    // Only cleanup on unmount, not on re-renders
    return () => {
      if (!animationStartedRef.current) {
        console.log(`[${timestamp}] 🧹 Component unmounting, cleaning up ${timeoutsRef.current.length} timeouts`);
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutsRef.current = [];
      }
    };
  }, [loadingComplete]);

  return (
    <>
      {/* Customer banner */}
      {showBanner && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black text-white shadow-md animate-slide-down">
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
      )}

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
            <h1 className="font-bold mb-6 leading-tight text-white">
              <div className="text-4xl md:text-5xl mb-4">
                <span className="text-white">
                  {animationStartedRef.current ? typewriterTagline : 'Build Your Future with'}
                  {showTaglineCursor && <span className="animate-pulse">|</span>}
                </span>
              </div>
              {(taglineComplete || !animationStartedRef.current) && (
                <div className="text-5xl md:text-7xl">
                  <span className="text-white">
                    {animationStartedRef.current ? typewriterJABV : 'JABV'}
                    {showJABVCursor && <span className="animate-pulse">|</span>}
                  </span>
                  <span style={{ color: '#C82222' }}>
                    {animationStartedRef.current ? typewriterLabs : 'Labs'}
                    {showLabsCursor && <span className="animate-pulse" style={{ color: '#C82222' }}>|</span>}
                  </span>
                </div>
              )}
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
