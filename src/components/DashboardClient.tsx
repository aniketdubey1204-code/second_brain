'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Clock, Sparkles, Brain, Zap, Layers } from 'lucide-react';

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
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Content Layer */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:py-20 md:px-6 relative z-10 pb-24 md:pb-20">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-24 text-center relative mt-16 md:mt-0"
        >
          {/* Glowing orb behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-64 md:h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
          
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 drop-shadow-2xl liquidText">
            Second Brain
          </h1>
          
          <p className="text-white/70 text-base md:text-xl max-w-xs md:max-w-2xl mx-auto leading-relaxed font-light tracking-wide backdrop-blur-sm p-3 md:p-4 rounded-full border border-white/5 bg-white/5">
            Hyper-connected workspace for <span className="text-blue-300 font-semibold drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]">Aniket</span>
          </p>
        </motion.div>

        {/* Dynamic Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {slugs.length > 0 ? (
            slugs.map((slug, index) => (
              <motion.div variants={item} key={slug} className="h-full">
                <Link
                  href={`/docs/${slug}`}
                  className="group relative flex flex-col h-full p-6 md:p-8 glassPanel hover:-translate-y-2 active:scale-95 transition-transform"
                >
                  {/* Liquid Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex justify-between items-start mb-8 md:mb-16">
                    <div className="p-3 md:p-4 rounded-2xl bg-white/10 border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:bg-blue-500/30 group-hover:border-blue-400/50 transition-all duration-500">
                      <FileText size={24} className="md:w-7 md:h-7" />
                    </div>
                    
                    <span className="text-[10px] font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 border border-white/10 text-white/70 uppercase tracking-widest backdrop-blur-md group-hover:border-white/30 transition-colors">
                      {slug.includes('/') ? slug.split('/')[0] : 'DOC'}
                    </span>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-200 transition-colors tracking-tight drop-shadow-lg break-words">
                      {slug.split('/').pop()}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/10">
                       <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/60 group-hover:text-white/80 transition-colors">
                          <Clock size={12} className="md:w-3.5 md:h-3.5" />
                          <span>Last updated recently</span>
                       </div>
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-[-45deg] shadow-lg">
                          <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div variants={item} className="col-span-full py-24 md:py-40 text-center glassPanel mx-4 md:mx-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 floatingElement">
                 <div className="absolute inset-0 bg-blue-500/40 blur-[50px] animate-pulse" />
                 <Brain className="w-24 h-24 md:w-32 md:h-32 text-white/90 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">System Empty</h3>
              <p className="text-white/60 text-base md:text-lg px-4">Upload neural data to initialize the matrix.</p>
              
              <button className="mt-6 md:mt-8 liquidButton text-xs md:text-sm uppercase tracking-widest">
                Initialize System
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
