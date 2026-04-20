'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Globe, BrainCircuit } from 'lucide-react';
import { staggerContainer, staggerItem, slideInRight } from '@/lib/animations';

const floatingStats = [
  { label: 'Projects Delivered', value: '3+', icon: Globe },
  { label: 'AI Automations Built', value: '5+', icon: BrainCircuit },
  { label: 'Time Saved Monthly', value: '5000h', icon: Zap },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white min-h-[92vh] flex items-center">
      {/* Background decorative blobs */}
      <div className="absolute -top-32 -right-40 w-[600px] h-[600px] bg-[#E6FAFA] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-32 -left-40 w-[500px] h-[500px] bg-[#E6FAFA] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="container-max w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={staggerItem}>
              <span className="badge">
                <span className="w-2 h-2 rounded-full bg-[#0FADA8] animate-pulse" />
                AI-First Startup · Ongole, Andhra Pradesh , India
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-[#111827] tracking-tight leading-none"
            >
              We{' '}
              <span className="text-gradient">Build.</span>
              <br />
              We{' '}
              <span className="text-gradient">Automate.</span>
              <br />
              We{' '}
              <span className="text-gradient">Scale.</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="section-subtitle text-base sm:text-lg"
            >
              Webpagix is an AI automation and web development studio. We help businesses move faster, automate smarter, and grow beyond limits — powered by cutting-edge tech.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" id="hero-get-started-btn" className="btn-primary gap-2">
                  Get Started Free
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about" id="hero-learn-more-btn" className="btn-outline gap-2">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-6 pt-4">
              {floatingStats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#E6FAFA] flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#0FADA8]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#111827] leading-none">{value}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-full max-w-lg"
            >
              {/* Main dashboard card */}
              <div className="bg-[#0A0A0A] rounded-3xl shadow-2xl p-6 border border-gray-800">
                {/* Top bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-auto flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FADA8] animate-pulse" />
                    AI Engine Active
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Automations', val: '5+', delta: '+12%' },
                    { label: 'Time Saved', val: '5k hr', delta: '+8%' },
                    { label: 'Uptime', val: '99.9%', delta: '↑' },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                      <p className="text-[10px] text-gray-400 mb-1">{m.label}</p>
                      <p className="text-lg font-bold text-white">{m.val}</p>
                      <p className="text-[10px] text-[#0FADA8] font-semibold">{m.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Simulated bar chart */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-3">
                  <p className="text-xs text-gray-400 mb-3">Monthly Pipeline</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[30, 55, 40, 70, 50, 85, 60, 90, 75, 100, 80, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                        className="flex-1 rounded-t-md"
                        style={{
                          background: i === 11
                            ? '#0FADA8'
                            : `rgba(15,173,168,${0.2 + (h / 100) * 0.5})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Activity feed */}
                <div className="flex flex-col gap-2">
                  {[
                    { text: 'Lead automation triggered', time: '2m ago' },
                    { text: 'CRM sync complete', time: '5m ago' },
                    { text: 'New website deployed', time: '1h ago' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0FADA8]" />
                        <p className="text-xs text-gray-300">{item.text}</p>
                      </div>
                      <p className="text-[10px] text-gray-500">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E6FAFA] flex items-center justify-center">
                  <Zap size={16} className="text-[#0FADA8]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Workflow Saved</p>
                  <p className="text-xs text-[#6B7280]">120 hrs / month</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                className="absolute -top-5 -right-6 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3"
              >
                <p className="text-xs text-gray-500">Client satisfaction</p>
                <p className="text-xl font-extrabold text-[#0FADA8]">98%</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
