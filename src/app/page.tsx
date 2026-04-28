import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import IndustriesSection from '@/components/IndustriesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Webpagix Solutions — Enterprise AI Automation & Web Development',
  description:
    'Webpagix Solutions is a premier AI automation and custom web development agency headquartered in Ongole, with offices in Michigan and Florida. We build intelligent digital solutions that drive real business results.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
