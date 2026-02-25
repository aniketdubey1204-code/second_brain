'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Clock, Sparkles, Brain, Zap, Layers, Activity, ShieldCheck, Search, Plus } from 'lucide-react';

interface DashboardClientProps {
  slugs: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: "spring" as const, stiffness: 50, damping: 20 }
  }
};

export default function DashboardClient({ slugs }: DashboardClientProps) {
  const dailyLogs = slugs.filter(s => s.startsWith('daily/')).length;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Content Layer */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:py-20 md:px-6 relative z-10 pb-24 md:pb-32">
        
        {/* Header Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-16 px-6 py-4 glassPanel !rounded-3xl border-white/10"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-blue-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Core: Nominal</span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-400" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Sync: Encrypted</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black">
             <div className="flex flex-col">
                <span className="text-white/30">Neural Nodes</span>
                <span className="text-blue-300">{slugs.length} Units</span>
             </div>
             <div className="flex flex-col">
                <span className="text-white/30">Daily Logs</span>
                <span className="text-pink-300">{dailyLogs} Cycles</span>
             </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-32 text-center relative mt-8 md:mt-0"
        >
          {/* Glowing orb behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-bounce">
             <Sparkles size={12} />
             <span>Neural Interface Active</span>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 drop-shadow-2xl liquidText leading-none uppercase">
            Brain <span className="text-blue-500/80">v2</span>
          </h1>
          
          <div className="flex flex-col items-center gap-8">
            <p className="text-white/60 text-base md:text-xl max-w-xs md:max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Secure hyper-repository for <span className="text-white font-bold border-b-2 border-blue-500/50 pb-1">Aniket Dubey</span>. Synchronized neural documentation and daily cognitive logs.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="glassPanel !p-2 !rounded-2xl flex items-center gap-2 pr-6 border-white/5">
                  <div className="p-3 bg-white/5 rounded-xl text-white/40">
                     <Search size={18} />
                  </div>
                  <input placeholder="Query Neural Cache..." className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64" />
               </div>
               <button className="p-5 rounded-2xl bg-blue-600 hover:bg-white hover:text-black transition-all shadow-2xl active:scale-90">
                  <Plus size={20} />
               </button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {slugs.length > 0 ? (
            slugs.map((slug, index) => (
              <motion.div variants={item} key={slug} className="h-full group">
                <Link
                  href={`/docs/${slug}`}
                  className="relative flex flex-col h-full p-8 glassPanel !rounded-[2.5rem] hover:-translate-y-3 active:scale-95 transition-all duration-500 border-white/5 hover:border-blue-500/30 overflow-hidden"
                >
                  {/* Internal Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex justify-between items-start mb-16">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-500">
                      {slug.startsWith('daily/') ? <Clock size={24} /> : <Layers size={24} />}
                    </div>
                    
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 uppercase tracking-[0.2em]">
                         {slug.includes('/') ? slug.split('/')[0] : 'NODE'}
                       </span>
                       <span className="text-[8px] text-white/20 mt-2 font-mono uppercase">Node_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors tracking-tighter leading-tight">
                      {slug.split('/').pop()?.replace(/-/g, ' ')}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                       <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                          <Activity size={12} className="text-blue-500/50" />
                          <span>Last Sync: Recent</span>
                       </div>
                       <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-[-45deg] shadow-2xl">
                          <ChevronRight size={20} />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div variants={item} className="col-span-full py-32 text-center glassPanel !rounded-[3rem] mx-4 md:mx-0">
              <div className="relative w-32 h-32 mx-auto mb-10 floatingElement">
                 <div className="absolute inset-0 bg-blue-500/40 blur-[70px] animate-pulse" />
                 <Brain className="w-32 h-32 text-white relative z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Neural Cache Empty</h3>
              <p className="text-white/40 text-lg max-w-sm mx-auto mb-12">Initialize synaptic link to begin data ingestion.</p>
              
              <button className="liquidButton px-12 py-5 text-xs font-black uppercase tracking-[0.3em]">
                Boot System
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Background Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
