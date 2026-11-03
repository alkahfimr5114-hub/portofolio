import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Award, GraduationCap, Briefcase, FileText } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, PRACTICAL_EXPERIENCES, ORGANIZATIONAL_EXPERIENCES, SKILL_GROUPS, SCIENTIFIC_PUBLICATION, PROFILE_PHOTO } from '../data/pharmacyData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#020617]/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* CV Document Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0a192f] border border-slate-400/30 text-slate-100 p-6 sm:p-10 z-10 space-y-8 shadow-2xl print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-700/80 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-white font-bold">Curriculum Vitae Resmi</span>
            <span aria-hidden="true">·</span>
            <span>Apoteker Berlisensi (STRA Aktif)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-silver text-xs font-semibold cursor-pointer shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Tutup CV"
              className="p-1.5 rounded-lg border border-slate-600 hover:border-slate-300 text-slate-300 hover:text-white bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Header: Photo & Contact Lockup */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
          <div className="flex items-center gap-5">
            <img
              src={PROFILE_PHOTO}
              alt={PERSONAL_INFO.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover object-top border border-slate-500 shadow-md shrink-0"
            />
            <div className="text-left space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-sm font-semibold text-slate-300 font-mono">
                {PERSONAL_INFO.role}
              </div>
              <div className="text-xs text-slate-400">
                Peminatan: {PERSONAL_INFO.specialization}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs font-mono space-y-1 text-slate-300">
            <div className="flex items-center sm:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{PERSONAL_INFO.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{PERSONAL_INFO.whatsapp}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Ringkasan Profil */}
        <div className="text-left space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-300" />
            <span>Ringkasan Profesional</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>
        </div>

        {/* Riwayat Pendidikan */}
        <div className="text-left space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-300" />
            <span>Pendidikan Tinggi</span>
          </h2>
          <div className="space-y-3">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold mb-1">
                  <span className="text-white">{edu.institution} — {edu.degree}</span>
                  <span className="font-mono text-slate-400 text-xs">{edu.period}</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 mb-1">
                  IPK: {edu.gpa} / {edu.scale} ({edu.honors})
                </div>
                <div className="text-xs text-slate-300">
                  Fokus: {edu.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengalaman Praktik Kerja Profesi Apoteker (PKPA) & Magang */}
        <div className="text-left space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-300" />
            <span>Pengalaman Praktik Kerja Profesi & Magang</span>
          </h2>
          <div className="space-y-3">
            {PRACTICAL_EXPERIENCES.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-700/60 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-white">{p.institution}</span>
                  <span className="font-mono text-slate-400 text-xs">{p.period} ({p.location})</span>
                </div>
                <div className="text-xs font-mono text-slate-300 font-medium">
                  {p.role} · {p.programType}
                </div>
                <ul className="text-xs text-slate-300 space-y-1 pt-1 list-disc list-inside">
                  {p.dutiesAndAchievements.map((duty, i) => (
                    <li key={i} className="leading-relaxed">{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pengalaman Organisasi */}
        <div className="text-left space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-300" />
            <span>Pengalaman Organisasi & Asistensi Laboratorium</span>
          </h2>
          <div className="space-y-3">
            {ORGANIZATIONAL_EXPERIENCES.map((org) => (
              <div key={org.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-700/60 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-white">{org.institution}</span>
                  <span className="font-mono text-slate-400 text-xs">{org.period}</span>
                </div>
                <div className="text-xs font-mono text-slate-300 font-medium">
                  {org.role}
                </div>
                <ul className="text-xs text-slate-300 space-y-1 pt-1 list-disc list-inside">
                  {org.dutiesAndAchievements.map((duty, i) => (
                    <li key={i} className="leading-relaxed">{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Publikasi Ilmiah */}
        <div className="text-left space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span>Publikasi Ilmiah</span>
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-700/60 text-xs space-y-1">
            <div className="text-white font-semibold">
              "{SCIENTIFIC_PUBLICATION.title}" ({SCIENTIFIC_PUBLICATION.year})
            </div>
            <div className="text-slate-400 font-mono">
              {SCIENTIFIC_PUBLICATION.journal} · {SCIENTIFIC_PUBLICATION.authors}
            </div>
            <div className="text-slate-400 truncate">
              {SCIENTIFIC_PUBLICATION.url}
            </div>
          </div>
        </div>

        {/* Footer print action */}
        <div className="pt-6 border-t border-slate-700 flex items-center justify-between print:hidden">
          <div className="text-xs font-mono text-slate-400">
            Terverifikasi Kemenkes & IAI
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-slate-600 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tutup Pratinjau
          </button>
        </div>

      </div>
    </div>
  );
};
