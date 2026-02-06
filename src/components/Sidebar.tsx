'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Book, Calendar, Lightbulb, Search, Settings, Menu, X } from 'lucide-react';
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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0D0D0D] border-b border-[#1F1F1F] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-[#1F1F1F] p-1 rounded-md text-blue-400">
            <Brain size={18} />
          </div>
          <span className="font-semibold text-white text-sm">Aniket's Brain</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#8A8A8A] hover:text-white p-1"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-[#0D0D0D] border-r border-[#1F1F1F] flex flex-col p-4 z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden lg:flex items-center gap-3 mb-8 px-2 py-1">
          <div className="bg-[#1F1F1F] p-1.5 rounded-md text-blue-400">
            <Brain size={22} />
          </div>
          <span className="font-semibold tracking-tight text-white">Aniket's Brain</span>
        </div>

        <div className="flex flex-col gap-1 flex-1 mt-14 lg:mt-0">
          <div className="relative mb-6">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E5E5E]">
              <Search size={14} />
            </div>
            <input 
              placeholder="Quick search..." 
              className="w-full bg-[#1F1F1F] rounded-md py-1.5 pl-9 pr-3 text-sm text-[#EDEDED] placeholder-[#5E5E5E] outline-none border border-transparent focus:border-[#333] transition-all"
            />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-[#1F1F1F] text-[#FFF]" 
                  : "text-[#8A8A8A] hover:text-[#FFF] hover:bg-[#1F1F1F]/50"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-[#1F1F1F] pt-4">
          <button className="flex items-center gap-3 px-3 py-2 text-[#8A8A8A] hover:text-[#FFF] transition-colors text-sm w-full">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>
    </>
  );
}
