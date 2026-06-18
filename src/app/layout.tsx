import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Webpagix Solutions — Enterprise AI Automation & Web Development",
    template: "%s | Webpagix Solutions",
  },
  description:
    "Webpagix Solutions is a premier AI automation and custom web development agency. Headquartered in Ongole, India, with offices in Michigan and Florida, USA. We build intelligent digital solutions and scalable platforms.",
  keywords: [
    "AI automation agency",
    "custom web development",
    "enterprise AI solutions",
    "digital transformation",
    "business automation",
    "Next.js development",
    "SaaS development",
    "AI integration services",
    "tech agency Ongole",
    "web development Michigan",
    "AI automation Florida",
    "Webpagix Solutions",
  ],
  authors: [{ name: "Webpagix Solutions" }],
  creator: "Webpagix Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webpagixsolutions.com",
    title: "Webpagix Solutions — Enterprise AI Automation & Web Development",
    description:
      "Premier AI automation and custom web development agency serving clients globally from Ongole, Michigan, and Florida.",
    siteName: "Webpagix Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webpagix Solutions — Enterprise AI Automation & Web Development",
    description: "Premier AI automation and custom web development agency serving clients globally from Ongole, Michigan, and Florida.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Webpagix Solutions",
    "url": "https://webpagixsolutions.com",
    "logo": "https://webpagixsolutions.com/logo.png",
    "description": "Premier AI automation and custom web development agency.",
    "email": "info@webpagixsolutions.com",
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Ongole",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressRegion": "Michigan",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressRegion": "Florida",
        "addressCountry": "US"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/webpagix"
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-92J6B7FQ45" 
          strategy="afterInteractive"/>
       <Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-92J6B7FQ45');
  `}
</Script>
      </body>
    </html>
  );
}
