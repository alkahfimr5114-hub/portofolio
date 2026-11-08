import React from 'react';
import { Mail, MapPin, MessageSquare, Linkedin, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PersonalInfo, SectionHeaders } from '../types/pharmacy';

interface ContactProps {
  isEditMode?: boolean;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  sectionHeaders?: SectionHeaders;
  onUpdateSectionHeaders?: (updated: Partial<SectionHeaders>) => void;
}

export const Contact: React.FC<ContactProps> = ({
  isEditMode = false,
  personalInfo,
  onUpdatePersonalInfo,
  sectionHeaders,
  onUpdateSectionHeaders,
}) => {
  const cleanWa = (personalInfo.whatsapp || '').replace(/\D/g, '');
  const whatsappHref = cleanWa ? `https://wa.me/${cleanWa}` : 'https://wa.me/6283196204080';
  const emailHref = `mailto:${personalInfo.email || 'alkahfimr5114@gmail.com'}`;
  const linkedinHref = personalInfo.linkedinUrl?.startsWith('http')
    ? personalInfo.linkedinUrl
    : `https://${personalInfo.linkedin || 'linkedin.com/in/alkahfiakihito'}`;

  return (
    <section id="contact" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
      
      {/* Background glow bloom */}
      <div 
        className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-sky-600/15 blur-[180px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 left-10 w-[400px] h-[400px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Section Header */}
      <div className="mb-10 text-left space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
          <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
          {isEditMode ? (
            <input
              type="text"
              value={sectionHeaders?.contactBadge || 'HUBUNGI SAYA'}
              onChange={(e) => onUpdateSectionHeaders?.({ contactBadge: e.target.value })}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono font-semibold uppercase text-sky-700 dark:text-sky-300 w-full max-w-md focus:outline-none"
              title="Edit Badge Kontak"
            />
          ) : (
            <span>{sectionHeaders?.contactBadge || 'HUBUNGI SAYA'}</span>
          )}
        </div>

        <div>
          {isEditMode ? (
            <input
              type="text"
              value={sectionHeaders?.contactTitle || 'Kontak Person'}
              onChange={(e) => onUpdateSectionHeaders?.({ contactTitle: e.target.value })}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] tracking-tight px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-slate-900 dark:text-white w-full max-w-xl focus:outline-none"
              title="Edit Judul Kontak"
            />
          ) : (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-slate-900 dark:text-white transition-colors">
              {sectionHeaders?.contactTitle || 'Kontak Person'}
            </h2>
          )}
        </div>

        {isEditMode ? (
          <textarea
            rows={2}
            value={sectionHeaders?.contactSubtitle || 'Terbuka untuk peluang karier kefarmasian, kolaborasi riset, dan diskusi profesional.'}
            onChange={(e) => onUpdateSectionHeaders?.({ contactSubtitle: e.target.value })}
            className="w-full max-w-2xl px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
            title="Edit Keterangan Kontak"
          />
        ) : (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors">
            {sectionHeaders?.contactSubtitle || 'Terbuka untuk peluang karier kefarmasian, kolaborasi riset, dan diskusi profesional.'}
          </p>
        )}
      </div>

      {/* 3 Main Interactive Contact Person Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-8">
        
        {/* 1. WHATSAPP CARD */}
        <div className="group relative rounded-3xl glass-futuristic-card border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] hover:-translate-y-1">
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            {/* Header: Logo/Ikon dan Judul "WhatsApp" BERADA DI SAMPING */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                WhatsApp
              </h3>
            </div>

            {/* Input Edit khusus Admin Mode */}
            {isEditMode && (
              <div className="space-y-1 pt-1 text-left">
                <label className="text-[10px] font-mono text-amber-500 dark:text-amber-300 block">Edit Nomor WhatsApp:</label>
                <input
                  type="text"
                  value={personalInfo.whatsapp}
                  onChange={(e) => onUpdatePersonalInfo({ 
                    ...personalInfo, 
                    whatsapp: e.target.value,
                    whatsappUrl: `https://wa.me/${e.target.value.replace(/\D/g, '')}`
                  })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Interactive Button Langsung */}
          <div className="pt-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group/btn relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Buka WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 2. GMAIL CARD */}
        <div className="group relative rounded-3xl glass-futuristic-card border border-sky-500/30 hover:border-sky-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(14,165,233,0.25)] hover:-translate-y-1">
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            {/* Header: Logo/Ikon dan Judul "Gmail" BERADA DI SAMPING */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-sky-100 dark:bg-sky-950/90 border border-sky-300 dark:border-sky-500/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                Gmail
              </h3>
            </div>

            {/* Input Edit khusus Admin Mode */}
            {isEditMode && (
              <div className="space-y-1 pt-1 text-left">
                <label className="text-[10px] font-mono text-amber-500 dark:text-amber-300 block">Edit Alamat Email:</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Interactive Button Langsung */}
          <div className="pt-6">
            <a
              href={emailHref}
              className="w-full group/btn relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <Mail className="w-4 h-4 text-slate-950" />
              <span>Kirim Email</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 3. LINKEDIN CARD */}
        <div className="group relative rounded-3xl glass-futuristic-card border border-blue-500/30 hover:border-blue-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] hover:-translate-y-1">
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            {/* Header: Logo/Ikon dan Judul "LinkedIn" BERADA DI SAMPING */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-blue-100 dark:bg-blue-950/90 border border-blue-300 dark:border-blue-500/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                LinkedIn
              </h3>
            </div>

            {/* Input Edit khusus Admin Mode */}
            {isEditMode && (
              <div className="space-y-1 pt-1 text-left">
                <label className="text-[10px] font-mono text-amber-500 dark:text-amber-300 block">Edit Tautan LinkedIn:</label>
                <input
                  type="text"
                  value={personalInfo.linkedin}
                  onChange={(e) => onUpdatePersonalInfo({ 
                    ...personalInfo, 
                    linkedin: e.target.value,
                    linkedinUrl: e.target.value.startsWith('http') ? e.target.value : `https://${e.target.value}`
                  })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Interactive Button Langsung */}
          <div className="pt-6">
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group/btn relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <Linkedin className="w-4 h-4 text-white" />
              <span>Kunjungi LinkedIn</span>
              <ExternalLink className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Domisili Information Card: Bersih hanya Makassar, Sulawesi Selatan */}
      <div className="p-5 sm:p-6 rounded-3xl glass-futuristic-card border border-slate-200 dark:border-white/10 flex items-center gap-4 max-w-2xl">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="text-left">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Domisili
          </div>
          {isEditMode ? (
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, location: e.target.value })}
              className="mt-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          ) : (
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] mt-0.5 transition-colors">
              {personalInfo.location || 'Makassar, Sulawesi Selatan'}
            </div>
          )}
        </div>
      </div>

    </section>
  );
};
