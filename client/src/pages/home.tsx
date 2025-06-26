import { Navigation } from '@/components/navigation';
import TypewriterHero from '@/components/typewriter-hero';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';

export default function Home({ loadingComplete }: { loadingComplete?: boolean }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <TypewriterHero loadingComplete={loadingComplete} />
      <PortfolioCarousel />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
