import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Webpagix team. Book a free strategy call or send us a message. Based in Hyderabad, India, serving clients globally.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
