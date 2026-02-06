'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Monitor, Palette, Check, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button 
    onClick={onChange}
    className={cn(
      "w-10 h-5 rounded-full transition-all duration-300 relative border",
      enabled ? "bg-blue-500/40 border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-white/5 border-white/10"
    )}
  >
    <div className={cn(
      "absolute top-1 w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm",
      enabled ? "left-6 bg-white" : "left-1 bg-white/30"
    )} />
  </button>
);

export default function SettingsPage() {
  const [states, setStates] = useState<Record<string, boolean>>({
    "Animations": true,
    "Push Notifications": true,
    "Two-Factor Auth": false,
    "Diagnostics": true,
    "Theme Auto-switch": true
  });

  const toggleState = (id: string) => {
    setStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      title: "Appearance",
      icon: <Palette size={18} className="text-pink-400" />,
      items: ["Theme", "Font Size", "Animations"]
    },
    {
      title: "Notifications",
      icon: <Bell size={18} className="text-yellow-400" />,
      items: ["Push Notifications", "Email Alerts", "Sound"]
    },
    {
      title: "Privacy & Security",
      icon: <Shield size={18} className="text-green-400" />,
      items: ["Change Password", "Two-Factor Auth", "Session History"]
    },
    {
      title: "System",
      icon: <Monitor size={18} className="text-blue-400" />,
      items: ["Storage", "Backup", "Diagnostics"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 pb-32">
       <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
               <Settings className="w-7 h-7 text-gray-200" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">Settings</h1>
              <p className="text-slate-400 text-sm tracking-wide">Configuration for Aniket's Neural Interface</p>
            </div>
          </div>
       </motion.div>

       <motion.div 
         variants={container}
         initial="hidden"
         animate="show"
         className="grid gap-6 md:grid-cols-2"
       >
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              variants={item}
              className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/[0.07] transition-all duration-500 group shadow-xl"
            >
               <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-white shadow-inner group-hover:scale-110 transition-transform duration-500">
                     {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white/90">{section.title}</h3>
               </div>
               
               <div className="space-y-4">
                  {section.items.map((opt) => (
                    <div 
                      key={opt} 
                      onClick={() => states[opt] !== undefined && toggleState(opt)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/20 hover:bg-black/30 cursor-pointer transition-all duration-300"
                    >
                       <div className="flex flex-col">
                          <span className="text-[13px] text-gray-200 font-medium tracking-wide">{opt}</span>
                       </div>
                       
                       {states[opt] !== undefined ? (
                         <Toggle enabled={states[opt]} onChange={() => toggleState(opt)} />
                       ) : (
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-gray-500">
                            <Check size={14} />
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </motion.div>
          ))}
       </motion.div>

       {/* Floating Save Button */}
       <motion.div 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5 }}
         className="fixed bottom-8 right-8 z-50"
       >
          <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all active:scale-95 group">
             <Zap size={20} className="fill-white group-hover:animate-pulse" />
             Apply Changes
          </button>
       </motion.div>
    </div>
  );
}
