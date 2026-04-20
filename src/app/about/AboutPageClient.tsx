'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, staggerContainer, staggerItem, slideInLeft, slideInRight } from '@/lib/animations';
import { Target, Heart, Rocket, Code2, BrainCircuit, TrendingUp } from 'lucide-react';
import CTASection from '@/components/CTASection';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const founders = [
  {
    name: 'Edara Manikanta',
    role: 'Founder & CEO',
    photo: '/team/manikanta.jpg',
    initials: 'EM',
    bio: 'Edara Manikanta is the visionary behind Webpagix. With deep expertise in AI systems, web development, and business strategy, he founded Webpagix in Ongole, Andhra Pradesh, India  to help businesses of every size access world-class digital solutions and intelligent automation.',
    skills: ['AI Automation', 'Web Development', 'Business Strategy', 'Cloud Architecture'],
    socials: { linkedin: 'https://www.linkedin.com/in/edara-manikanta', twitter: '#', instagram: '#' },
    gradient: 'from-[#0FADA8] to-[#0a8a86]',
  },
  {
    name: 'Viswanth',
    role: 'CTO / Advisor',
    photo: null,
    initials: 'V',
    bio: 'Viswanth brings deep technical leadership and strategic advisory experience to Webpagix. He oversees technology architecture decisions and guides the team in building secure, scalable, and future-ready systems.',
    skills: ['System Architecture', 'Technical Advisory', 'Cloud Infrastructure', 'Engineering Leadership'],
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
    gradient: 'from-[#6C63FF] to-[#4B44CC]',
  },
  {
    name: 'Sai',
    role: 'CTO / Director of Sales',
    photo: null,
    initials: 'S',
    bio: "Sai combines sharp technical insight with powerful sales leadership. He drives Webpagix's revenue growth while ensuring client solutions are technically sound, aligned with business goals, and delivered with excellence.",
    skills: ['Sales Strategy', 'Revenue Growth', 'Technical Sales', 'Client Relations'],
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
    gradient: 'from-[#F59E0B] to-[#D97706]',
  },
];

const founderSocials = [
  { key: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn' },
  { key: 'twitter', icon: TwitterIcon, label: 'Twitter' },
  { key: 'instagram', icon: InstagramIcon, label: 'Instagram' },
] as const;

const values = [
  { icon: Target, title: 'Precision', description: 'Every line of code, every automation, every pixel is intentional.' },
  { icon: Heart, title: 'Client First', description: 'We succeed when our clients succeed. No exceptions.' },
  { icon: Rocket, title: 'Speed', description: 'We move fast without sacrificing quality — always.' },
  { icon: Code2, title: 'Craftsmanship', description: 'We take pride in building things the right way, every time.' },
  { icon: BrainCircuit, title: 'Innovation', description: 'AI is in our DNA. We solve problems others think unsolvable.' },
  { icon: TrendingUp, title: 'Growth', description: "We don't just build — we build for long-term scale." },
];

export default function AboutPageClient() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="py-24 bg-white">
          <div className="container-max">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.span variants={staggerItem} className="badge mb-4 inline-flex">About Us</motion.span>
              <motion.h1
                variants={staggerItem}
                className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-6"
              >
                <br />
                Our{' '}
                <span className="text-gradient">Mission.</span>
              </motion.h1>
              <motion.p variants={staggerItem} className="section-subtitle">
                Webpagix was born in Ongole, Andhra Pradesh, India — founded by Edara Manikanta with an obsession for technology and a belief that businesses of every size deserve world-class digital solutions.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="badge mb-4 inline-flex">Our Story</span>
                <h2 className="text-4xl font-bold text-[#111827] mb-5 leading-tight">
                  Built from a <span className="text-gradient">Dorm Room</span>,<br />
                  Scaled Globally
                </h2>
                <div className="flex flex-col gap-4 text-[#6B7280] text-[15px] leading-relaxed">
                  <p>
                    It started with a simple question: why do so many businesses struggle with their digital presence? Edara Manikanta set out to change that.
                  </p>
                  <p>
                    Webpagix was founded in 2026 from Ongole, combining deep expertise in tech, strategy, and automation to create a studio that builds digital products that actually work.
                  </p>
                  <p>
                    We&apos;ve already shipped production web apps for healthcare and e-commerce clients, and we&apos;ve developed a suite of AI voice agent demos tailored for industries like manufacturing, retail, and healthcare — ready to be deployed.
                  </p>
                  <p>
                    With a growing presence across Ongole, Michigan, and Florida — we&apos;re scaling fast.
                  </p>
                </div>

              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: 'Web Projects Delivered', value: '2+' },
                  { label: 'Industries Served', value: '6+' },
                  { label: 'AI Agent Demos', value: '3+' },
                  { label: 'Office Locations', value: '3' },
                ].map((stat) => (
                  <div key={stat.label} className="card text-center">
                    <p className="text-4xl font-extrabold text-[#0FADA8] mb-1">{stat.value}</p>
                    <p className="text-sm text-[#6B7280] font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-24 bg-white">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">The Team</span>
              <h2 className="section-title mb-4">Meet the Leadership</h2>
              <p className="section-subtitle mx-auto text-center">
                The minds behind Webpagix — combining vision, deep technical expertise, and relentless execution.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {founders.map(({ name, role, photo, initials, bio, skills, socials, gradient }) => (
                <motion.article
                  key={name}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
                  className="card flex flex-col gap-4"
                >
                  {photo ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[#0FADA8]/20">
                      <Image
                        src={photo}
                        alt={`${name} profile photo`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl font-extrabold`}>
                      {initials}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-[#111827]">{name}</h3>
                    <p className="text-sm text-[#0FADA8] font-medium">{role}</p>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="badge text-xs">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-1">
                    {founderSocials.map(({ key, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={socials[key]}
                        aria-label={label}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0FADA8] hover:text-white transition-all"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="container-max">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="badge mb-4">Our Values</span>
              <h2 className="text-4xl font-bold text-white mb-4">What Drives Us</h2>
              <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
                The principles that guide every decision, every build, every client interaction.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {values.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 group cursor-default hover:border-[#0FADA8]/40 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0FADA8]/15 flex items-center justify-center mb-4 group-hover:bg-[#0FADA8]/30 transition-colors">
                    <Icon size={20} className="text-[#0FADA8]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
