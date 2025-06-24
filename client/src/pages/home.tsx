import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <PortfolioCarousel />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}