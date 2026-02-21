const services = [
  {
    id: 1,
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description:
      "Create powerful iOS and Android applications with native performance and stunning user experiences. Custom-built from scratch, no templates.",
    features: [
      "Native iOS & Android",
      "Cross-platform solutions",
      "App Store optimization",
      "Ongoing maintenance",
    ],
    link: "/services/mobile-app-development",
  },
  {
    id: 2,
    icon: "fas fa-globe",
    title: "Interactive Websites",
    description:
      "Build modern, responsive websites that engage users and drive conversions. Professionally coded, not drag-and-drop builders.",
    features: [
      "Responsive design",
      "Modern frameworks",
      "SEO optimization",
      "Performance focused",
    ],
    link: "/services/interactive-websites",
  },
  {
    id: 3,
    icon: "fas fa-palette",
    title: "Website Redesigns",
    description:
      "Transform your existing website into a modern, high-performing digital experience. Complete overhaul, not patch fixes.",
    features: [
      "UX/UI improvements",
      "Performance optimization",
      "Mobile optimization",
      "Brand alignment",
    ],
    link: "/services/website-redesigns",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to establish a powerful digital presence — built by hand, not by bots.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-gradient-to-br from-neutral-800/60 to-black/40 backdrop-blur-xl rounded-3xl p-8 border border-neutral-700/50 hover:border-red-600/30 transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                <i className={`${service.icon} text-2xl text-red-500`}></i>
              </div>

              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-neutral-700/50 text-gray-300 px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href={service.link}
                className="inline-flex items-center text-red-500 hover:text-red-400 font-medium transition-colors mt-auto"
              >
                Learn More
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
