import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
            <span className="text-[#FAF7EE]">05.</span>
            <span>Ulasan & Testimoni</span>
            <span aria-hidden="true">·</span>
            <span>Apresiasi Pemimpin Tim & Klien</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-white dark:text-white">
            Kata Mereka Tentang Kerja Sama
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Kepercayaan dibangun dari komitmen kode berkualitas tinggi, transparansi proses, dan penyelesaian tepat jadwal.
          </p>
        </div>

        {/* 3-column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl glass-silver-card border border-slate-700/60 flex flex-col justify-between text-left relative hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#FAF7EE]/30" />
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Role (Unboxed clean metadata) */}
              <div className="pt-6 mt-6 border-t border-slate-700/50">
                <div className="font-bold text-white font-['Outfit'] text-base">
                  {t.author}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  <span className="text-[#FAF7EE]">{t.role}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
