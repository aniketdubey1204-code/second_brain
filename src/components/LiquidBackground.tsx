import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-[#a8edea] to-[#fed6e3]">
      {/* Intense Liquid Gradients matching the reference */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-cyan-400 rounded-full blur-[100px] opacity-60 animate-blob mix-blend-overlay" />
      <div className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] bg-purple-500 rounded-full blur-[120px] opacity-60 animate-blob animation-delay-2000 mix-blend-overlay" />
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-pink-500 rounded-full blur-[100px] opacity-60 animate-blob animation-delay-4000 mix-blend-overlay" />
      
      {/* Iridescent Sheen Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30" />
    </div>
  );
}
