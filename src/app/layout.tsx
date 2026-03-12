import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import LiquidBackground from "@/components/LiquidBackground";
import { Providers } from "@/components/Providers";
import MetricsRain from '@/components/MetricsRain';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Aniket's Brain",
  description: "Personal knowledge repository",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="font-body bg-bg min-h-screen text-text antialiased selection:bg-accent/30 selection:text-accent">
        <Providers>
          <div className="relative min-h-screen crt-overlay flicker">
            <div className="crt-scanline" />
            <LiquidBackground />
            <MetricsRain />
            <div className="flex flex-col lg:flex-row w-full h-full relative z-10 overflow-x-hidden overflow-y-auto custom-scrollbar">
              <Sidebar />
              <main className="flex-1 relative pt-14 lg:pt-0">
                {children}
              </main>
            </div>
            <div className="watermark pointer-events-none z-50 fixed bottom-4 right-4 text-xs opacity-20">
              *[AD's Intelligence by Aniket]*
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
