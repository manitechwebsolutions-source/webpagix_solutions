'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <div className="container-max text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          <motion.div
            variants={staggerItem}
            className="text-9xl font-extrabold text-gradient leading-none"
          >
            404
          </motion.div>
          <motion.h1 variants={staggerItem} className="text-3xl font-bold text-[#111827]">
            Page Not Found
          </motion.h1>
          <motion.p variants={staggerItem} className="text-[#6B7280] max-w-sm">
            Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/" className="btn-primary">Go Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn-outline">Contact Us</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
