import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Dark Navy to Pure Black gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#050f1e] to-[#020617]" />

      {/* Luminous silver and navy ambient light blooms */}
      <div 
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-sky-900/15 blur-[160px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-slate-400/10 blur-[180px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-2/3 -left-32 w-[600px] h-[600px] rounded-full bg-sky-950/20 blur-[170px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-slate-500/10 blur-[160px]" 
        aria-hidden="true" 
      />

      {/* Fine architectural matrix grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
        aria-hidden="true"
      />
    </div>
  );
};
