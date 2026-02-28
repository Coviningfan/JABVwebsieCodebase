import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Phone, Mail, X } from 'lucide-react';

export default function HeroWithBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [taglineText, setTaglineText] = useState('');
  const [jabvText, setJabvText] = useState('');
  const [labsText, setLabsText] = useState('');
  const [showTaglineCursor, setShowTaglineCursor] = useState(false);
  const [showJabvCursor, setShowJabvCursor] = useState(false);
  const [showLabsCursor, setShowLabsCursor] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const animationStarted = useRef(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
    const t = setTimeout(() => setShowBanner(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    const timeouts: NodeJS.Timeout[] = [];
    const delay = (ms: number) => new Promise<void>(r => { timeouts.push(setTimeout(r, ms)); });

    (async () => {
      await delay(400);

      const tagline = 'Build Your Future with';
      setShowTaglineCursor(true);
      for (let i = 0; i <= tagline.length; i++) {
        setTaglineText(tagline.slice(0, i));
        await delay(55 + Math.random() * 25);
      }
      setShowTaglineCursor(false);

      await delay(200);

      setShowJabvCursor(true);
      const jabv = 'JABV';
      for (let i = 0; i <= jabv.length; i++) {
        setJabvText(jabv.slice(0, i));
        await delay(80 + Math.random() * 40);
      }
      setShowJabvCursor(false);

      await delay(150);

      setShowLabsCursor(true);
      const labs = 'Labs';
      for (let i = 0; i <= labs.length; i++) {
        setLabsText(labs.slice(0, i));
        await delay(80 + Math.random() * 40);
      }

      await delay(600);
      setShowLabsCursor(false);
      setAnimationDone(true);
    })();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <>
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

      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ paddingTop: showBanner ? '120px' : '80px' }}
      >
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${(i * 19 + 5) % 100}%`,
                width: `${(i % 6) + 2}px`,
                height: `${(i % 6) + 2}px`,
                animationDelay: `${(i * 1.3) % 20}s`,
                animationDuration: `${(i % 10) + 15}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-neutral-900/50 to-black/60 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="block text-white text-4xl md:text-6xl mb-2">
                {taglineText}
                {showTaglineCursor && <span className="animate-pulse">|</span>}
              </span>
              <span className="block min-h-[1.2em]">
                <span className="text-white">{jabvText}</span>
                {showJabvCursor && <span className="animate-pulse text-white">|</span>}
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  {labsText}
                </span>
                {showLabsCursor && (
                  <span className="animate-pulse bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">|</span>
                )}
              </span>
            </h1>

            <div className={`transition-all duration-1000 ease-out ${animationDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Custom mobile apps and websites that drive results. No templates — just premium development tailored to your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-lg rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="px-10 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Our Services
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 text-gray-400">
                <a href="tel:+1-775-800-5850" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">(775) 800-5850</span>
                </a>
                <a href="mailto:contact@jabvlabs.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@jabvlabs.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('portfolio')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>
    </>
  );
}
