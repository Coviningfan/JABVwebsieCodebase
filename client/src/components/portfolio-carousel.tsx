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
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "Wearable-connected app with custom workout plans",
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
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 7,
    title: "Corporate Website",
    description: "Enterprise-grade website with modern design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 8,
    title: "Real Estate Platform",
    description: "Property management system with virtual tours",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 9,
    title: "Education Portal",
    description: "Learning management system with interactive content",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: 10,
    title: "Travel Booking App",
    description: "Complete travel solution with booking and itinerary management",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

export function PortfolioCarousel() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollStep = 320;

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        setScrollAmount(prev => {
          const newAmount = prev >= maxScroll ? 0 : prev + scrollStep;
          
          if (newAmount === 0) {
            // Smooth transition to beginning
            carouselRef.current?.scrollTo({
              left: maxScroll,
              behavior: 'auto'
            });
            setTimeout(() => {
              carouselRef.current?.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            }, 50);
          } else {
            carouselRef.current?.scrollTo({
              left: newAmount,
              behavior: 'smooth'
            });
          }
          
          return newAmount;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevious = () => {
    if (carouselRef.current) {
      const newAmount = Math.max(scrollAmount - scrollStep, 0);
      setScrollAmount(newAmount);
      carouselRef.current.scrollTo({
        left: newAmount,
        behavior: 'smooth'
      });
    }
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
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6 scroll-smooth"
            onScroll={(e) => setScrollAmount(e.currentTarget.scrollLeft)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item flex-none w-80 bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-700/50 hover:border-red-500/30 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
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