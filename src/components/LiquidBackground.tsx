import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0a0a0a]">
      {/* Darkened ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#050505] to-blue-900/40" />

      {/* Blobs - Reduced opacity for darkness */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      
      {/* Dark overlay to ensure text readability (50% darkness as requested) */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
