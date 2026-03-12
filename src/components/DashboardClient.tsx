'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, Clock, Sparkles, Brain, Zap, Layers, Activity, ShieldCheck, Search, Plus, X, Terminal } from 'lucide-react';

interface DashboardClientProps {
  slugs: string[];
}

export default function DashboardClient({ slugs }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const dailyLogs = slugs.filter(s => s.startsWith('daily/')).length;
  const bugBounties = slugs.filter(s => s.startsWith('bug-bounty/')).length;

  const filteredSlugs = useMemo(() => {
    return slugs.filter(slug => 
      slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slug.split('/').pop()?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [slugs, searchQuery]);

  return (
    <div className="relative w-full min-h-full font-mono">
      
      {/* Content Layer */}
      <div className="max-w-7xl mx-auto py-8 px-6 lg:px-12 relative z-10 pb-24">
        
        {/* Header Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-8 py-4 glassPanel border-[#00f2ff]/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#00f2ff] pulse-stable" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#00f2ff]/60 whitespace-nowrap">Core: Nominal</span>
            </div>
            <div className="h-4 w-px bg-[#00f2ff]/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#00f2ff]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#00f2ff]/60 whitespace-nowrap">Sync: Secure</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black">
             <div className="flex flex-col items-center sm:items-start group">
                <span className="text-white/30 whitespace-nowrap group-hover:text-[#00f2ff] transition-colors">Neural Nodes</span>
                <span className="text-[#00f2ff]">{slugs.length} Units</span>
             </div>
             <div className="flex flex-col items-center sm:items-start group">
                <span className="text-white/30 whitespace-nowrap group-hover:text-[#bc13fe] transition-colors">Bug Bounties</span>
                <span className="text-[#bc13fe]">{bugBounties} Exploits</span>
             </div>
             <div className="flex flex-col items-center sm:items-start group">
                <span className="text-white/30 whitespace-nowrap group-hover:text-[#39ff14] transition-colors">Daily Logs</span>
                <span className="text-[#39ff14]">{dailyLogs} Cycles</span>
             </div>
          </div>
        </div>

        {/* Live Data Ticker */}
        <div className="mb-12 px-8 py-2 border-y border-[#00f2ff]/10 ticker-wrap bg-[#00f2ff]/5">
          <div className="ticker-content text-[10px] font-black text-[#00f2ff]/40 uppercase tracking-[0.2em]">
            SYSTEM_STATUS: ONLINE // SYNCING_NEURAL_CACHED_NODES... [OK] // ENCRYPTING_SESSION_STREAM... [ACTIVE] // THREADING_COGNITIVE_LOGS_PART_IX... [COMPLETE] // TRACING_BUG_BOUNTY_EXPLOITS... [WAITING]
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-16 md:mb-24 text-center relative flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff] text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
             <Terminal size={12} />
             <span>Neural Interface v2.0.4</span>
          </div>

          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter mb-6 text-white leading-[0.9] uppercase glitch-text glitch-active drop-shadow-[0_0_30px_rgba(0,242,255,0.3)]">
            Brain <span className="text-[#00f2ff]/80">v2</span>
          </h1>
          
          <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <p className="text-[#00f2ff]/60 text-sm md:text-base leading-relaxed tracking-wider px-4">
              Secure cognitive repository for <span className="text-white font-bold border-b border-[#00f2ff]/50 pb-0.5">Aniket Dubey</span>. [ Synchronized neural documentation ]
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full px-4">
               <div className="glassPanel !p-2 !rounded-lg flex items-center gap-2 pr-6 border-[#00f2ff]/10 w-full sm:w-auto flex-1 focus-within:border-[#00f2ff]/50 transition-all shadow-[inset_0_0_10px_rgba(0,242,255,0.05)]">
                  <div className="p-3 bg-[#00f2ff]/5 rounded-md text-[#00f2ff]/40">
                     <Search size={18} />
                  </div>
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="QUERY NEURAL CACHE..." 
                    className="bg-transparent outline-none text-xs text-white placeholder-white/20 w-full uppercase tracking-widest font-bold" 
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-[#00f2ff]/40 hover:text-[#00f2ff] mr-2">
                      <X size={14} />
                    </button>
                  )}
               </div>
               <button 
                onClick={() => setIsAddModalOpen(true)}
                className="p-5 rounded-lg neon-button shrink-0 group"
               >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
               </button>
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSlugs.length > 0 ? (
            filteredSlugs.map((slug) => (
              <div key={slug} className="h-full">
                <Link
                  href={`/docs/${slug}`}
                  className="relative flex flex-col h-full p-8 glassPanel !rounded-xl transition-all duration-300 border-[#00f2ff]/10 hover:border-[#00f2ff]/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] group"
                >
                  <div className="relative z-10 flex justify-between items-start mb-12">
                    <div className="p-4 rounded-lg bg-[#00f2ff]/5 border border-[#00f2ff]/10 text-[#00f2ff]/60 group-hover:bg-[#00f2ff] group-hover:text-black group-hover:shadow-[0_0_20px_#00f2ff] transition-all duration-500">
                      {slug.startsWith('daily/') ? <Clock size={24} /> : <Layers size={24} />}
                    </div>
                    
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] font-black px-3 py-1 rounded border border-[#00f2ff]/20 text-[#00f2ff]/50 uppercase tracking-[0.2em] group-hover:border-[#00f2ff]/50 transition-colors">
                         {slug.includes('/') ? slug.split('/')[0] : 'NODE'}
                       </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl md:text-2xl font-black text-white/90 mb-4 group-hover:text-[#00f2ff] transition-colors tracking-tighter leading-tight break-words uppercase">
                      {slug.split('/').pop()?.replace(/-/g, ' ')}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-[#00f2ff]/10 mt-4">
                       <div className="flex items-center gap-2 text-[10px] text-[#00f2ff]/40 uppercase tracking-widest font-black">
                          <Activity size={12} className="pulse-stable" />
                          <span>Linked</span>
                       </div>
                       <div className="w-10 h-10 rounded-lg bg-[#00f2ff]/5 border border-[#00f2ff]/10 flex items-center justify-center group-hover:bg-[#00f2ff] group-hover:text-black transition-all duration-300">
                          <ChevronRight size={20} />
                       </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center glassPanel !rounded-2xl border-[#00f2ff]/10 shadow-[inner_0_0_50px_rgba(0,242,255,0.05)]">
              <Brain className="w-24 h-24 text-[#00f2ff]/10 mx-auto mb-10 animate-pulse" />
              <h3 className="text-4xl font-black text-white/80 mb-4 tracking-tighter uppercase">No Nodes Found</h3>
              <p className="text-[#00f2ff]/40 mb-8 font-mono text-xs">[ Search query \"{searchQuery}\" returned zero results ]</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="neon-button px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-lg"
              >
                Reset Buffer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal Placeholder */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glassPanel !p-12 w-full max-w-lg relative z-10 !rounded-2xl border-[#00f2ff]/30 shadow-[0_0_50px_rgba(0,242,255,0.1)]"
            >
              <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase glitch-text glitch-active">Initiate Node</h2>
              <p className="text-[#00f2ff]/60 mb-10 text-xs leading-relaxed font-bold uppercase tracking-wider">System is currently in read-only mode via neural link. Manual ingestion requires local terminal access.</p>
              <div className="p-6 bg-black/40 border border-[#00f2ff]/20 rounded-lg mb-8 shadow-inner">
                 <p className="text-[10px] font-mono text-[#00f2ff] leading-relaxed">
                   <span className="text-white/20">// Command to add new doc:</span><br/>
                   openclaw brain add --title \"My New Doc\"
                 </p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-full py-5 bg-[#00f2ff] text-black font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                Acknowledge
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
