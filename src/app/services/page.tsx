import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services — Webpagix',
  description:
    'Explore the full suite of services Webpagix offers: AI Automation, Web Development, Mobile Apps, Cloud Solutions, and SEO & Growth.',
};

const services = [
  {
    slug: 'ai-automation',
    badge: 'AI-Powered',
    title: 'AI Automation',
    subtitle: 'Work Less. Achieve More.',
    description:
      'We design and deploy intelligent automation systems that eliminate manual work, accelerate your pipeline, and give your team superpowers.',
    emoji: '🤖',
    gradient: 'from-teal-500 to-cyan-400',
    bg: 'from-teal-500/10 to-cyan-400/5',
  },
  {
    slug: 'web-development',
    badge: 'Full Stack',
    title: 'Web Development',
    subtitle: 'Fast, Beautiful, Built to Scale.',
    description:
      'From pixel-perfect marketing sites to complex web apps — we engineer digital products that perform flawlessly and convert visitors into customers.',
    emoji: '💻',
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    slug: 'mobile-apps',
    badge: 'iOS & Android',
    title: 'Mobile Apps',
    subtitle: "Apps Your Users Can't Put Down.",
    description:
      'Beautiful, fast, and feature-rich mobile apps for iOS and Android built with React Native for native performance at a fraction of the cost.',
    emoji: '📱',
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/5',
  },
  {
    slug: 'cloud',
    badge: 'Cloud-Native',
    title: 'Cloud Solutions',
    subtitle: 'Scalable Infrastructure, Zero Headaches.',
    description:
      'From cloud migrations to serverless architectures and DevOps automation — the infrastructure backbone that lets your product scale to millions.',
    emoji: '☁️',
    gradient: 'from-sky-500 to-blue-400',
    bg: 'from-sky-500/10 to-blue-400/5',
  },
  {
    slug: 'seo',
    badge: 'Growth Marketing',
    title: 'SEO & Growth',
    subtitle: 'Rank Higher. Grow Faster.',
    description:
      'Data-driven SEO strategies and growth marketing systems that bring qualified organic traffic and compound your growth month over month.',
    emoji: '📈',
    gradient: 'from-green-500 to-emerald-400',
    bg: 'from-green-500/10 to-emerald-400/5',
  },
];

export default function ServicesPage() {
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
            What We Build
          </span>
          <h1 className="mt-2 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Services Built for{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            From AI automation to full-stack web and mobile development — we deliver end-to-end
            digital solutions that drive real growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />

              <div className="flex flex-1 flex-col p-7">
                {/* Icon + badge */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.bg} text-3xl`}
                  >
                    {service.emoji}
                  </div>
                  <span
                    className={`rounded-full bg-gradient-to-r ${service.gradient} px-3 py-0.5 text-xs font-semibold text-white`}
                  >
                    {service.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">{service.title}</h2>
                <p className={`mt-0.5 bg-gradient-to-r ${service.gradient} bg-clip-text text-sm font-semibold text-transparent`}>
                  {service.subtitle}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>

                {/* Arrow CTA */}
                <div
                  className={`mt-6 flex items-center gap-1.5 bg-gradient-to-r ${service.gradient} bg-clip-text text-sm font-semibold text-transparent`}
                >
                  Learn more
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ stroke: 'url(#tealGrad)' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
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
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          Book a free 30-minute strategy call and we&apos;ll map out exactly which services will
          move the needle for your business.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-200 transition hover:opacity-90"
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="/works"
            className="rounded-full border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-600"
          >
            View Our Work
          </Link>
        </div>
      </section>
    </main>
  );
}
