import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#020205]">
      {/* Global ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />

      {/* Optimized Blobs - Reduced count and blur for performance */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-purple-600/30 rounded-full blur-[80px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[80px] animate-blob animation-delay-2000" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}
