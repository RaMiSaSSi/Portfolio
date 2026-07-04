import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sassi Rami --- Full-Stack Engineer",
    template: "%s | Sassi Rami",
  },
  description:
    "Full-Stack Engineer specialising in Java, Spring Boot, Angular and React Native. Building performant, scalable web and mobile applications from Tunis, Tunisia.",
  keywords: [
    "Full-Stack Developer",
    "Java",
    "Spring Boot",
    "Angular",
    "React Native",
    "PostgreSQL",
    "Tunisia",
    "Portfolio",
  ],
  authors: [{ name: "Sassi Rami" }],
  creator: "Sassi Rami",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexramis.dev", // TODO: your domain
    title: "Sassi Rami --- Full-Stack Engineer",
    description:
      "Full-Stack Engineer specialising in Java, Spring Boot, Angular and React Native.",
    siteName: "Sassi Rami Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sassi Rami --- Full-Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sassi Rami --- Full-Stack Engineer",
    description:
      "Full-Stack Engineer specialising in Java, Spring Boot, Angular and React Native.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="noise">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
