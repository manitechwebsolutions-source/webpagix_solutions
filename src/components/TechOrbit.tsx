'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechOrbitProps {
  tools: string[];
}

// Curated palette — cycles through tools
const ACCENT_COLORS = [
  '#0FADA8', // teal (brand)
  '#6366F1', // indigo
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#EC4899', // pink
  '#8B5CF6', // violet
  '#F97316', // orange
  '#06B6D4', // cyan
  '#84CC16', // lime
  '#EF4444', // red
  '#A855F7', // purple
];

function getInitials(name: string): string {
  const words = name.trim().split(/[\s.]+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function TechOrbit({ tools }: TechOrbitProps) {
  const SIZE = 620;
  const CX = SIZE / 2;   // 310
  const CY = SIZE / 2;   // 310
  const R1 = 92;         // inner decorative ring
  const R2 = 176;        // outer decorative ring
  const RC = 248;        // card-center radius

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* ── SVG: concentric rings + dashed spokes ─── */}
      <svg
        className="absolute inset-0 overflow-visible pointer-events-none"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Three rings */}
        <motion.circle
          cx={CX} cy={CY} r={R1}
          fill="none" stroke="#0FADA8" strokeWidth={1.5}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.28 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
        />
        <motion.circle
          cx={CX} cy={CY} r={(R1 + R2) / 2}
          fill="none" stroke="#0FADA8" strokeWidth={0.6}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}
        />
        <motion.circle
          cx={CX} cy={CY} r={R2}
          fill="none" stroke="#0FADA8" strokeWidth={1.5}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.22 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Dashed spokes — one per tool */}
        {tools.map((_, i) => {
          const a = (2 * Math.PI * i) / tools.length - Math.PI / 2;
          return (
            <motion.line
              key={i}
              x1={CX + (R1 + 8) * Math.cos(a)} y1={CY + (R1 + 8) * Math.sin(a)}
              x2={CX + (R2 - 8) * Math.cos(a)} y2={CY + (R2 - 8) * Math.sin(a)}
              stroke="#0FADA8" strokeWidth={1} strokeDasharray="4 3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
            />
          );
        })}
      </svg>

      {/* ── Center: Webpagix logo ────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-[134px] h-[134px] rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt="Webpagix"
            width={96}
            height={48}
            className="w-[86px] h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* ── Tool cards ──────────────────────────────── */}
      {tools.map((tool, i) => {
        const angle = (2 * Math.PI * i) / tools.length - Math.PI / 2;
        const x = CX + RC * Math.cos(angle);
        const y = CY + RC * Math.sin(angle);
        const color = ACCENT_COLORS[i % ACCENT_COLORS.length];

        return (
          <motion.div
            key={tool}
            className="absolute flex items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-md px-3.5 py-2.5 cursor-default"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2 + i * 0.07,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.12,
              boxShadow: '0 12px 32px rgba(15,173,168,0.22)',
              borderColor: '#0FADA8',
            }}
          >
            {/* Colored initial badge */}
            <span
              className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-white font-bold shrink-0"
              style={{ background: color, fontSize: '8px', letterSpacing: '0.04em' }}
            >
              {getInitials(tool)}
            </span>
            {/* Tool name */}
            <span className="text-[11px] font-semibold text-[#111827] whitespace-nowrap leading-tight">
              {tool}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
