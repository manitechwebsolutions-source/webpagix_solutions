import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Webpagix Solutions',
  description:
    'Meet Edara Manikanta, the founder behind Webpagix Solutions — a premier AI automation and custom web development agency headquartered in Ongole, with offices in Michigan and Florida.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
