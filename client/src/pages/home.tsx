import { Navigation } from '@/components/navigation';
import { HeroWithBanner } from '@/components/hero-section'; // Changed from HeroSection to HeroWithBanner
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroWithBanner /> {/* Changed from HeroSection to HeroWithBanner */}
      <PortfolioCarousel />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
