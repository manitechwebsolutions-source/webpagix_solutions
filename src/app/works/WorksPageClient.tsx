'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import {
  Globe2,
  BrainCircuit,
  Mic2,
  Factory,
  ShoppingBag,
  Heart,
  ExternalLink,
  BadgeCheck,
  Clock,
  Sparkles,
  Shield,
  Gem,
} from 'lucide-react';
import CTASection from '@/components/CTASection';

// ── Web Development Projects ────────────────────────────────────────────────
const webProjects = [
  {
    id: 'proj-security',
    tag: 'Security Services',
    icon: Shield,
    color: '#1E3A8A',
    title: 'Sri Sai Prabhu Security Services',
    description:
      'A professional business website for Sri Sai Prabhu Security Services & Man Power Agency, Tenali. The site showcases their security guard, housekeeping, and facility management services with a clean, trust-building design, contact forms, and WhatsApp integration for instant enquiries.',
    tech: ['react', 'Tailwind CSS', 'JavaScript', 'WhatsApp API', 'Responsive Design'],
    highlight: 'Clean, professional presence that builds instant client trust for a growing security agency.',
    status: 'Live',
    link: 'https://sspsecurityagency.com/',
  },
  {
    id: 'proj-jewellery',
    tag: 'Jewellery & Retail',
    icon: Gem,
    color: '#B8860B',
    title: 'Rama Chary & Sons Jewellery Works',
    description:
      'An elegant jewellery showcase website for Rama Chary & Sons, featuring a stunning gallery of handcrafted gold and diamond collections. Built with a rich, luxury aesthetic — warm gold tones, smooth image galleries, and a "Chat with us" live support widget to drive enquiries.',
    tech: ['react', 'Tailwind CSS', 'JavaScript', 'Gallery Lightbox', 'Live Chat Widget'],
    highlight: 'Luxury design that reflects the brand\'s craftsmanship — "Our Renown is Our Own Customer."',
    status: 'Live',
    link: 'https://ramacharyjewelleryworks.com/',
  },
];

// ── AI Agent Demos ──────────────────────────────────────────────────────────
const aiDemos = [
  {
    id: 'ai-manufacturing',
    icon: Factory,
    color: '#0FADA8',
    title: 'AI Voice Agent for Manufacturing',
    description:
      'A voice-powered AI agent designed to handle shift handover reports, equipment maintenance queries, and production line status updates — completely hands-free and integrated with ERP systems.',
    industry: 'Manufacturing',
    status: 'Demo Ready',
  },
  {
    id: 'ai-healthcare-voice',
    icon: Heart,
    color: '#FF6B6B',
    title: 'AI Voice Agent for Healthcare',
    description:
      'An intelligent voice assistant that handles appointment booking calls 24/7, answers patient FAQs, and escalates complex queries to human staff — reducing front-desk workload by up to 60%.',
    industry: 'Healthcare',
    status: 'Demo Ready',
  },
  {
    id: 'ai-retail',
    icon: ShoppingBag,
    color: '#FFB347',
    title: 'AI Voice Agent for Retail',
    description:
      'A customer service voice AI for retail chains that handles order tracking, return requests, and product queries in real-time — compatible with phone, WhatsApp, and web chat.',
    industry: 'Retail',
    status: 'Demo Ready',
  },
];

// ── Status chips ────────────────────────────────────────────────────────────
function StatusChip({ status }: { status: string }) {
  const isLive = status === 'Live';
  const isDemo = status === 'Demo Ready';
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${isLive
        ? 'bg-emerald-100 text-emerald-700'
        : isDemo
          ? 'bg-[#E6FAFA] text-[#0FADA8]'
          : 'bg-gray-100 text-gray-500'
        }`}
    >
      {isLive ? <BadgeCheck size={12} /> : isDemo ? <Mic2 size={12} /> : <Clock size={12} />}
      {status}
    </span>
  );
}

export default function WorksPageClient() {
  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="py-24 bg-white">
          <div className="container-max">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.span variants={staggerItem} className="badge mb-4 inline-flex">
                Our Work
              </motion.span>
              <motion.h1
                variants={staggerItem}
                className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-6"
              >
                Works &amp;{' '}
                <span className="text-gradient">Projects</span>
              </motion.h1>
              <motion.p variants={staggerItem} className="section-subtitle">
                From production-grade web apps to cutting-edge AI voice agent demos — here&apos;s a
                snapshot of what we&apos;ve built and what&apos;s coming.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Web Development Projects ── */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="badge mb-4 inline-flex">
                <Globe2 size={13} className="mr-1" />
                Web Development
              </span>
              <h2 className="section-title mb-3">Projects We&apos;ve Delivered</h2>
              <p className="section-subtitle">
                Real-world web applications built for clients — scalable, fast, and conversion-focused.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              {webProjects.map(({ id, tag, icon: Icon, color, title, description, tech, highlight, status, link }) => (
                <motion.article
                  key={id}
                  id={id}
                  variants={staggerItem}
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(15,173,168,0.12)' }}
                  className="card flex flex-col lg:flex-row gap-6 lg:gap-10 group"
                >
                  {/* Icon Block */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}22` }}
                  >
                    <Icon size={28} style={{ color }} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold text-[#0FADA8] uppercase tracking-widest">
                        {tag}
                      </span>
                      <StatusChip status={status} />
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-2xl font-bold text-[#111827] group-hover:text-[#0FADA8] transition-colors">
                        {title}
                      </h3>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0FADA8] hover:bg-[#0a8a86] px-4 py-2 rounded-xl transition-colors shrink-0"
                      >
                        View Live Site <ExternalLink size={13} />
                      </a>
                    </div>
                    <p className="text-[15px] text-[#6B7280] leading-relaxed">{description}</p>

                    {/* Highlight */}
                    <div className="flex items-start gap-2 bg-[#E6FAFA] rounded-xl px-4 py-3">
                      <Sparkles size={15} className="text-[#0FADA8] shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-[#0a8a86]">{highlight}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── AI Agent Demos ── */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">
                <BrainCircuit size={13} className="inline mr-1" />
                AI Voice Agents
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                AI Agent Demos —{' '}
                <span className="text-[#0FADA8]">Live for Industries</span>
              </h2>
              <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
                We&apos;ve built ready-to-demo AI voice agents tailored for specific industries. These
                aren&apos;t prototypes — they&apos;re deployable solutions you can experience right now.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {aiDemos.map(({ id, icon: Icon, color, title, description, industry, status }) => (
                <motion.div
                  key={id}
                  id={id}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.2)' }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:border-[#0FADA8]/50 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}22` }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <StatusChip status={status} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0FADA8] uppercase tracking-widest mb-2">
                      {industry}
                    </p>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#0FADA8] transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FADA8] hover:underline"
                    >
                      Request a Demo <ExternalLink size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ISO Note */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-14 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <Clock size={18} className="text-[#6B7280] shrink-0" />
                <p className="text-sm text-[#6B7280]">
                  <strong className="text-white">ISO Certification Projects:</strong> We are currently
                  in the process of pursuing ISO compliance engagements. Stay tuned — these projects
                  will be featured here once completed.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="py-16 bg-white">
          <div className="container-max text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#111827] mb-4">
                Have a project in mind?
              </h2>
              <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
                Whether it&apos;s a web app, AI automation, or an industry-specific voice agent — let&apos;s
                talk.
              </p>
              <a
                href="/contact"
                id="works-cta-btn"
                className="btn-primary inline-flex items-center gap-2"
              >
                Start a Project <ExternalLink size={15} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
