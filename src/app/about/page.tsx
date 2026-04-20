import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Edara Manikanta, the founder behind Webpagix — an AI automation and web development startup founded in Hyderabad, India, with a mission to build smarter digital solutions.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
