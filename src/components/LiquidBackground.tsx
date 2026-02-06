import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#020205]">
      {/* Global ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />

      {/* Top Left - Intense Purple */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-500 rounded-full blur-[100px] opacity-60 animate-blob" />
      
      {/* Top Right - Intense Cyan */}
      <div className="absolute top-[0%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-400 rounded-full blur-[100px] opacity-50 animate-blob animation-delay-2000" />
      
      {/* Bottom - Intense Pink/Rose */}
      <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] bg-pink-500 rounded-full blur-[100px] opacity-50 animate-blob animation-delay-4000" />
      
      {/* Center/Random - Blue */}
      <div className="absolute top-[30%] left-[10%] w-[50vw] h-[50vw] bg-blue-600 rounded-full blur-[100px] opacity-40 animate-blob" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay"></div>
    </div>
  );
}
