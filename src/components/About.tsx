import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, Sparkles, Terminal, Award } from 'lucide-react';

export const About: React.FC = () => {
  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-[#FAF7EE]" />,
      title: 'Kecepatan & Performa Ekstrem',
      desc: 'Target Core Web Vitals sempurna dengan LCP < 1.2 detik, rendering 60 FPS, dan zero-bloat libraries.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FAF7EE]" />,
      title: 'Arsitektur Bersih & Skalabel',
      desc: 'Kode TypeScript yang modular, teruji (automated testing), dan dirancang siap menampung lonjakan traffic.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#FAF7EE]" />,
      title: 'Estetika & Rasa Pengguna',
      desc: 'Micro-interactions yang memanjakan mata, kontras tinggi ramah aksesibilitas, dan tipografi berkarakter.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#FAF7EE]" />,
      title: 'Komunikasi & Transparansi',
      desc: 'Update berkala, manajemen deadline ketat, dan dedikasi penuh terhadap keberhasilan produk akhir.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
            <span className="text-[#FAF7EE]">07.</span>
            <span>Filosofi & Pendekatan</span>
            <span aria-hidden="true">·</span>
            <span>Tentang Alkahfi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-white dark:text-white">
            Rekayasa Perangkat Lunak dengan Sentuhan Seni
          </h2>
        </div>

        {/* 2-Column Split: Bio on Left, 4 Core Principles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-silver-card border border-slate-700/60 space-y-4">
              <h3 className="text-xl font-bold font-['Outfit'] text-white">
                Membangun Solusi Bukan Sekadar Kode
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Selama lebih dari 5 tahun berkecimpung di industri teknologi, saya telah membantu startup tahap awal hingga korporasi besar mewujudkan produk digital yang kokoh dan disukai pengguna.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Saya meyakini bahwa aplikasi terbaik lahir dari pertemuan harmonis antara logika teknik yang teliti dan empati mendalam terhadap estetika antarmuka. Tidak ada tombol yang terpasang tanpa fungsi, dan tidak ada baris kode yang ditulis tanpa tujuan yang jelas.
              </p>
              
              <div className="pt-4 border-t border-slate-700/50 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#FAF7EE]" />
                  <span>Full-Stack Mastery</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#FAF7EE]" />
                  <span>Certified React Architect</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid on Right */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl glass-silver-card border border-slate-700/60 flex flex-col justify-between space-y-3 hover:border-slate-400 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 w-fit">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold font-['Outfit'] text-white">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
