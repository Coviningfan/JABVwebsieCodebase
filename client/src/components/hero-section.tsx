import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

const PARTICLE_DOTS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 17 + 13) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  delay: `${(i * 0.15) % 3}s`,
  duration: `${2 + (i * 0.1) % 2}s`,
}));

const FLOAT_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: `${(i * 19 + 5) % 100}%`,
  width: `${(i % 6) + 2}px`,
  height: `${(i % 6) + 2}px`,
  delay: `${(i * 1.3) % 20}s`,
  duration: `${(i % 10) + 15}s`,
}));

export default function HeroWithBanner({ loadingComplete }: { loadingComplete?: boolean }) {
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const bannerEl = document.querySelector('[data-banner]') as HTMLElement;
      if (bannerEl) {
        bannerEl.style.display = 'block';
        bannerEl.style.opacity = '1';
      }
    }, 1400);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (loadingComplete !== true || animationStartedRef.current) return;

    animationStartedRef.current = true;

    const startDelay = setTimeout(() => {
      const taglineEl = document.getElementById('typewriter-tagline');
      const taglineCursor = document.getElementById('tagline-cursor');
      const jabvLabsEl = document.getElementById('typewriter-jabv-labs');
      const jabvEl = document.getElementById('typewriter-jabv');
      const jabvCursor = document.getElementById('jabv-cursor');
      const labsEl = document.getElementById('typewriter-labs');
      const labsCursor = document.getElementById('labs-cursor');

      if (!taglineEl || !jabvLabsEl || !jabvEl || !labsEl) return;

      taglineEl.textContent = '';
      if (taglineCursor) taglineCursor.style.display = 'inline';

      const taglineText = 'Build Your Future with';
      let taglineIndex = 0;

      const typeTagline = () => {
        if (taglineIndex < taglineText.length) {
          taglineEl.textContent = taglineText.substring(0, taglineIndex + 1);
          taglineIndex++;
          const timeout = setTimeout(typeTagline, 60 + (taglineIndex * 7) % 30);
          timeoutsRef.current.push(timeout);
        } else {
          if (taglineCursor) taglineCursor.style.display = 'none';
          jabvLabsEl.style.opacity = '1';

          setTimeout(() => {
            jabvEl.textContent = '';
            labsEl.textContent = '';
            if (jabvCursor) jabvCursor.style.display = 'inline';

            const jabvText = 'JABV';
            let jabvIndex = 0;

            const typeJABV = () => {
              if (jabvIndex < jabvText.length) {
                jabvEl.textContent = jabvText.substring(0, jabvIndex + 1);
                jabvIndex++;
                const timeout = setTimeout(typeJABV, 80 + (jabvIndex * 11) % 40);
                timeoutsRef.current.push(timeout);
              } else {
                if (jabvCursor) jabvCursor.style.display = 'none';
                if (labsCursor) labsCursor.style.display = 'inline';

                const labsText = 'Labs';
                let labsIndex = 0;

                const typeLabs = () => {
                  if (labsIndex < labsText.length) {
                    labsEl.textContent = labsText.substring(0, labsIndex + 1);
                    labsIndex++;
                    const timeout = setTimeout(typeLabs, 80 + (labsIndex * 13) % 40);
                    timeoutsRef.current.push(timeout);
                  } else {
                    setTimeout(() => {
                      if (labsCursor) labsCursor.style.display = 'none';
                    }, 2000);
                  }
                };
                typeLabs();
              }
            };

            setTimeout(typeJABV, 100);
          }, 200);
        }
      };

      typeTagline();
    }, 200);

    timeoutsRef.current.push(startDelay);

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [loadingComplete]);

  return (
    <>
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

      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ paddingTop: '80px' }}
      >
        <div className="absolute inset-0 z-0">
          {PARTICLE_DOTS.map((p, i) => (
            <div
              key={`bg-dot-${i}`}
              className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-pulse"
              style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }}
            />
          ))}
          {FLOAT_PARTICLES.map((p, i) => (
            <div
              key={`float-particle-${i}`}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{ left: p.left, width: p.width, height: p.height, animationDelay: p.delay, animationDuration: p.duration }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-neutral-900/50 to-black/60 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-100 translate-y-0">
            <h1 className="font-bold mb-6 leading-tight text-white min-h-[200px] flex flex-col justify-center">
              <div className="text-4xl md:text-5xl mb-4 min-h-[60px] flex items-center justify-center">
                <span id="typewriter-tagline" className="text-white">
                  <span id="tagline-cursor" className="animate-pulse" style={{ display: 'none' }}>|</span>
                </span>
              </div>
              <div
                id="typewriter-jabv-labs"
                className="text-5xl md:text-7xl min-h-[80px] flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: 0 }}
              >
                <span className="text-white">
                  <span id="typewriter-jabv"></span>
                  <span id="jabv-cursor" className="animate-pulse" style={{ display: 'none' }}>|</span>
                </span>
                <span style={{ color: '#C82222' }}>
                  <span id="typewriter-labs"></span>
                  <span id="labs-cursor" className="animate-pulse" style={{ color: '#C82222', display: 'none' }}>|</span>
                </span>
              </div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Custom mobile apps and websites that drive results. No templates — just premium development tailored to your business.
            </p>

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
