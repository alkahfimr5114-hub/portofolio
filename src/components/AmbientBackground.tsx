import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Direct subtle spotlight coordinates
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep Navy Gradient Base Layer */}
      <div className="absolute inset-0 bg-[#0a192f] transition-colors duration-500" />

      {/* Subtle radial glow orbs in the corners */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-sky-900/20 blur-[130px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-slate-800/25 blur-[150px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-950/25 blur-[160px]" 
        aria-hidden="true" 
      />

      {/* Interactive Subtle Cursor Follower Spotlight */}
      {isClient && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40 blur-[140px] transition-transform duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(148, 185, 235, 0.08) 0%, rgba(10, 25, 47, 0) 70%)',
            transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Grid Lines Overlay for architectural depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.035] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
    </div>
  );
};
