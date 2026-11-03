import React from 'react';
import { KEY_METRICS } from '../data/portfolioData';

export const StatsBar: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Full-width clean metric strip below hero split */}
      <div className="rounded-2xl glass-silver-card p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/40">
          {KEY_METRICS.map((metric, index) => (
            <div 
              key={index} 
              className={`flex flex-col text-left ${index > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] font-mono tabular-nums text-white dark:text-white tracking-tight">
                {metric.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-[#FAF7EE] tracking-wide">
                {metric.label}
              </span>
              <span className="mt-0.5 text-xs text-slate-400">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
