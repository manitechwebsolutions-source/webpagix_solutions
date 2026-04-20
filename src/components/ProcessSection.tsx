'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We understand your business goals, pain points, and desired outcomes in a focused 30-minute session.',
  },
  {
    step: '02',
    title: 'Strategy & Roadmap',
    description: 'Our team crafts a tailored digital strategy with timelines, tech stack, and clear deliverables.',
  },
  {
    step: '03',
    title: 'Build & Automate',
    description: 'We execute with precision — iterating fast, shipping clean code, and integrating intelligent automations.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description: 'Go live with confidence. We monitor, optimize, and continuously scale your digital presence.',
  },
];

const pillars = [
  'Transparent communication throughout',
  'Weekly progress updates',
  'Dedicated project manager',
  'Post-launch 30-day support',
  'Optimized for performance & SEO',
  '100% ownership of source code',
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#0A0A0A]">
      <div className="container-max">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">Our Process</span>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            From Idea to{' '}
            <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            A streamlined 4-step process that takes your vision from concept to production — fast, transparent, and results-driven.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {steps.map(({ step, title, description }, i) => (
            <motion.div
              key={step}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-default group transition-all duration-300 hover:border-[#0FADA8]/40"
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-[#0FADA8]/30 z-10" />
              )}
              <span className="text-5xl font-extrabold text-[#0FADA8]/20 leading-none block mb-3 group-hover:text-[#0FADA8]/40 transition-colors">
                {step}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {pillars.map((p) => (
            <div key={p} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#0FADA8] shrink-0" />
              <p className="text-sm text-gray-300 font-medium">{p}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
