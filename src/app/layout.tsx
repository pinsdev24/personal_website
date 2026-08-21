import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prestilienpindoh.me"),
  title: "Prestilien Pindoh — AI/ML & Software Engineer",
  description: "AI/ML and software engineer building production agents, observable ML systems, cloud APIs, and end-to-end products.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "MLOps",
    "LangGraph",
    "RAG",
    "AWS",
    "Brussels",
  ],
  openGraph: {
    title: "Prestilien Pindoh — AI/ML & Software Engineer",
    description: "Production AI, observable ML systems, cloud delivery, and product ownership.",
    url: "/",
    siteName: "Prestilien Pindoh",
    type: "website",
    images: [{ url: "/images/profile_image.jpg", alt: "Prestilien Pindoh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestilien Pindoh — AI/ML & Software Engineer",
    description: "Production AI, observable ML systems, cloud delivery, and product ownership.",
    images: ["/images/profile_image.jpg"],
  },
  icons: {
    icon: "/images/profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="noise-overlay relative flex size-full min-h-screen flex-col overflow-x-hidden">
            {children}
            <ChatWidget />
            <CookieBanner />
            <SpeedInsights />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
