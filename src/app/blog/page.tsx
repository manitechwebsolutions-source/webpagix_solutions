import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AI automation, web development, and digital growth from the Webpagix team in Hyderabad.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
