import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
  weight: "variable",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramisassi.dev"),
  title: {
    default: "Rami Sassi — Full-Stack Software Engineer",
    template: "%s | Rami Sassi",
  },
  description:
    "Full-Stack Software Engineer specialising in Angular, React, Spring Boot, NestJS and DevOps. Engineering student / alternant at ESPRIT, building scalable, production-ready applications.",
  keywords: [
    "Rami Sassi",
    "Full-Stack Developer",
    "Software Engineer",
    "Angular Developer",
    "Spring Boot Developer",
    "React Developer",
    "NestJS",
    "Docker",
    "Full-Stack Developer Tunisia",
    "Portfolio",
    "ESPRIT",
  ],
  authors: [{ name: "Rami Sassi" }],
  creator: "Rami Sassi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ramisassi.dev",
    title: "Rami Sassi — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specialising in Angular, Spring Boot, NestJS and DevOps.",
    siteName: "Rami Sassi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rami Sassi — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rami Sassi — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specialising in Angular, Spring Boot, NestJS and DevOps.",
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
import BackToTop from "@/components/layout/BackToTop";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0e0d0b" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
