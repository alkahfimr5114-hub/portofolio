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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* 1. Deep Pitch Black Canvas */}
      <div className="absolute inset-0 bg-black" />

      {/* 2. Electric Blue Glowing Neon Auras (Sesuai Referensi Gambar 1 & 2) */}
      {/* Top Left Neon Ribbon */}
      <div 
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-blue-600/30 blur-[160px]" 
        aria-hidden="true" 
      />

      {/* Top Center Radiant Blue */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-sky-500/20 blur-[180px]" 
        aria-hidden="true" 
      />

      {/* Center Right Cyan Glow */}
      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-500/25 blur-[170px]" 
        aria-hidden="true" 
      />

      {/* Mid Left Blue Blob */}
      <div 
        className="absolute top-2/3 -left-32 w-[700px] h-[700px] rounded-full bg-blue-700/30 blur-[180px]" 
        aria-hidden="true" 
      />

      {/* Bottom Sweeping Electric Blue Ribbon (Persis di Bagian Bawah Gambar 2) */}
      <div 
        className="absolute -bottom-36 left-1/4 w-[900px] h-[550px] rounded-full bg-gradient-to-r from-blue-700 via-sky-500 to-blue-600 opacity-40 blur-[170px]" 
        aria-hidden="true" 
      />

      {/* Interactive Cursor Light Pulse */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[140px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.4) 0%, rgba(0, 112, 243, 0.1) 50%, transparent 70%)',
          transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Matrix Lines for Technological Depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
    </div>
  );
};
