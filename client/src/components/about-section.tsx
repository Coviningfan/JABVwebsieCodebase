const programmingLanguages = [
  { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-400" },
  { icon: "fab fa-python", name: "Python", color: "text-blue-400" },
  { icon: "fab fa-java", name: "Java", color: "text-orange-500" },
  { icon: "fab fa-swift", name: "Swift", color: "text-orange-400" },
  { icon: "fab fa-android", name: "Kotlin", color: "text-purple-400" },
  { icon: "fab fa-react", name: "TypeScript", color: "text-blue-500" },
  { icon: "fas fa-code", name: "C++", color: "text-indigo-400" },
  { icon: "fab fa-rust", name: "Rust", color: "text-orange-600" },
  { icon: "fab fa-golang", name: "Go", color: "text-cyan-400" },
  { icon: "fas fa-hashtag", name: "C#", color: "text-purple-500" },
  { icon: "fab fa-php", name: "PHP", color: "text-indigo-500" },
  { icon: "fab fa-r-project", name: "R", color: "text-blue-600" }
];

const frameworks = [
  { icon: "fab fa-react", name: "React", color: "text-cyan-400" },
  { icon: "fab fa-node-js", name: "Node.js", color: "text-green-400" },
  { icon: "fab fa-vuejs", name: "Vue.js", color: "text-green-500" },
  { icon: "fas fa-mobile-alt", name: "React Native", color: "text-blue-400" },
  { icon: "fas fa-layer-group", name: "Next.js", color: "text-gray-300" },
  { icon: "fas fa-fire", name: "Express.js", color: "text-yellow-500" }
];

const cloudPlatforms = [
  { icon: "fab fa-aws", name: "AWS", color: "text-orange-400" },
  { icon: "fab fa-google", name: "Google Cloud", color: "text-blue-400" },
  { icon: "fab fa-microsoft", name: "Azure", color: "text-blue-600" },
  { icon: "fas fa-server", name: "Vercel", color: "text-gray-300" },
  { icon: "fas fa-cloud", name: "Netlify", color: "text-green-400" },
  { icon: "fab fa-digital-ocean", name: "DigitalOcean", color: "text-blue-500" }
];

const cloudTech = [
  { icon: "fab fa-aws", name: "AWS", color: "text-orange-500" },
  { icon: "fab fa-microsoft", name: "Azure", color: "text-blue-500" },
  { icon: "fab fa-google", name: "Firebase", color: "text-yellow-500" },
  { icon: "fas fa-database", name: "Supabase", color: "text-green-400" },
  { icon: "fas fa-server", name: "PostgreSQL", color: "text-blue-600" },
  { icon: "fas fa-cloud", name: "DynamoDB", color: "text-orange-400" }
];

const mlTech = [
  { icon: "fas fa-brain", name: "TensorFlow", color: "text-orange-400" },
  { icon: "fas fa-robot", name: "PyTorch", color: "text-red-500" },
  { icon: "fas fa-chart-line", name: "Scikit-learn", color: "text-blue-400" },
  { icon: "fas fa-cogs", name: "Keras", color: "text-red-400" },
  { icon: "fas fa-network-wired", name: "TensorFlow.js", color: "text-yellow-400" },
  { icon: "fas fa-microchip", name: "SageMaker", color: "text-orange-500" }
];

const techStack = [
  { category: "Languages", items: programmingLanguages },
  { category: "Frameworks", items: frameworks },
  { category: "Cloud & DevOps", items: cloudPlatforms },
  { category: "AI & Machine Learning", items: mlTech }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About JABV Labs</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Innovation-driven development from the heart of Nevada
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://pixabay.com/get/g3539f2f1b6566700ac5a7cc39352494cb612be34726c968b62c0ab9d5aca144c65132d3def95444419bdd5dda97a94cb28cff6cb8de6dec61f76ae8d66fc4585_1280.jpg" 
              alt="Modern tech workspace with minimalist design elements" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Story</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in the innovative tech ecosystem of Reno, Nevada, JABV Labs emerged from a passion for creating digital solutions that make a real impact. We believe that great technology should be both powerful and intuitive, solving complex problems with elegant simplicity.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our team combines deep technical expertise with a keen understanding of user experience, ensuring every project we deliver not only meets but exceeds our clients' expectations. We specialize in custom-built solutions from the ground up - no templates, no shortcuts, just pure innovation tailored to your business needs.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Located in Reno, Nevada, we serve clients nationwide, bringing Silicon Valley innovation with Nevada values - honest work, reliable partnerships, and exceptional results. We believe in crafting premium digital experiences that stand apart from cookie-cutter solutions.
            </p>

            {/* Location Highlight */}
            <div className="bg-black/50 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-3">
                <i className="fas fa-map-marker-alt text-red-600 text-xl mr-3"></i>
                <h4 className="text-xl font-semibold">Based in Reno, Nevada</h4>
              </div>
              <p className="text-gray-400">Serving clients nationwide from the heart of the Sierra Nevada region</p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-600/20 to-transparent p-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              "Delivering innovative digital solutions that empower businesses to thrive in the digital age. We combine cutting-edge technology with human-centered design to create applications and websites that don't just function—they inspire. Every solution is custom-built, never templated."
            </p>
          </div>
        </div>

        {/* Comprehensive Tech Stack */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Technologies We Master</h3>
            <p className="text-gray-400">Comprehensive expertise across the full technology spectrum</p>
          </div>

          {/* Programming Languages Carousel */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold mb-8 text-center text-red-500">Programming Languages</h4>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right space-x-6">
                {[...programmingLanguages, ...programmingLanguages].map((tech, index) => (
                  <div 
                    key={index}
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
              <div className="flex animate-scroll-left space-x-6">
                {[...frameworks, ...frameworks].map((tech, index) => (
                  <div 
                    key={index}
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
              <div className="flex animate-scroll-right space-x-6">
                {[...cloudTech, ...cloudTech].map((tech, index) => (
                  <div 
                    key={index}
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
              <div className="flex animate-scroll-left space-x-6">
                {[...mlTech, ...mlTech].map((tech, index) => (
                  <div 
                    key={index}
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
    </section>
  );
}