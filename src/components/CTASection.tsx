'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

const roles = [
  'CEO / Founder',
  'CTO / Tech Lead',
  'Product Manager',
  'Marketing Manager',
  'Business Owner',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const countryCodes = [
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
  { code: '+94',  flag: '🇱🇰', country: 'Sri Lanka' },
  { code: '+977', flag: '🇳🇵', country: 'Nepal' },
  { code: '+60',  flag: '🇲🇾', country: 'Malaysia' },
  { code: '+62',  flag: '🇮🇩', country: 'Indonesia' },
  { code: '+63',  flag: '🇵🇭', country: 'Philippines' },
  { code: '+66',  flag: '🇹🇭', country: 'Thailand' },
  { code: '+84',  flag: '🇻🇳', country: 'Vietnam' },
  { code: '+82',  flag: '🇰🇷', country: 'South Korea' },
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', country: 'Qatar' },
  { code: '+968', flag: '🇴🇲', country: 'Oman' },
  { code: '+973', flag: '🇧🇭', country: 'Bahrain' },
  { code: '+964', flag: '🇮🇶', country: 'Iraq' },
  { code: '+90',  flag: '🇹🇷', country: 'Turkey' },
  { code: '+98',  flag: '🇮🇷', country: 'Iran' },
  { code: '+20',  flag: '🇪🇬', country: 'Egypt' },
  { code: '+234', flag: '🇳🇬', country: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', country: 'Kenya' },
  { code: '+233', flag: '🇬🇭', country: 'Ghana' },
  { code: '+31',  flag: '🇳🇱', country: 'Netherlands' },
  { code: '+34',  flag: '🇪🇸', country: 'Spain' },
  { code: '+39',  flag: '🇮🇹', country: 'Italy' },
  { code: '+41',  flag: '🇨🇭', country: 'Switzerland' },
  { code: '+46',  flag: '🇸🇪', country: 'Sweden' },
  { code: '+47',  flag: '🇳🇴', country: 'Norway' },
  { code: '+48',  flag: '🇵🇱', country: 'Poland' },
  { code: '+32',  flag: '🇧🇪', country: 'Belgium' },
  { code: '+7',   flag: '🇷🇺', country: 'Russia' },
  { code: '+52',  flag: '🇲🇽', country: 'Mexico' },
  { code: '+54',  flag: '🇦🇷', country: 'Argentina' },
  { code: '+56',  flag: '🇨🇱', country: 'Chile' },
  { code: '+57',  flag: '🇨🇴', country: 'Colombia' },
  { code: '+64',  flag: '🇳🇿', country: 'New Zealand' },
];

/** Map ISO-3166-1 alpha-2 country codes → dial codes */
const ISO_TO_DIAL: Record<string, string> = {
  IN: '+91', US: '+1', CA: '+1', GB: '+44', AU: '+61',
  AE: '+971', SG: '+65', DE: '+49', FR: '+33', JP: '+81',
  CN: '+86', BR: '+55', ZA: '+27', PK: '+92', BD: '+880',
  LK: '+94', NP: '+977', MY: '+60', ID: '+62', PH: '+63',
  TH: '+66', VN: '+84', KR: '+82', SA: '+966', QA: '+974',
  OM: '+968', BH: '+973', IQ: '+964', TR: '+90', IR: '+98',
  EG: '+20', NG: '+234', KE: '+254', GH: '+233', NL: '+31',
  ES: '+34', IT: '+39', CH: '+41', SE: '+46', NO: '+47',
  PL: '+48', BE: '+32', RU: '+7',  MX: '+52', AR: '+54',
  CL: '+56', CO: '+57', NZ: '+64',
};

export default function CTASection() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [detecting, setDetecting] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* ── Auto-detect country via IP on mount ── */
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const dial = ISO_TO_DIAL[data.country_code as string];
        if (dial) setCountryCode(dial);
      })
      .catch(() => { /* silently fall back to +91 */ })
      .finally(() => setDetecting(false));
    return () => controller.abort();
  }, []);

  const phone = `${countryCode}${phoneNumber.replace(/^0+/, '')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setErrorMsg('Phone number is required to call you.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Failed to initiate call. Please try again.'
      );
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMsg('');
    setPhoneNumber('');
  };

  return (
    <section id="cta" className="py-24 bg-[#0A0A0A]">
      <div className="container-max">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Full-section dark teal gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#071e1d] via-[#0d2b2b] to-[#0a1a1a]" />
          {/* Diagonal stripe overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(15,173,168,0.35) 18px, rgba(15,173,168,0.35) 20px)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#0FADA820,transparent_55%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">
            {/* ── Left: Text Content ── */}
            <div className="flex flex-col justify-center px-10 py-14 sm:px-14 sm:py-16 lg:py-20">
              <span className="badge mb-6 inline-flex w-fit">
                <span className="w-2 h-2 rounded-full bg-[#0FADA8] animate-pulse" />
                Limited spots available this month
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
                Experience Webpagix
                <br />
                <span className="text-gradient">AI in Action</span>
              </h2>
              <p className="text-[#9CA3AF] text-base sm:text-lg mb-4 max-w-md leading-relaxed">
                Enter your details and our AI strategy agent will call you
                within seconds — no signup, no commitment.
              </p>
              <p className="text-[#6B7280] text-sm sm:text-base max-w-sm leading-relaxed">
                It&apos;s quick, free, and just might change the way you think
                about AI &amp; digital growth forever.
              </p>
            </div>

            {/* ── Right: Form Card ── */}
            <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                <AnimatePresence mode="wait">
                  {/* ── SUCCESS STATE ── */}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle className="text-green-500" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        We&apos;re Calling You Now!
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        Our AI strategy agent is dialing{' '}
                        <span className="font-semibold text-gray-700">{phone}</span>.
                        Please pick up in a moment.
                      </p>
                      <p className="text-xs text-gray-400 mb-6">
                        Our human team will follow up with a tailored proposal within 24 hours.
                      </p>
                      <button
                        onClick={handleReset}
                        className="text-sm text-[#0FADA8] hover:underline"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  )}

                  {/* ── FORM STATE (idle / loading / error) ── */}
                  {status !== 'success' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Get a Call from Our AI Agent
                      </h3>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Role dropdown */}
                        <div className="relative">
                          <select
                            id="cta-role-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0FADA8] text-sm transition"
                          >
                            <option value="" disabled>Select a role</option>
                            {roles.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>

                        {/* Name */}
                        <input
                          id="cta-name-input"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0FADA8] text-sm transition"
                        />

                        {/* Email */}
                        <input
                          id="cta-email-input"
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0FADA8] text-sm transition"
                        />

                        {/* Phone — REQUIRED */}
                        <motion.div
                          animate={!detecting ? {
                            boxShadow: ['0 0 0 0px rgba(15,173,168,0)', '0 0 0 4px rgba(15,173,168,0.18)', '0 0 0 0px rgba(15,173,168,0)'],
                          } : {}}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          className={`flex rounded-lg border overflow-hidden transition-colors ${
                            status === 'error' ? 'border-red-400' : 'border-gray-200'
                          } focus-within:ring-2 focus-within:ring-[#0FADA8] focus-within:border-[#0FADA8]`}
                        >
                          {/* Compact country code selector */}
                          <div
                            className="relative shrink-0"
                            title={detecting ? 'Detecting your country…' : 'Auto-detected — you can change this'}
                          >
                            <select
                              id="cta-country-code"
                              value={countryCode}
                              onChange={(e) => { setCountryCode(e.target.value); }}
                              disabled={detecting}
                              style={{ width: '5.5rem' }}
                              className={`h-full appearance-none border-r border-gray-200 pl-2.5 pr-5 py-3 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer transition-colors ${
                                status === 'error' ? 'bg-red-50' : detecting ? 'bg-gray-100 text-gray-400' : 'bg-gray-50'
                              }`}
                            >
                              {countryCodes.map(({ code, flag, country }) => (
                                <option key={code} value={code}>
                                  {flag} {code} — {country}
                                </option>
                              ))}
                            </select>

                            {/* Spinner while detecting */}
                            {detecting ? (
                              <svg
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-[#0FADA8] pointer-events-none"
                                fill="none" viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              /* Teal dot = auto-detected */
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0FADA8] pointer-events-none"
                              />
                            )}
                          </div>

                          {/* Number input */}
                          <input
                            id="cta-phone-input"
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              if (status === 'error') setStatus('idle');
                            }}
                            required
                            className={`flex-1 min-w-0 px-3 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-sm bg-white ${
                              status === 'error' ? 'bg-red-50' : ''
                            }`}
                          />
                        </motion.div>

                        {/* Error message */}
                        {status === 'error' && errorMsg && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-500 text-xs"
                          >
                            <AlertCircle size={14} />
                            {errorMsg}
                          </motion.div>
                        )}

                        {/* Submit button */}
                        <motion.button
                          type="submit"
                          id="cta-submit-btn"
                          disabled={status === 'loading'}
                          whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                          whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                          className="w-full flex items-center justify-center gap-2 bg-[#0d1f1f] hover:bg-[#0FADA8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3.5 mt-1 text-sm transition-colors duration-300 cursor-pointer"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Connecting your call...
                            </>
                          ) : (
                            <>
                              <Phone size={16} />
                              Call me now
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
