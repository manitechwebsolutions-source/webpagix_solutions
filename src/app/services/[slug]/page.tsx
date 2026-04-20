import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';
import type { ServiceData } from './ServicePageClient';

const serviceData: Record<string, ServiceData> = {
  'ai-automation': {
    badge: 'AI-Powered',
    title: 'AI Automation',
    subtitle: 'Work Less. Achieve More.',
    description:
      'We design and deploy intelligent automation systems that eliminate manual work, accelerate your pipeline, and give your team superpowers — all without changing how you already work.',
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    benefits: [
      { iconName: 'Bot',       title: 'Lead Automation',    description: 'Capture and qualify leads 24/7 with AI-driven pipelines that never sleep or miss a follow-up.' },
      { iconName: 'RefreshCw', title: 'CRM Sync',           description: 'Keep your CRM always up to date with bi-directional data sync and zero manual entry.' },
      { iconName: 'Mic',       title: 'AI Voice Agents',    description: 'Deploy conversational AI agents to handle calls, bookings, and support at scale.' },
      { iconName: 'FileText',  title: 'Document Processing',description: 'Extract, classify, and process documents automatically using intelligent OCR and AI.' },
      { iconName: 'GitMerge',  title: 'Workflow Integration',description: 'Connect every tool in your stack — from Slack to Salesforce — into a single seamless automation.' },
      { iconName: 'BarChart',  title: 'Analytics & Insights',description: 'Real-time dashboards to monitor automation performance and ROI at a glance.' },
    ],
    process: [
      { step: 1, title: 'Workflow Audit',      description: 'Map current processes and identify the highest-leverage automation opportunities.' },
      { step: 2, title: 'Automation Blueprint',description: 'Design the architecture, triggers, logic flows, and integration points.' },
      { step: 3, title: 'Build & Integrate',   description: 'Connect your tools, build automations, and integrate with your existing stack.' },
      { step: 4, title: 'QA & Testing',        description: 'Rigorous testing for accuracy, error handling, and edge-case coverage.' },
      { step: 5, title: 'Launch & Monitor',    description: 'Go live with real-time monitoring dashboards and ongoing performance optimization.' },
    ],
    techStack: ['OpenAI', 'n8n', 'Make.com', 'Zapier', 'Twilio', 'LangChain', 'Python', 'HubSpot', 'Airtable', 'Webhook.site'],
  },

  'web-development': {
    badge: 'Full Stack',
    title: 'Web Development',
    subtitle: 'Fast, Beautiful, Built to Scale.',
    description:
      'From pixel-perfect marketing sites to complex web applications, we engineer digital products that perform flawlessly, convert visitors into customers, and scale as your business grows.',
    heroImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    benefits: [
      { iconName: 'Zap',          title: 'Blazing Performance',  description: 'Sub-second load times with SSR, ISR, and CDN optimization built in from day one.' },
      { iconName: 'Palette',      title: 'Custom Design System', description: 'Pixel-perfect UI built to your brand identity — no templates, no shortcuts.' },
      { iconName: 'Smartphone',   title: 'Fully Responsive',     description: 'Mobile-first layouts that look stunning on every device and screen size.' },
      { iconName: 'Shield',       title: 'Security First',       description: 'HTTPS, OWASP best practices, and regular security audits baked into every project.' },
      { iconName: 'Plug',         title: 'API Integrations',     description: 'Seamlessly connect payment gateways, CRMs, ERPs, and any third-party API.' },
      { iconName: 'MessageSquare',title: 'Ongoing Support',      description: 'Post-launch support, maintenance, and feature iterations to keep you growing.' },
    ],
    process: [
      { step: 1, title: 'Discovery & Scoping',description: 'Requirements gathering, user research, and technical architecture planning.' },
      { step: 2, title: 'UI/UX Design',       description: 'Wireframes, prototypes, and a complete design system created in Figma.' },
      { step: 3, title: 'Development',        description: 'Frontend and backend development with daily progress updates and demos.' },
      { step: 4, title: 'QA & Testing',       description: 'Cross-browser, cross-device testing and Lighthouse performance auditing.' },
      { step: 5, title: 'Launch & Support',   description: 'Deployment, DNS config, and 30-day post-launch monitoring and support.' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'Vercel', 'Framer Motion', 'Stripe'],
  },

  'mobile-apps': {
    badge: 'iOS & Android',
    title: 'Mobile Apps',
    subtitle: "Apps Your Users Can't Put Down.",
    description:
      'Beautiful, fast, and feature-rich mobile apps for iOS and Android — built with React Native for native performance at a fraction of the cost and timeline of separate native builds.',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    benefits: [
      { iconName: 'Smartphone',   title: 'Cross-Platform',          description: 'One codebase for iOS and Android — full native performance, half the cost.' },
      { iconName: 'Cpu',          title: 'Native Performance',       description: 'Optimized for device hardware to deliver fluid, buttery-smooth 60fps experiences.' },
      { iconName: 'WifiOff',      title: 'Offline Support',          description: 'Apps that work without internet and sync seamlessly when connectivity is restored.' },
      { iconName: 'Bell',         title: 'Push Notifications',       description: 'Re-engage users with targeted, personalized push notification campaigns.' },
      { iconName: 'Star',         title: 'App Store Optimization',   description: 'Keyword-optimized listings, compelling screenshots, and review management.' },
      { iconName: 'LineChart',    title: 'User Analytics',           description: 'Track user behavior, funnels, and retention to continuously improve your app.' },
    ],
    process: [
      { step: 1, title: 'App Strategy',   description: 'Define core features, monetization model, and target audience with a product roadmap.' },
      { step: 2, title: 'UI/UX Design',   description: 'Intuitive wireframes and polished high-fidelity designs for iOS and Android guidelines.' },
      { step: 3, title: 'Development',    description: 'Agile sprint-based development with weekly demos and continuous feedback loops.' },
      { step: 4, title: 'QA & Beta Test', description: 'Device testing, bug fixes, performance profiling, and real-user beta testing.' },
      { step: 5, title: 'App Store Launch',description: 'App Store and Play Store submission, ASO setup, and post-launch monitoring.' },
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux Toolkit', 'Stripe', 'OneSignal', 'Reanimated', 'Supabase'],
  },

  cloud: {
    badge: 'Cloud-Native',
    title: 'Cloud Solutions',
    subtitle: 'Scalable Infrastructure, Zero Headaches.',
    description:
      'From cloud migrations to serverless architectures and DevOps automation, we build the infrastructure backbone that lets your product scale to millions of users without breaking a sweat.',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    benefits: [
      { iconName: 'Cloud',      title: 'Cloud Migration',         description: 'Lift-and-shift or full re-architecture to AWS, GCP, or Azure — zero downtime.' },
      { iconName: 'Server',     title: 'Serverless & Microservices',description: 'Scale to millions of requests without managing or paying for idle infrastructure.' },
      { iconName: 'GitBranch',  title: 'CI/CD Pipelines',         description: 'Automated build, test, and deploy pipelines for shipping faster with confidence.' },
      { iconName: 'TrendingUp', title: 'Auto-Scaling',            description: 'Handle traffic spikes effortlessly with intelligent auto-scaling policies.' },
      { iconName: 'DollarSign', title: 'Cost Optimization',       description: 'Right-size your cloud spend with usage audits and reserved instance planning.' },
      { iconName: 'Activity',   title: '24/7 Monitoring',         description: 'Proactive alerting, uptime monitoring, and incident response around the clock.' },
    ],
    process: [
      { step: 1, title: 'Cloud Assessment',   description: 'Analyze current infrastructure, costs, security posture, and growth requirements.' },
      { step: 2, title: 'Architecture Design',description: 'Design a scalable, secure, and cost-optimized target cloud architecture.' },
      { step: 3, title: 'Migration',          description: 'Zero-downtime migration with data integrity checks and rollback plans at every step.' },
      { step: 4, title: 'CI/CD Deployment',   description: 'Automated deployment pipelines and infrastructure-as-code setup with Terraform.' },
      { step: 5, title: 'Optimize & Scale',   description: 'Continuous cost and performance optimization with monthly reporting and reviews.' },
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx', 'PostgreSQL', 'Redis', 'Grafana'],
  },

  seo: {
    badge: 'Growth Marketing',
    title: 'SEO & Growth',
    subtitle: 'Rank Higher. Grow Faster.',
    description:
      'Data-driven SEO strategies and growth marketing systems that bring qualified traffic to your site, convert visitors into leads, and compound your organic growth month over month.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    benefits: [
      { iconName: 'Search',       title: 'Technical SEO Audit',   description: 'Deep crawl analysis to fix errors, indexing issues, and broken site architecture.' },
      { iconName: 'PenTool',      title: 'Content Strategy',       description: 'Data-driven content roadmaps that target high-intent keywords and convert readers.' },
      { iconName: 'ExternalLink', title: 'Link Building',          description: 'White-hat authority link acquisition to boost domain authority and SERP rankings.' },
      { iconName: 'Gauge',        title: 'Core Web Vitals',        description: 'Performance optimization for LCP, FID, and CLS to meet Google\'s ranking signals.' },
      { iconName: 'MapPin',       title: 'Local SEO',              description: 'Dominate local search results with optimized Google Business Profiles and citations.' },
      { iconName: 'BarChart2',    title: 'Analytics & Reporting',  description: 'Monthly performance reports with actionable insights, ranking trends, and ROI tracking.' },
    ],
    process: [
      { step: 1, title: 'Full SEO Audit',     description: 'Technical audit, competitor gap analysis, and keyword opportunity mapping.' },
      { step: 2, title: 'Growth Strategy',    description: 'Custom SEO roadmap prioritizing highest-impact, fastest-win opportunities.' },
      { step: 3, title: 'On-Page Optimization',description: 'Title tags, meta descriptions, schema markup, internal linking, and content optimization.' },
      { step: 4, title: 'Off-Page & Links',   description: 'Targeted outreach, guest posting, and authority link acquisition campaigns.' },
      { step: 5, title: 'Track & Iterate',    description: 'Monthly reporting, ranking tracking, and strategy iterations based on live data.' },
    ],
    techStack: ['Google Analytics 4', 'Search Console', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Hotjar', 'PageSpeed Insights', 'Surfer SEO'],
  },
};

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = serviceData[params.slug];
  if (!data) return {};
  return {
    title: `${data.title} — Webpagix`,
    description: data.description,
  };
}

export default function ServicePage({ params }: Props) {
  const data = serviceData[params.slug];
  if (!data) notFound();
  return <ServicePageClient data={data} />;
}
