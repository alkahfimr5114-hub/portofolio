import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Linkedin, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/pharmacyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Pendidikan', href: '#pendidikan' },
    { label: 'Pengalaman Praktik', href: '#pengalaman' },
    { label: 'Organisasi', href: '#organisasi' },
    { label: 'Keahlian & Regulasi', href: '#keahlian' },
    { label: 'Publikasi', href: '#publikasi' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#020617] text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Identity */}
          <div className="text-left space-y-1.5 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold font-['Outfit']">
                <span className="text-sky-600 dark:text-sky-400 font-mono font-medium mr-1">apt.</span>
                <span className="text-slate-900 dark:text-white transition-colors">Andi Al Kahfi Akihito MR</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono font-medium ml-1">, S.Farm</span>
              </span>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                STRA Aktif
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Apoteker Berlisensi · apt. Andi Al Kahfi Akihito MR, S.Farm · Universitas Hasanuddin & Universitas Muslim Indonesia
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social / Contact Quick Action */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-800 hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-900 transition-colors shadow-xs"
              title="Kirim Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-800 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300 bg-white dark:bg-slate-900 transition-colors shadow-xs"
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-800 hover:border-sky-500 text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300 bg-white dark:bg-slate-900 transition-colors shadow-xs"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Andi Al Kahfi Akihito, S.Farm., Apt. Seluruh hak cipta dilindungi.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
