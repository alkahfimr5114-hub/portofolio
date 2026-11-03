import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/pharmacyData';

export const Education: React.FC = () => {
  return (
    <section id="pendidikan" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
            <span className="text-white font-bold">01.</span>
            <span>Latar Belakang Akademik</span>
            <span aria-hidden="true">·</span>
            <span>Pendidikan Tinggi Terakreditasi Unggul</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] tracking-tight text-white">
            Pendidikan & Kualifikasi Profesi
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Fondasi akademik sains farmasi yang kokoh dan pelatihan profesi apoteker intensif berorientasi praktik klinis, regulasi, dan industri.
          </p>
        </div>

        {/* 2-Column Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-2xl glass-silver-card border border-slate-500/25 flex flex-col justify-between text-left hover:border-slate-300/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Degree & Year */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-600/60 text-slate-200 group-hover:border-slate-300 transition-colors">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white">
                        {edu.degree}
                      </h3>
                      <div className="text-sm font-semibold text-slate-300">
                        {edu.institution}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/60 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-slate-300" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* GPA & Honors Box */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-300">Indeks Prestasi Kumulatif (IPK):</span>
                  </div>
                  <div className="font-mono font-bold text-base sm:text-lg text-white">
                    {edu.gpa} <span className="text-xs text-slate-400 font-normal">/ {edu.scale}</span>
                  </div>
                </div>

                {/* Focus of Study */}
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fokus Keilmuan:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {edu.focus}
                  </p>
                </div>

                {/* Achievements List */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono text-slate-400">Pencapaian & Kualifikasi:</div>
                  <div className="space-y-1.5">
                    {edu.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
