import { Navigation } from '@/components/navigation';
import HeroWithBanner from '@/components/hero-section';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
<<<<<<< HEAD
      <HeroWithBanner />
      <PortfolioCarousel />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
=======
      <HeroWithBanner loadingComplete={loadingComplete} />
      <PortfolioCarousel />
      <ServicesSection />
      <AboutSection />
>>>>>>> 012843c7200ee2de4fc0bc1f576bcb17a48a5ddb
      <Footer />
    </div>
  );
}
