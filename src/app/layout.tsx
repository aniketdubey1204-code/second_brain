import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import LiquidBackground from "@/components/LiquidBackground";
import LiquidGlassTheme from "@/components/LiquidGlassTheme"; // Import the new theme
import { Providers } from "@/components/Providers";

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
      <body className={`${jetbrainsMono.className} bg-[#0a0a0a] text-white flex flex-col lg:flex-row h-screen overflow-hidden`}>
        <Providers>
          <LiquidGlassTheme>
            <LiquidBackground />
            <div className="flex flex-col lg:flex-row w-full h-full relative z-10 overflow-x-hidden overflow-y-auto custom-scrollbar">
              <Sidebar />
              <main className="flex-1 relative">
                {children}
              </main>
            </div>
            {/* Custom Branding Watermark */}
            <div className="watermark">
              [AD's Intelligence by Aniket]
            </div>
          </LiquidGlassTheme>
        </Providers>
      </body>
    </html>
  );
}
