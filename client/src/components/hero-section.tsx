import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

export default function HeroWithBanner({ loadingComplete }: { loadingComplete?: boolean }) {
  // Generate unique render ID to track component lifecycle
  const renderTimestamp = Date.now();
  const renderIdRef = useRef(`render-${renderTimestamp}-${Math.random().toString(36).substr(2, 5)}`);
  const renderCountRef = useRef(0);
  const lastLoadingCompleteRef = useRef(loadingComplete);
  
  // Use refs to persist animation state across re-renders and hot reloads
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const componentMountedRef = useRef(false);
  
  renderCountRef.current += 1;
  
  // Detect prop changes
  const propChanged = lastLoadingCompleteRef.current !== loadingComplete;
  if (propChanged) {
    console.log(`🔥 PROP CHANGE DETECTED [${renderIdRef.current}]:`, {
      from: lastLoadingCompleteRef.current,
      to: loadingComplete,
      renderCount: renderCountRef.current
    });
    lastLoadingCompleteRef.current = loadingComplete;
  }
  
  console.log(`🔄 [${renderIdRef.current}] COMPONENT RENDER #${renderCountRef.current}:`, { 
    loadingComplete, 
    animationStarted: animationStartedRef.current,
    activeTimeouts: timeoutsRef.current.length,
    propChanged,
    componentMounted: componentMountedRef.current,
    timestamp: renderTimestamp
  });
  
  // Single state object to reduce re-renders
  const [animationState, setAnimationState] = useState(() => {
    const initialState = {
      isVisible: false,
      showBanner: false,
      typewriterTagline: '',
      typewriterJABV: '',
      typewriterLabs: '',
      showTaglineCursor: false,
      showJABVCursor: false,
      showLabsCursor: false,
      taglineComplete: false,
      typewriterStarted: false,
      animationComplete: false
    };
    console.log(`📍 [${renderIdRef.current}] STATE INITIALIZING:`, initialState);
    return initialState;
  });

  // Track state changes obsessively with manual comparison to avoid TypeScript issues
  const prevStateRef = useRef(animationState);
  useEffect(() => {
    const prev = prevStateRef.current;
    const curr = animationState;
    const changes: Record<string, any> = {};
    
    // Manual comparison for each field
    if (prev.isVisible !== curr.isVisible) changes.isVisible = { from: prev.isVisible, to: curr.isVisible };
    if (prev.showBanner !== curr.showBanner) changes.showBanner = { from: prev.showBanner, to: curr.showBanner };
    if (prev.typewriterTagline !== curr.typewriterTagline) changes.typewriterTagline = { from: prev.typewriterTagline, to: curr.typewriterTagline };
    if (prev.typewriterJABV !== curr.typewriterJABV) changes.typewriterJABV = { from: prev.typewriterJABV, to: curr.typewriterJABV };
    if (prev.typewriterLabs !== curr.typewriterLabs) changes.typewriterLabs = { from: prev.typewriterLabs, to: curr.typewriterLabs };
    if (prev.showTaglineCursor !== curr.showTaglineCursor) changes.showTaglineCursor = { from: prev.showTaglineCursor, to: curr.showTaglineCursor };
    if (prev.showJABVCursor !== curr.showJABVCursor) changes.showJABVCursor = { from: prev.showJABVCursor, to: curr.showJABVCursor };
    if (prev.showLabsCursor !== curr.showLabsCursor) changes.showLabsCursor = { from: prev.showLabsCursor, to: curr.showLabsCursor };
    if (prev.taglineComplete !== curr.taglineComplete) changes.taglineComplete = { from: prev.taglineComplete, to: curr.taglineComplete };
    if (prev.typewriterStarted !== curr.typewriterStarted) changes.typewriterStarted = { from: prev.typewriterStarted, to: curr.typewriterStarted };
    if (prev.animationComplete !== curr.animationComplete) changes.animationComplete = { from: prev.animationComplete, to: curr.animationComplete };
    
    if (Object.keys(changes).length > 0) {
      console.log(`🔀 [${renderIdRef.current}] STATE CHANGES:`, changes);
      console.log(`📊 [${renderIdRef.current}] FULL STATE:`, animationState);
      
      // Track specific changes that might cause visual refresh
      if (changes.typewriterTagline || changes.typewriterJABV || changes.typewriterLabs) {
        console.log(`💥 [${renderIdRef.current}] TEXT CHANGE DETECTED - RE-RENDER TRIGGERED!`);
        console.log(`⚡ [${renderIdRef.current}] DOM WILL UPDATE - POTENTIAL VISUAL FLICKER!`);
      }
      if (changes.isVisible) {
        console.log(`👀 [${renderIdRef.current}] VISIBILITY CHANGE - LAYOUT SHIFT INCOMING!`);
      }
      if (changes.taglineComplete) {
        console.log(`🎯 [${renderIdRef.current}] TAGLINE COMPLETE - SECOND LINE WILL APPEAR!`);
      }
    }
    
    prevStateRef.current = { ...animationState };
  });

  // Destructure for easier access
  const {
    isVisible,
    showBanner,
    typewriterTagline,
    typewriterJABV,
    typewriterLabs,
    showTaglineCursor,
    showJABVCursor,
    showLabsCursor,
    taglineComplete,
    typewriterStarted,
    animationComplete
  } = animationState;
  
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
    if (!componentMountedRef.current) {
      console.log(`🚀 [${renderIdRef.current}] COMPONENT MOUNTED - Setting up visibility animations`);
      componentMountedRef.current = true;
    } else {
      console.log(`⚠️ [${renderIdRef.current}] Visibility useEffect triggered but component already mounted`);
    }
    
    console.log(`🎯 [${renderIdRef.current}] Setting isVisible: true`);
    setAnimationState(prev => ({ ...prev, isVisible: true }));
    
    const delay = setTimeout(() => {
      console.log(`🎯 [${renderIdRef.current}] Setting showBanner: true`);
      setAnimationState(prev => ({ ...prev, showBanner: true }));
    }, 1400);
    return () => {
      console.log(`🧹 [${renderIdRef.current}] Visibility useEffect cleanup`);
      clearTimeout(delay);
    };
  }, []);

  // Complete typewriter effect sequence
  useEffect(() => {
    const effectId = `effect-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    console.log(`🔬 [${renderIdRef.current}][${effectId}] TYPEWRITER EFFECT TRIGGERED:`, { 
      loadingComplete, 
      animationStarted: animationStartedRef.current,
      renderCount: renderCountRef.current
    });
    
    if (loadingComplete !== true) {
      console.log(`❌ [${renderIdRef.current}][${effectId}] SKIPPED: loadingComplete is not true (${loadingComplete})`);
      return;
    }
    
    if (animationStartedRef.current) {
      console.log(`❌ [${renderIdRef.current}][${effectId}] SKIPPED: animation already started`);
      return;
    }
    
    console.log(`✅ [${renderIdRef.current}][${effectId}] CONDITIONS MET - Starting typewriter animation sequence...`);
    console.log(`🎬 [${renderIdRef.current}][${effectId}] ANIMATION START - MOMENT OF POTENTIAL VISUAL REFRESH!`);
    animationStartedRef.current = true;
    
    const taglineText = 'Build Your Future with';
    const jabvText = 'JABV';
    const labsText = 'Labs';
    
    console.log('Setting up typewriter delays and animations...');
    
    // Start typewriter sequence with smooth transition timing
    const startDelay = setTimeout(() => {
      console.log('🎯 Starting tagline typing animation');
      setAnimationState(prev => ({ ...prev, showTaglineCursor: true }));
      
      // Step 1: Type the tagline "Build Your Future with"
      let taglineIndex = 0;
      const typeTagline = () => {
        if (taglineIndex < taglineText.length) {
          const currentText = taglineText.substring(0, taglineIndex + 1);
          console.log(`📝 [${renderIdRef.current}][${effectId}] Typing tagline: "${currentText}"`);
          console.log(`🔄 [${renderIdRef.current}][${effectId}] ABOUT TO UPDATE STATE - DOM CHANGE INCOMING!`);
          setAnimationState(prev => ({ ...prev, typewriterTagline: currentText }));
          console.log(`✅ [${renderIdRef.current}][${effectId}] STATE UPDATE DISPATCHED - COMPONENT WILL RE-RENDER!`);
          taglineIndex++;
          const timeout = setTimeout(typeTagline, 60 + Math.random() * 30);
          timeoutsRef.current.push(timeout);
        } else {
          console.log(`✅ Tagline complete: "${taglineText}"`);
          // Tagline complete, brief pause then hide cursor
          setTimeout(() => {
            setAnimationState(prev => ({ 
              ...prev, 
              showTaglineCursor: false, 
              taglineComplete: true 
            }));
            console.log('🎯 Starting JABV typing animation');
            
            // Step 2: Brief pause (100ms) then start "JABV Labs"
            setTimeout(() => {
              setAnimationState(prev => ({ ...prev, showJABVCursor: true }));
              
              // Type "JABV" character by character
              let jabvIndex = 0;
              const typeJABV = () => {
                if (jabvIndex < jabvText.length) {
                  const currentText = jabvText.substring(0, jabvIndex + 1);
                  console.log(`Typing JABV: "${currentText}"`);
                  setAnimationState(prev => ({ ...prev, typewriterJABV: currentText }));
                  jabvIndex++;
                  const timeout = setTimeout(typeJABV, 80 + Math.random() * 40);
                  timeoutsRef.current.push(timeout);
                } else {
                  console.log(`✅ JABV complete: "${jabvText}"`);
                  // JABV complete, transition to Labs immediately
                  setTimeout(() => {
                    setAnimationState(prev => ({ 
                      ...prev, 
                      showJABVCursor: false, 
                      showLabsCursor: true 
                    }));
                    console.log('🎯 Starting Labs typing animation');
                    
                    // Type "Labs" character by character
                    let labsIndex = 0;
                    const typeLabs = () => {
                      if (labsIndex < labsText.length) {
                        const currentText = labsText.substring(0, labsIndex + 1);
                        console.log(`Typing Labs: "${currentText}"`);
                        setAnimationState(prev => ({ ...prev, typewriterLabs: currentText }));
                        labsIndex++;
                        const timeout = setTimeout(typeLabs, 80 + Math.random() * 40);
                        timeoutsRef.current.push(timeout);
                      } else {
                        console.log(`✅ Labs complete: "${labsText}"`);
                        console.log('🎉 ENTIRE TYPEWRITER SEQUENCE COMPLETE!');
                        // Labs complete, hide cursor after 2 seconds
                        setTimeout(() => {
                          setAnimationState(prev => ({ 
                            ...prev, 
                            showLabsCursor: false, 
                            animationComplete: true 
                          }));
                          console.log('Final cursor hidden, animation complete');
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
    }, 200);
    
    timeoutsRef.current.push(startDelay);
    
    // Only cleanup on unmount, not on re-renders
    return () => {
      console.log('🧹 Component unmounting, cleaning up timeouts');
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
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
              onClick={() => setAnimationState(prev => ({ ...prev, showBanner: false }))}
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
            <h1 className="font-bold mb-6 leading-tight text-white min-h-[200px] flex flex-col justify-center">
              <div className="text-4xl md:text-5xl mb-4 min-h-[60px] flex items-center justify-center">
                <span className="text-white transition-opacity duration-300">
                  {animationStartedRef.current ? typewriterTagline : ''}
                  {showTaglineCursor && <span className="animate-pulse">|</span>}
                </span>
              </div>
              <div className={`text-5xl md:text-7xl min-h-[80px] flex items-center justify-center transition-opacity duration-300 ${taglineComplete ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white">
                  {typewriterJABV}
                  {showJABVCursor && <span className="animate-pulse">|</span>}
                </span>
                <span style={{ color: '#C82222' }}>
                  {typewriterLabs}
                  {showLabsCursor && <span className="animate-pulse" style={{ color: '#C82222' }}>|</span>}
                </span>
              </div>
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
