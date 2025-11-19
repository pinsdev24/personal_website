import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prestilien Pindoh — Software Engineer | Cloud & AI",
  description: "Portfolio of Prestilien Pindoh, Software Engineer specializing in scalable system design, cloud deployment, and intelligent AI integration.",
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
    <html lang="en">
      <body suppressHydrationWarning
        className={`${lato.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="relative flex size-full min-h-screen flex-col bg-[#0d1a12] dark group/design-root overflow-x-hidden"
        >
          {children}
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
