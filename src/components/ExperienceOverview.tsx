import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from 'lucide-react';
import { ExperienceItem, ExperienceCategory, SectionHeaders } from '../types/pharmacy';

interface ExperienceOverviewProps {
  practicalExperiences: ExperienceItem[];
  organizationExperiences: ExperienceItem[];
  onSelectExperience: (item: ExperienceItem) => void;
  isEditMode?: boolean;
  onAddPractical?: () => void;
  onDeletePractical?: (id: string) => void;
  onAddOrganization?: () => void;
  onDeleteOrganization?: (id: string) => void;
  sectionHeaders?: SectionHeaders;
  onUpdateSectionHeaders?: (updated: Partial<SectionHeaders>) => void;
  onReorderPractical?: (newOrder: ExperienceItem[]) => void;
  onReorderOrganization?: (newOrder: ExperienceItem[]) => void;
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
  sectionHeaders,
  onUpdateSectionHeaders,
  onReorderPractical,
  onReorderOrganization,
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

  // Reorder Practical: preserve other categories in the full practicalExperiences array
  const movePractical = (id: string, direction: 'prev' | 'next') => {
    const currentFilteredIdx = filteredPractical.findIndex((item) => item.id === id);
    if (currentFilteredIdx === -1) return;
    const targetFilteredIdx = direction === 'prev' ? currentFilteredIdx - 1 : currentFilteredIdx + 1;
    if (targetFilteredIdx < 0 || targetFilteredIdx >= filteredPractical.length) return;

    const targetId = filteredPractical[targetFilteredIdx].id;
    const fromFullIdx = practicalExperiences.findIndex((item) => item.id === id);
    const toFullIdx = practicalExperiences.findIndex((item) => item.id === targetId);
    if (fromFullIdx === -1 || toFullIdx === -1) return;

    const newOrder = [...practicalExperiences];
    const [movedItem] = newOrder.splice(fromFullIdx, 1);
    newOrder.splice(toFullIdx, 0, movedItem);
    onReorderPractical?.(newOrder);
  };

  const handleDragStartPractical = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', `practical:${id}`);
  };

  const handleDropPractical = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data.startsWith('practical:')) return;
    const draggedId = data.replace('practical:', '');
    if (!draggedId || draggedId === targetId) return;

    const fromFullIdx = practicalExperiences.findIndex((item) => item.id === draggedId);
    const toFullIdx = practicalExperiences.findIndex((item) => item.id === targetId);
    if (fromFullIdx === -1 || toFullIdx === -1) return;

    const newOrder = [...practicalExperiences];
    const [movedItem] = newOrder.splice(fromFullIdx, 1);
    newOrder.splice(toFullIdx, 0, movedItem);
    onReorderPractical?.(newOrder);
  };

  // Reorder Organization
  const moveOrganization = (id: string, direction: 'prev' | 'next') => {
    const currentIdx = organizationExperiences.findIndex((item) => item.id === id);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'prev' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= organizationExperiences.length) return;

    const newOrder = [...organizationExperiences];
    const [movedItem] = newOrder.splice(currentIdx, 1);
    newOrder.splice(targetIdx, 0, movedItem);
    onReorderOrganization?.(newOrder);
  };

  const handleDragStartOrganization = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', `org:${id}`);
  };

  const handleDropOrganization = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data.startsWith('org:')) return;
    const draggedId = data.replace('org:', '');
    if (!draggedId || draggedId === targetId) return;

    const fromIdx = organizationExperiences.findIndex((item) => item.id === draggedId);
    const toIdx = organizationExperiences.findIndex((item) => item.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const newOrder = [...organizationExperiences];
    const [movedItem] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, movedItem);
    onReorderOrganization?.(newOrder);
  };

  return (
    <div id="pkpa-works" className="space-y-24 py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Pengalaman Praktik (PKPA Works) */}
      <section className="relative text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
              {isEditMode ? (
                <input
                  type="text"
                  value={sectionHeaders?.pkpaBadge || 'PKPA Works & Praktik Profesi Apoteker'}
                  onChange={(e) => onUpdateSectionHeaders?.({ pkpaBadge: e.target.value })}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono font-semibold uppercase text-sky-700 dark:text-sky-300 w-full max-w-md focus:outline-none"
                  title="Edit Label Badge PKPA"
                />
              ) : (
                <span>{sectionHeaders?.pkpaBadge || 'PKPA Works & Praktik Profesi Apoteker'}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {isEditMode ? (
                <input
                  type="text"
                  value={sectionHeaders?.pkpaTitle || 'Pengalaman Praktik Kefarmasian'}
                  onChange={(e) => onUpdateSectionHeaders?.({ pkpaTitle: e.target.value })}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] tracking-tight px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-slate-900 dark:text-white w-full max-w-xl focus:outline-none"
                  title="Edit Judul Seksi PKPA"
                />
              ) : (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-slate-900 dark:text-white transition-colors">
                  {sectionHeaders?.pkpaTitle || 'Pengalaman Praktik Kefarmasian'}
                </h2>
              )}

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

            {isEditMode ? (
              <textarea
                rows={2}
                value={sectionHeaders?.pkpaSubtitle || 'Setiap kartu memiliki Halaman Detail tersendiri dengan rincian tugas komprehensif, kepatuhan regulasi, serta Galeri Dokumentasi Foto PKPA.'}
                onChange={(e) => onUpdateSectionHeaders?.({ pkpaSubtitle: e.target.value })}
                className="w-full max-w-2xl px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
                title="Edit Keterangan Seksi PKPA"
              />
            ) : (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors">
                {sectionHeaders?.pkpaSubtitle || 'Setiap kartu memiliki Halaman Detail tersendiri dengan rincian tugas komprehensif, kepatuhan regulasi, serta Galeri Dokumentasi Foto PKPA.'}
              </p>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-slate-200/80 dark:bg-slate-950/80 border border-slate-300 dark:border-white/15 backdrop-blur-md self-start md:self-auto transition-colors">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedFilter === tab.id
                    ? 'pill-badge-active font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PKPA Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredPractical || []).map((exp, fIdx) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStartPractical(e, exp.id)}
              onDragOver={(e) => { if (isEditMode) e.preventDefault(); }}
              onDrop={(e) => { if (isEditMode) handleDropPractical(e, exp.id); }}
              className={`group glass-futuristic-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-all duration-300 relative border border-white/15 hover:border-sky-400/60 shadow-xl ${
                isEditMode ? 'hover:border-amber-400/80' : ''
              }`}
            >
              {/* Admin reorder, edit & delete controls on card */}
              {isEditMode && (
                <div 
                  className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 p-1 rounded-full bg-slate-950/95 border border-amber-400/80 shadow-2xl backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[10px] font-mono font-bold text-amber-300 px-1.5 select-none">
                    #{fIdx + 1}
                  </span>

                  <div 
                    className="p-1 text-amber-400/80 hover:text-amber-300 cursor-grab active:cursor-grabbing"
                    title="Tarik untuk geser urutan kartu"
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      movePractical(exp.id, 'prev');
                    }}
                    disabled={fIdx === 0}
                    className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Geser ke Kiri / Sebelumnya"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      movePractical(exp.id, 'next');
                    }}
                    disabled={fIdx === filteredPractical.length - 1}
                    className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Geser ke Kanan / Selanjutnya"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExperience(exp);
                    }}
                    className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all cursor-pointer shadow-md hover:scale-105"
                    title="Edit Pengalaman Ini"
                    aria-label="Edit kartu pengalaman"
                  >
                    <Edit3 className="w-3 h-3" />
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
                      className="p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                      title="Hapus Kartu Pengalaman Ini"
                      aria-label="Hapus kartu pengalaman"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                
                {/* Instansi Pill Badge */}
                <div className="pb-3 border-b border-slate-200 dark:border-white/10 pr-28">
                  <span className="pill-badge text-[11px] font-mono font-bold text-sky-700 dark:text-sky-300 border-sky-400/40 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_10px_rgba(0,112,243,0.15)] block truncate text-center">
                    {exp.badgeLabel}
                  </span>
                </div>

                {/* Pratinjau Foto Luar */}
                {(() => {
                  const coverUrl = exp.galleryPhotos?.[0]?.url || exp.image;
                  if (!coverUrl) return null;
                  return (
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-900/60 relative border border-slate-200 dark:border-white/10 group-hover:border-sky-400/40 transition-colors">
                      <img
                        src={coverUrl}
                        alt={exp.galleryPhotos?.[0]?.caption || exp.institution}
                        style={{
                          objectFit: exp.coverFit || 'cover',
                          objectPosition: `${exp.coverPositionX ?? 50}% ${exp.coverPositionY ?? 50}%`,
                          transform: `scale(${exp.coverScale ?? 1})`,
                        }}
                        className="w-full h-full rounded-xl transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-2.5 right-2.5 pill-badge text-[10px] font-mono bg-black/85 text-sky-300 border-sky-400/40 px-2 py-0.5 flex items-center gap-1 backdrop-blur-md">
                        <ImageIcon className="w-3 h-3 text-sky-400" />
                        <span>{(exp.galleryPhotos || []).length > 0 ? `${(exp.galleryPhotos || []).length} Foto` : '1 Foto'}</span>
                      </span>
                    </div>
                  );
                })()}

                {/* Institution Name */}
                <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                  {exp.institution}
                </h3>

                {/* Role and Period */}
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors">
                  <span className="truncate">{exp.role}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    {exp.location}
                  </span>
                </div>

                {/* Photo Gallery count badge */}
                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <ImageIcon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    {(exp.galleryPhotos || []).length} Foto Dokumentasi
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 dark:text-slate-400 truncate">{exp.categoryLabel}</span>
                </div>

              </div>

              {/* Card Footer Callout */}
              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
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
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
            {isEditMode ? (
              <input
                type="text"
                value={sectionHeaders?.orgBadge || 'KEPEMIMPINAN & ASISTENSI LABORATORIUM'}
                onChange={(e) => onUpdateSectionHeaders?.({ orgBadge: e.target.value })}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono font-semibold uppercase text-sky-700 dark:text-sky-300 w-full max-w-md focus:outline-none"
                title="Edit Badge Organisasi"
              />
            ) : (
              <span>{sectionHeaders?.orgBadge || 'KEPEMIMPINAN & ASISTENSI LABORATORIUM'}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {isEditMode ? (
              <input
                type="text"
                value={sectionHeaders?.orgTitle || 'Pengalaman Organisasi & Akademik'}
                onChange={(e) => onUpdateSectionHeaders?.({ orgTitle: e.target.value })}
                className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-slate-900 dark:text-white w-full max-w-xl focus:outline-none"
                title="Edit Judul Organisasi"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] tracking-tight text-slate-900 dark:text-white transition-colors">
                {sectionHeaders?.orgTitle || 'Pengalaman Organisasi & Akademik'}
              </h2>
            )}

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

          {isEditMode ? (
            <textarea
              rows={2}
              value={sectionHeaders?.orgSubtitle || 'Peran kepemimpinan dalam bimbingan ratusan praktikan laboratorium mikrobiologi dan diplomasi kemitraan antarkampus farmasi.'}
              onChange={(e) => onUpdateSectionHeaders?.({ orgSubtitle: e.target.value })}
              className="w-full max-w-2xl px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
              title="Edit Keterangan Organisasi"
            />
          ) : (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors">
              {sectionHeaders?.orgSubtitle || 'Peran kepemimpinan dalam bimbingan ratusan praktikan laboratorium mikrobiologi dan diplomasi kemitraan antarkampus farmasi.'}
            </p>
          )}
        </div>

        {/* Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(organizationExperiences || []).map((org, oIdx) => (
            <div
              key={org.id}
              onClick={() => onSelectExperience(org)}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStartOrganization(e, org.id)}
              onDragOver={(e) => { if (isEditMode) e.preventDefault(); }}
              onDrop={(e) => { if (isEditMode) handleDropOrganization(e, org.id); }}
              className={`group glass-futuristic-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-all duration-300 relative border border-white/15 hover:border-sky-400/60 shadow-xl ${
                isEditMode ? 'hover:border-amber-400/80' : ''
              }`}
            >
              {/* Admin reorder, edit & delete buttons on card */}
              {isEditMode && (
                <div 
                  className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 p-1 rounded-full bg-slate-950/95 border border-amber-400/80 shadow-2xl backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[10px] font-mono font-bold text-amber-300 px-1.5 select-none">
                    #{oIdx + 1}
                  </span>

                  <div 
                    className="p-1 text-amber-400/80 hover:text-amber-300 cursor-grab active:cursor-grabbing"
                    title="Tarik untuk geser urutan kartu"
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveOrganization(org.id, 'prev');
                    }}
                    disabled={oIdx === 0}
                    className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Geser ke Kiri / Sebelumnya"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveOrganization(org.id, 'next');
                    }}
                    disabled={oIdx === organizationExperiences.length - 1}
                    className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Geser ke Kanan / Selanjutnya"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExperience(org);
                    }}
                    className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all cursor-pointer shadow-md hover:scale-105"
                    title="Edit Pengalaman Ini"
                    aria-label="Edit kartu organisasi"
                  >
                    <Edit3 className="w-3 h-3" />
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
                      className="p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                      title="Hapus Kartu Organisasi Ini"
                      aria-label="Hapus kartu organisasi"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                
                {/* Badge Instansi */}
                <div className="pb-3 border-b border-slate-200 dark:border-white/10 pr-28">
                  <span className="pill-badge text-[11px] font-mono font-bold text-sky-700 dark:text-sky-300 border-sky-400/40 bg-sky-50 dark:bg-sky-950/50 shadow-[0_0_10px_rgba(0,112,243,0.15)] block truncate text-center">
                    {org.badgeLabel}
                  </span>
                </div>

                {/* Pratinjau Foto Luar jika ada foto */}
                {(() => {
                  const coverUrl = org.galleryPhotos?.[0]?.url || org.image;
                  if (!coverUrl) return null;
                  return (
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-900/60 relative border border-slate-200 dark:border-white/10 group-hover:border-sky-400/40 transition-colors">
                      <img
                        src={coverUrl}
                        alt={org.galleryPhotos?.[0]?.caption || org.institution}
                        style={{
                          objectFit: org.coverFit || 'cover',
                          objectPosition: `${org.coverPositionX ?? 50}% ${org.coverPositionY ?? 50}%`,
                          transform: `scale(${org.coverScale ?? 1})`,
                        }}
                        className="w-full h-full rounded-xl transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-2.5 right-2.5 pill-badge text-[10px] font-mono bg-black/85 text-sky-300 border-sky-400/40 px-2 py-0.5 flex items-center gap-1 backdrop-blur-md">
                        <ImageIcon className="w-3 h-3 text-sky-400" />
                        <span>{(org.galleryPhotos || []).length > 0 ? `${(org.galleryPhotos || []).length} Foto` : '1 Foto'}</span>
                      </span>
                    </div>
                  );
                })()}

                {/* Institution Name */}
                <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                  {org.institution}
                </h3>

                {/* Role and Period */}
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors">
                  <span className="truncate">{org.role}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {org.period}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    {org.location}
                  </span>
                </div>

                {/* Photo Gallery count badge */}
                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <ImageIcon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    {(org.galleryPhotos || []).length} Foto Dokumentasi
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 dark:text-slate-400 truncate">{org.categoryLabel || 'Akademik & Organisasi'}</span>
                </div>

              </div>

              {/* Card Footer Callout */}
              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
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

    </div>
  );
};
