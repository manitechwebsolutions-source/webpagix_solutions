'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Building2, GraduationCap, Heart, Banknote, ShoppingBag, Hotel, Play, Pause, Volume2 } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'AI-powered patient management, appointment automation, and HIPAA-compliant digital solutions.',
    href: '/industries/healthcare',
    color: '#FF6B6B',
    audio: '/audio/healthcare.mp3',
    audioLabel: 'AI appointment booking demo',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Property listing platforms, CRM automation, and lead generation systems for modern agencies.',
    href: '/industries/real-estate',
    color: '#4ECDC4',
    audio: '/audio/realestate.mp3',
    audioLabel: 'AI lead follow-up demo',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    description: 'High-conversion storefronts, inventory automation, and personalized shopping experiences.',
    href: '/industries/ecommerce',
    color: '#FFB347',
    audio: '/audio/ecommerce.mp3',
    audioLabel: 'AI support agent demo',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Learning management systems, course platforms, and student engagement automation tools.',
    href: '/industries/education',
    color: '#A78BFA',
    audio: '/audio/education.mp3',
    audioLabel: 'AI student onboarding demo',
  },
  {
    icon: Banknote,
    title: 'Finance & FinTech',
    description: 'Secure client portals, compliance workflows, and automated reporting for financial firms.',
    href: '/industries/finance',
    color: '#34D399',
    audio: '/audio/finance.mp3',
    audioLabel: 'AI financial advisor demo',
  },
  {
    icon: Hotel,
    title: 'Hospitality',
    description: 'Booking systems, guest experience automation, and review management platforms.',
    href: '/industries/hospitality',
    color: '#F59E0B',
    audio: '/audio/hospatility.mp3',
    audioLabel: 'AI concierge demo',
  },
];

// Animated waveform bars shown while playing
function Waveform({ color, playing }: { color: string; playing: boolean }) {
  const bars = [3, 5, 8, 5, 10, 7, 4, 9, 6, 4, 8, 5];
  return (
    <div className="flex items-center gap-[2px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          animate={
            playing
              ? { scaleY: [0.4, 1, 0.4], opacity: [0.6, 1, 0.6] }
              : { scaleY: 0.3, opacity: 0.35 }
          }
          transition={
            playing
              ? { duration: 0.6 + i * 0.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }
              : { duration: 0.2 }
          }
          initial={{ scaleY: 0.3 }}
          style={{ height: h + 4, backgroundColor: color, originY: 0.5 }}
        />
      ))}
    </div>
  );
}

// Compact audio player per card
function AudioPlayer({ src, label, color }: { src: string; label: string; color: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoaded(true);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onError = () => setLoaded(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="mt-4 pt-4 border-t border-gray-100"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
          style={{ backgroundColor: `${color}22`, color }}
          title={playing ? 'Pause' : 'Play demo'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.span key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause size={14} fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={14} fill="currentColor" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Waveform + progress */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Volume2 size={11} style={{ color }} className="opacity-70" />
              <span className="text-[10px] font-medium text-gray-400">{label}</span>
            </div>
            {loaded && duration > 0 && (
              <span className="text-[10px] text-gray-400 tabular-nums">
                {formatTime((progress / 100) * duration)} / {formatTime(duration)}
              </span>
            )}
            {!loaded && (
              <span className="text-[10px] text-gray-300 italic">audio coming soon</span>
            )}
          </div>

          {/* Waveform visualization */}
          <Waveform color={color} playing={playing} />

          {/* Progress bar */}
          <div
            className="h-1 bg-gray-100 rounded-full cursor-pointer overflow-hidden"
            onClick={seek}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color, width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-[#F9FAFB]">
      <div className="container-max">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">Industries We Serve</span>
          <h2 className="section-title mb-4">Built for Every Sector</h2>
          <p className="section-subtitle mx-auto text-center">
            We bring deep domain knowledge to every project, crafting industry-specific solutions that solve real-world business challenges.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {industries.map(({ icon: Icon, title, description, href, color, audio, audioLabel }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,173,168,0.15)' }}
              className="card group cursor-pointer flex flex-col"
            >
              {/* Card content — navigates to industry page */}
              <Link href={href} className="flex flex-col gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2 group-hover:text-[#0FADA8] transition-colors">{title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                </div>
                <p className="text-xs font-semibold text-[#0FADA8] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <span>→</span>
                </p>
              </Link>

              {/* Audio demo player — does NOT trigger navigation */}
              <AudioPlayer src={audio} label={audioLabel} color={color} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
