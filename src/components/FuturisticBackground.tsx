import React, { useEffect, useState } from 'react';

export const FuturisticBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      {/* 1. Canvas Base */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-black transition-colors duration-300" />

      {/* 2. Electric Blue Glowing Neon Auras (Dual Theme Ambient) */}
      {/* Top Left Neon Ribbon */}
      <div 
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-sky-400/20 dark:bg-blue-600/30 blur-[140px] sm:blur-[160px]" 
        aria-hidden="true" 
      />

      {/* Top Center Radiant Blue */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-cyan-400/15 dark:bg-sky-500/20 blur-[150px] sm:blur-[180px]" 
        aria-hidden="true" 
      />

      {/* Center Right Cyan Glow */}
      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-sky-400/15 dark:bg-cyan-500/25 blur-[150px] sm:blur-[170px]" 
        aria-hidden="true" 
      />

      {/* Mid Left Blue Blob */}
      <div 
        className="absolute top-2/3 -left-32 w-[700px] h-[700px] rounded-full bg-blue-400/15 dark:bg-blue-700/30 blur-[160px] sm:blur-[180px]" 
        aria-hidden="true" 
      />

      {/* Bottom Sweeping Electric Blue Ribbon */}
      <div 
        className="absolute -bottom-36 left-1/4 w-[900px] h-[550px] rounded-full bg-gradient-to-r from-sky-400/25 via-blue-500/20 to-cyan-400/25 dark:from-blue-700 dark:via-sky-500 dark:to-blue-600 dark:opacity-40 blur-[150px] sm:blur-[170px]" 
        aria-hidden="true" 
      />

      {/* Interactive Cursor Light Pulse */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-20 blur-[140px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.35) 0%, rgba(0, 112, 243, 0.1) 50%, transparent 70%)',
          transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Matrix Lines for Technological Depth */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.02] bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
    </div>
  );
};
