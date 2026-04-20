import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryPageClient from './IndustryPageClient';
import type { IndustryData } from './IndustryPageClient';

const industryData: Record<string, IndustryData> = {

  /* ── Healthcare ─────────────────────────────────────────────── */
  healthcare: {
    title: 'Healthcare',
    subtitle: 'Smarter, Safer, Faster Patient Experiences',
    description:
      'We build HIPAA-aware digital solutions that streamline patient journeys, automate administrative workflows, and give healthcare providers more time to focus on what matters — patient care.',
    heroImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    transformations: [
      {
        title: 'AI-Powered Appointment Scheduling',
        description:
          'Eliminate scheduling chaos with AI that books, reschedules, and sends automated reminders — reducing no-shows by up to 40% and freeing your front desk staff.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      },
      {
        title: 'Automated Pre & Post-Visit Follow-Ups',
        description:
          'Automatically send intake forms before visits and care instructions, satisfaction surveys, and medication reminders after — improving patient outcomes with zero manual effort.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80',
      },
      {
        title: '24/7 AI-Powered Patient Support',
        description:
          'Always-on AI voice and chat agents answer patient questions, route urgent calls, handle appointment inquiries, and collect insurance details around the clock.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language AI voice support for diverse patient populations',
      'HIPAA-compliant voice AI agents with end-to-end encryption',
      '24/7 automated patient support, intake & appointment booking',
      'Seamless EHR & patient portal integration',
      'Intelligent call routing to the right department or specialist',
      'Automated post-visit satisfaction surveys & feedback collection',
    ],
  },

  /* ── Real Estate ─────────────────────────────────────────────── */
  'real-estate': {
    title: 'Real Estate',
    subtitle: 'Close More Deals, Faster',
    description:
      'From property listing platforms to intelligent CRM automation, we help real estate agencies attract better leads, nurture them automatically, and close deals without manual effort.',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    transformations: [
      {
        title: 'AI-Powered Lead Qualification',
        description:
          'Automatically score, segment, and qualify inbound leads based on budget, intent, and property preferences — so your agents only spend time on serious buyers and sellers.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
      },
      {
        title: 'Automated Property Matching & Follow-Ups',
        description:
          'AI matches buyers to listings the moment they become available, triggering personalized outreach sequences that nurture leads until they are ready to transact.',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
      },
      {
        title: '24/7 Appointment Booking & Virtual Tours',
        description:
          'Round-the-clock AI scheduling for property viewings, virtual tours, and agent consultations — capturing every lead even when your office is closed.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language property inquiry support for international buyers',
      'Automated lead qualification calls within seconds of inquiry',
      '24/7 appointment booking & viewing schedule management',
      'MLS & CRM data integration for real-time property info',
      'AI follow-up calls for cold leads and past clients',
      'Automated open house reminders and post-visit feedback',
    ],
  },

  /* ── E-Commerce ──────────────────────────────────────────────── */
  ecommerce: {
    title: 'E-Commerce',
    subtitle: 'Sell More. Work Less.',
    description:
      'High-converting storefronts, seamless inventory automation, and personalized shopping experiences that keep customers coming back — and spending more each visit.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    transformations: [
      {
        title: 'Personalized Shopping Experiences',
        description:
          'AI-driven product recommendations, dynamic pricing, and hyper-personalized email flows that increase average order value and boost repeat purchase rates.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      },
      {
        title: 'Automated Cart Recovery & Upsell Flows',
        description:
          'Recover lost revenue with intelligent, timed follow-up sequences targeting abandoned carts — combined with post-purchase upsell automation that works while you sleep.',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80',
      },
      {
        title: '24/7 AI Customer Support & Returns',
        description:
          'Handle order tracking, return requests, product FAQs, and complaint resolution with AI agents that respond instantly — reducing support costs by up to 70%.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language customer support for global storefronts',
      'Automated order status updates & delivery notifications',
      '24/7 returns, refunds, and complaint resolution via AI',
      'Shopify, WooCommerce & Magento integration',
      'AI-powered cart recovery phone & SMS follow-ups',
      'Post-purchase review collection and loyalty program support',
    ],
  },

  /* ── Education ───────────────────────────────────────────────── */
  education: {
    title: 'Education',
    subtitle: 'Learning Without Limits',
    description:
      'Custom LMS platforms, AI-powered tutoring tools, and student engagement automation for modern educational institutions — from K-12 schools to university and ed-tech startups.',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    transformations: [
      {
        title: 'AI Adaptive Learning Paths',
        description:
          'Personalized curriculum that dynamically adapts to each student\'s pace, strengths, and learning style — improving completion rates and measurable academic outcomes.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80',
      },
      {
        title: 'Automated Enrollment & Onboarding',
        description:
          'Streamline admissions with AI-guided enrollment workflows that collect documents, answer questions, and onboard students — reducing admin workload by hours per day.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
      },
      {
        title: '24/7 AI Student Support & Tutoring',
        description:
          'Instant answers to student questions about courses, deadlines, and resources — plus intelligent AI tutoring that provides step-by-step guidance at any hour.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language student support for diverse campuses',
      'Automated enrollment follow-ups and document collection calls',
      '24/7 academic guidance, deadline reminders, and FAQ resolution',
      'LMS platform integration (Canvas, Moodle, Blackboard)',
      'AI-powered parent communication and progress updates',
      'Automated fee payment reminders and scholarship notifications',
    ],
  },

  /* ── Finance & FinTech ───────────────────────────────────────── */
  finance: {
    title: 'Finance & FinTech',
    subtitle: 'Compliance-Ready. Scalable. Fast.',
    description:
      'Secure client portals, automated compliance reporting, and data-driven financial dashboards for modern financial firms — built to the highest security and regulatory standards.',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    transformations: [
      {
        title: 'Automated Compliance Reporting',
        description:
          'Generate accurate regulatory reports automatically, on-time, every time — eliminating manual errors, reducing audit risk, and keeping your firm always audit-ready.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
      },
      {
        title: 'AI-Powered Client Onboarding & KYC',
        description:
          'Reduce onboarding friction with intelligent document collection, identity verification, and KYC automation — cutting onboarding time from days to minutes.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
      },
      {
        title: '24/7 AI Financial Client Support',
        description:
          'Answer client queries, provide real-time account updates, handle routine transactions, and route complex cases to advisors — with full audit trails of every interaction.',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language client advisory and support calls',
      'Compliance-ready AI interactions with full call recording & logging',
      '24/7 account query resolution and transaction status updates',
      'Core banking, CRM, and advisory platform integration',
      'AI-powered KYC document verification follow-up calls',
      'Automated investment alert calls and portfolio update notifications',
    ],
  },

  /* ── Hospitality ─────────────────────────────────────────────── */
  hospitality: {
    title: 'Hospitality',
    subtitle: 'Exceptional Guest Experiences, Automated',
    description:
      'Booking platforms, guest communication automation, and review management systems that keep your hospitality business running smoothly — and your guests coming back.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    transformations: [
      {
        title: 'Direct Booking & Revenue Optimization',
        description:
          'AI-driven booking engine that maximizes occupancy and revenue per room with dynamic pricing — reducing dependence on OTAs and increasing direct booking commissions saved.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
      },
      {
        title: 'Automated Guest Communication',
        description:
          'Personalized pre-arrival messages, during-stay check-ins, local dining recommendations, and post-checkout review requests — all automated and perfectly timed.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
      },
      {
        title: '24/7 AI Concierge & Guest Support',
        description:
          'Handle guest requests, room service orders, local recommendations, maintenance reports, and late checkout requests with intelligent AI — without waking your staff.',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
      },
    ],
    voiceAgentFeatures: [
      'Multi-language AI concierge for international guests',
      'Automated booking confirmations, upsells & ancillary sales calls',
      '24/7 AI-powered guest services, requests & complaint handling',
      'PMS, channel manager & reservation system integration',
      'Post-checkout review request automation for Google & TripAdvisor',
      'AI-driven loyalty program enrollment and reward notifications',
    ],
  },
};

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(industryData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = industryData[params.slug];
  if (!data) return {};
  return {
    title: `${data.title} Solutions — Webpagix`,
    description: data.description,
  };
}

export default function IndustryPage({ params }: Props) {
  const data = industryData[params.slug];
  if (!data) notFound();
  return <IndustryPageClient data={data} />;
}
