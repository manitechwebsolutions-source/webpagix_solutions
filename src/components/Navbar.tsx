'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const industries = [
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Real Estate', href: '/industries/real-estate' },
  { label: 'E-Commerce', href: '/industries/ecommerce' },
  { label: 'Education', href: '/industries/education' },
  { label: 'Finance & FinTech', href: '/industries/finance' },
  { label: 'Hospitality', href: '/industries/hospitality' },
];

const services = [
  { label: 'AI Automation',   href: '/services/ai-automation' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Mobile Apps',     href: '/services/mobile-apps' },
  { label: 'Cloud Solutions', href: '/services/cloud' },
  { label: 'SEO & Growth',    href: '/services/seo' },
];

const navLinks = [
  { label: 'Works', href: '/works' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lock]);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useScrollLock(mobileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIndustriesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''
          }`}
      >
        <nav className="container-max h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Webpagix home">
            <Image
              src="/logo.png"
              alt="Webpagix logo"
              width={120}
              height={50}
              className="h-15 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Industries Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="industries-nav-btn"
                onClick={() => setIndustriesOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${industriesOpen
                  ? 'text-[#0FADA8] bg-[#E6FAFA]'
                  : 'text-gray-700 hover:text-[#0FADA8] hover:bg-[#E6FAFA]'
                  }`}
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                Industries
                <motion.span animate={{ rotate: industriesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    id="industries-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-lg p-2 z-50"
                  >
                    {industries.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-[#E6FAFA] hover:text-[#0FADA8] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                id="services-nav-btn"
                onClick={() => setServicesOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${servicesOpen
                  ? 'text-[#0FADA8] bg-[#E6FAFA]'
                  : 'text-gray-700 hover:text-[#0FADA8] hover:bg-[#E6FAFA]'
                  }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="services-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-lg p-2 z-50"
                  >
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-[#E6FAFA] hover:text-[#0FADA8] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${pathname === link.href
                  ? 'text-[#0FADA8] bg-[#E6FAFA]'
                  : 'text-gray-700 hover:text-[#0FADA8] hover:bg-[#E6FAFA]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
              <Link
                href="/contact"
                id="book-demo-btn"
                className="btn-outline text-sm px-5 py-2"
              >
                Book a Demo
              </Link>
            </motion.div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="container-max py-4 flex flex-col gap-1">
                {/* Mobile Industries */}
                <button
                  onClick={() => setMobileIndustriesOpen((o) => !o)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#E6FAFA] hover:text-[#0FADA8] transition-colors"
                >
                  Industries
                  <motion.span animate={{ rotate: mobileIndustriesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileIndustriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 overflow-hidden"
                    >
                      {industries.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:text-[#0FADA8] hover:bg-[#E6FAFA] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Services */}
                <button
                  onClick={() => setMobileServicesOpen((o) => !o)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#E6FAFA] hover:text-[#0FADA8] transition-colors"
                >
                  Services
                  <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 overflow-hidden"
                    >
                      {services.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:text-[#0FADA8] hover:bg-[#E6FAFA] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#E6FAFA] hover:text-[#0FADA8] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-2 pb-1">
                  <Link href="/contact" id="mobile-book-demo-btn" className="btn-primary w-full text-sm justify-center">
                    Book a Demo
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
