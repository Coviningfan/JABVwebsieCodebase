export function Footer() {
  return (
    <footer className="bg-neutral-900 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">JABV</span>
              <span className="gradient-text">Labs</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Expert mobile app and web development services from Reno, Nevada. We build digital solutions that drive business growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-linkedin text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-github text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-instagram text-white"></i>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-red-600 transition-colors duration-200">Mobile App Development</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors duration-200">Interactive Websites</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors duration-200">Website Redesigns</a></li>
              <li><a href="#contact" className="hover:text-red-600 transition-colors duration-200">Consultation</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+1-775-555-0123" className="hover:text-red-600 transition-colors duration-200">
                  +1 (775) 555-0123
                </a>
              </li>
              <li>
                <a href="mailto:hello@jabvlabs.com" className="hover:text-red-600 transition-colors duration-200">
                  hello@jabvlabs.com
                </a>
              </li>
              <li>Reno, Nevada, USA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 JABV Labs. All rights reserved. Built with passion in Reno, Nevada.</p>
        </div>
      </div>
    </footer>
  );
}
