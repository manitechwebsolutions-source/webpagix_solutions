'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
import { CheckCircle2, ArrowRight, Mic } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/CTASection';

export type Transformation = {
  title: string;
  description: string;
  image: string;
};

export type IndustryData = {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  transformations: Transformation[];
  voiceAgentFeatures: string[];
};

/* ─── Animated voice-agent visual ─────────────────────────── */
function VoiceVisual() {
  const bars = [3, 6, 9, 5, 8, 4, 10, 7, 8, 4, 7, 5, 9];
  return (
    <div className="relative bg-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-[#0FADA8]/15 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full border border-[#0FADA8]/10 pointer-events-none" />

      <div className="flex flex-col items-center gap-6 py-6 relative">
        {/* Pulsing mic button */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(15,173,168,0.5)',
              '0 0 0 22px rgba(15,173,168,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="w-20 h-20 rounded-full bg-[#0FADA8] flex items-center justify-center shadow-xl"
        >
          <Mic size={32} className="text-white" />
        </motion.div>

        {/* Animated waveform */}
        <div className="flex items-end gap-1 h-14">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-[#0FADA8] rounded-full"
              animate={{ height: [`${h * 3}px`, `${h * 7}px`, `${h * 3}px`] }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                delay: i * 0.09,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white font-medium">AI Voice Agent Active</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full mt-2">
          {[
            { label: 'Response Time', value: '<1s' },
            { label: 'Availability',  value: '24/7' },
            { label: 'Languages',     value: '10+'  },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="text-center bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <p className="text-2xl font-bold text-[#0FADA8]">{value}</p>
              <p className="text-[11px] text-[#6B7280] mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function IndustryPageClient({ data }: { data: IndustryData }) {
  return (
    <>
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <motion.span variants={staggerItem} className="badge mb-4 inline-flex">
                  Industry Solution
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
                <motion.div variants={staggerItem} className="flex gap-3 mt-6">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/contact" className="btn-primary gap-2">
                      Get a Custom Solution <ArrowRight size={15} />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right — Image */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="relative hidden lg:block"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src={data.heroImage}
                    alt={`${data.title} industry`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0FADA8]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                    <span className="w-2 h-2 rounded-full bg-[#0FADA8] animate-pulse" />
                    <span className="text-xs font-semibold text-[#111827]">{data.title} Solutions</span>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#E6FAFA] rounded-full blur-3xl opacity-60 -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── How We Transform ─────────────────────────────────── */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">Transformation</span>
              <h2 className="section-title mb-4">
                How We Transform Your {data.title} Operations
              </h2>
              <p className="section-subtitle mx-auto text-center">
                Real workflows. Real results. Built specifically for{' '}
                {data.title.toLowerCase()} businesses like yours.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {data.transformations.map(({ title, description, image }) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(15,173,168,0.13)' }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group cursor-default"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 via-transparent to-transparent" />
                    {/* Pill on image */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0FADA8]" />
                      <span className="text-[10px] font-semibold text-[#111827]">AI-Powered</span>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#111827] mb-2 leading-snug">{title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why Choose Webpagix Voice Agents ─────────────────── */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — Content */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="badge mb-6 inline-flex">Voice AI</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  Why Choose Webpagix{' '}
                  <span className="text-[#0FADA8]">Voice Agents</span>
                </h2>
                <p className="text-[#6B7280] mb-8 leading-relaxed text-[15px]">
                  Deploy enterprise-grade AI voice agents purpose-built for{' '}
                  {data.title.toLowerCase()} — reducing overhead, eliminating
                  wait times, and delivering exceptional experiences around the clock.
                </p>

                <ul className="flex flex-col gap-4 mb-10">
                  {data.voiceAgentFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-[#0FADA8] shrink-0 mt-0.5"
                      />
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="btn-primary gap-2 inline-flex">
                    Book a Voice Agent Demo <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — Animated visual */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <VoiceVisual />
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <CTASection />
    </>
  );
}
