'use client';

import { motion } from 'framer-motion';
import { fadeUp, slideInLeft } from '@/lib/animations';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/data/posts';
import CTASection from '@/components/CTASection';

type Props = {
  post: BlogPost;
};

export default function BlogPostClient({ post }: Props) {
  return (
    <main className="bg-white">
      <article className="pt-24 pb-20">
        <div className="container-max max-w-4xl">
          
          {/* Back Button */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#0FADA8] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-14"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="badge">{post.category}</span>
              {post.featured && (
                <span className="flex items-center gap-1 text-xs text-[#0FADA8] font-semibold bg-[#E6FAFA] px-3 py-1 rounded-full">
                  <Tag size={11} /> Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 py-5 border-y border-gray-100 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#0FADA8]" />
                <span className="font-medium text-[#111827]">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#0FADA8]" />
                <span className="font-medium text-[#111827]">{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0FADA8] to-[#0a8a86] text-white flex items-center justify-center text-[10px] font-bold">
                  WS
                </div>
                <span className="font-medium text-[#111827]">Webpagix Solutions</span>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#4B5563] leading-relaxed space-y-6 text-lg [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#111827] [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#111827] [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-[#0FADA8] [&>blockquote]:bg-[#E6FAFA] [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:rounded-r-xl [&>blockquote]:text-xl [&>blockquote]:font-medium [&>blockquote]:text-[#111827] [&>blockquote]:my-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-3 [&>li>strong]:text-[#111827]"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Content is coming soon...</p>' }}
          />
        </div>
      </article>

      {/* Tailwind Typography Plugin is assumed to be installed, but if not, we use basic styling in the class string above */}
      
      <CTASection />
    </main>
  );
}
