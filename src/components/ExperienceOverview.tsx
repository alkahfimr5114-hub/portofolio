import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Building, Users, Sparkles, Image as ImageIcon, Plus, Trash2, Edit3 } from 'lucide-react';
import { ExperienceItem, ExperienceCategory } from '../types/pharmacy';

interface ExperienceOverviewProps {
  practicalExperiences: ExperienceItem[];
  organizationExperiences: ExperienceItem[];
  onSelectExperience: (item: ExperienceItem) => void;
  isEditMode?: boolean;
  onAddPractical?: () => void;
  onDeletePractical?: (id: string) => void;
  onAddOrganization?: () => void;
  onDeleteOrganization?: (id: string) => void;
}

export const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({
  practicalExperiences,
  organizationExperiences,
  onSelectExperience,
  isEditMode = false,
  onAddPractical,
  onDeletePractical,
  onAddOrganization,
  onDeleteOrganization,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<ExperienceCategory>('all');

  const filterTabs: { id: ExperienceCategory; label: string }[] = [
    { id: 'all', label: `Semua PKPA (${(practicalExperiences || []).length})` },
    { id: 'hospital', label: `Rumah Sakit & Klinis (${(practicalExperiences || []).filter((item) => item.category === 'hospital').length})` },
    { id: 'industry', label: `Industri Kosmetik CPKB (${(practicalExperiences || []).filter((item) => item.category === 'industry').length})` },
    { id: 'distribution', label: `Distribusi CDOB (${(practicalExperiences || []).filter((item) => item.category === 'distribution').length})` },
    { id: 'community', label: `Komunitas & Puskesmas (${(practicalExperiences || []).filter((item) => item.category === 'community').length})` },
  ];

  const filteredPractical = selectedFilter === 'all'
    ? (practicalExperiences || [])
    : (practicalExperiences || []).filter((item) => item.category === selectedFilter);

  return (
    <div id="pkpa-works" className="space-y-24 py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Pengalaman Praktik (PKPA Works) */}
      <section className="relative text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
              <span>PKPA Works & Praktik Profesi Apoteker</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-white">
                Pengalaman Praktik Kefarmasian
              </h2>
              {isEditMode && onAddPractical && (
                <button
                  onClick={onAddPractical}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>+ Tambah Pengalaman PKPA</span>
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Setiap kartu memiliki Halaman Detail tersendiri dengan rincian tugas komprehensif, kepatuhan regulasi, serta Galeri Dokumentasi Foto PKPA.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-md self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedFilter === tab.id
                    ? 'pill-badge-active font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PKPA Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredPractical || []).map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              className="group glass-futuristic-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-all duration-300 relative border border-white/15 hover:border-sky-400/60 shadow-xl"
            >
              {/* Admin edit & delete buttons on card */}
              {isEditMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExperience(exp);
                    }}
                    className="p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all cursor-pointer shadow-lg hover:scale-110"
                    title="Edit Pengalaman Ini"
                    aria-label="Edit kartu pengalaman"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {onDeletePractical && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Hapus pengalaman "${exp.institution}"?`)) {
                          onDeletePractical(exp.id);
                        }
                      }}
                      className="p-2 rounded-full bg-red-600/90 hover:bg-red-500 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                      title="Hapus Kartu Pengalaman Ini"
                      aria-label="Hapus kartu pengalaman"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                
                {/* Instansi Pill Badge (Sesuai Referensi Gambar) */}
                <div className="pb-3 border-b border-white/10 pr-8">
                  <span className="pill-badge text-[11px] font-mono font-bold text-sky-300 border-sky-400/40 bg-sky-950/50 shadow-[0_0_10px_rgba(0,112,243,0.25)] block truncate text-center">
                    {exp.badgeLabel}
                  </span>
                </div>

                {/* Pratinjau Foto Luar: Tampilkan foto pertama dari galeri sebagai cover thumbnail (h-40 object-cover rounded-xl). Sembunyikan jika foto 0. */}
                {(exp.galleryPhotos || []).length > 0 && exp.galleryPhotos?.[0]?.url ? (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-black/60 relative border border-white/10 group-hover:border-sky-400/40 transition-colors">
                    <img
                      src={exp.galleryPhotos[0].url}
                      alt={exp.galleryPhotos[0].caption || exp.institution}
                      className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-2.5 right-2.5 pill-badge text-[10px] font-mono bg-black/85 text-sky-300 border-sky-400/40 px-2 py-0.5 flex items-center gap-1 backdrop-blur-md">
                      <ImageIcon className="w-3 h-3 text-sky-400" />
                      <span>{(exp.galleryPhotos || []).length} Foto</span>
                    </span>
                  </div>
                ) : null}

                {/* Institution Name */}
                <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white group-hover:text-sky-300 transition-colors leading-snug">
                  {exp.institution}
                </h3>

                {/* Role and Period */}
                <div className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center justify-between">
                  <span className="truncate">{exp.role}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {exp.location}
                  </span>
                </div>

                {/* Photo Gallery count badge */}
                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                    {(exp.galleryPhotos || []).length} Foto Dokumentasi
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400 truncate">{exp.categoryLabel}</span>
                </div>

              </div>

              {/* Card Footer Callout */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Klik Buka Detail
                </span>
                
                <span className="pill-badge text-xs py-1 px-3 text-white group-hover:border-white group-hover:scale-105 transition-all flex items-center gap-1">
                  <span>Buka Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 2. Pengalaman Organisasi */}
      <section className="relative text-left pt-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
            <span>Kepemimpinan & Asistensi Laboratorium</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] tracking-tight text-white">
              Pengalaman Organisasi & Akademik
            </h2>
            {isEditMode && onAddOrganization && (
              <button
                onClick={onAddOrganization}
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>+ Tambah Pengalaman Organisasi</span>
              </button>
            )}
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Peran kepemimpinan dalam bimbingan ratusan praktikan laboratorium mikrobiologi dan diplomasi kemitraan antarkampus farmasi.
          </p>
        </div>

        {/* Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(organizationExperiences || []).map((org) => (
            <div
              key={org.id}
              onClick={() => onSelectExperience(org)}
              className="group glass-futuristic-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-all duration-300 relative border border-white/15 hover:border-sky-400/60 shadow-xl"
            >
              {/* Admin edit & delete buttons on card */}
              {isEditMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExperience(org);
                    }}
                    className="p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all cursor-pointer shadow-lg hover:scale-110"
                    title="Edit Pengalaman Ini"
                    aria-label="Edit kartu organisasi"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {onDeleteOrganization && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Hapus pengalaman organisasi "${org.institution}"?`)) {
                          onDeleteOrganization(org.id);
                        }
                      }}
                      className="p-2 rounded-full bg-red-600/90 hover:bg-red-500 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                      title="Hapus Kartu Organisasi Ini"
                      aria-label="Hapus kartu organisasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                
                {/* Badge Instansi */}
                <div className="pb-3 border-b border-white/10 pr-8">
                  <span className="pill-badge text-[11px] font-mono font-bold text-sky-300 border-sky-400/40 bg-sky-950/50 shadow-[0_0_10px_rgba(0,112,243,0.25)] block truncate text-center">
                    {org.badgeLabel}
                  </span>
                </div>

                {/* Pratinjau Foto Luar jika ada foto */}
                {(org.galleryPhotos || []).length > 0 && org.galleryPhotos?.[0]?.url ? (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-black/60 relative border border-white/10 group-hover:border-sky-400/40 transition-colors">
                    <img
                      src={org.galleryPhotos[0].url}
                      alt={org.galleryPhotos[0].caption || org.institution}
                      className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-2.5 right-2.5 pill-badge text-[10px] font-mono bg-black/85 text-sky-300 border-sky-400/40 px-2 py-0.5 flex items-center gap-1 backdrop-blur-md">
                      <ImageIcon className="w-3 h-3 text-sky-400" />
                      <span>{(org.galleryPhotos || []).length} Foto</span>
                    </span>
                  </div>
                ) : null}

                {/* Institution */}
                <h3 className="text-xl font-bold font-['Outfit'] text-white group-hover:text-sky-300 transition-colors">
                  {org.institution}
                </h3>

                <div className="text-sm font-semibold text-slate-300 flex items-center justify-between">
                  <span>{org.role}</span>
                  <span className="font-mono text-xs text-sky-400">{org.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {org.shortSummary}
                </p>

                {/* Competencies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(org.competencies || []).map((comp, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-slate-300 px-2.5 py-0.5 rounded-full bg-slate-900 border border-white/10"
                    >
                      {comp}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  Bimbingan & Humas
                </span>

                <span className="pill-badge text-xs py-1 px-3 text-white group-hover:border-white transition-all flex items-center gap-1">
                  <span>Buka Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
