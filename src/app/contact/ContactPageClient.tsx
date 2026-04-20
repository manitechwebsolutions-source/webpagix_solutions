'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Loader2,
  X,
} from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const callCountryCodes = [
  { code: '+91',  flag: '🇮🇳', country: 'India' },
  { code: '+1',   flag: '🇺🇸', country: 'USA / Canada' },
  { code: '+44',  flag: '🇬🇧', country: 'UK' },
  { code: '+61',  flag: '🇦🇺', country: 'Australia' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+65',  flag: '🇸🇬', country: 'Singapore' },
  { code: '+49',  flag: '🇩🇪', country: 'Germany' },
  { code: '+33',  flag: '🇫🇷', country: 'France' },
  { code: '+81',  flag: '🇯🇵', country: 'Japan' },
  { code: '+86',  flag: '🇨🇳', country: 'China' },
  { code: '+55',  flag: '🇧🇷', country: 'Brazil' },
  { code: '+27',  flag: '🇿🇦', country: 'South Africa' },
  { code: '+92',  flag: '🇵🇰', country: 'Pakistan' },
  { code: '+880', flag: '🇧🇩', country: 'Bangladesh' },
  { code: '+82',  flag: '🇰🇷', country: 'South Korea' },
  { code: '+60',  flag: '🇲🇾', country: 'Malaysia' },
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+90',  flag: '🇹🇷', country: 'Turkey' },
  { code: '+20',  flag: '🇪🇬', country: 'Egypt' },
  { code: '+234', flag: '🇳🇬', country: 'Nigeria' },
  { code: '+31',  flag: '🇳🇱', country: 'Netherlands' },
  { code: '+34',  flag: '🇪🇸', country: 'Spain' },
  { code: '+39',  flag: '🇮🇹', country: 'Italy' },
  { code: '+52',  flag: '🇲🇽', country: 'Mexico' },
  { code: '+7',   flag: '🇷🇺', country: 'Russia' },
];

const CALL_ISO_TO_DIAL: Record<string, string> = {
  IN: '+91', US: '+1', CA: '+1', GB: '+44', AU: '+61',
  AE: '+971', SG: '+65', DE: '+49', FR: '+33', JP: '+81',
  CN: '+86', BR: '+55', ZA: '+27', PK: '+92', BD: '+880',
  KR: '+82', MY: '+60', SA: '+966', TR: '+90', EG: '+20',
  NG: '+234', NL: '+31', ES: '+34', IT: '+39', MX: '+52', RU: '+7',
};

const services = [
  'AI Automation',
  'Web Development',
  'Mobile App',
  'Cloud Solutions',
  'SEO & Growth',
  'Other',
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@webpagix.ai',
    href: 'mailto:hello@webpagix.ai',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 7842008351',
    href: 'tel:+917842008351',
  },
  {
    icon: MapPin,
    label: 'Ongole HQ',
    value: 'Ongole, Andhra Pradesh, India',
    href: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d228.4193717007563!2d80.0849614220896!3d15.486845930354606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4b00bd12cc4617%3A0xe159e40a6e707a62!2s42-108-437%2C%20Rice%20Mill%20Rd%2C%20N%20T%20R%20Colony%2C%20Koppolu%2C%20Ongole%2C%20Koppolu%2C%20Andhra%20Pradesh%20523286!5e1!3m2!1sen!2sin!4v1776304743790!5m2!1sen!2sin',
  },
  {
    icon: MapPin,
    label: 'USA — Michigan',
    value: 'Michigan, USA',
    href: '#',
  },
  {
    icon: MapPin,
    label: 'USA — Florida',
    value: 'Florida, USA',
    href: '#',
  },
];

const inputBase =
  'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0FADA8]/30 focus:border-[#0FADA8] bg-white placeholder:text-gray-400';
const inputNormal = 'border-gray-200';
const inputError = 'border-red-400 bg-red-50';

export default function ContactPageClient() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [apiError, setApiError] = useState<string>('');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  /* ── AI Strategy Call Modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [callCountryCode, setCallCountryCode] = useState('+91');
  const [callDetecting, setCallDetecting] = useState(false);
  const [callPhone, setCallPhone] = useState('');
  const [callName, setCallName] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [callError, setCallError] = useState('');
  const phoneInputRef = useRef<HTMLInputElement>(null);

  /* Auto-detect country when modal opens */
  useEffect(() => {
    if (!modalOpen) return;
    setCallDetecting(true);
    const ctrl = new AbortController();
    fetch('https://ipapi.co/json/', { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        const dial = CALL_ISO_TO_DIAL[d.country_code as string];
        if (dial) setCallCountryCode(dial);
      })
      .catch(() => {})
      .finally(() => {
        setCallDetecting(false);
        setTimeout(() => phoneInputRef.current?.focus(), 50);
      });
    return () => ctrl.abort();
  }, [modalOpen]);

  const handleStrategyCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callPhone.trim()) {
      setCallError('Please enter your phone number.');
      return;
    }
    setCallStatus('loading');
    setCallError('');
    const phone = `${callCountryCode}${callPhone.replace(/^0+/, '')}`;
    try {
      const res = await fetch('/api/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: callName, phone, role: 'Strategy Call', email: '' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Something went wrong.');
      setCallStatus('success');
    } catch (err: unknown) {
      setCallError(err instanceof Error ? err.message : 'Failed to initiate call.');
      setCallStatus('error');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCallPhone('');
    setCallName('');
    setCallStatus('idle');
    setCallError('');
  };

  /* ── Validation ── */
  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setErrors({});
    setApiError('');
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setApiError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  /* ── Field change ── */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
      setApiError('');
    }
  };

  /* ── Reset ── */
  const handleReset = () => {
    setForm({ name: '', email: '', company: '', service: '', message: '' });
    setStatus('idle');
    setApiError('');
    setErrors({});
  };

  const isLoading = status === 'loading';

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-max px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.span
              variants={staggerItem}
              className="badge mb-4 inline-flex"
            >
              Get In Touch
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
            >
              Let&apos;s Build
              <br />
              <span className="text-gradient">Something Great</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="section-subtitle">
              Book a free 30-minute strategy call or drop us a message. We&apos;ll
              get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pb-20 sm:pb-28 bg-white">
        <div className="container-max px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* ── Left — Contact Info ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {/* Info card — dark */}
              <div className="card bg-[#0A0A0A] border-none">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Contact Information
                </h2>
                <p className="text-[#6B7280] text-sm mb-6">
                  Reach us through any of these channels. We&apos;re based in
                  Hyderabad and serve clients globally.
                </p>
                <div className="flex flex-col gap-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0FADA8]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0FADA8]/40 transition-colors">
                        <Icon size={16} className="text-[#0FADA8]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#6B7280] font-medium">
                          {label}
                        </p>
                        <p className="text-sm text-white font-semibold group-hover:text-[#0FADA8] transition-colors truncate">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time card */}
              <div className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6FAFA] flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#0FADA8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">
                    Response Time
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    We typically respond within{' '}
                    <strong className="text-[#0FADA8]">4–8 business hours</strong>. For
                    urgent projects, mention it in your message.
                  </p>
                </div>
              </div>

              {/* Strategy call CTA — triggers AI agent modal */}
              <button
                onClick={() => { setModalOpen(true); setCallStatus('idle'); }}
                className="card border-[#0FADA8]/30 hover:border-[#0FADA8] transition-colors group flex items-center justify-between gap-4 w-full text-left cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-[#111827] text-sm">
                    Book a Free Strategy Call
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    30 minutes · AI connects you instantly
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0FADA8]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0FADA8]/20 transition-colors">
                  <Phone size={15} className="text-[#0FADA8]" />
                </div>
              </button>
            </motion.div>

            {/* ── Right — Form ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="card p-6 sm:p-8">
                <AnimatePresence mode="wait">

                  {/* ── Success State ── */}
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      className="flex flex-col items-center justify-center py-10 sm:py-14 text-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-[#E6FAFA] flex items-center justify-center"
                      >
                        <CheckCircle2 size={32} className="text-[#0FADA8]" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#111827]">
                          Message Sent! 🎉
                        </h3>
                        <p className="text-[#6B7280] max-w-xs mx-auto mt-2 text-sm">
                          Thanks for reaching out,{' '}
                          <strong className="text-[#111827]">{form.name}</strong>!
                          Our team will reply to{' '}
                          <strong className="text-[#0FADA8]">{form.email}</strong>{' '}
                          within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="btn-outline mt-2 text-sm"
                      >
                        Send Another Message
                      </button>
                    </motion.div>

                  ) : (

                    /* ── Form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-col gap-5"
                      id="contact-form"
                    >
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                          Send Us a Message
                        </h2>
                        <p className="text-sm text-[#6B7280] mt-1">
                          Fill in the details below and we&apos;ll get back to you shortly.
                        </p>
                      </div>

                      {/* API error banner */}
                      <AnimatePresence>
                        {status === 'error' && apiError && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                          >
                            <AlertCircle
                              size={18}
                              className="text-red-500 shrink-0 mt-0.5"
                            />
                            <p className="text-sm text-red-600">{apiError}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Row 1 — Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-[#111827] mb-1.5"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            disabled={isLoading}
                            className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle size={11} />
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#111827] mb-1.5"
                          >
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            disabled={isLoading}
                            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle size={11} />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 2 — Company & Service */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-semibold text-[#111827] mb-1.5"
                          >
                            Company Name
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Acme Inc. (optional)"
                            disabled={isLoading}
                            className={`${inputBase} ${inputNormal}`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-semibold text-[#111827] mb-1.5"
                          >
                            Service Needed{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`${inputBase} ${errors.service ? inputError : inputNormal}`}
                          >
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle size={11} />
                              {errors.service}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 3 — Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-[#111827] mb-1.5"
                        >
                          Your Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project, goals, and timeline..."
                          disabled={isLoading}
                          className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle size={11} />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Privacy note */}
                      <p className="text-xs text-[#9CA3AF]">
                        🔒 Your information is kept private and never shared with
                        third parties.
                      </p>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        id="contact-submit-btn"
                        whileHover={isLoading ? {} : { scale: 1.02 }}
                        whileTap={isLoading ? {} : { scale: 0.97 }}
                        disabled={isLoading}
                        className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed gap-2"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin w-4 h-4 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={15} className="shrink-0" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AI Strategy Call Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="call-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={closeModal}
          >
            <motion.div
              key="call-modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={15} className="text-gray-500" />
              </button>

              <AnimatePresence mode="wait">
                {/* ── SUCCESS ── */}
                {callStatus === 'success' ? (
                  <motion.div
                    key="call-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-4 gap-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#E6FAFA] flex items-center justify-center">
                      <CheckCircle2 size={28} className="text-[#0FADA8]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827]">We&apos;re Calling You!</h3>
                    <p className="text-sm text-[#6B7280]">
                      Our AI strategy agent is dialing{' '}
                      <span className="font-semibold text-[#111827]">
                        {callCountryCode}{callPhone}
                      </span>
                      . Pick up in a moment!
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      Our team will follow up with a tailored proposal within 24 hours.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-2 text-sm text-[#0FADA8] hover:underline"
                    >
                      Close
                    </button>
                  </motion.div>

                ) : (
                  /* ── FORM ── */
                  <motion.div
                    key="call-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#E6FAFA] flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-[#0FADA8]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827] text-base leading-tight">
                          Book a Free Strategy Call
                        </h3>
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          Our AI agent will call you within seconds
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleStrategyCall} className="flex flex-col gap-3">
                      {/* Name */}
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={callName}
                        onChange={(e) => setCallName(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0FADA8] transition"
                      />

                      {/* Phone row */}
                      <div className={`flex rounded-lg border overflow-hidden transition-colors ${
                        callStatus === 'error' ? 'border-red-400' : 'border-gray-200'
                      } focus-within:ring-2 focus-within:ring-[#0FADA8] focus-within:border-[#0FADA8]`}>
                        {/* Country code */}
                        <div className="relative shrink-0">
                          <select
                            value={callCountryCode}
                            onChange={(e) => setCallCountryCode(e.target.value)}
                            disabled={callDetecting}
                            style={{ width: '5.5rem' }}
                            className={`h-full appearance-none border-r border-gray-200 pl-2.5 pr-5 py-2.5 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer transition-colors ${
                              callDetecting ? 'bg-gray-100 text-gray-400' : 'bg-gray-50'
                            }`}
                          >
                            {callCountryCodes.map(({ code, flag, country }) => (
                              <option key={code + country} value={code}>
                                {flag} {code} — {country}
                              </option>
                            ))}
                          </select>
                          {callDetecting ? (
                            <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-[#0FADA8] pointer-events-none" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0FADA8] pointer-events-none" />
                          )}
                        </div>
                        {/* Number */}
                        <input
                          ref={phoneInputRef}
                          type="tel"
                          placeholder="Phone number"
                          value={callPhone}
                          onChange={(e) => { setCallPhone(e.target.value); if (callStatus === 'error') setCallStatus('idle'); }}
                          required
                          className="flex-1 min-w-0 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Error */}
                      {callStatus === 'error' && callError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 text-xs text-red-500"
                        >
                          <AlertCircle size={12} /> {callError}
                        </motion.p>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={callStatus === 'loading'}
                        whileHover={callStatus !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={callStatus !== 'loading' ? { scale: 0.97 } : {}}
                        className="w-full flex items-center justify-center gap-2 bg-[#0FADA8] hover:bg-[#0d9b96] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 text-sm transition-colors duration-200 mt-1"
                      >
                        {callStatus === 'loading' ? (
                          <><Loader2 size={15} className="animate-spin" /> Connecting…</>
                        ) : (
                          <><Phone size={15} /> Call me now</>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-[#9CA3AF]">
                        🔒 Your number is only used to call you back. No spam.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>

  );
}
