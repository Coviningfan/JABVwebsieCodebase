import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function HeroSection() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg">
      <div className="floating-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-900/60 to-black/80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Your Future with
            <span className="gradient-text block mt-2">JABV Labs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Expert App & Web Development from Reno, Nevada
          </p>
          <div className="space-x-4">
            <a 
              href="/contact"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-red-500/25"
            >
              Get a Quote
            </a>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-600/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-float" style={{animationDelay: '-2s'}}></div>
    </section>
  );
}
