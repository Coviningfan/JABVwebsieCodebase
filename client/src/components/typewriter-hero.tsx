import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TypewriterHeroProps {
  loadingComplete?: boolean;
}

export default function TypewriterHero({ loadingComplete = false }: TypewriterHeroProps) {
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!loadingComplete || animationStartedRef.current) return;
    
    animationStartedRef.current = true;

    // Pure JavaScript typewriter with zero React state
    const startAnimation = () => {
      const taglineEl = document.getElementById('typewriter-tagline');
      const jabvEl = document.getElementById('typewriter-jabv');
      const labsEl = document.getElementById('typewriter-labs');
      const jabvLabsContainer = document.getElementById('typewriter-jabv-labs');
      
      if (!taglineEl || !jabvEl || !labsEl || !jabvLabsContainer) return;

      // Clear all text and prepare for animation
      taglineEl.textContent = '';
      jabvEl.textContent = '';
      labsEl.textContent = '';
      jabvLabsContainer.style.opacity = '0';

      // Show tagline cursor
      const taglineCursor = document.createElement('span');
      taglineCursor.className = 'animate-pulse';
      taglineCursor.textContent = '|';
      taglineEl.appendChild(taglineCursor);

      const taglineText = 'Build Your Future with';
      let index = 0;

      const typeTagline = () => {
        if (index < taglineText.length) {
          taglineEl.textContent = taglineText.substring(0, index + 1);
          taglineEl.appendChild(taglineCursor);
          index++;
          timeoutsRef.current.push(setTimeout(typeTagline, 60 + Math.random() * 30));
        } else {
          // Remove cursor and show second line
          taglineCursor.remove();
          jabvLabsContainer.style.opacity = '1';
          
          setTimeout(() => {
            // Type JABV
            const jabvCursor = document.createElement('span');
            jabvCursor.className = 'animate-pulse';
            jabvCursor.textContent = '|';
            jabvEl.appendChild(jabvCursor);

            const jabvText = 'JABV';
            let jabvIndex = 0;

            const typeJABV = () => {
              if (jabvIndex < jabvText.length) {
                jabvEl.textContent = jabvText.substring(0, jabvIndex + 1);
                jabvEl.appendChild(jabvCursor);
                jabvIndex++;
                timeoutsRef.current.push(setTimeout(typeJABV, 80 + Math.random() * 40));
              } else {
                jabvCursor.remove();
                
                // Type Labs
                const labsCursor = document.createElement('span');
                labsCursor.className = 'animate-pulse';
                labsCursor.style.color = '#C82222';
                labsCursor.textContent = '|';
                labsEl.appendChild(labsCursor);

                const labsText = 'Labs';
                let labsIndex = 0;

                const typeLabs = () => {
                  if (labsIndex < labsText.length) {
                    labsEl.textContent = labsText.substring(0, labsIndex + 1);
                    labsEl.appendChild(labsCursor);
                    labsIndex++;
                    timeoutsRef.current.push(setTimeout(typeLabs, 80 + Math.random() * 40));
                  } else {
                    // Animation complete - remove final cursor after delay
                    setTimeout(() => labsCursor.remove(), 2000);
                  }
                };
                typeLabs();
              }
            };
            typeJABV();
          }, 100);
        }
      };

      setTimeout(typeTagline, 200);

      // Show banner after delay
      setTimeout(() => {
        const banner = document.querySelector('[data-banner]') as HTMLElement;
        if (banner) {
          banner.style.display = 'block';
          banner.style.opacity = '1';
        }
      }, 1400);
    };

    startAnimation();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
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
            onClick={() => {
              const bannerEl = document.querySelector('[data-banner]') as HTMLElement;
              if (bannerEl) {
                bannerEl.style.display = 'none';
                bannerEl.style.opacity = '0';
              }
            }}
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
        style={{ paddingTop: '80px' }}
      >
        {/* Background & overlay */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`bg-dot-${i}`}
              className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
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

        {/* Hero Content - No state transitions */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-100">
          <h1 className="font-bold mb-6 leading-tight text-white min-h-[200px] flex flex-col justify-center">
            <div className="text-4xl md:text-5xl mb-4 min-h-[60px] flex items-center justify-center">
              <span id="typewriter-tagline" className="text-white"></span>
            </div>
            <div 
              id="typewriter-jabv-labs" 
              className="text-5xl md:text-7xl min-h-[80px] flex items-center justify-center"
              style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
            >
              <span className="text-white">
                <span id="typewriter-jabv"></span>
              </span>
              <span style={{ color: '#C82222' }}>
                <span id="typewriter-labs"></span>
              </span>
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Custom mobile apps and websites that drive results. No templates — just premium development tailored to your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              Start Your Project
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              View Our Work
            </button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-sm">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm">Client Satisfaction</div>
            </div>
            <div className="w-px h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}