'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Stars, Mic, Send, Brain, Sparkles, Image as ImageIcon, History, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DreamMirrorClient() {
  const [dreamText, setDreamText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'capture' | 'gallery'>('capture');

  const handleCapture = () => {
    if (!dreamText.trim()) return;
    setIsProcessing(true);
    // Logic to notify agent to process the dream
    setTimeout(() => {
      setIsProcessing(false);
      setDreamText('');
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-white overflow-x-hidden">
      
      {/* Mystical Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-indigo-600/10 blur-[100px] rounded-full animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-12 px-6 lg:py-20 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
             <Moon size={12} />
             <span>Subconscious Interface</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-400/50 uppercase italic">
            Dream <span className="text-white">Mirror</span>
          </h1>
          <p className="text-purple-200/50 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Visualize your subconscious. Type or speak your dream, and the Mirror will reflect its true meaning and form.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
           <button 
             onClick={() => setActiveTab('capture')}
             className={cn(
               "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
               activeTab === 'capture' ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-white/5 text-white/40 hover:bg-white/10"
             )}
           >
             Capture Dream
           </button>
           <button 
             onClick={() => setActiveTab('gallery')}
             className={cn(
               "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
               activeTab === 'gallery' ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-white/5 text-white/40 hover:bg-white/10"
             )}
           >
             The Gallery
           </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'capture' ? (
            <motion.div 
              key="capture"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glassPanel !p-8 md:!p-12 !rounded-[3rem] border-purple-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            >
               <div className="flex flex-col gap-8">
                  <div className="relative">
                    <textarea 
                      value={dreamText}
                      onChange={(e) => setDreamText(e.target.value)}
                      placeholder="Describe the dream in detail... (e.g., 'I was flying over a neon ocean under a purple moon...')"
                      className="w-full h-64 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-xl text-white placeholder-white/20 outline-none focus:border-purple-500/50 transition-all resize-none custom-scrollbar"
                    />
                    <div className="absolute bottom-6 right-6 flex gap-3">
                       <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all">
                          <Mic size={20} />
                       </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleCapture}
                    disabled={isProcessing || !dreamText.trim()}
                    className={cn(
                      "w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-4 transition-all active:scale-95",
                      isProcessing 
                        ? "bg-purple-600 text-white animate-pulse cursor-wait" 
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_20px_40px_rgba(147,51,234,0.3)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.5)]"
                    )}
                  >
                    {isProcessing ? (
                      <>Processing Synapses...</>
                    ) : (
                      <>Reflect Dream <Send size={18} /></>
                    )}
                  </button>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
                     <div className="flex items-center gap-2">
                        <Stars size={14} className="text-yellow-400/50" />
                        <span>AI Visualization</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Brain size={14} className="text-blue-400/50" />
                        <span>Psychological Analysis</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-pink-400/50" />
                        <span>Neural Rendering</span>
                     </div>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
               {/* Placeholder for past dreams */}
               {[1, 2].map((i) => (
                 <div key={i} className="glassPanel !p-0 !rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-purple-500/30 transition-all duration-500">
                    <div className="aspect-video bg-white/5 relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center text-white/10">
                          <ImageIcon size={48} />
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                       <div className="absolute bottom-6 left-8">
                          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Captured: 25.02.2026</span>
                          <h3 className="text-2xl font-bold text-white tracking-tight">The Floating Citadel</h3>
                       </div>
                    </div>
                    <div className="p-8">
                       <p className="text-white/50 text-sm line-clamp-2 mb-6">In this dream, I found myself walking through a city built entirely on clouds. Every building was made of glass and glowing with blue energy...</p>
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-purple-400 transition-colors">
                          View Reflection <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>
               ))}
               
               <div className="col-span-full py-20 text-center glassPanel border-dashed border-white/10 rounded-[2rem]">
                  <History className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/20 uppercase tracking-[0.3em] font-black">Memory Nodes Empty</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Disclaimer */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
           <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium max-w-sm mx-auto leading-relaxed">
             The Dream Mirror is a cognitive tool for exploration. Results are generated via neural simulation.
           </p>
        </div>

      </div>
    </div>
  );
}
