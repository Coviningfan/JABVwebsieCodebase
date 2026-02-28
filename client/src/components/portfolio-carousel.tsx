import { useState, useEffect, useRef } from 'react';

const portfolioItems = [
  { id: 1, title: 'FinTech Mobile App', description: 'iOS & Android banking solution with biometric security and real-time transactions', icon: 'fas fa-university', tags: ['iOS', 'Android', 'Security'], gradient: 'from-blue-600/30 to-cyan-600/20' },
  { id: 2, title: 'E-Commerce Platform', description: 'Cross-platform shopping experience with AR product previews and seamless checkout', icon: 'fas fa-shopping-cart', tags: ['React Native', 'AR', 'Stripe'], gradient: 'from-purple-600/30 to-pink-600/20' },
  { id: 3, title: 'HealthTech Solution', description: 'HIPAA-compliant patient management with telemedicine and appointment scheduling', icon: 'fas fa-heartbeat', tags: ['HIPAA', 'Telehealth', 'API'], gradient: 'from-emerald-600/30 to-teal-600/20' },
  { id: 4, title: 'Fitness Tracker', description: 'Wearable-connected app with AI-powered workout plans and progress analytics', icon: 'fas fa-dumbbell', tags: ['Wearables', 'AI', 'Analytics'], gradient: 'from-orange-600/30 to-amber-600/20' },
  { id: 5, title: 'Social Platform', description: 'Community-driven app with real-time messaging, stories, and content moderation', icon: 'fas fa-users', tags: ['WebSocket', 'Cloud', 'Moderation'], gradient: 'from-indigo-600/30 to-violet-600/20' },
  { id: 6, title: 'Food Delivery App', description: 'Multi-restaurant marketplace with live GPS tracking and driver management', icon: 'fas fa-utensils', tags: ['GPS', 'Payments', 'Real-time'], gradient: 'from-red-600/30 to-rose-600/20' },
  { id: 7, title: 'Corporate Website', description: 'Enterprise-grade web platform with CMS, analytics dashboard, and lead generation', icon: 'fas fa-building', tags: ['CMS', 'SEO', 'Analytics'], gradient: 'from-slate-600/30 to-gray-600/20' },
  { id: 8, title: 'Real Estate Platform', description: 'Property marketplace with virtual tours, mortgage calculator, and agent portal', icon: 'fas fa-home', tags: ['3D Tours', 'Maps', 'Portal'], gradient: 'from-green-600/30 to-lime-600/20' },
  { id: 9, title: 'Education Portal', description: 'Interactive LMS with video courses, progress tracking, and certification system', icon: 'fas fa-graduation-cap', tags: ['LMS', 'Video', 'Certs'], gradient: 'from-yellow-600/30 to-amber-600/20' },
  { id: 10, title: 'Travel Booking App', description: 'Complete travel solution with AI itineraries, booking engine, and offline access', icon: 'fas fa-plane', tags: ['AI', 'Booking', 'Offline'], gradient: 'from-sky-600/30 to-blue-600/20' },
];

export function PortfolioCarousel() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const scrollStep = 280;

  useEffect(() => {
    if (isHovered || userInteracted) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        setScrollAmount(prev => {
          const newAmount = prev >= maxScroll ? 0 : prev + scrollStep;
          if (newAmount === 0) {
            carouselRef.current?.scrollTo({ left: maxScroll, behavior: 'auto' });
            setTimeout(() => { carouselRef.current?.scrollTo({ left: 0, behavior: 'smooth' }); }, 50);
          } else {
            carouselRef.current?.scrollTo({ left: newAmount, behavior: 'smooth' });
          }
          return newAmount;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, userInteracted]);

  const handlePrevious = () => {
    setUserInteracted(true);
    if (carouselRef.current) {
      const newAmount = Math.max(scrollAmount - scrollStep, 0);
      setScrollAmount(newAmount);
      carouselRef.current.scrollTo({ left: newAmount, behavior: 'smooth' });
    }
    setTimeout(() => setUserInteracted(false), 10000);
  };

  const handleNext = () => {
    setUserInteracted(true);
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      setScrollAmount(newAmount);
      carouselRef.current.scrollTo({ left: newAmount, behavior: 'smooth' });
    }
    setTimeout(() => setUserInteracted(false), 10000);
  };

  return (
    <section id="portfolio" className="py-20 bg-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Examples of what we can build for your business</p>
        </div>
        <div className="relative overflow-hidden">
          <div ref={carouselRef} className="flex overflow-x-auto scrollbar-hide space-x-6 sm:space-x-8 pb-8 pt-6 scroll-smooth px-4 sm:px-6 md:px-4" onScroll={(e) => setScrollAmount(e.currentTarget.scrollLeft)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item flex-none w-72 md:w-80 bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                <div className={`relative overflow-hidden h-40 md:h-48 flex items-center justify-center bg-gradient-to-br ${item.gradient}`}>
                  <i className={`${item.icon} text-5xl md:text-6xl text-white/80 transition-transform duration-500 hover:scale-110`}></i>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (<span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">{tag}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handlePrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"><i className="fas fa-chevron-left"></i></button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>
  );
}
