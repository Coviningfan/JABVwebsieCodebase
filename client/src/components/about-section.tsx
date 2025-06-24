const techStack = [
  { icon: "fab fa-react", name: "React", color: "text-blue-400" },
  { icon: "fab fa-node-js", name: "Node.js", color: "text-green-400" },
  { icon: "fab fa-swift", name: "Swift", color: "text-orange-400" },
  { icon: "fab fa-android", name: "Android", color: "text-green-500" },
  { icon: "fab fa-python", name: "Python", color: "text-yellow-400" },
  { icon: "fab fa-aws", name: "AWS", color: "text-orange-500" }
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
              Our team combines deep technical expertise with a keen understanding of user experience, ensuring every project we deliver not only meets but exceeds our clients' expectations. From startups to enterprise solutions, we've helped businesses across industries transform their digital presence.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Located in Reno, Nevada, we serve clients nationwide, bringing Silicon Valley innovation with Nevada values - honest work, reliable partnerships, and exceptional results.
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
              "Delivering innovative digital solutions that empower businesses to thrive in the digital age. We combine cutting-edge technology with human-centered design to create applications and websites that don't just function—they inspire."
            </p>
          </div>
        </div>
        
        {/* Tech Stack Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Technologies We Master</h3>
            <p className="text-gray-400">Leveraging the latest technologies to build tomorrow's solutions</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="bg-neutral-800 p-4 rounded-xl text-center hover:bg-red-600/20 transition-colors duration-300"
              >
                <i className={`${tech.icon} text-3xl ${tech.color} mb-2`}></i>
                <p className="text-sm font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
