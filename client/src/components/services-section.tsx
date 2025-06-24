const services = [
  {
    id: 1,
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description: "Create powerful iOS and Android applications with native performance and stunning user experiences. Custom-built from scratch, no templates.",
    features: [
      "Native iOS & Android",
      "Cross-platform solutions",
      "App Store optimization",
      "Ongoing maintenance"
    ],
    link: "/services/mobile-app-development"
  },
  {
    id: 2,
    icon: "fas fa-globe",
    title: "Interactive Websites",
    description: "Build modern, responsive websites that engage users and drive conversions. Professionally coded, not drag-and-drop builders.",
    features: [
      "Responsive design",
      "Modern frameworks",
      "SEO optimization",
      "Performance focused"
    ],
    link: "/services/interactive-websites"
  },
  {
    id: 3,
    icon: "fas fa-palette",
    title: "Website Redesigns",
    description: "Transform your existing website into a modern, high-performing digital experience. Complete overhaul, not patch fixes.",
    features: [
      "UX/UI improvements",
      "Performance optimization",
      "Mobile optimization",
      "Brand alignment"
    ],
    link: "/services/website-redesigns"
  }
];

export function ServicesSection() {

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
              className="bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl p-8 rounded-3xl text-center hover:transform hover:scale-105 transition-all duration-500 cursor-pointer group border border-neutral-700/50 hover:border-red-500/30 shadow-2xl hover:shadow-red-500/10"
            >
              <div className="mb-8 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-2xl flex items-center justify-center group-hover:from-red-600/40 group-hover:to-red-700/40 transition-all duration-500 backdrop-blur-sm border border-red-500/20">
                  <i className={`${service.icon} text-4xl text-red-500 group-hover:text-red-400 transition-all duration-500 group-hover:scale-110`}></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <ul className="text-left text-gray-300 mb-8 space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={service.link}
                className="inline-block bg-transparent border-2 border-red-600/70 text-red-500 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white hover:border-red-500 px-8 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/25"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
