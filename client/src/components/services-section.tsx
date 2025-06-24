const services = [
  {
    id: 1,
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description: "Create powerful iOS and Android applications with native performance and stunning user experiences.",
    features: [
      "Native iOS & Android",
      "Cross-platform solutions",
      "App Store optimization",
      "Ongoing maintenance"
    ]
  },
  {
    id: 2,
    icon: "fas fa-globe",
    title: "Interactive Websites",
    description: "Build modern, responsive websites that engage users and drive conversions with cutting-edge technologies.",
    features: [
      "Responsive design",
      "Modern frameworks",
      "SEO optimization",
      "Performance focused"
    ]
  },
  {
    id: 3,
    icon: "fas fa-palette",
    title: "Website Redesigns",
    description: "Transform your existing website into a modern, high-performing digital experience that converts visitors.",
    features: [
      "UX/UI improvements",
      "Performance optimization",
      "Mobile optimization",
      "Brand alignment"
    ]
  }
];

export function ServicesSection() {
  const handleLearnMore = () => {
    alert('Service details coming soon! Contact us for more information.');
  };

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-neutral-800 p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="mb-6">
                <i className={`${service.icon} text-6xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="text-left text-gray-300 mb-6 space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check text-red-600 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleLearnMore}
                className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
