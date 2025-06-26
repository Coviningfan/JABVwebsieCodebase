import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function WebsiteRedesigns() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden animated-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-900/60 to-black/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Website
              <span className="gradient-text block mt-2">Redesigns</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform Your Website into a Modern, High-Converting Digital Asset
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-300 leading-relaxed text-center mb-16">
            Is your website outdated or underperforming? JABV Labs specializes in website redesigns that modernize your online presence, improve user experience, and drive conversions. We align your site with your brand and business goals, ensuring it stands out in today's competitive digital landscape.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Website Redesigns?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fas fa-paint-brush",
                title: "Enhanced UX/UI",
                description: "Modern designs that make navigation effortless"
              },
              {
                icon: "fas fa-rocket",
                title: "Boosted Performance",
                description: "Faster load times for better user retention"
              },
              {
                icon: "fas fa-mobile-alt",
                title: "Mobile-First",
                description: "Optimized for the growing number of mobile users"
              },
              {
                icon: "fas fa-palette",
                title: "Brand Consistency",
                description: "A refreshed look that reflects your identity"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl p-6 rounded-3xl border border-neutral-700/50 hover:border-red-500/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${item.icon} text-2xl text-red-500`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Our Website Redesign Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Audit",
                description: "We analyze your current site's performance, UX, and SEO to identify improvements"
              },
              {
                step: "02",
                title: "Planning",
                description: "We define redesign goals, such as increasing conversions or modernizing design"
              },
              {
                step: "03",
                title: "Design",
                description: "We create new wireframes and mockups, aligning with your brand"
              },
              {
                step: "04",
                title: "Development",
                description: "We rebuild your site with modern tech, delivering prototypes for feedback"
              },
              {
                step: "05",
                title: "Testing",
                description: "We test for speed, accessibility, and cross-device compatibility"
              },
              {
                step: "06",
                title: "Launch & Support",
                description: "We deploy your redesigned site and provide ongoing maintenance"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-neutral-800/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-neutral-700/50">
                  <div className="text-5xl font-bold text-red-600/30 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "UX/UI Improvements",
                description: "Intuitive layouts and engaging visuals to enhance user satisfaction"
              },
              {
                title: "Performance Optimization",
                description: "Faster load times with optimized code and assets"
              },
              {
                title: "Mobile Optimization",
                description: "Fully responsive designs for seamless mobile experiences"
              },
              {
                title: "Brand Alignment",
                description: "Consistent colors, fonts, and messaging to strengthen your identity"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-neutral-800/50 to-transparent rounded-2xl">
                <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Tech Stack</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            We use JavaScript (Next.js), HTML5, CSS3 (Tailwind CSS), and PostgreSQL for data needs, paired with specialized tools to streamline the redesign process. This ensures your site is modern, secure, and high-performing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-400" },
              { icon: "fas fa-layer-group", name: "Next.js", color: "text-gray-300" },
              { icon: "fab fa-css3-alt", name: "Tailwind CSS", color: "text-blue-500" },
              { icon: "fas fa-database", name: "PostgreSQL", color: "text-blue-600" }
            ].map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-800/50 to-black/40 backdrop-blur-sm p-4 rounded-xl text-center border border-neutral-700/50">
                <i className={`${tech.icon} text-3xl ${tech.color} mb-2 block`}></i>
                <p className="text-sm font-medium text-gray-300">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Revamp Your Website?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's transform your digital presence. Contact us to start your redesign journey.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-red-500/25"
          >
            Get a Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}