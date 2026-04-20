'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, slideInRight } from '@/lib/animations';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Bot, RefreshCw, Mic, FileText, GitMerge, BarChart,
  Zap, Palette, Smartphone, Shield, Plug, MessageSquare,
  Cpu, WifiOff, Bell, Star, LineChart,
  Cloud, Server, GitBranch, TrendingUp, DollarSign, Activity,
  Search, PenTool, ExternalLink, Gauge, MapPin, BarChart2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CTASection from '@/components/CTASection';
import { TechOrbit } from '@/components/TechOrbit';

const iconMap: Record<string, LucideIcon> = {
  Bot, RefreshCw, Mic, FileText, GitMerge, BarChart,
  Zap, Palette, Smartphone, Shield, Plug, MessageSquare,
  Cpu, WifiOff, Bell, Star, LineChart,
  Cloud, Server, GitBranch, TrendingUp, DollarSign, Activity,
  Search, PenTool, ExternalLink, Gauge, MapPin, BarChart2,
};

export type BenefitData = { iconName: string; title: string; description: string };
export type ProcessStep  = { step: number; title: string; description: string };

export type ServiceData = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  benefits: BenefitData[];
  process: ProcessStep[];
  techStack: string[];
};

export default function ServicePageClient({ data }: { data: ServiceData }) {
  return (
    <>
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — Content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <motion.span variants={staggerItem} className="badge mb-4 inline-flex">
                  {data.badge}
                </motion.span>
                <motion.h1
                  variants={staggerItem}
                  className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
                >
                  {data.title}
                  <br />
                  <span className="text-gradient">{data.subtitle}</span>
                </motion.h1>
                <motion.p variants={staggerItem} className="section-subtitle">
                  {data.description}
                </motion.p>
                <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mt-6">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <NextLink href="/contact" className="btn-primary gap-2">
                      Get Started <ArrowRight size={15} />
                    </NextLink>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <NextLink href="/works" className="btn-outline gap-2">
                      View Our Work
                    </NextLink>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right — Hero Image */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="relative hidden lg:block"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src={data.heroImage}
                    alt={`${data.title} service`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0FADA8]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                    <span className="w-2 h-2 rounded-full bg-[#0FADA8] animate-pulse" />
                    <span className="text-xs font-semibold text-[#111827]">{data.title}</span>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#E6FAFA] rounded-full blur-3xl opacity-60 -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">What You Get</span>
              <h2 className="section-title mb-4">Key Benefits</h2>
              <p className="section-subtitle mx-auto text-center">
                Everything you need to stay ahead — nothing you don&apos;t.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.benefits.map(({ iconName, title, description }) => {
                const Icon = iconMap[iconName] ?? Bot;
                return (
                  <motion.div
                    key={title}
                    variants={staggerItem}
                    whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
                    className="card group cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E6FAFA] flex items-center justify-center mb-4 group-hover:bg-[#0FADA8] transition-colors duration-300">
                      <Icon size={20} className="text-[#0FADA8] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-2">{title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">Our Process</span>
              <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
              <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
                A proven, transparent process that delivers results on time and on budget.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {data.process.map(({ step, title, description }) => (
                <motion.div
                  key={step}
                  variants={staggerItem}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#0FADA8]/50 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0FADA8] flex items-center justify-center text-white text-sm font-bold mb-4">
                    {step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                  {step < data.process.length && (
                    <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-0.5 bg-[#0FADA8]/40" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────────────── */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="badge mb-4">Tools &amp; Technologies</span>
              <h2 className="section-title mb-4">Our Tech Stack</h2>
              <p className="section-subtitle mx-auto text-center">
                Best-in-class tools to ensure quality, speed, and reliability.
              </p>
            </motion.div>

            {/* Orbit — desktop (lg+) */}
            <div className="hidden lg:flex justify-center">
              <TechOrbit tools={data.techStack} />
            </div>

            {/* Pills — mobile & tablet */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex lg:hidden flex-wrap justify-center gap-3"
            >
              {data.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={staggerItem}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-5 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-full text-sm font-semibold text-[#111827] hover:border-[#0FADA8] hover:text-[#0FADA8] hover:bg-[#E6FAFA] transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
