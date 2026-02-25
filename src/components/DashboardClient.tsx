'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Clock, Sparkles, Brain, Zap, Layers, Activity, ShieldCheck, Search, Plus } from 'lucide-react';

interface DashboardClientProps {
  slugs: string[];
}

export default function DashboardClient({ slugs }: DashboardClientProps) {
  const dailyLogs = slugs.filter(s => s.startsWith('daily/')).length;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Content Layer */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:py-16 md:px-6 relative z-10 pb-24">
        
        {/* Header Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 px-6 py-4 glassPanel !rounded-3xl border-white/10">
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
        </div>

        {/* Hero Section */}
        <div className="mb-16 md:mb-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
             <Sparkles size={12} />
             <span>Neural Interface Active</span>
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-6 text-white drop-shadow-2xl leading-none uppercase">
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
        </div>

        {/* Dynamic Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {slugs.length > 0 ? (
            slugs.map((slug) => (
              <div key={slug} className="h-full group">
                <Link
                  href={`/docs/${slug}`}
                  className="relative flex flex-col h-full p-8 glassPanel !rounded-[2.5rem] transition-all duration-300 border-white/5 hover:border-blue-500/30 overflow-hidden"
                >
                  <div className="relative z-10 flex justify-between items-start mb-12">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-300">
                      {slug.startsWith('daily/') ? <Clock size={24} /> : <Layers size={24} />}
                    </div>
                    
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 uppercase tracking-[0.2em]">
                         {slug.includes('/') ? slug.split('/')[0] : 'NODE'}
                       </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors tracking-tighter leading-tight">
                      {slug.split('/').pop()?.replace(/-/g, ' ')}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                       <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                          <Activity size={12} className="text-blue-500/50" />
                          <span>Synced</span>
                       </div>
                       <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <ChevronRight size={20} />
                       </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center glassPanel !rounded-[3rem]">
              <Brain className="w-32 h-32 text-white/20 mx-auto mb-10" />
              <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Neural Cache Empty</h3>
              <button className="liquidButton px-12 py-5 text-xs font-black uppercase tracking-[0.3em]">
                Boot System
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
