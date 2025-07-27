import React from 'react';

export function AboutSection() {
  const languages = [
    { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-400" },
    { icon: "fab fa-html5", name: "HTML5", color: "text-orange-500" },
    { icon: "fab fa-css3-alt", name: "CSS3", color: "text-blue-500" },
    { icon: "fab fa-python", name: "Python", color: "text-green-400" },
    { icon: "fab fa-swift", name: "Swift", color: "text-orange-400" },
    { icon: "fab fa-java", name: "Java", color: "text-red-500" },
    { icon: "fas fa-code", name: "TypeScript", color: "text-blue-400" },
    { icon: "fas fa-code", name: "Kotlin", color: "text-purple-500" }
  ];

  const frameworks = [
    { icon: "fab fa-react", name: "React", color: "text-blue-400" },
    { icon: "fab fa-node-js", name: "Node.js", color: "text-green-500" },
    { icon: "fas fa-layer-group", name: "Next.js", color: "text-gray-300" },
    { icon: "fab fa-angular", name: "Angular", color: "text-red-500" },
    { icon: "fab fa-vuejs", name: "Vue.js", color: "text-green-400" },
    { icon: "fas fa-mobile-alt", name: "React Native", color: "text-blue-300" },
    { icon: "fab fa-laravel", name: "Laravel", color: "text-red-400" },
    { icon: "fas fa-code", name: "Express.js", color: "text-gray-400" }
  ];

  const cloudTech = [
    { icon: "fab fa-aws", name: "AWS", color: "text-orange-400" },
    { icon: "fab fa-google", name: "Google Cloud", color: "text-blue-400" },
    { icon: "fab fa-microsoft", name: "Azure", color: "text-blue-500" },
    { icon: "fas fa-database", name: "PostgreSQL", color: "text-blue-600" },
    { icon: "fas fa-database", name: "MongoDB", color: "text-green-500" },
    { icon: "fab fa-docker", name: "Docker", color: "text-blue-400" },
    { icon: "fas fa-cubes", name: "Kubernetes", color: "text-blue-300" },
    { icon: "fas fa-fire", name: "Firebase", color: "text-yellow-500" }
  ];

  const mlTech = [
    { icon: "fas fa-brain", name: "TensorFlow", color: "text-orange-500" },
    { icon: "fas fa-robot", name: "PyTorch", color: "text-red-500" },
    { icon: "fas fa-chart-line", name: "Scikit-learn", color: "text-blue-400" },
    { icon: "fas fa-eye", name: "OpenCV", color: "text-green-400" },
    { icon: "fas fa-microphone", name: "NLP", color: "text-purple-400" },
    { icon: "fas fa-network-wired", name: "Neural Networks", color: "text-pink-400" },
    { icon: "fas fa-cogs", name: "AutoML", color: "text-yellow-400" },
    { icon: "fas fa-cloud", name: "MLOps", color: "text-indigo-400" }
  ];

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-blue-900/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Innovation-driven development from the heart of Nevada
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Left Side - Visual Cards */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl shadow-2xl w-full bg-gradient-to-br from-neutral-800 to-black p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* ROI focused illustration */}
                <div className="bg-gradient-to-br from-red-600/20 to-black/40 rounded-xl p-4 md:p-6 flex flex-col justify-center items-center min-h-[140px] md:min-h-[160px]">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <i className="fas fa-chart-line text-white text-lg md:text-2xl"></i>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Proven ROI</h4>
                  <p className="text-gray-400 text-xs md:text-sm text-center leading-tight">Digital solutions that increase revenue</p>
                </div>
                
                {/* Speed to market illustration */}
                <div className="bg-gradient-to-br from-blue-600/20 to-black/40 rounded-xl p-4 md:p-6 flex flex-col justify-center items-center min-h-[140px] md:min-h-[160px]">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <i className="fas fa-rocket text-white text-lg md:text-2xl"></i>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Fast Delivery</h4>
                  <p className="text-gray-400 text-xs md:text-sm text-center leading-tight">Launch faster than competitors</p>
                </div>

                {/* Security illustration */}
                <div className="bg-gradient-to-br from-green-600/20 to-black/40 rounded-xl p-4 md:p-6 flex flex-col justify-center items-center min-h-[140px] md:min-h-[160px]">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <i className="fas fa-shield-alt text-white text-lg md:text-2xl"></i>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Future-Proof</h4>
                  <p className="text-gray-400 text-xs md:text-sm text-center leading-tight">Scalable technology that grows with you</p>
                </div>

                {/* Partnership illustration */}
                <div className="bg-gradient-to-br from-purple-600/20 to-black/40 rounded-xl p-4 md:p-6 flex flex-col justify-center items-center min-h-[140px] md:min-h-[160px]">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <i className="fas fa-handshake text-white text-lg md:text-2xl"></i>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Partnership</h4>
                  <p className="text-gray-400 text-xs md:text-sm text-center leading-tight">Long-term strategic success</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Story Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Founded in Reno, Nevada, JABV Labs emerged from a passion for creating digital solutions that make a real impact. We believe that great technology should be both powerful and intuitive, solving complex problems with elegant simplicity.
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Our team combines deep technical expertise with a keen understanding of user experience, ensuring every project we deliver not only meets but exceeds our clients' expectations. We specialize in custom-built solutions from the ground up - no templates, no shortcuts, just pure innovation tailored to your business needs.
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Located in Reno, Nevada, we serve clients nationwide, building lasting partnerships and delivering exceptional results. We're not just developers; we're your strategic technology partners committed to your long-term success.
              </p>
            </div>

            {/* Stats or Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-500 mb-1">100%</div>
                <div className="text-sm text-gray-400">Custom Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Tech Stack</span>
          </h3>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and frameworks to build scalable, efficient, and future-proof solutions
          </p>
        </div>

        {/* Tech Stack Carousels */}
        <div className="space-y-16">
          {/* Programming Languages Carousel */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold mb-8 text-center text-red-500">Programming Languages</h4>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right space-x-6" style={{ width: '300%' }}>
                {[...languages, ...languages, ...languages].map((tech, index) => (
                  <div 
                    key={`lang-${index}`}
                    className="flex-shrink-0 w-24 bg-neutral-800/50 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-gradient-to-br hover:from-red-600/20 hover:to-black/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-700/50"
                  >
                    <i className={`${tech.icon} text-2xl ${tech.color} mb-2 block`}></i>
                    <p className="text-xs font-medium text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frameworks & Libraries Carousel */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold mb-8 text-center text-red-500">Frameworks & Libraries</h4>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left space-x-6" style={{ width: '300%' }}>
                {[...frameworks, ...frameworks, ...frameworks].map((tech, index) => (
                  <div 
                    key={`framework-${index}`}
                    className="flex-shrink-0 w-24 bg-neutral-800/50 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-gradient-to-br hover:from-red-600/20 hover:to-black/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-700/50"
                  >
                    <i className={`${tech.icon} text-2xl ${tech.color} mb-2 block`}></i>
                    <p className="text-xs font-medium text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cloud & Database Technologies Carousel */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold mb-8 text-center text-red-500">Cloud & Database Technologies</h4>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right space-x-6" style={{ width: '300%' }}>
                {[...cloudTech, ...cloudTech, ...cloudTech].map((tech, index) => (
                  <div 
                    key={`cloud-${index}`}
                    className="flex-shrink-0 w-24 bg-neutral-800/50 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-gradient-to-br hover:from-red-600/20 hover:to-black/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-700/50"
                  >
                    <i className={`${tech.icon} text-2xl ${tech.color} mb-2 block`}></i>
                    <p className="text-xs font-medium text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Machine Learning & AI Carousel */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold mb-8 text-center text-red-500">Machine Learning & AI</h4>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left space-x-6" style={{ width: '300%' }}>
                {[...mlTech, ...mlTech, ...mlTech].map((tech, index) => (
                  <div 
                    key={`ml-${index}`}
                    className="flex-shrink-0 w-24 bg-neutral-800/50 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-gradient-to-br hover:from-red-600/20 hover:to-black/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-700/50"
                  >
                    <i className={`${tech.icon} text-2xl ${tech.color} mb-2 block`}></i>
                    <p className="text-xs font-medium text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        
        .animate-scroll-right {
          animation: scroll-right 15s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 15s linear infinite;
        }
      `}</style>
    </section>
  );
}
