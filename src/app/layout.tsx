import type { Metadata } from "next";
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
    default: "Webpagix.ai — We Build. We Automate. We Scale.",
    template: "%s | Webpagix.ai",
  },
  description:
    "Webpagix is an AI automation and web development startup from Hyderabad, India. We build intelligent digital solutions, automate workflows, and scale your business with cutting-edge technology.",
  keywords: [
    "AI automation",
    "web development",
    "Next.js",
    "Hyderabad",
    "digital solutions",
    "workflow automation",
    "startup India",
  ],
  authors: [{ name: "Webpagix" }],
  creator: "Webpagix",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://webpagix.ai",
    title: "Webpagix.ai — We Build. We Automate. We Scale.",
    description:
      "AI automation and web development solutions from Hyderabad, India.",
    siteName: "Webpagix.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webpagix.ai — We Build. We Automate. We Scale.",
    description: "AI automation and web development solutions from Hyderabad, India.",
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
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
