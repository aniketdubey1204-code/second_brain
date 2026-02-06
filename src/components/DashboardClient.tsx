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
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Background is now global via Layout */}

      <div className="max-w-6xl mx-auto py-20 px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          {/* Tag removed as requested */}
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Second Brain
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            A fluid, hyper-connected workspace for <span className="text-blue-300 font-medium shadow-[0_0_10px_rgba(59,130,246,0.5)] bg-blue-500/10 px-2 py-0.5 rounded-lg">Aniket</span>
          </p>
        </motion.div>

        {/* Grid Content */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {slugs.length > 0 ? (
            slugs.map((slug, index) => (
              <motion.div variants={item} key={slug} className="h-full">
                <Link
                  href={`/docs/${slug}`}
                  className="group relative flex flex-col h-full p-6 rounded-[2rem] glass-panel glass-card-hover transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Internal Glow on Hover */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex justify-between items-start mb-12">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white shadow-lg group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-500">
                      <FileText size={24} />
                    </div>
                    
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/40 border border-white/5 text-gray-400 uppercase tracking-widest backdrop-blur-md">
                      {slug.includes('/') ? slug.split('/')[0] : 'DOC'}
                    </span>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl font-semibold text-white/90 mb-2 group-hover:text-white transition-colors tracking-tight">
                      {slug.split('/').pop()}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <div className="flex items-center gap-2 text-xs text-white/40">
                          <Clock size={12} />
                          <span>Just now</span>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                          <ChevronRight size={16} />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div variants={item} className="col-span-full py-32 text-center rounded-[3rem] glass-panel">
              <div className="relative w-24 h-24 mx-auto mb-6">
                 <div className="absolute inset-0 bg-blue-500/30 blur-3xl animate-pulse" />
                 <Brain className="w-24 h-24 text-white/80 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">System Empty</h3>
              <p className="text-white/40">Upload neural data to initialize.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
