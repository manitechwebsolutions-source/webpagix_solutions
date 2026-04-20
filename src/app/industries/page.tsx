import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Industries We Serve — Webpagix',
  description:
    'Webpagix delivers tailored AI automation, web, and mobile solutions across Healthcare, Real Estate, E-Commerce, Education, Finance, and Hospitality.',
};

const industries = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Smarter, Safer, Faster Patient Experiences',
    description:
      'HIPAA-aware digital solutions that streamline patient journeys, automate workflows, and give providers more time to focus on patient care.',
    emoji: '🏥',
    gradient: 'from-rose-500 to-pink-400',
    bg: 'from-rose-500/10 to-pink-400/5',
    badge: 'HIPAA-Aware',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Close More Deals, Faster',
    description:
      'Intelligent CRM automation that attracts better leads, nurtures them automatically, and closes deals without any manual effort.',
    emoji: '🏠',
    gradient: 'from-amber-500 to-orange-400',
    bg: 'from-amber-500/10 to-orange-400/5',
    badge: 'Lead Automation',
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce',
    subtitle: 'Sell More. Work Less.',
    description:
      'High-converting storefronts, inventory automation, and personalized shopping experiences that keep customers coming back.',
    emoji: '🛍️',
    gradient: 'from-violet-500 to-purple-400',
    bg: 'from-violet-500/10 to-purple-400/5',
    badge: 'Shopify & More',
  },
  {
    slug: 'education',
    title: 'Education',
    subtitle: 'Learning Without Limits',
    description:
      'Custom LMS platforms, AI-powered tutoring tools, and student engagement automation for modern educational institutions.',
    emoji: '🎓',
    gradient: 'from-blue-500 to-indigo-400',
    bg: 'from-blue-500/10 to-indigo-400/5',
    badge: 'EdTech',
  },
  {
    slug: 'finance',
    title: 'Finance & FinTech',
    subtitle: 'Compliance-Ready. Scalable. Fast.',
    description:
      'Secure client portals, automated compliance reporting, and data-driven dashboards built to the highest security and regulatory standards.',
    emoji: '📊',
    gradient: 'from-teal-500 to-cyan-400',
    bg: 'from-teal-500/10 to-cyan-400/5',
    badge: 'Compliance-Ready',
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    subtitle: 'Exceptional Guest Experiences, Automated',
    description:
      'Booking platforms, guest communication automation, and review management systems that keep guests returning.',
    emoji: '🏨',
    gradient: 'from-green-500 to-emerald-400',
    bg: 'from-green-500/10 to-emerald-400/5',
    badge: 'Guest-First',
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#0a1628] py-28 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,184,163,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1 text-sm font-medium text-teal-400">
            Industries We Serve
          </span>
          <h1 className="mt-2 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Tailored AI Solutions for{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            We understand that healthcare challenges differ from real estate or e-commerce. Our
            solutions are purpose-built for each sector&apos;s unique needs.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${industry.gradient}`} />

              <div className="flex flex-1 flex-col p-7">
                {/* Icon + badge */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${industry.bg} text-3xl`}
                  >
                    {industry.emoji}
                  </div>
                  <span
                    className={`rounded-full bg-gradient-to-r ${industry.gradient} px-3 py-0.5 text-xs font-semibold text-white`}
                  >
                    {industry.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">{industry.title}</h2>
                <p
                  className={`mt-0.5 bg-gradient-to-r ${industry.gradient} bg-clip-text text-sm font-semibold text-transparent`}
                >
                  {industry.subtitle}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                  {industry.description}
                </p>

                {/* Arrow CTA */}
                <div
                  className={`mt-6 flex items-center gap-1.5 bg-gradient-to-r ${industry.gradient} bg-clip-text text-sm font-semibold text-transparent`}
                >
                  Explore solutions
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-100 bg-slate-50 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Don&apos;t see your industry?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          We&apos;ve worked across many sectors. Tell us about your business and we&apos;ll tailor
          a solution that fits perfectly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-200 transition hover:opacity-90"
          >
            Talk to Our Team
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-600"
          >
            View Our Services
          </Link>
        </div>
      </section>
    </main>
  );
}
