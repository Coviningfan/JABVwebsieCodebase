import { useState, useEffect, useRef } from 'react';

const portfolioItems = [
  {
    id: 1,
    title: "Local Restaurant Chain",
    description: "Online ordering system with loyalty rewards",
    icon: "fas fa-utensils",
    color: "from-blue-500 to-blue-700",
    stats: "45% More Orders",
    tech: ["React", "Stripe", "SMS"]
  },
  {
    id: 2,
    title: "Real Estate Agency",
    description: "Property showcase with virtual tours",
    icon: "fas fa-home",
    color: "from-green-500 to-green-700",
    stats: "60% Faster Sales",
    tech: ["Next.js", "Maps API", "CRM"]
  },
  {
    id: 3,
    title: "Medical Practice",
    description: "Patient portal with appointment booking",
    icon: "fas fa-stethoscope",
    color: "from-red-500 to-red-700",
    stats: "Less Phone Calls",
    tech: ["Vue.js", "Calendar", "HIPAA"]
  },
  {
    id: 4,
    title: "Fitness Studio",
    description: "Class booking and membership management",
    icon: "fas fa-dumbbell",
    color: "from-purple-500 to-purple-700",
    stats: "80% Online Bookings",
    tech: ["React", "Payments", "Mobile"]
  },
  {
    id: 5,
    title: "Professional Services",
    description: "Client portal with project tracking",
    icon: "fas fa-briefcase",
    color: "from-orange-500 to-orange-700",
    stats: "Better Client Relations",
    tech: ["Dashboard", "Reports", "Invoicing"]
  },
  {
    id: 6,
    title: "Retail Store",
    description: "E-commerce with inventory management",
    icon: "fas fa-shopping-bag",
    color: "from-yellow-500 to-yellow-700",
    stats: "200% Online Sales",
    tech: ["Shopify", "Analytics", "SEO"]
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
        const container = carouselRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        setScrollAmount(prev => {
          if (prev >= maxScroll) {
            // Reset to beginning smoothly
            container.scrollTo({ left: 0, behavior: 'smooth' });
            return 0;
          } else {
            const newAmount = prev + scrollStep;
            container.scrollTo({ left: newAmount, behavior: 'smooth' });
            return newAmount;
          }
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
            Some of the services we offer
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`portfolio-item bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-neutral-700/30 group relative`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon section with dynamic colors */}
                <div className={`relative overflow-hidden h-48 md:h-56 flex items-center justify-center bg-gradient-to-br ${item.color}/15 to-black/60`}>
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                    <i className={`${item.icon} text-4xl text-white`}></i>
                  </div>
                  
                  {/* Subtle floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-8 right-6 w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 relative z-10 bg-black/20 backdrop-blur-sm">
                  {/* Title with better contrast */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  
                  {/* Description with high contrast */}
                  <p className="text-gray-200 leading-relaxed mb-4 text-base md:text-lg">
                    {item.description}
                  </p>
                  
                  {/* Stats badge with better readability */}
                  <div className={`bg-black/40 border border-neutral-500/60 rounded-full px-4 py-2 mb-4 text-center backdrop-blur-sm`}>
                    <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.stats}
                    </span>
                  </div>
                  
                  {/* Tech stack with improved contrast */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {item.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-black/50 border border-neutral-500/50 rounded-lg px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm hover:bg-black/60 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r ${item.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-xl`}>
                    <span className="flex items-center justify-center gap-2">
                      Explore Project
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}