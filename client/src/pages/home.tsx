import { Navigation } from '@/components/navigation';
import HeroWithBanner from '@/components/hero-section';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';
import { FadeInSection } from '@/components/fade-in-section';

export default function Home({ loadingComplete }: { loadingComplete?: boolean }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroWithBanner loadingComplete={loadingComplete} />
      <FadeInSection direction="up" delay={200}>
        <PortfolioCarousel />
      </FadeInSection>
      <FadeInSection direction="up" delay={300}>
        <ServicesSection />
      </FadeInSection>
      <FadeInSection direction="up" delay={400}>
        <AboutSection />
      </FadeInSection>
      <FadeInSection direction="fade" delay={500}>
        <Footer />
      </FadeInSection>
    </div>
  );
}
