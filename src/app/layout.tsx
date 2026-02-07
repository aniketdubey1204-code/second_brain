import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import LiquidBackground from "@/components/LiquidBackground";
import LiquidGlassTheme from "@/components/LiquidGlassTheme"; // Import the new theme
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} bg-transparent text-white flex flex-col lg:flex-row h-screen overflow-hidden`}>
        <Providers>
          <LiquidGlassTheme> {/* Wrap with LiquidGlassTheme */}
            <LiquidBackground />
            <Sidebar />
            <main className="flex-1 overflow-y-auto custom-scrollbar pt-14 lg:pt-0 relative z-10">
              {children}
            </main>
          </LiquidGlassTheme>
        </Providers>
      </body>
    </html>
  );
}
