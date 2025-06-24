import { useState, useEffect, useRef } from 'react';

const portfolioItems = [
  {
    id: 1,
    title: "FinTech Mobile App",
    description: "iOS & Android banking solution with biometric security",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Cross-platform shopping app with AR integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 3,
    title: "HealthTech Solution",
    description: "Patient management system with telemedicine features",
    image: "https://pixabay.com/get/ge2641a42fd24a2e091a86e9d773f798d1aebfd9944296c02b57cfee5fda17681a4ed01915f4330de96c20bdd1ec709e11d2ea148da4e3df9feabb41050759a49_1280.jpg"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "Wearable-connected app with AI workout recommendations",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 5,
    title: "Social Platform",
    description: "Community-driven app with real-time messaging",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 6,
    title: "Food Delivery App",
    description: "Multi-restaurant platform with live tracking",
    image: "https://pixabay.com/get/g2f8e403e2d5a7611bca7a705431b9ccfafdb45ee6b1d98cc4feda639610b4c68668a8123e4482b12e6d836146c0ec25408447617bf77ff03f5a3e75a00fd1873_1280.jpg"
  },
  {
    id: 7,
    title: "Corporate Website",
    description: "Enterprise-grade website with dark theme design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 8,
    title: "AI Analytics Dashboard",
    description: "Machine learning insights platform",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

export function PortfolioCarousel() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollStep = 320;

  useEffect(() => {
    const startAutoScroll = () => {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          setScrollAmount(prev => {
            const newAmount = prev >= maxScroll ? 0 : prev + scrollStep;
            carouselRef.current?.scrollTo({
              left: newAmount,
              behavior: 'smooth'
            });
            return newAmount;
          });
        }
      }, 4000);

      return interval;
    };

    const interval = startAutoScroll();
    
    const carousel = carouselRef.current;
    let pauseTimeout: NodeJS.Timeout;

    const pauseAutoScroll = () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        const newInterval = startAutoScroll();
        return () => clearInterval(newInterval);
      }, 8000);
    };

    carousel?.addEventListener('mouseenter', () => clearInterval(interval));
    carousel?.addEventListener('mouseleave', () => {
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        const newInterval = startAutoScroll();
        return () => clearInterval(newInterval);
      }, 1000);
    });

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
    };
  }, []);

  const handlePrevious = () => {
    const newAmount = Math.max(scrollAmount - scrollStep, 0);
    setScrollAmount(newAmount);
    carouselRef.current?.scrollTo({
      left: newAmount,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      setScrollAmount(newAmount);
      carouselRef.current.scrollTo({
        left: newAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing premium apps and websites we've crafted for our clients
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6"
            onScroll={(e) => setScrollAmount(e.currentTarget.scrollLeft)}
          >
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item flex-none w-80 bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
