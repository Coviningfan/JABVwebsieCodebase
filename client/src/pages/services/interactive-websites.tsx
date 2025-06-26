import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FadeInSection } from '@/components/fade-in-section';

export default function InteractiveWebsites() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden animated-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-900/60 to-black/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Interactive
              <span className="gradient-text block mt-2">Websites</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Engage Your Audience with Modern, High-Performing Websites
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <FadeInSection direction="up" delay={100}>
        <section className="py-20 bg-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xl text-gray-300 leading-relaxed text-center mb-16">
              Your website is your digital storefront. At JABV Labs, we build interactive, responsive websites that captivate users, drive conversions, and elevate your brand. Using cutting-edge technologies, we create fast, SEO-optimized sites that work flawlessly across all devices.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Why Choose Us */}
      <FadeInSection direction="up" delay={200}>
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Interactive Websites?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "fas fa-magic",
                  title: "Engaging Experiences",
                  description: "Dynamic features like animations and forms keep users hooked"
                },
                {
                  icon: "fas fa-mobile-alt",
                  title: "Responsive Design",
                  description: "Your site looks perfect on desktops, tablets, and phones"
                },
                {
                  icon: "fas fa-search",
                  title: "SEO Advantage",
                  description: "Higher search rankings drive more traffic to your business"
                },
                {
                  icon: "fas fa-tachometer-alt",
                  title: "Performance First",
                  description: "Fast load times reduce bounce rates and boost conversions"
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
      </FadeInSection>

      {/* Process */}
      <FadeInSection direction="up" delay={300}>
        <section className="py-20 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Our Website Development Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We define your goals, audience, and features (e.g., e-commerce, blogs)"
                },
                {
                  step: "02",
                  title: "Design",
                  description: "We create modern, user-friendly designs, iterating based on your input"
                },
                {
                  step: "03",
                  title: "Development",
                  description: "We code your site using modern frameworks, delivering prototypes in sprints"
                },
                {
                  step: "04",
                  title: "Testing",
                  description: "We ensure cross-browser compatibility, speed, and security"
                },
                {
                  step: "05",
                  title: "Launch",
                  description: "We deploy to a high-performance cloud platform with analytics setup"
                },
                {
                  step: "06",
                  title: "Support",
                  description: "We offer maintenance to keep your site optimized and secure"
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
      </FadeInSection>

      {/* Key Features */}
      <FadeInSection direction="up" delay={400}>
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Responsive Design",
                  description: "Seamless performance on all screen sizes"
                },
                {
                  title: "Modern Frameworks",
                  description: "Built with Next.js for speed and scalability"
                },
                {
                  title: "SEO Optimization",
                  description: "Meta tags, sitemaps, and clean code for better rankings"
                },
                {
                  title: "Performance Focused",
                  description: "Optimized images, lazy loading, and caching for fast load times"
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
      </FadeInSection>

      {/* Tech Stack */}
      <FadeInSection direction="up" delay={500}>
        <section className="py-20 bg-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Tech Stack</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              We leverage JavaScript (Next.js), HTML5, CSS3 (Tailwind CSS), and Node.js for APIs, combined with specialized tools to enhance efficiency. This ensures your website is robust, interactive, and future-proof.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-400" },
                { icon: "fas fa-layer-group", name: "Next.js", color: "text-gray-300" },
                { icon: "fab fa-html5", name: "HTML5", color: "text-orange-500" },
                { icon: "fab fa-css3-alt", name: "CSS3", color: "text-blue-500" }
              ].map((tech, index) => (
                <div key={index} className="bg-gradient-to-br from-neutral-800/50 to-black/40 backdrop-blur-sm p-4 rounded-xl text-center border border-neutral-700/50">
                  <i className={`${tech.icon} text-3xl ${tech.color} mb-2 block`}></i>
                  <p className="text-sm font-medium text-gray-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection direction="fade" delay={600}>
        <section className="py-20 bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Website?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create a digital experience that drives results. Contact us for a free consultation.
            </p>
            <a 
              href="/contact"
              className="inline-block text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#C82222' }}
            >
              Get a Quote
            </a>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}