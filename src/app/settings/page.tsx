'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Monitor, Palette, Check, Zap, Cpu, Activity, Database, Globe } from 'lucide-react';
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
    "Theme Auto-switch": true,
    "Quantum Encryption": true,
    "Neural Sync": true,
    "Auto-Backup": true
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
      title: "Neural Link",
      icon: <Cpu size={18} className="text-blue-400" />,
      items: ["Neural Sync", "Quantum Encryption", "Latency Optimization"]
    },
    {
      title: "Privacy & Security",
      icon: <Shield size={18} className="text-green-400" />,
      items: ["Change Password", "Two-Factor Auth", "Session History"]
    },
    {
      title: "Data Matrix",
      icon: <Database size={18} className="text-yellow-400" />,
      items: ["Auto-Backup", "Storage", "Diagnostics"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 pb-32">
       <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative group">
               <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
               <Settings className="w-8 h-8 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tighter text-white">Settings</h1>
              <p className="text-slate-400 text-sm tracking-widest uppercase font-medium">Core Configuration • Alpha v2.5</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">System Status</span>
                <span className="text-xs text-green-400 font-mono">NOMINAL / ALL SYSTEMS GO</span>
             </div>
             <Activity className="text-green-400 w-5 h-5 animate-pulse" />
          </div>
       </motion.div>

       <motion.div 
         variants={container}
         initial="hidden"
         animate="show"
         className="grid gap-8 md:grid-cols-2"
       >
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              variants={item}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/[0.08] transition-all duration-700 group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors duration-700" />
               
               <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                     {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{section.title}</h3>
               </div>
               
               <div className="space-y-3">
                  {section.items.map((opt) => (
                    <div 
                      key={opt} 
                      onClick={() => states[opt] !== undefined && toggleState(opt)}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 cursor-pointer transition-all duration-300 group/item"
                    >
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-blue-400 transition-colors",
                            states[opt] && "bg-blue-500"
                          )} />
                          <span className="text-sm text-gray-300 font-medium tracking-wide group-hover/item:text-white transition-colors">{opt}</span>
                       </div>
                       
                       {states[opt] !== undefined ? (
                         <Toggle enabled={states[opt]} onChange={() => toggleState(opt)} />
                       ) : (
                         <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-gray-500 group-hover/item:text-white group-hover/item:bg-white/10 transition-all">
                            <ChevronRight size={16} />
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
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.5, type: "spring" }}
         className="fixed bottom-10 right-10 z-50"
       >
          <button className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-50 hover:to-white hover:text-black text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_25px_50px_rgba(37,99,235,0.4)] transition-all active:scale-95 group">
             <Zap size={20} className="fill-current group-hover:animate-bounce" />
             Execute Synchronization
          </button>
       </motion.div>
    </div>
  );
}

function ChevronRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
