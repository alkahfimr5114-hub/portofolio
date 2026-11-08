import React from 'react';
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
  GripVertical,
  Award
} from 'lucide-react';
import { ExperienceItem, SectionHeaders } from '../types/pharmacy';

interface OtherExperiencesProps {
  otherExperiences: ExperienceItem[];
  onSelectExperience: (item: ExperienceItem) => void;
  isEditMode?: boolean;
  onAddOther?: () => void;
  onDeleteOther?: (id: string) => void;
  sectionHeaders?: SectionHeaders;
  onUpdateSectionHeaders?: (updated: Partial<SectionHeaders>) => void;
  onReorderOther?: (newOrder: ExperienceItem[]) => void;
}

export const OtherExperiences: React.FC<OtherExperiencesProps> = ({
  otherExperiences = [],
  onSelectExperience,
  isEditMode = false,
  onAddOther,
  onDeleteOther,
  sectionHeaders,
  onUpdateSectionHeaders,
  onReorderOther,
}) => {
  // Reorder navigation
  const moveOther = (id: string, direction: 'prev' | 'next') => {
    const currentIdx = otherExperiences.findIndex((item) => item.id === id);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'prev' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= otherExperiences.length) return;

    const newOrder = [...otherExperiences];
    const [movedItem] = newOrder.splice(currentIdx, 1);
    newOrder.splice(targetIdx, 0, movedItem);
    onReorderOther?.(newOrder);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', `other:${id}`);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data.startsWith('other:')) return;
    const draggedId = data.replace('other:', '');
    if (!draggedId || draggedId === targetId) return;

    const fromIdx = otherExperiences.findIndex((item) => item.id === draggedId);
    const toIdx = otherExperiences.findIndex((item) => item.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const newOrder = [...otherExperiences];
    const [movedItem] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, movedItem);
    onReorderOther?.(newOrder);
  };

  return (
    <section id="other-experiences" className="relative text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-3 flex-1">
          
          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
            {isEditMode ? (
              <input
                type="text"
                value={sectionHeaders?.otherBadge || 'REKAM JEJAK & PENCAPAIAN TAMBAHAN'}
                onChange={(e) => onUpdateSectionHeaders?.({ otherBadge: e.target.value })}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs font-mono font-semibold uppercase text-sky-700 dark:text-sky-300 w-full max-w-md focus:outline-none"
                title="Edit Label Badge Pengalaman Lainnya"
              />
            ) : (
              <span>{sectionHeaders?.otherBadge || 'REKAM JEJAK & PENCAPAIAN TAMBAHAN'}</span>
            )}
          </div>

          {/* Title & Admin Add Button */}
          <div className="flex flex-wrap items-center gap-4">
            {isEditMode ? (
              <input
                type="text"
                value={sectionHeaders?.otherTitle || 'Pengalaman dan Pencapaian Lainnya'}
                onChange={(e) => onUpdateSectionHeaders?.({ otherTitle: e.target.value })}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] tracking-tight px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-slate-900 dark:text-white w-full max-w-xl focus:outline-none"
                title="Edit Judul Seksi Pengalaman Lainnya"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-slate-900 dark:text-white transition-colors">
                {sectionHeaders?.otherTitle || 'Pengalaman dan Pencapaian Lainnya'}
              </h2>
            )}

            {isEditMode && onAddOther && (
              <button
                onClick={onAddOther}
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>+ Tambah Pengalaman Lainnya</span>
              </button>
            )}
          </div>

          {/* Subtitle */}
          {isEditMode ? (
            <textarea
              rows={2}
              value={sectionHeaders?.otherSubtitle || 'Dokumentasi kegiatan, proyek kolaborasi, kompetisi, dan pencapaian profesional lainnya.'}
              onChange={(e) => onUpdateSectionHeaders?.({ otherSubtitle: e.target.value })}
              className="w-full max-w-2xl px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
              title="Edit Keterangan Seksi Pengalaman Lainnya"
            />
          ) : (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors">
              {sectionHeaders?.otherSubtitle || 'Dokumentasi kegiatan, proyek kolaborasi, kompetisi, dan pencapaian profesional lainnya.'}
            </p>
          )}

        </div>

        {/* Count Badge indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <Award className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{otherExperiences.length} Rekam Jejak</span>
          </span>
        </div>
      </div>

      {/* Grid of Cards */}
      {otherExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherExperiences.map((exp, fIdx) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp)}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStart(e, exp.id)}
              onDragOver={(e) => { if (isEditMode) e.preventDefault(); }}
              onDrop={(e) => { if (isEditMode) handleDrop(e, exp.id); }}
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
                      moveOther(exp.id, 'prev');
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
                      moveOther(exp.id, 'next');
                    }}
                    disabled={fIdx === otherExperiences.length - 1}
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

                  {onDeleteOther && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Hapus "${exp.institution}"?`)) {
                          onDeleteOther(exp.id);
                        }
                      }}
                      className="p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                      title="Hapus Kartu Ini"
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

                {/* Outside Photo Preview */}
                {(() => {
                  const coverUrl = exp.galleryPhotos?.[0]?.url || exp.image;
                  if (!coverUrl) return null;
                  return (
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-900/60 relative border border-slate-200 dark:border-white/10 group-hover:border-sky-400/40 transition-colors">
                      <img
                        src={coverUrl}
                        alt={exp.galleryPhotos?.[0]?.caption || exp.institution}
                        className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
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

                {/* Institution / Project Name */}
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

                {/* Photo Gallery count badge & Category */}
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
      ) : (
        <div className="p-12 text-center rounded-3xl glass-futuristic-card border border-dashed border-slate-300 dark:border-white/15">
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-4">
            Belum ada kartu pengalaman atau pencapaian tambahan yang ditambahkan.
          </p>
          {isEditMode && onAddOther && (
            <button
              onClick={onAddOther}
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>+ Tambah Kartu Pertama</span>
            </button>
          )}
        </div>
      )}

    </section>
  );
};
