'use client';

import { motion } from 'framer-motion';
import { Globe, BrainCircuit, Smartphone, Cloud, BarChart3, ShieldCheck } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const services = [
  {
    icon: BrainCircuit,
    title: 'AI Automation',
    description:
      'Automate repetitive tasks, streamline pipelines, and integrate AI into your existing workflows — saving hundreds of hours each month.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Blazing-fast, SEO-optimized websites and web apps built with Next.js, Tailwind, and modern stacks that convert visitors into customers.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Cross-platform mobile applications with React Native, delivering flawless experiences on both iOS and Android.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Infrastructure setup, serverless deployments, and cloud migrations on AWS, GCP, and Vercel — scalable and cost-efficient.',
  },
  {
    icon: BarChart3,
    title: 'SEO & Growth',
    description:
      'Data-driven SEO strategies, performance audits, and conversion optimization to grow your organic traffic and revenue.',
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance & Support',
    description:
      '24/7 monitoring, updates, bug fixes, and performance tuning — so your digital products always run at peak performance.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container-max">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">What We Do</span>
          <h2 className="section-title mb-4">Services Built for the Modern Web</h2>
          <p className="section-subtitle mx-auto text-center">
            From intelligent automation to world-class web experiences — we deliver end-to-end digital solutions that drive real business results.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
              className="card group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E6FAFA] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[#0FADA8]">
                <Icon size={22} className="text-[#0FADA8] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-2">{title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
