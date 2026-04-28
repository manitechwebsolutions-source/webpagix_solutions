'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

import { posts } from '@/data/posts';

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
