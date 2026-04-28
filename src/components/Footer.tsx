'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const quickLinks = [
  { label: 'Works & Projects', href: '/works' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book a Demo', href: '/contact' },
];

const services = [
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Mobile Apps', href: '/services/mobile-apps' },
  { label: 'Cloud Solutions', href: '/services/cloud' },
  { label: 'SEO & Growth', href: '/services/seo' },
];

function LinkedinSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsappSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/webpagix-solutions/', Icon: LinkedinSvg },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramSvg },
  { label: 'Twitter / X', href: 'https://twitter.com', Icon: TwitterSvg },
  { label: 'WhatsApp', href: 'https://wa.me/917842008351', Icon: WhatsappSvg },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Webpagix Solutions home" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Webpagix Solutions logo"
                width={150}
                height={50}
                className="h-22 w-auto"
              />
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              We Build. We Automate. We Scale. — AI-first startup by Edara Manikanta. Offices in Ongole 🇮🇳, Michigan &amp; Florida 🇺🇸.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#0FADA8] hover:text-white transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#0FADA8] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-[#6B7280] hover:text-[#0FADA8] transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-[#6B7280]">
              <li>
                <a href="mailto:info@webpagixsolutions.com" className="flex items-center gap-2 hover:text-[#0FADA8] transition-colors">
                  <Mail size={13} className="text-[#0FADA8] shrink-0" />
                  info@webpagixsolutions.com
                </a>
              </li>
              <li>
                <a href="tel:+917842008351" className="flex items-center gap-2 hover:text-[#0FADA8] transition-colors">
                  <Phone size={13} className="text-[#0FADA8] shrink-0" />
                  +91 7842008351
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[#0FADA8] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Ongole, Andhra Pradesh<br />India — 523001</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[#0FADA8] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Novi, Michigan<br />United States</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[#0FADA8] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Tampa, Florida<br />United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Webpagix Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[#6B7280] hover:text-[#0FADA8] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-200">|</span>
            <Link href="/terms" className="text-xs text-[#6B7280] hover:text-[#0FADA8] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
