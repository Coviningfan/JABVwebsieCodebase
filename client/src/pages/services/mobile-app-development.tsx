import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FadeInSection } from '@/components/fade-in-section';

export default function MobileAppDevelopment() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden animated-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-900/60 to-black/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Mobile App
              <span className="gradient-text block mt-2">Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build Powerful Apps That Delight Users and Drive Results
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <FadeInSection direction="up" delay={100}>
        <section className="py-20 bg-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xl text-gray-300 leading-relaxed text-center mb-16">
              At JABV Labs, we create custom mobile applications for iOS and Android that combine stunning design, native performance, and seamless functionality. Whether you're launching a startup app or scaling an enterprise solution, we deliver tailored experiences that engage your audience and meet your business goals.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Why Choose Us */}
      <FadeInSection direction="up" delay={200}>
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Mobile App Development?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "fas fa-users",
                  title: "User-Centric Design",
                  description: "We craft intuitive interfaces that keep users coming back"
                },
                {
                  icon: "fas fa-mobile-alt",
                  title: "Cross-Platform Efficiency",
                  description: "Reach both iOS and Android users with a single codebase, saving time and costs"
                },
                {
                  icon: "fas fa-chart-line",
                  title: "App Store Success",
                  description: "We optimize for store approval and visibility to maximize downloads"
                },
                {
                  icon: "fas fa-tools",
                  title: "Long-Term Support",
                  description: "Our maintenance plans keep your app updated and competitive"
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
            <h2 className="text-4xl font-bold text-center mb-16">Our Mobile App Development Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We analyze your goals, target audience, and features (e.g., push notifications, payments) to create a roadmap"
                },
                {
                  step: "02",
                  title: "Design",
                  description: "We build wireframes and high-fidelity mockups, refining based on your feedback"
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Using modern frameworks, we code your app in sprints, delivering prototypes for review"
                },
                {
                  step: "04",
                  title: "Testing",
                  description: "We test across devices for functionality, performance, and security"
                },
                {
                  step: "05",
                  title: "Launch",
                  description: "We handle App Store and Google Play submissions, setting up analytics"
                },
                {
                  step: "06",
                  title: "Maintenance",
                  description: "We provide updates, bug fixes, and new features post-launch"
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
                  title: "Native iOS & Android",
                  description: "Build apps with Swift (iOS) or Kotlin (Android) for platform-specific performance"
                },
                {
                  title: "Cross-Platform Solutions",
                  description: "Use React Native for cost-effective, high-quality apps that work on both platforms"
                },
                {
                  title: "App Store Optimization",
                  description: "Optimize metadata and visuals for higher rankings and downloads"
                },
                {
                  title: "Ongoing Maintenance",
                  description: "Keep your app secure and up-to-date with regular updates"
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
              We use industry-standard tools like JavaScript (React Native), Swift, Kotlin, and Node.js for backend APIs, paired with specialized development tools to streamline delivery. This ensures your app is fast, scalable, and reliable.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-400" },
                { icon: "fab fa-react", name: "React Native", color: "text-cyan-400" },
                { icon: "fab fa-swift", name: "Swift", color: "text-orange-400" },
                { icon: "fab fa-android", name: "Kotlin", color: "text-purple-400" }
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
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your App?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's turn your idea into a reality. Contact us to discuss your project and get a free quote.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-red-500/25"
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