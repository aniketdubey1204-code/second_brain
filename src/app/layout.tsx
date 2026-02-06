import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-[#EDEDED] flex flex-col lg:flex-row h-screen overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto custom-scrollbar pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
