import React, { useState } from 'react';
import { 
  FlaskConical, 
  Laptop, 
  Award, 
  Plus, 
  X, 
  Trash2, 
  ExternalLink, 
  Upload, 
  Camera, 
  Calendar, 
  Building2,
  FileCheck,
  Loader2,
  Cloud
} from 'lucide-react';
import { SkillCategoryItem, CertificateCardItem } from '../types/pharmacy';
import { uploadImageToSupabaseStorage } from '../lib/supabase';

interface SkillsProps {
  isEditMode?: boolean;
  skillGroups: SkillCategoryItem[];
  onAddBadge: (groupId: string, badgeName: string) => void;
  onDeleteBadge: (groupId: string, index: number) => void;
  onDeleteCategory?: (groupId: string) => void;
  onAddCategory?: (title: string) => void;
  certificates: CertificateCardItem[];
  onAddCertificate: () => void;
  onUpdateCertificate: (updated: CertificateCardItem) => void;
  onDeleteCertificate: (id: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  isEditMode = false,
  skillGroups,
  onAddBadge,
  onDeleteBadge,
  onDeleteCategory,
  onAddCategory,
  certificates,
  onAddCertificate,
  onUpdateCertificate,
  onDeleteCertificate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [newBadgeText, setNewBadgeText] = useState<{ [key: string]: string }>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [uploadingCertId, setUploadingCertId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-sky-400" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-sky-400" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-sky-400" />;
    }
  };

  const handleAddBadgeSubmit = (groupId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = newBadgeText[groupId]?.trim();
    if (text) {
      onAddBadge(groupId, text);
      setNewBadgeText({ ...newBadgeText, [groupId]: '' });
    }
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim() && onAddCategory) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const handleCertificateImageUpload = async (certId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCertId(certId);

    try {
      const result = await uploadImageToSupabaseStorage(file, 'certificates');
      if (result.url) {
        const targetCert = certificates.find((c) => c.id === certId);
        if (targetCert) {
          onUpdateCertificate({ ...targetCert, imageUrl: result.url });
        }
      }
    } catch (err: any) {
      console.error('Upload certificate image error:', err);
      // Fallback to local DataURL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const targetCert = certificates.find((c) => c.id === certId);
          if (targetCert) {
            onUpdateCertificate({ ...targetCert, imageUrl: event.target.result as string });
          }
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingCertId(null);
      e.target.value = '';
    }
  };

  const showTechnical = selectedFilter === 'all' || selectedFilter === 'technical';
  const showSoftware = selectedFilter === 'all' || selectedFilter === 'software';
  const showCertificates = selectedFilter === 'all' || selectedFilter === 'certifications';

  const filterTabs = [
    { id: 'all', label: 'Semua Keahlian & Sertifikasi' },
    { id: 'technical', label: 'Teknis & Laboratorium', icon: 'FlaskConical' },
    { id: 'software', label: 'Software & Desain', icon: 'Laptop' },
    { id: 'certifications', label: `Sertifikasi (${certificates.length})`, icon: 'Award' },
  ];

  return (
    <section id="tools" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
      
      {/* Background glow bloom */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-blue-700/15 blur-[170px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-400">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
          <span>Tools, Laboratorium & Sertifikasi</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-white">
            Keahlian & Sertifikasi
          </h2>
          {isEditMode && onAddCategory && (
            <button
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>+ Tambah Kategori</span>
            </button>
          )}
        </div>

        {isEditMode && showAddCategory && (
          <form onSubmit={handleAddCategorySubmit} className="pt-2 flex flex-wrap gap-2 max-w-md">
            <input
              type="text"
              placeholder="Nama Kategori Baru..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-400 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs"
            >
              Simpan Kategori
            </button>
          </form>
        )}
      </div>

      {/* Pill Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`pill-badge text-xs sm:text-sm py-2 px-5 cursor-pointer transition-all ${
                isActive
                  ? 'pill-badge-active font-bold text-white shadow-[0_0_20px_rgba(0,112,243,0.4)]'
                  : 'text-slate-300 hover:text-white hover:border-white/40'
              }`}
            >
              {tab.icon && <span className="mr-2 inline-flex items-center">{getIcon(tab.icon)}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-12">
        
        {/* 1. BAGIAN TEKNIS & LABORATORIUM DAN SOFTWARE (Koleksi Badge Bersih tanpa Persentase/Level/Item Count) */}
        {(showTechnical || showSoftware) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {skillGroups
              .filter((g) => (showTechnical && g.id === 'technical') || (showSoftware && g.id === 'software'))
              .map((group) => (
                <div
                  key={group.id}
                  className="relative rounded-3xl glass-futuristic-card p-6 sm:p-7 border border-white/15 hover:border-sky-400/50 flex flex-col justify-between transition-all duration-300 space-y-5 shadow-xl"
                >
                  {isEditMode && onDeleteCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus kategori "${group.title}"?`)) {
                          onDeleteCategory(group.id);
                        }
                      }}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-red-600/80 hover:bg-red-500 text-white transition-all cursor-pointer"
                      title="Hapus Kategori"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="space-y-4">
                    {/* Category Header: Tanpa Indikator Jumlah Item & Tanpa Subtitle Penjelasan */}
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10 pr-8">
                      <div className="p-2.5 rounded-2xl bg-sky-950/70 border border-sky-400/40 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                        {getIcon(group.icon)}
                      </div>
                      <h3 className="text-xl font-bold font-['Outfit'] text-white">
                        {group.title}
                      </h3>
                    </div>

                    {/* Simple Collection of Badge/Tag Pills (Standar Mandiri Tanpa Persentase/Level) */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {group.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="group/badge relative pill-tag-badge text-xs sm:text-sm py-2 px-3.5 bg-slate-900/90 border-white/20 text-slate-100 hover:border-sky-400 hover:text-white transition-all shadow-sm select-none inline-flex items-center gap-1.5"
                        >
                          <span>{item.name}</span>
                          {isEditMode && (
                            <button
                              type="button"
                              onClick={() => onDeleteBadge(group.id, idx)}
                              className="text-red-400 hover:text-red-200 transition-colors cursor-pointer p-0.5 rounded"
                              title="Hapus badge"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Admin add badge form */}
                    {isEditMode && (
                      <form
                        onSubmit={(e) => handleAddBadgeSubmit(group.id, e)}
                        className="pt-3 border-t border-white/10 flex gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Nama item / instrumen baru..."
                          value={newBadgeText[group.id] || ''}
                          onChange={(e) => setNewBadgeText({ ...newBadgeText, [group.id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors cursor-pointer shrink-0"
                        >
                          + Tambah
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 2. BAGIAN SERTIFIKASI SEBAGAI SISTEM KARTU INDEPENDEN (CRUD LENGKAP & URL KUSTOM EKSTERNAL) */}
        {showCertificates && (
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sky-950/70 border border-sky-400/40 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
                    Sertifikasi & Kredensial Profesi
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Kartu sertifikasi terverifikasi dengan tautan resmi ke dokumen asli.
                  </p>
                </div>
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={onAddCertificate}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>+ Tambah Kartu Sertifikat</span>
                </button>
              )}
            </div>

            {/* Grid Kartu Sertifikasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(certificates || []).map((cert) => (
                <div
                  key={cert.id}
                  className="group relative rounded-3xl glass-futuristic-card p-6 border border-white/15 hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
                >
                  {/* Delete button in admin mode */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus sertifikat "${cert.title}"?`)) {
                          onDeleteCertificate(cert.id);
                        }
                      }}
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-red-600/90 hover:bg-red-500 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                      title="Hapus Sertifikat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="space-y-4">
                    {/* Foto / Pratinjau Sertifikat */}
                    {cert.imageUrl ? (
                      <div className="w-full h-44 rounded-2xl overflow-hidden bg-black/60 relative border border-white/10 group-hover:border-sky-400/40 transition-colors">
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
                          onError={(e) => {
                            if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop') {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop';
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        
                        {cert.certificateUrl && !isEditMode && (
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3 right-3 p-2 rounded-full bg-black/80 hover:bg-sky-500 text-white hover:text-black border border-white/20 hover:border-sky-400 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                            title="Buka Sertifikat Asli"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-2xl bg-slate-900/70 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 space-y-1">
                        <FileCheck className="w-8 h-8 text-sky-400/60" />
                        <span className="text-[11px] font-mono">Dokumen Sertifikasi Resmi</span>
                      </div>
                    )}

                    {/* Controls upload/ganti foto sertifikat dalam Mode Admin */}
                    {isEditMode && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-400/50 space-y-2 text-left">
                        <div className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>Foto Sertifikat:</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {uploadingCertId === cert.id ? (
                            <div className="py-1 px-2.5 rounded-lg bg-sky-950 border border-sky-400 text-sky-300 text-[11px] font-mono flex items-center justify-center gap-1.5">
                              <Loader2 className="w-3 h-3 animate-spin text-sky-400" />
                              <span>Mengunggah ke Cloud...</span>
                            </div>
                          ) : (
                            <label className="py-1 px-2.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer">
                              <Upload className="w-3 h-3" />
                              <span>Unggah Foto dari Perangkat</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleCertificateImageUpload(cert.id, e)}
                                className="hidden"
                              />
                            </label>
                          )}
                          <input
                            type="url"
                            placeholder="Atau input URL foto sertifikat..."
                            value={cert.imageUrl || ''}
                            onChange={(e) => onUpdateCertificate({ ...cert, imageUrl: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Informasi Sertifikat (Title, Issuer, Date, Description) */}
                    {isEditMode ? (
                      <div className="space-y-2 text-left pt-1">
                        <div>
                          <label className="text-[10px] font-mono text-amber-300 block">Nama Sertifikat:</label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => onUpdateCertificate({ ...cert, title: e.target.value })}
                            className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-mono text-amber-300 block">Penerbit / Instansi:</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => onUpdateCertificate({ ...cert, issuer: e.target.value })}
                              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-amber-300 block">Tahun / Periode:</label>
                            <input
                              type="text"
                              value={cert.date || ''}
                              onChange={(e) => onUpdateCertificate({ ...cert, date: e.target.value })}
                              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-amber-300 block">Keterangan / Deskripsi:</label>
                          <input
                            type="text"
                            value={cert.description || ''}
                            onChange={(e) => onUpdateCertificate({ ...cert, description: e.target.value })}
                            className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-amber-300 block">Tautan URL Eksternal (Sertifikat Asli):</label>
                          <input
                            type="url"
                            value={cert.certificateUrl || ''}
                            onChange={(e) => onUpdateCertificate({ ...cert, certificateUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-2.5 py-1 rounded bg-slate-900 border border-amber-400 text-xs font-mono text-sky-300"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-left">
                        <h4 className="text-base sm:text-lg font-bold font-['Outfit'] text-white group-hover:text-sky-300 transition-colors leading-snug">
                          {cert.title}
                        </h4>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                          <span className="flex items-center gap-1 text-sky-400">
                            <Building2 className="w-3.5 h-3.5" />
                            {cert.issuer}
                          </span>
                          {cert.date && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <Calendar className="w-3 h-3" />
                                {cert.date}
                              </span>
                            </>
                          )}
                        </div>

                        {cert.description && (
                          <p className="text-xs text-slate-300 leading-relaxed pt-1">
                            {cert.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tombol Tautan Eksternal ke Sertifikat Asli */}
                  <div className="pt-5 mt-4 border-t border-white/10">
                    {cert.certificateUrl ? (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group/btn relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-500 border border-white/20 hover:border-sky-400 text-slate-200 hover:text-black font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sky-400 group-hover/btn:text-black transition-colors" />
                        <span>Verifikasi & Lihat Sertifikat Asli</span>
                      </a>
                    ) : (
                      <span className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-slate-500 select-none">
                        <FileCheck className="w-3.5 h-3.5 text-slate-500" />
                        <span>Kredensial Terverifikasi</span>
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </section>
  );
};
