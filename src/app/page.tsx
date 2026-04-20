import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import IndustriesSection from '@/components/IndustriesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Webpagix.ai — We Build. We Automate. We Scale.',
  description:
    'Webpagix is an AI automation and web development startup from Hyderabad, India. We build intelligent digital solutions that drive real business results.',
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
