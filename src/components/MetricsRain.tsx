'use client';

import React, { useEffect, useRef } from 'react';

export default function MetricsRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const codes = '01ABCDEF-/.{}[]<>_!#?'.split('');
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const getThemeColor = () => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-accent')
        .trim() || '#00f2ff';
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const themeColor = getThemeColor();
      ctx.fillStyle = themeColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = codes[Math.floor(Math.random() * codes.length)];
        // Increased opacity for better visibility
        const opacity = Math.random() * 0.5 + 0.3;
        
        ctx.fillStyle = themeColor;
        ctx.globalAlpha = opacity;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1.0; // reset

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-40"
      style={{ filter: 'blur(0.3px)' }}
    />
  );
}
