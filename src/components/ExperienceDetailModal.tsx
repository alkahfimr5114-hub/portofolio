import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, MapPin, Building, CheckCircle2, 
  ChevronLeft, ChevronRight, ArrowLeft, Image as ImageIcon, Plus, 
  Trash2, Upload, ExternalLink, Cpu, Loader2, Cloud,
  Star, GripVertical 
} from 'lucide-react';
import { ExperienceItem, GalleryPhoto } from '../types/pharmacy';
import { uploadImageToSupabaseStorage, compressImageWithCanvas, formatImageUrl } from '../lib/supabase';

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
  const [newCompetencyText, setNewCompetencyText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Reset activePhotoIndex whenever experience changes to avoid out-of-bounds error
  useEffect(() => {
    setActivePhotoIndex(null);
    setShowAddPhotoForm(false);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setNewDutyText('');
    setNewCompetencyText('');
    setUploadStatus(null);
  }, [experience?.id]);

  // Handle ESC key and scroll lock
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

  // Safe fallback arrays to prevent any possible crash
  const duties = Array.isArray(experience.dutiesAndAchievements) && experience.dutiesAndAchievements.length > 0 
    ? experience.dutiesAndAchievements 
    : [];
  const photos = Array.isArray(experience.galleryPhotos) 
    ? experience.galleryPhotos 
    : [];
  const competencies = Array.isArray(experience.competencies) && experience.competencies.length > 0 
    ? experience.competencies 
    : [];

  // Carousel navigation
  const currentIndex = allExperiences.findIndex((item) => item.id === experience.id);
  const prevExperience = currentIndex > 0 ? allExperiences[currentIndex - 1] : null;
  const nextExperience = currentIndex >= 0 && currentIndex < allExperiences.length - 1 ? allExperiences[currentIndex + 1] : null;

  // Add photo via URL (auto-formats Google Drive links & auto-syncs card thumbnail)
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const formattedUrl = formatImageUrl(newPhotoUrl.trim());
    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: formattedUrl,
      caption: newPhotoCaption.trim() || 'Dokumentasi Praktik Kefarmasian',
    };

    const newPhotos = [...photos, newPhoto];
    const updated: ExperienceItem = {
      ...experience,
      // First photo in galleryPhotos automatically updates card image thumbnail
      image: newPhotos[0]?.url ? formatImageUrl(newPhotos[0].url) : experience.image,
      galleryPhotos: newPhotos,
    };

    onUpdateExperience(updated);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setShowAddPhotoForm(false);
  };

  // Upload photo file: tries Supabase Storage first, then Canvas compression dataURL (<150KB)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Mengunggah foto...');

    try {
      // 1. Try Supabase Storage upload
      const result = await uploadImageToSupabaseStorage(file, 'pkpa');
      let finalUrl = result.url ? formatImageUrl(result.url) : '';

      // 2. If storage returned empty, guarantee compressed Base64 DataURL via Canvas
      if (!finalUrl) {
        finalUrl = await compressImageWithCanvas(file, 900, 0.75);
      }

      if (finalUrl) {
        const newPhoto: GalleryPhoto = {
          id: `photo-${Date.now()}`,
          url: finalUrl,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        };
        const newPhotos = [...photos, newPhoto];
        const updated: ExperienceItem = {
          ...experience,
          // First photo in galleryPhotos automatically updates card image thumbnail
          image: newPhotos[0]?.url ? formatImageUrl(newPhotos[0].url) : experience.image,
          galleryPhotos: newPhotos,
        };
        onUpdateExperience(updated);
        setUploadStatus(result.isCloud ? 'Tersimpan di Cloud Storage!' : 'Foto berhasil diunggah!');
        setTimeout(() => setUploadStatus(null), 3500);
      } else {
        setUploadStatus('Gagal memproses gambar.');
        setTimeout(() => setUploadStatus(null), 3500);
      }
    } catch (err) {
      console.error('File upload error:', err);
      // Fallback: direct canvas compression
      try {
        const fallbackUrl = await compressImageWithCanvas(file, 900, 0.75);
        if (fallbackUrl) {
          const newPhoto: GalleryPhoto = {
            id: `photo-${Date.now()}`,
            url: fallbackUrl,
            caption: file.name.replace(/\.[^/.]+$/, ''),
          };
          const newPhotos = [...photos, newPhoto];
          onUpdateExperience({
            ...experience,
            image: newPhotos[0]?.url ? formatImageUrl(newPhotos[0].url) : experience.image,
            galleryPhotos: newPhotos,
          });
          setUploadStatus('Foto berhasil disimpan!');
          setTimeout(() => setUploadStatus(null), 3500);
        }
      } catch (fallbackErr) {
        setUploadStatus('Terjadi kesalahan saat unggah.');
        setTimeout(() => setUploadStatus(null), 3500);
      }
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Delete photo (and sync card image thumbnail if first photo deleted)
  const handleDeletePhoto = (photoId: string) => {
    if (!experience) return;
    const remainingPhotos = photos.filter((p) => p.id !== photoId);
    const updated: ExperienceItem = {
      ...experience,
      image: remainingPhotos.length > 0 ? (remainingPhotos[0].url || experience.image) : experience.image,
      galleryPhotos: remainingPhotos,
    };
    onUpdateExperience(updated);
  };

  // Move photo position (left / right)
  const handleMovePhoto = (photoId: string, direction: 'prev' | 'next') => {
    if (!experience) return;
    const currentIdx = photos.findIndex((p) => p.id === photoId);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'prev' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= photos.length) return;

    const newPhotos = [...photos];
    const [moved] = newPhotos.splice(currentIdx, 1);
    newPhotos.splice(targetIdx, 0, moved);

    const updated: ExperienceItem = {
      ...experience,
      // Automatic: when a photo moves to index 0, synchronize the front card thumbnail image
      image: newPhotos[0]?.url ? formatImageUrl(newPhotos[0].url) : experience.image,
      galleryPhotos: newPhotos,
    };
    onUpdateExperience(updated);
  };

  // Set specific photo as main cover (move to index 0 and update experience.image)
  const handleSetAsCover = (photoId: string) => {
    if (!experience) return;
    const currentIdx = photos.findIndex((p) => p.id === photoId);
    if (currentIdx <= 0) return; // already cover if 0

    const newPhotos = [...photos];
    const [selected] = newPhotos.splice(currentIdx, 1);
    newPhotos.unshift(selected);

    const updated: ExperienceItem = {
      ...experience,
      image: selected.url ? formatImageUrl(selected.url) : experience.image,
      galleryPhotos: newPhotos,
    };
    onUpdateExperience(updated);
  };

  // Drag and drop photo reorder
  const handleDragStartPhoto = (e: React.DragEvent, photoId: string) => {
    e.dataTransfer.setData('text/plain', `photo:${photoId}`);
  };

  const handleDropPhoto = (e: React.DragEvent, targetPhotoId: string) => {
    e.preventDefault();
    if (!experience) return;
    const data = e.dataTransfer.getData('text/plain');
    if (!data.startsWith('photo:')) return;
    const draggedId = data.replace('photo:', '');
    if (!draggedId || draggedId === targetPhotoId) return;

    const fromIdx = photos.findIndex((p) => p.id === draggedId);
    const toIdx = photos.findIndex((p) => p.id === targetPhotoId);
    if (fromIdx === -1 || toIdx === -1) return;

    const newPhotos = [...photos];
    const [moved] = newPhotos.splice(fromIdx, 1);
    newPhotos.splice(toIdx, 0, moved);

    const updated: ExperienceItem = {
      ...experience,
      image: newPhotos[0]?.url ? formatImageUrl(newPhotos[0].url) : experience.image,
      galleryPhotos: newPhotos,
    };
    onUpdateExperience(updated);
  };

  // Add duty
  const handleAddDuty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDutyText.trim()) return;

    const updated: ExperienceItem = {
      ...experience,
      dutiesAndAchievements: [...duties, newDutyText.trim()],
    };
    onUpdateExperience(updated);
    setNewDutyText('');
  };

  // Delete duty
  const handleDeleteDuty = (index: number) => {
    const updated: ExperienceItem = {
      ...experience,
      dutiesAndAchievements: duties.filter((_, i) => i !== index),
    };
    onUpdateExperience(updated);
  };

  // Add competency
  const handleAddCompetency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompetencyText.trim()) return;
    const updated: ExperienceItem = {
      ...experience,
      competencies: [...competencies, newCompetencyText.trim()],
    };
    onUpdateExperience(updated);
    setNewCompetencyText('');
  };

  // Delete competency
  const handleDeleteCompetency = (index: number) => {
    const updated: ExperienceItem = {
      ...experience,
      competencies: competencies.filter((_, i) => i !== index),
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

      {/* Main Modal Card View */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl glass-modal-deep border border-sky-500/40 p-5 sm:p-8 lg:p-10 text-left z-10 space-y-7 shadow-[0_0_60px_rgba(0,112,243,0.3)]">
        
        {/* A. Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/15">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 overflow-hidden">
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-slate-500 dark:text-slate-400 truncate">
              {experience.type === 'practical' ? 'PKPA Works' : experience.type === 'other' ? 'Pencapaian Lainnya' : 'Organisasi'}
            </span>
            <span aria-hidden="true">/</span>
            <span className="text-sky-600 dark:text-sky-300 font-semibold truncate">
              {experience.institution}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full border border-slate-300 dark:border-white/20 hover:border-sky-400 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* B. Instansi Pill Badge, Periode, Lokasi, Judul & Peran */}
        <div className="space-y-3">
          {isEditMode ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="text-xs font-mono text-amber-300 font-bold flex items-center justify-between">
                <span>Edit Informasi Pengalaman:</span>
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
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    URL Gambar / Thumbnail Kartu Depan (Google Drive / Link Foto HTTPS)
                  </label>
                  <input
                    type="text"
                    value={experience.image || ''}
                    onChange={(e) => onUpdateExperience({ ...experience, image: formatImageUrl(e.target.value) })}
                    placeholder="https://images.unsplash.com/... atau link Google Drive"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Pill Badges: Instansi, Tanggal, dan Lokasi Berdampingan dalam Satu Baris Horizontal */}
              <div className="flex flex-wrap items-center gap-2">
                {experience.badgeLabel && (
                  <span className="pill-badge text-xs font-mono font-bold text-sky-700 dark:text-sky-300 border-sky-400/50 bg-sky-50 dark:bg-sky-950/60 shadow-xs">
                    {experience.badgeLabel}
                  </span>
                )}
                <span className="pill-badge text-xs font-mono text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/20 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{experience.period}</span>
                </span>
                <span className="pill-badge text-xs font-mono text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/20 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{experience.location}</span>
                </span>
              </div>

              {/* Title Instansi */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white transition-colors">
                {experience.institution}
              </h2>

              {/* Role */}
              <div className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Peran: {experience.role}</span>
              </div>
            </>
          )}
        </div>

        {/* C. Kotak Ringkasan / Overview Pengalaman (fullOverview) */}
        <div className="p-5 rounded-2xl glass-futuristic-card text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed border-sky-500/20">
          {isEditMode ? (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-amber-500 dark:text-amber-300 block font-semibold">Edit Ringkasan / Overview Pengalaman:</label>
              <textarea
                rows={3}
                value={experience.fullOverview || ''}
                onChange={(e) => onUpdateExperience({ ...experience, fullOverview: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          ) : (
            <p>{experience.fullOverview || experience.shortSummary || 'Ringkasan kegiatan praktik kefarmasian profesional.'}</p>
          )}
        </div>

        {/* D. Kotak "Detail Tugas & Pencapaian Praktik" (dutiesAndAchievements) */}
        <div className="p-6 rounded-2xl glass-futuristic-card border border-slate-200 dark:border-white/15 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Detail Tugas & Pencapaian Praktik</span>
            </h3>
            {isEditMode && (
              <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600">
                Mode Edit Tugas Aktif
              </span>
            )}
          </div>

          <div className="space-y-3">
            {duties.length > 0 ? (
              duties.map((duty, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed group">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_#00d4ff]" aria-hidden="true" />
                    <span>{duty}</span>
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => handleDeleteDuty(idx)}
                      className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/50 transition-colors shrink-0 cursor-pointer"
                      title="Hapus poin tugas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-slate-400 italic">Rincian tugas praktik sedang disinkronkan.</p>
            )}
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

        {/* E. Kotak "Galeri Dokumentasi Foto" (galleryPhotos) */}
        <div className="p-6 rounded-2xl glass-futuristic-card border border-sky-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
                <ImageIcon className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Galeri Dokumentasi Foto</span>
              </h3>
            </div>

            {/* Controls upload foto (Admin Only) & Photo counter */}
            {isEditMode ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-2.5 py-1 rounded-full">
                  {photos.length} Foto
                </span>

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
                  type="button"
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
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-3 py-1 rounded-full">
                  {photos.length} Foto Dokumentasi
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

          {/* Grid Foto Dokumentasi dengan object-contain, reorder admin controls, dan caption yang dapat diedit */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {photos.map((photo, pIdx) => (
                <div
                  key={photo.id || pIdx}
                  draggable={isEditMode}
                  onDragStart={(e) => handleDragStartPhoto(e, photo.id)}
                  onDragOver={(e) => { if (isEditMode) e.preventDefault(); }}
                  onDrop={(e) => { if (isEditMode) handleDropPhoto(e, photo.id); }}
                  className={`group relative rounded-2xl overflow-hidden border border-white/15 hover:border-sky-400/70 bg-gradient-to-b from-slate-900/90 to-black/95 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,112,243,0.3)] cursor-pointer ${
                    isEditMode ? 'hover:border-amber-400/80' : ''
                  }`}
                  onClick={() => setActivePhotoIndex(pIdx)}
                >
                  {/* Image Frame */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-black/90 flex items-center justify-center border border-white/5">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Foto dokumentasi'}
                      onError={(e) => {
                        // Fallback jika URL gagal dimuat
                        if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop') {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop';
                        }
                      }}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover indicator (in view mode) */}
                    {!isEditMode && (
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="pill-badge text-[10px] bg-black/85 text-sky-300 border border-sky-400/40 px-2.5 py-1">
                          Klik untuk Perbesar
                        </span>
                      </div>
                    )}

                    {/* View Mode cover indicator if index === 0 */}
                    {!isEditMode && pIdx === 0 && (
                      <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        <span className="text-[10px] font-mono font-bold bg-black/80 text-amber-300 border border-amber-400/50 px-2 py-0.5 rounded-full shadow flex items-center gap-1 backdrop-blur-md">
                          <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                          <span>Sampul Utama</span>
                        </span>
                      </div>
                    )}

                    {/* Admin reorder & controls (Top bar) */}
                    {isEditMode && (
                      <div 
                        className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between gap-1 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Number & Cover indicator */}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-950/95 border border-amber-400/80 px-2 py-0.5 rounded-full shadow-lg select-none">
                            #{pIdx + 1}
                          </span>
                          {pIdx === 0 ? (
                            <span className="text-[10px] font-mono font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full shadow flex items-center gap-1 select-none">
                              <Star className="w-2.5 h-2.5 fill-black" />
                              <span>Sampul</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetAsCover(photo.id)}
                              className="text-[10px] font-mono font-semibold bg-slate-950/90 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-400/60 px-2 py-0.5 rounded-full shadow transition-all cursor-pointer flex items-center gap-1"
                              title="Pindahkan foto ini ke urutan pertama sebagai Sampul Utama kartu"
                            >
                              <Star className="w-2.5 h-2.5" />
                              <span className="hidden sm:inline">Jadikan Sampul</span>
                            </button>
                          )}
                        </div>

                        {/* Controls: Grip, Left, Right, Delete */}
                        <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/95 border border-amber-400/80 shadow-2xl backdrop-blur-md">
                          <div 
                            className="p-1 text-amber-400/80 hover:text-amber-300 cursor-grab active:cursor-grabbing"
                            title="Tarik untuk geser urutan foto"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleMovePhoto(photo.id, 'prev')}
                            disabled={pIdx === 0}
                            className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-25 disabled:hover:bg-transparent transition-all cursor-pointer"
                            title="Geser ke Kiri / Sebelumnya"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMovePhoto(photo.id, 'next')}
                            disabled={pIdx === photos.length - 1}
                            className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-25 disabled:hover:bg-transparent transition-all cursor-pointer"
                            title="Geser ke Kanan / Selanjutnya"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Hapus foto dokumentasi ini?')) {
                                handleDeletePhoto(photo.id);
                              }
                            }}
                            className="p-1 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer shadow-md hover:scale-105"
                            title="Hapus foto ini"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caption label under image */}
                  <div className="pt-2.5 px-1" onClick={(e) => isEditMode && e.stopPropagation()}>
                    {isEditMode ? (
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-amber-300 block">Keterangan Foto:</label>
                        <input
                          type="text"
                          value={photo.caption || ''}
                          onChange={(e) => {
                            const updatedPhotos = photos.map((p) =>
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
                        {photo.caption || 'Dokumentasi Kegiatan'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-700 rounded-xl">
              {isEditMode
                ? "Belum ada foto dokumentasi. Gunakan tombol 'Unggah Foto' atau 'Input URL' di atas untuk menambahkan dokumentasi kegiatan."
                : "Belum ada foto dokumentasi untuk kegiatan ini."}
            </div>
          )}
        </div>

        {/* F. Bagian Bawah: Kompetensi */}
        <div className="p-5 rounded-2xl glass-futuristic-card border border-slate-200 dark:border-white/10 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Kompetensi</span>
            </div>
            {isEditMode && (
              <span className="text-[10px] font-mono text-amber-500 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 border border-amber-400 dark:border-amber-600/50 px-2 py-0.5 rounded">
                Admin: Kelola Kompetensi
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {competencies.length > 0 ? (
              competencies.map((comp, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-sky-800 dark:text-sky-200 bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-500/30 shadow-xs hover:border-sky-400 transition-all group"
                >
                  <span>{comp}</span>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCompetency(i)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 cursor-pointer p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
                      title="Hapus kompetensi ini"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 italic">Kompetensi profesional apoteker.</span>
            )}
          </div>

          {/* Form Tambah Kompetensi Baru in Edit Mode */}
          {isEditMode && (
            <form onSubmit={handleAddCompetency} className="pt-2 border-t border-slate-200 dark:border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Tambah nama kompetensi baru..."
                value={newCompetencyText}
                onChange={(e) => setNewCompetencyText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-400"
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

        {/* Footer Modal: Sisi Kiri (Tutup & Kembali) dan Sisi Kanan (Sebelumnya & Selanjutnya) */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 sm:gap-4">
          {/* Sisi Kiri: Tombol Tutup & Kembali */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] text-center shrink-0"
          >
            Tutup & Kembali
          </button>

          {/* Sisi Kanan: Navigasi Sebelumnya & Selanjutnya Berdampingan */}
          <div className="flex items-center gap-2 ml-auto">
            {prevExperience && (
              <button
                type="button"
                onClick={() => onSelectExperience(prevExperience)}
                className="pill-badge text-xs py-2 px-3 sm:px-4 hover:border-sky-400 text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
                title={`Sebelumnya: ${prevExperience.institution}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            {nextExperience && (
              <button
                type="button"
                onClick={() => onSelectExperience(nextExperience)}
                className="pill-badge text-xs py-2 px-3 sm:px-4 hover:border-sky-400 text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
                title={`Selanjutnya: ${nextExperience.institution}`}
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Lightbox Zoom Foto */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption || 'Dokumentasi'}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl border border-sky-400/40"
            />
            <div className="mt-3 text-sm font-mono text-white text-center bg-black/70 px-4 py-2 rounded-full border border-white/20">
              {photos[activePhotoIndex].caption || 'Dokumentasi Praktik Kefarmasian'}
            </div>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-sky-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
