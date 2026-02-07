import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#050505]">
      {/* Base Gradient - Darker Cyan/Purple/Pink Mix */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-purple-900/40 to-pink-900/40 opacity-80" />

      {/* Animated Blobs - Lower opacity for darker feel */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-cyan-600 rounded-full blur-[100px] opacity-40 animate-blob mix-blend-overlay" />
      <div className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] bg-purple-700 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000 mix-blend-overlay" />
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-pink-700 rounded-full blur-[100px] opacity-40 animate-blob animation-delay-4000 mix-blend-overlay" />
      
      {/* Noise Overlay for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay"></div>
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)" />
    </div>
  );
}
