import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Phone, Mail } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const prefixText = 'Build Your Future with';
  const [typedPrefix, setTypedPrefix] = useState('');
  const [startBrand, setStartBrand] = useState(false);
  const brandFull = 'JABVLabs';
  const [typedBrand, setTypedBrand] = useState('');

  const backgroundBubbles = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 30,
        duration: Math.random() * 40 + 30,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      })),
    []
  );

  useEffect(() => {
    setIsVisible(true);
    let idx = 0;
    const timer = setInterval(() => {
      setTypedPrefix(prefixText.slice(0, idx + 1));
      idx++;
      if (idx === prefixText.length) {
        clearInterval(timer);
        setTimeout(() => setStartBrand(true), 400);
      }
    }, 90);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!startBrand) return;
    let idx = 0;
    const timer = setInterval(() => {
      setTypedBrand(brandFull.slice(0, idx + 1));
      idx++;
      if (idx === brandFull.length) clearInterval(timer);
    }, 90);
    return () => clearInterval(timer);
  }, [startBrand]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-black shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-4">
          <span className="text-white text-xs md:text-sm font-light">Already a customer?</span>
          <a
            href="https://portal.jabvlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full font-medium text-xs text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition duration-200 shadow-sm hover:shadow-md"
          >
            Login to your portal
          </a>
        </div>
      </div>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {backgroundBubbles.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full opacity-10 blur-sm"
              style={{
                backgroundColor: b.color,
                left: `${b.x}%`, top: `${b.y}%`,
                width: `${b.size}rem`, height: `${b.size}rem`,
                animation: `float ${b.duration}s ease-in-out ${b.delay}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              <div className="block whitespace-nowrap">
                {typedPrefix}
                {typedPrefix.length < prefixText.length && (
                  <span className="inline-block w-1 h-[2.8rem] md:h-[3.2rem] bg-white ml-1 animate-blink" />
                )}
              </div>
              {startBrand && (
                <div className="block mt-3 whitespace-nowrap">
                  {typedBrand.split('').map((char, idx) => (
                    <span
                      key={idx}
                      className={
                        idx < 4
                          ? 'bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent shimmer'
                          : 'text-white'
                      }
                    >
                      {char}
                    </span>
                  ))}
                  {typedBrand.length < brandFull.length && (
                    <span className="inline-block w-1 h-[2.8rem] md:h-[3.2rem] bg-white ml-1 animate-blink" />
                  )}
                </div>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-slow">
              Custom mobile apps and websites that drive results. Just premium development tailored to your business.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-10 text-xs md:text-sm">
              {['Tailored Software Solutions','iOS & Android App Development','Responsive Web Apps','Scalable Architecture','Pixel-Perfect UI/UX'].map((item, i) => (
                <div key={i} className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-gray-300 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full block" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-5">
              <button onClick={() => scrollToSection('contact')} className="group relative inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-transform duration-300 hover:scale-105 animate-pulse-soft shadow-red-500/25">
                Get a Quote<span className="ml-2 block transition-all duration-300 group-hover:ml-3">→</span>
              </button>
              <div className="flex space-x-1">
                {[0, 1, 2].map((_, idx) => (
                  <span key={idx} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${idx * 200}ms` }} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10 text-gray-400 text-sm">
              <a href="tel:7758005850" className="flex items-center gap-2 hover:text-red-400">
                <Phone className="w-4 h-4" /> (775) 800-5850
              </a>
              <a href="mailto:contact@jabvlabs.com" className="flex items-center gap-2 hover:text-red-400">
                <Mail className="w-4 h-4" /> contact@jabvlabs.com
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}}
          @keyframes shimmer {0%{background-position:-200% 0}100%{background-position:200% 0}}
          @keyframes blink {0%,50%{opacity:1}51%,100%{opacity:0}}
          @keyframes fadeInSlow {0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
          @keyframes pulseSoft {0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.95;transform:scale(1.02)}}
          .shimmer{background-size:400% 100%;animation:shimmer 4s ease-in-out infinite;}
          .animate-blink{animation:blink .8s step-start infinite;}
          .animate-fade-in-slow{animation:fadeInSlow 1.5s ease-out both;}
          .animate-pulse-soft{animation:pulseSoft 2.5s ease-in-out infinite;}
        `}</style>
      </section>
    </>
  );
}
