'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aditya Sharma',
    role: 'Founder, MedBook',
    avatar: 'AS',
    rating: 5,
    text: 'Webpagix transformed our patient onboarding with an AI-driven workflow. We reduced manual data entry by 70% in just 3 weeks. Absolutely stellar work!',
  },
  {
    name: 'Priya Nambiar',
    role: 'CMO, PropNest Realty',
    avatar: 'PN',
    rating: 5,
    text: 'Our new website went from wireframe to live in 2 weeks. The team is incredibly responsive, proactive, and the design quality blew us away. Highly recommend.',
  },
  {
    name: 'Rahul Goel',
    role: 'CTO, LearnSphere',
    avatar: 'RG',
    rating: 5,
    text: 'We needed a scalable LMS with custom automations. Webpagix delivered beyond our expectations. Their ability to combine web dev and AI is truly rare.',
  },
  {
    name: 'Sunita Reddy',
    role: 'CEO, StyleCart',
    avatar: 'SR',
    rating: 5,
    text: 'The team rebuilt our e-commerce platform and integrated inventory automation. Sales conversion improved by 35% in the first month. Just wow.',
  },
  {
    name: 'Mohammed Irfan',
    role: 'Director, SwiftFinance',
    avatar: 'MI',
    rating: 5,
    text: 'From compliance workflows to a modern client portal, Webpagix executed everything with precision and speed. Also great post-launch support.',
  },
  {
    name: 'Divya Krishnan',
    role: 'Co-founder, NomadKitchen',
    avatar: 'DK',
    rating: 5,
    text: 'They built our food delivery platform from scratch and automated the entire order flow. A fantastic partner for any tech-first startup.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container-max">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">Client Stories</span>
          <h2 className="section-title mb-4">Trusted by Founders &amp; Teams</h2>
          <p className="section-subtitle mx-auto text-center">
            Real outcomes from real clients — across industries and business sizes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map(({ name, role, avatar, rating, text }) => (
            <motion.article
              key={name}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
              className="card flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#0FADA8] text-[#0FADA8]" />
                ))}
              </div>

              <p className="text-[#111827] text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0FADA8] to-[#0a8a86] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{name}</p>
                  <p className="text-xs text-[#6B7280]">{role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
