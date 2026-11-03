import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
            <span className="text-[#FAF7EE]">04.</span>
            <span>Rekam Jejak & Karier</span>
            <span aria-hidden="true">·</span>
            <span>Pengalaman Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-white dark:text-white">
            Perjalanan & Kontribusi Nyata
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Menghadirkan dampak rekayasa nyata di perusahaan teknologi, startup inovatif, dan proyek freelance berskala global.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl glass-silver-card border border-slate-700/60 text-left hover:border-slate-500 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/50">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#FAF7EE] font-medium mt-0.5">
                    <span className="font-semibold">{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-[#FAF7EE]" />
                  <span>{exp.period}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400">{exp.type}</span>
                </div>
              </div>

              {/* Bullet points of contributions */}
              <div className="mt-5 space-y-2.5">
                {exp.description.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FAF7EE] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies strip */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-slate-400">Teknologi:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
