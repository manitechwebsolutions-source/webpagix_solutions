import type { Metadata } from 'next';
import WorksPageClient from './WorksPageClient';

export const metadata: Metadata = {
  title: 'Works & Projects | Webpagix.ai',
  description: 'Explore our portfolio of web development projects and upcoming AI agent demos built for real-world industries.',
};

export default function WorksPage() {
  return <WorksPageClient />;
}
