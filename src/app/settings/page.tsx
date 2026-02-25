'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, Bell, Monitor, Palette, Check, Zap, Cpu, Activity, Database, X, Info } from 'lucide-react';
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

  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleState = (id: string) => {
    setStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const executeSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const descriptions: Record<string, string> = {
    "Theme": "Switch between Cyber-Dark, Liquid-Glass, and Neon-High-Contrast modes.",
    "Font Size": "Adjust readability for high-density neural data ingestion.",
    "Animations": "Toggle motion effects. Disable to save GPU resources on low-end terminals.",
    "Neural Sync": "Keep local brain data synchronized with cloud-based cognitive nodes.",
    "Quantum Encryption": "End-to-end multi-layer encryption for classified vulnerability research.",
    "Latency Optimization": "Reduce response time between synapses for faster browsing.",
    "Change Password": "Update your master biometric decryption key.",
    "Two-Factor Auth": "Secure access using neural handshake or physical token.",
    "Session History": "Log and track all cognitive sessions across paired devices.",
    "Auto-Backup": "Automatically export brain backups to distributed storage every 4 hours.",
    "Storage": "Manage total neural capacity and cleanup legacy synaptic caches.",
    "Diagnostics": "Run self-checks to ensure all neural nodes are functioning optimally."
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
    <div className="w-full py-12 px-6 lg:px-12 pb-32">
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
              <h1 className="text-5xl font-bold tracking-tighter text-white uppercase">Settings</h1>
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
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group/item"
                    >
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setActiveInfo(opt)}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-white/20 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                          >
                             <Info size={14} />
                          </button>
                          <span className="text-sm text-gray-300 font-medium tracking-wide group-hover/item:text-white transition-colors">{opt}</span>
                       </div>
                       
                       {states[opt] !== undefined ? (
                         <Toggle enabled={states[opt]} onChange={() => toggleState(opt)} />
                       ) : (
                         <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:bg-white hover:text-black transition-all">
                            Configure
                         </button>
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
          <button 
            onClick={executeSync}
            disabled={isSyncing}
            className={cn(
              "flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_25px_50px_rgba(37,99,235,0.4)] transition-all active:scale-95 group",
              isSyncing ? "bg-green-600 text-white" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-50 hover:to-white hover:text-black text-white"
            )}
          >
             <Zap size={20} className={cn("fill-current", isSyncing ? "animate-ping" : "group-hover:animate-bounce")} />
             {isSyncing ? "Synchronizing..." : "Execute Synchronization"}
          </button>
       </motion.div>

       {/* Info Modal */}
       <AnimatePresence>
         {activeInfo && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setActiveInfo(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="glassPanel !p-10 w-full max-w-sm relative z-10 !rounded-[2.5rem] border-white/20 text-center"
              >
                 <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6">
                    <Info size={32} />
                 </div>
                 <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{activeInfo}</h2>
                 <p className="text-white/50 text-sm leading-relaxed mb-8">{descriptions[activeInfo] || "Neural core protocol definition pending."}</p>
                 <button 
                  onClick={() => setActiveInfo(null)}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all text-xs"
                 >
                   Close Protocol
                 </button>
              </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}
