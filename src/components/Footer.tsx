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
    <footer className="border-t border-slate-800/80 bg-[#020617] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Identity */}
          <div className="text-left space-y-1.5 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold font-['Outfit']">
                <span className="text-sky-400 font-mono font-medium mr-1">apt.</span>
                <span className="text-white">Andi Al Kahfi Akihito MR</span>
                <span className="text-sky-400 font-mono font-medium ml-1">, S.Farm</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                STRA Aktif
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Apoteker Berlisensi · apt. Andi Al Kahfi Akihito MR, S.Farm · Universitas Hasanuddin & Universitas Muslim Indonesia
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social / Contact Quick Action */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-900 transition-colors"
              title="Kirim Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-800 hover:border-emerald-600 text-slate-300 hover:text-emerald-300 bg-slate-900 transition-colors"
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-800 hover:border-sky-600 text-slate-300 hover:text-sky-300 bg-slate-900 transition-colors"
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
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
