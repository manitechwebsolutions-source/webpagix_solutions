'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    slug: 'ai-automation-small-business',
    category: 'AI Automation',
    title: '5 Ways AI Automation Can Save Small Businesses 20+ Hours a Week',
    excerpt:
      'Discover the practical, high-impact ways AI tools can eliminate repetitive tasks, streamline operations, and free your team to focus on growth.',
    readTime: '6 min read',
    date: 'Apr 8, 2026',
    featured: true,
  },
  {
    slug: 'nextjs-vs-vite-2026',
    category: 'Web Development',
    title: 'Next.js 14 vs Vite in 2026: Which Should You Choose?',
    excerpt:
      'A deep dive into the trade-offs between Next.js 14 and Vite for modern web applications — performance, DX, and real-world considerations.',
    readTime: '8 min read',
    date: 'Apr 2, 2026',
    featured: false,
  },
  {
    slug: 'seo-nextjs-14-guide',
    category: 'SEO & Growth',
    title: 'The Complete SEO Guide for Next.js 14 App Router',
    excerpt:
      'Everything you need to know about implementing server-side SEO metadata, Open Graph tags, sitemaps, and structured data in Next.js 14.',
    readTime: '10 min read',
    date: 'Mar 25, 2026',
    featured: false,
  },
  {
    slug: 'hyderabad-tech-startup-ecosystem',
    category: 'Startup',
    title: 'Why Hyderabad is Becoming India\'s Next Silicon Valley',
    excerpt:
      'An inside look at the booming tech startup ecosystem in Hyderabad — the funding, talent, and innovation driving rapid growth.',
    readTime: '5 min read',
    date: 'Mar 18, 2026',
    featured: false,
  },
  {
    slug: 'workflow-automation-crm',
    category: 'AI Automation',
    title: 'How We Automated a Client\'s Entire CRM Pipeline (Case Study)',
    excerpt:
      'A step-by-step case study of how we built a fully automated lead-to-close CRM workflow that saves a real estate agency 45 hours a month.',
    readTime: '7 min read',
    date: 'Mar 10, 2026',
    featured: false,
  },
  {
    slug: 'react-server-components-explained',
    category: 'Web Development',
    title: 'React Server Components: A Practical Guide for 2026',
    excerpt:
      'Cut through the hype. Here\'s a clear, practical explanation of React Server Components, when to use them, and common pitfalls to avoid.',
    readTime: '9 min read',
    date: 'Feb 28, 2026',
    featured: false,
  },
];

const categories = ['All', 'AI Automation', 'Web Development', 'SEO & Growth', 'Startup'];

export default function BlogPageClient() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <main>
      <section className="py-20 bg-white">
        <div className="container-max">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mb-14"
          >
            <motion.span variants={staggerItem} className="badge mb-4 inline-flex">Blog</motion.span>
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
            >
              Insights &amp;{' '}
              <span className="text-gradient">Ideas</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="section-subtitle">
              Thoughts on AI, web development, automation, and building businesses for the modern world.
            </motion.p>
          </motion.div>

          {/* Categories */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((c) => (
              <button
                key={c}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  c === 'All'
                    ? 'bg-[#0FADA8] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#E6FAFA] hover:text-[#0FADA8]'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {featured && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <Link href={`/blog/${featured.slug}`} className="block">
                <motion.article
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
                  className="card p-8 lg:p-10 bg-gradient-to-br from-[#0A0A0A] to-[#111827] border-none group cursor-pointer"
                >
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="badge">{featured.category}</span>
                    <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Tag size={11} /> Featured</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#0FADA8] transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
                      <span>{featured.date}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[#0FADA8] group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          )}

          {/* Post Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rest.map((post) => (
              <motion.div
                key={post.slug}
                variants={staggerItem}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <motion.article
                    whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
                    className="card h-full flex flex-col gap-4 group cursor-pointer"
                  >
                    <span className="badge self-start">{post.category}</span>
                    <h2 className="text-lg font-semibold text-[#111827] group-hover:text-[#0FADA8] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6B7280] leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <ArrowRight size={14} className="text-[#0FADA8] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
