import React from 'react';
import { ExternalLink, Award, FileText, Sparkles, Info } from 'lucide-react';
import { PublicationItem } from '../types/pharmacy';

interface PublicationProps {
  isEditMode?: boolean;
  publication: PublicationItem;
  onUpdatePublication: (updated: PublicationItem) => void;
}

export const Publication: React.FC<PublicationProps> = ({
  isEditMode = false,
  publication,
  onUpdatePublication,
}) => {
  return (
    <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
      
      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
          <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
          <span>Publikasi Ilmiah & Riset Kefarmasian</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] tracking-tight text-slate-900 dark:text-white transition-colors">
          Karya Tulis Ilmiah Terakreditasi
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors">
          Riset eksplorasi bakteri rizosfer asal tanaman porang berpotensi sebagai kandidat senyawa antibiotik alami terhadap patogen saluran pencernaan.
        </p>
      </div>

      {/* Futuristic Card with Glowing Border */}
      <div className="rounded-3xl glass-futuristic-card border border-sky-500/35 p-6 sm:p-8 lg:p-10 space-y-6 relative group shadow-[0_0_40px_rgba(0,112,243,0.15)]">
        
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill-badge text-xs font-bold text-emerald-700 dark:text-emerald-300 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/60 flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Jurnal SINTA Terakreditasi</span>
            </span>
            {isEditMode ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={publication.journal}
                  onChange={(e) => onUpdatePublication({ ...publication, journal: e.target.value })}
                  placeholder="Nama Jurnal"
                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={publication.year}
                  onChange={(e) => onUpdatePublication({ ...publication, year: e.target.value })}
                  placeholder="Tahun"
                  className="w-16 px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            ) : (
              <>
                <span className="pill-badge text-xs font-mono text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/20">
                  {publication.journal}
                </span>
                <span className="pill-badge text-xs font-mono text-sky-700 dark:text-sky-300 border-sky-400/30">
                  Tahun {publication.year}
                </span>
              </>
            )}
          </div>

          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-badge text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Buka Jurnal Asli</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Clickable Title & Authors */}
        <div className="space-y-2">
          {isEditMode ? (
            <div className="space-y-2">
              <label className="text-xs font-mono text-amber-500 dark:text-amber-300 block">Edit Judul Publikasi:</label>
              <input
                type="text"
                value={publication.title}
                onChange={(e) => onUpdatePublication({ ...publication, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-lg font-bold text-slate-900 dark:text-white"
              />
              <label className="text-xs font-mono text-amber-500 dark:text-amber-300 block">Edit Nama Penulis:</label>
              <input
                type="text"
                value={publication.authors}
                onChange={(e) => onUpdatePublication({ ...publication, authors: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
              <label className="text-xs font-mono text-amber-500 dark:text-amber-300 block">Edit URL Tautan Jurnal / Publikasi:</label>
              <input
                type="url"
                value={publication.url}
                onChange={(e) => onUpdatePublication({ ...publication, url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono text-sky-600 dark:text-sky-300"
              />
            </div>
          ) : (
            <>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-300 transition-colors inline-flex items-start gap-2 group-hover:underline underline-offset-4 leading-snug"
              >
                <span>"{publication.title}"</span>
                <ExternalLink className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-1" />
              </a>
              <div className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 mt-2">
                Penulis: {publication.authors}
              </div>
            </>
          )}
        </div>

        {/* Area Keterangan Singkat Publikasi */}
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-400/30 space-y-2 text-left">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1.5 font-bold">
              <Info className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Keterangan Riset Publikasi:</span>
            </div>
            {isEditMode && (
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                Mode Admin: Khusus Diedit Admin
              </span>
            )}
          </div>

          {isEditMode ? (
            <div className="space-y-1 pt-1">
              <textarea
                rows={3}
                value={publication.customDescription || ''}
                onChange={(e) => onUpdatePublication({ ...publication, customDescription: e.target.value })}
                placeholder="Tuliskan keterangan singkat publikasi ilmiah di sini (hanya dapat diedit oleh admin)..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-amber-400 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
              {publication.customDescription || 'Riset unggulan mikrobiologi farmasi mengenai eksplorasi isolasi bakteri rizosfer penghasil antibakteri alami terhadap patogen pencernaan (E. coli & S. typhi). Dipublikasikan di Jurnal Terakreditasi Nasional SINTA.'}
            </p>
          )}
        </div>

        {/* Abstract */}
        <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-black/60 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 flex items-center gap-1.5 font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Abstrak Penelitian:</span>
          </div>
          {isEditMode ? (
            <textarea
              rows={4}
              value={publication.abstractSummary}
              onChange={(e) => onUpdatePublication({ ...publication, abstractSummary: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-sans"
            />
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {publication.abstractSummary}
            </p>
          )}
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-400" />
            Kata Kunci:
          </span>
          {publication.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="pill-badge text-xs font-mono text-slate-300 border-white/10 bg-white/5"
            >
              #{kw}
            </span>
          ))}
        </div>

      </div>

    </section>
  );
};
