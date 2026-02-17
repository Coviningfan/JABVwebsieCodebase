import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function Footer() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <footer className="bg-neutral-900 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">JABV</span>
              <span className="gradient-text">Labs</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Expert mobile app and web development services from Reno, Nevada. We build digital solutions that drive business growth.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-red-400 transition-colors duration-200">
                  Mobile App Development
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-red-400 transition-colors duration-200">
                  Interactive Websites
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-red-400 transition-colors duration-200">
                  Website Redesigns
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-red-400 transition-colors duration-200">
                  Consultation
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:7758005850" className="hover:text-red-400 transition-colors duration-200">
                  (775) 800-5850
                </a>
              </li>
              <li>
                <a href="mailto:contact@jabvlabs.com" className="hover:text-red-400 transition-colors duration-200">
                  contact@jabvlabs.com
                </a>
              </li>
              <li>Reno, Nevada, USA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 JABV Holdings LLC. All rights reserved. Built with passion in Reno, Nevada.</p>
        </div>
      </div>
    </footer>
  );
}
