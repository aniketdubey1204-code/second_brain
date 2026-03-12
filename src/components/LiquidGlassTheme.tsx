"use client";

import React from 'react';

export default function LiquidGlassTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
