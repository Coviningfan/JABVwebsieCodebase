import { useState, useEffect, useRef } from 'react';

const portfolioItems = [
  {
    id: 1,
    title: "FinTech Mobile App",
    description: "iOS & Android banking solution with biometric security",
    icon: "fas fa-university"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Cross-platform shopping app with AR integration",
    icon: "fas fa-shopping-cart"
  },
  {
    id: 3,
    title: "HealthTech Solution",
    description: "Patient management system with telemedicine features",
    icon: "fas fa-heartbeat"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "Wearable-connected app with custom workout plans",
    icon: "fas fa-dumbbell"
  },
  {
    id: 5,
    title: "Social Platform",
    description: "Community-driven app with real-time messaging",
    icon: "fas fa-users"
  },
  {
    id: 6,
    title: "Food Delivery App",
    description: "Multi-restaurant platform with live tracking",
    icon: "fas fa-utensils"
  },
  {
    id: 7,
    title: "Corporate Website",
    description: "Enterprise-grade website with modern design",
    icon: "fas fa-building"
  },
  {
    id: 8,
    title: "Real Estate Platform",
    description: "Property management system with virtual tours",
    icon: "fas fa-home"
  },
  {
    id: 9,
    title: "Education Portal",
    description: "Learning management system with interactive content",
    icon: "fas fa-graduation-cap"
  },
  {
    id: 10,
    title: "Travel Booking App",
    description: "Complete travel solution with booking and itinerary management",
    icon: "fas fa-plane"
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

        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 pt-2 scroll-smooth px-4 md:px-0"
            onScroll={(e) => setScrollAmount(e.currentTarget.scrollLeft)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item flex-none w-72 md:w-80 bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden h-40 md:h-48 flex items-center justify-center bg-gradient-to-br from-red-600/20 to-red-700/20">
                  <i className={`${item.icon} text-5xl md:text-6xl text-red-500 transition-transform duration-500 hover:scale-110`}></i>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item.description}</p>
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