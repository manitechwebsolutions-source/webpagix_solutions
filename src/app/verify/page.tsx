import type { Metadata } from 'next';
import VerifyPageClient from './VerifyPageClient';

export const metadata: Metadata = {
  title: 'Certificate Verification',
  description: 'Verify intern certificates issued by Webpagix.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyPage() {
  return <VerifyPageClient />;
}
