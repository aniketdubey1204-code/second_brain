'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Book, Calendar, Lightbulb, Search, Settings, Menu, X, RefreshCw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { icon: <Calendar size={18} />, label: 'Journal', href: '/journal' },
    { icon: <Lightbulb size={18} />, label: 'Concepts', href: '/concepts' },
    { icon: <Book size={18} />, label: 'All Docs', href: '/' },
  ];

  return (
    <>
      {/* Mobile Header - Always visible on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0D0D0D] border-b border-green-500/50 flex items-center justify-between px-4 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#1F1F1F] p-1 rounded-md text-blue-400">
            <Brain size={18} />
          </div>
          <span className="font-semibold text-white text-sm">Aniket's Brain v2</span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-[#8A8A8A] hover:text-white p-2"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-[#0D0D0D]/60 backdrop-blur-xl border-r border-white/10 flex flex-col z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 lg:z-0",
        isOpen ? "translate-x-0 shadow-2xl shadow-black" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header (Mobile Close Button) */}
        <div className="flex items-center justify-between p-4 lg:p-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-md text-blue-400 backdrop-blur-md">
              <Brain size={22} />
            </div>
            <span className="font-semibold tracking-tight text-white text-lg leading-none">Aniket's Brain</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-[#8A8A8A] hover:text-white p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-1 flex-1 px-4">
          <div className="relative mb-6">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E5E5E]">
              <Search size={14} />
            </div>
            <input 
              placeholder="Quick search..." 
              className="w-full bg-white/5 rounded-md py-2 pl-9 pr-3 text-sm text-[#EDEDED] placeholder-[#5E5E5E] outline-none border border-transparent focus:border-white/20 transition-all focus:bg-white/10"
            />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href 
                    ? "bg-white/10 text-white shadow-lg shadow-purple-500/10 border border-white/5" 
                    : "text-[#8A8A8A] hover:text-white hover:bg-white/5"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-white/5 p-4 flex flex-col gap-2">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-[#8A8A8A] hover:text-[#FFF] hover:bg-white/5 rounded-lg transition-colors text-sm w-full">
            <Settings size={18} />
            Settings
          </Link>
          <div className="text-[10px] text-[#555] px-3 flex items-center gap-1 mt-2">
             <RefreshCw size={10} />
             Build: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </aside>
    </>
  );
}
