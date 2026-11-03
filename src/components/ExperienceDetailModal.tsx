import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, MapPin, Building, ShieldCheck, CheckCircle2, 
  ChevronLeft, ChevronRight, ArrowLeft, Image as ImageIcon, Plus, 
  Trash2, Upload, Sparkles, ExternalLink, Cpu, Loader2, Cloud 
} from 'lucide-react';
import { ExperienceItem, GalleryPhoto } from '../types/pharmacy';
import { uploadImageToSupabaseStorage } from '../lib/supabase';

interface ExperienceDetailModalProps {
  experience: ExperienceItem | null;
  allExperiences: ExperienceItem[];
  onClose: () => void;
  onSelectExperience: (item: ExperienceItem) => void;
  isEditMode: boolean;
  onUpdateExperience: (updated: ExperienceItem) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  allExperiences,
  onClose,
  onSelectExperience,
  isEditMode,
  onUpdateExperience,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [newDutyText, setNewDutyText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else {
          onClose();
        }
      }
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose, activePhotoIndex]);

  if (!experience) return null;

  const currentIndex = allExperiences.findIndex((item) => item.id === experience.id);
  const prevExperience = currentIndex > 0 ? allExperiences[currentIndex - 1] : null;
  const nextExperience = currentIndex < allExperiences.length - 1 ? allExperiences[currentIndex + 1] : null;

  // Add photo handler
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'Dokumentasi Praktik Kefarmasian',
    };

    const updated: ExperienceItem = {
      ...experience,
      galleryPhotos: [...(experience.galleryPhotos || []), newPhoto],
    };

    onUpdateExperience(updated);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setShowAddPhotoForm(false);
  };

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Upload image to Supabase Storage (bucket: 'portfolio-images')
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Mengunggah ke Supabase Storage...');

    try {
      const result = await uploadImageToSupabaseStorage(file, 'pkpa');
      if (result.url) {
        const newPhoto: GalleryPhoto = {
          id: `photo-${Date.now()}`,
          url: result.url,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        };
        const updated: ExperienceItem = {
          ...experience,
          galleryPhotos: [...(experience.galleryPhotos || []), newPhoto],
        };
        onUpdateExperience(updated);
        setUploadStatus(result.isCloud ? 'Berhasil tersimpan di Cloud Storage!' : 'Tersimpan lokal.');
        setTimeout(() => setUploadStatus(null), 3500);
      } else {
        setUploadStatus('Gagal mengunggah gambar.');
        setTimeout(() => setUploadStatus(null), 4000);
      }
    } catch (err) {
      console.error(err);
      setUploadStatus('Terjadi kesalahan saat unggah.');
      setTimeout(() => setUploadStatus(null), 4000);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Delete photo handler
  const handleDeletePhoto = (photoId: string) => {
    const updated: ExperienceItem = {
      ...experience,
      galleryPhotos: (experience.galleryPhotos || []).filter((p) => p.id !== photoId),
    };
    onUpdateExperience(updated);
  };

  // Add duty bullet handler
  const handleAddDuty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDutyText.trim()) return;

    const updated: ExperienceItem = {
      ...experience,
      dutiesAndAchievements: [...(experience.dutiesAndAchievements || []), newDutyText.trim()],
    };
    onUpdateExperience(updated);
    setNewDutyText('');
  };

  // Delete duty bullet
  const handleDeleteDuty = (index: number) => {
    const updated: ExperienceItem = {
      ...experience,
      dutiesAndAchievements: (experience.dutiesAndAchievements || []).filter((_, i) => i !== index),
    };
    onUpdateExperience(updated);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Dark frosted backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Detail View */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl glass-modal-deep border border-sky-500/40 p-5 sm:p-8 lg:p-10 text-left z-10 space-y-7 shadow-[0_0_60px_rgba(0,112,243,0.3)]">
        
        {/* Top Breadcrumb & Switcher Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/15">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 overflow-hidden">
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-slate-400 truncate">
              {experience.type === 'practical' ? 'PKPA Works' : 'Organisasi'}
            </span>
            <span aria-hidden="true">/</span>
            <span className="text-sky-300 font-semibold truncate">
              {experience.institution}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Prev */}
            {prevExperience && (
              <button
                onClick={() => onSelectExperience(prevExperience)}
                className="pill-badge text-xs py-1 px-3 hover:border-white transition-all cursor-pointer"
                title={`Sebelumnya: ${prevExperience.institution}`}
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
            )}

            {/* Next */}
            {nextExperience && (
              <button
                onClick={() => onSelectExperience(nextExperience)}
                className="pill-badge text-xs py-1 px-3 hover:border-white transition-all cursor-pointer"
                title={`Selanjutnya: ${nextExperience.institution}`}
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="p-2 rounded-full border border-white/20 hover:border-white text-slate-300 hover:text-white bg-slate-900 transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Instansi Pill Badge & Title */}
        <div className="space-y-3">
          {isEditMode ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="text-xs font-mono text-amber-300 font-bold flex items-center justify-between">
                <span>Edit Informasi Pengalaman (Tersimpan Otomatis):</span>
                <span className="text-[10px] text-amber-400">Mode Admin</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Nama Instansi / Perusahaan</label>
                  <input
                    type="text"
                    value={experience.institution}
                    onChange={(e) => onUpdateExperience({ ...experience, institution: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Badge Label (Atas)</label>
                  <input
                    type="text"
                    value={experience.badgeLabel}
                    onChange={(e) => onUpdateExperience({ ...experience, badgeLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Peran / Jabatan</label>
                  <input
                    type="text"
                    value={experience.role}
                    onChange={(e) => onUpdateExperience({ ...experience, role: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Periode</label>
                  <input
                    type="text"
                    value={experience.period}
                    onChange={(e) => onUpdateExperience({ ...experience, period: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={experience.location}
                    onChange={(e) => onUpdateExperience({ ...experience, location: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Label Kategori</label>
                  <input
                    type="text"
                    value={experience.categoryLabel}
                    onChange={(e) => onUpdateExperience({ ...experience, categoryLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Exact Instansi Pill Badge specified in prompt */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill-badge text-xs font-mono font-bold text-sky-300 border-sky-400/50 bg-sky-950/60 shadow-[0_0_15px_rgba(0,112,243,0.3)]">
                  {experience.badgeLabel}
                </span>
                <span className="pill-badge text-xs font-mono text-slate-300 border-white/20">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  {experience.period}
                </span>
                <span className="pill-badge text-xs font-mono text-slate-300 border-white/20">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  {experience.location}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-white">
                {experience.institution}
              </h2>

              <div className="text-base sm:text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Peran: {experience.role}</span>
              </div>
            </>
          )}
        </div>

        {/* Overview Statement */}
        <div className="p-5 rounded-2xl glass-futuristic-card text-sm sm:text-base text-slate-200 leading-relaxed border-sky-500/20">
          {isEditMode ? (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-amber-300 block font-semibold">Edit Ringkasan / Overview Pengalaman:</label>
              <textarea
                rows={3}
                value={experience.fullOverview}
                onChange={(e) => onUpdateExperience({ ...experience, fullOverview: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-900 border border-amber-400/50 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          ) : (
            experience.fullOverview
          )}
        </div>

        {/* Rincian Tugas & Pencapaian Lengkap */}
        <div className="p-6 rounded-2xl glass-futuristic-card border border-white/15 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Detail Tugas & Pencapaian Praktik</span>
            </h3>
            {isEditMode && (
              <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600">
                Mode Edit Tugas Aktif
              </span>
            )}
          </div>

          <div className="space-y-3">
            {(experience.dutiesAndAchievements || []).map((duty, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed group">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_#00d4ff]" aria-hidden="true" />
                  <span>{duty}</span>
                </div>
                {isEditMode && (
                  <button
                    onClick={() => handleDeleteDuty(idx)}
                    className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/50 transition-colors shrink-0"
                    title="Hapus poin tugas"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Form Tambah Tugas Baru in Edit Mode */}
          {isEditMode && (
            <form onSubmit={handleAddDuty} className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Tambah rincian tugas baru..."
                value={newDutyText}
                onChange={(e) => setNewDutyText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                + Tambah
              </button>
            </form>
          )}
        </div>

        {/* AREA GALERI FOTO DOKUMENTASI PKPA (FITUR SPESIFIK USER REQUEST) */}
        <div className="p-6 rounded-2xl glass-futuristic-card border border-sky-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-sky-400" />
                <span>Galeri Dokumentasi Foto PKPA</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Foto dokumentasi aktivitas pelayanan kefarmasian, QC laboratorium, dan fasilitas instansi.
              </p>
            </div>

            {/* Add photo controls - ONLY available when Admin Edit Mode is unlocked via PIN */}
            {isEditMode ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-600 px-2.5 py-1 rounded-full">
                  Admin Aktif
                </span>

                {isUploading ? (
                  <span className="pill-badge text-xs py-1.5 px-3 bg-sky-950/80 border-sky-400 text-sky-300 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                    <span>Mengunggah...</span>
                  </span>
                ) : (
                  <label className="pill-badge text-xs py-1.5 px-3 cursor-pointer hover:border-sky-400 text-sky-300 transition-colors flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}

                <button
                  onClick={() => setShowAddPhotoForm(!showAddPhotoForm)}
                  className="pill-badge text-xs py-1.5 px-3 hover:border-white text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Input URL</span>
                </button>

                {uploadStatus && (
                  <span className="text-[11px] font-mono text-sky-300 bg-sky-950/90 border border-sky-500/50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Cloud className="w-3 h-3 text-sky-400" />
                    <span>{uploadStatus}</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {(experience.galleryPhotos || []).length} Foto Dokumentasi
                </span>
              </div>
            )}
          </div>

          {/* Form input URL Foto (Admin Only) */}
          {isEditMode && showAddPhotoForm && (
            <form onSubmit={handleAddPhoto} className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40 space-y-3">
              <div className="text-xs font-mono text-sky-300 font-bold">
                Tambah Foto Melalui Tautan URL:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="url"
                  required
                  placeholder="https://example.com/foto-kegiatan.jpg"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
                />
                <input
                  type="text"
                  placeholder="Keterangan / Caption Foto (Opsional)"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white shadow cursor-pointer"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          )}

          {/* Grid Foto Dokumentasi dengan Proposi Utuh (object-contain + neat caption label) */}
          {(experience.galleryPhotos || []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {(experience.galleryPhotos || []).map((photo, pIdx) => (
                <div
                  key={photo.id}
                  className="group relative rounded-2xl overflow-hidden border border-white/15 hover:border-sky-400/70 bg-gradient-to-b from-slate-900/90 to-black/95 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,112,243,0.3)] cursor-pointer"
                  onClick={() => setActivePhotoIndex(pIdx)}
                >
                  {/* Image Frame with object-contain to display full image without clipping */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-black/90 flex items-center justify-center border border-white/5">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover indicator */}
                    <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="pill-badge text-[10px] bg-black/85 text-sky-300 border border-sky-400/40 px-2.5 py-1">
                        Klik untuk Perbesar
                      </span>
                    </div>

                    {/* Delete button strictly visible in Admin Edit Mode */}
                    {isEditMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(photo.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/90 border border-red-500 text-red-200 hover:bg-red-900 hover:text-white transition-colors z-20 shadow-lg cursor-pointer"
                        title="Hapus foto ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Caption Label below image (editable by admin in edit mode) */}
                  <div className="pt-2.5 px-1" onClick={(e) => isEditMode && e.stopPropagation()}>
                    {isEditMode ? (
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-amber-300 block">Keterangan Foto:</label>
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => {
                            const updatedPhotos = (experience.galleryPhotos || []).map((p) =>
                              p.id === photo.id ? { ...p, caption: e.target.value } : p
                            );
                            onUpdateExperience({ ...experience, galleryPhotos: updatedPhotos });
                          }}
                          placeholder="Tulis keterangan foto..."
                          className="w-full px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-400 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    ) : (
                      <p className="text-xs font-mono text-slate-200 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-700 rounded-xl">
              {isEditMode
                ? "Belum ada foto dokumentasi. Gunakan tombol 'Unggah Foto' atau 'Input URL' di atas untuk menambahkan dokumentasi kegiatan PKPA."
                : "Belum ada foto dokumentasi untuk kegiatan ini."}
            </div>
          )}
        </div>

        {/* Standar Regulasi & Kompetensi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl glass-futuristic-card text-left space-y-2">
            <div className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Standar Regulasi Kepatuhan:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(experience.regulatoryStandards || []).map((std, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-200 bg-slate-900 border border-slate-700">
                  {std}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl glass-futuristic-card text-left space-y-2">
            <div className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Kompetensi Teknis Terlatih:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(experience.competencies || []).map((comp, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded text-xs font-mono text-slate-300 bg-black/80 border border-slate-800">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metrik Indikator Kinerja Utama (Safe) */}
        {(experience.metrics || []).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            {(experience.metrics || []).map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-center">
                <div className="text-xs font-mono text-slate-400">{m.label}</div>
                <div className="text-sm font-bold text-sky-300 font-mono mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-white/15 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            Terdaftar Resmi Portofolio PKPA PSPA UNHAS & UMI
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all cursor-pointer"
          >
            Tutup & Kembali
          </button>
        </div>

      </div>

      {/* Lightbox Zoom Foto */}
      {activePhotoIndex !== null && (experience.galleryPhotos || [])[activePhotoIndex] && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={(experience.galleryPhotos || [])[activePhotoIndex]?.url}
              alt={(experience.galleryPhotos || [])[activePhotoIndex]?.caption}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl border border-sky-400/40"
            />
            <div className="mt-3 text-sm font-mono text-white text-center bg-black/70 px-4 py-2 rounded-full border border-white/20">
              {(experience.galleryPhotos || [])[activePhotoIndex]?.caption}
            </div>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-sky-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
