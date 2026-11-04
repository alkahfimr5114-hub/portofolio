import React, { useState } from 'react';
import { ArrowDown, Edit3, Camera, Plus, Trash2, Upload, Link as LinkIcon, Check, Play, Briefcase, Loader2, Cloud } from 'lucide-react';
import { EducationItem, PersonalInfo } from '../types/pharmacy';
import { PROFILE_PHOTO } from '../data/pharmacyData';
import { uploadImageToSupabaseStorage, compressImageWithCanvas, formatImageUrl } from '../lib/supabase';

interface HeroProps {
  onOpenCV?: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPKPA?: () => void;
  isEditMode: boolean;
  onOpenAdminModal: () => void;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  profilePhoto: string;
  onUpdateProfilePhoto: (photo: string) => void;
  educationList: EducationItem[];
  onAddEducation: () => void;
  onDeleteEducation: (id: string) => void;
  onUpdateEducation: (item: EducationItem) => void;
  hasEntered: boolean;
  onStartPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  isEditMode,
  onOpenAdminModal,
  personalInfo,
  onUpdatePersonalInfo,
  profilePhoto,
  onUpdateProfilePhoto,
  educationList,
  onAddEducation,
  onDeleteEducation,
  onUpdateEducation,
  hasEntered,
  onStartPortfolio,
}) => {
  const [showPhotoUrlInput, setShowPhotoUrlInput] = useState(false);
  const [photoUrlTemp, setPhotoUrlTemp] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadPhotoStatus, setUploadPhotoStatus] = useState<string | null>(null);

  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setUploadPhotoStatus('Mengunggah ke Supabase Storage...');

    try {
      const result = await uploadImageToSupabaseStorage(file, 'profile');
      let finalUrl = result.url ? formatImageUrl(result.url) : '';
      if (!finalUrl) {
        finalUrl = await compressImageWithCanvas(file, 900, 0.75);
      }
      if (finalUrl) {
        onUpdateProfilePhoto(finalUrl);
        setUploadPhotoStatus(result.isCloud ? 'Tersimpan di Supabase Cloud!' : 'Foto tersimpan secara lokal');
        setTimeout(() => setUploadPhotoStatus(null), 3000);
      }
    } catch (err: any) {
      console.error('Upload profile photo error:', err);
      try {
        const fallbackUrl = await compressImageWithCanvas(file, 900, 0.75);
        if (fallbackUrl) {
          onUpdateProfilePhoto(fallbackUrl);
          setUploadPhotoStatus('Tersimpan di perangkat lokal');
          setTimeout(() => setUploadPhotoStatus(null), 3000);
        }
      } catch (fallbackErr) {
        console.error('Fallback canvas error:', fallbackErr);
      }
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const handleSavePhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrlTemp.trim()) {
      onUpdateProfilePhoto(formatImageUrl(photoUrlTemp.trim()));
      setPhotoUrlTemp('');
      setShowPhotoUrlInput(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-20">
      
      {/* 1. SECTION TITIK UTAMA: GIANT 'Portfolio.' TYPOGRAPHY + TOMBOL START (FUTURISTIC LANDING/HOME SCREEN) */}
      <section 
        id="home" 
        className={`relative flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-4 pb-16 transition-all duration-700 ${
          hasEntered ? 'min-h-[65vh]' : 'min-h-[85vh] sm:min-h-[88vh]'
        }`}
      >
        
        {/* Luminous Electric Blue Volumetric Orbs Behind Typography */}
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-blue-600/30 blur-[170px] rounded-full pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-sky-500/25 blur-[160px] rounded-full pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-blue-700/30 blur-[160px] rounded-full pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Giant Typographic Block */}
        <div className="relative inline-block select-none my-8 sm:my-14">
          
          {/* Floating Pill Badge: [Pharmacist] (Top Left of Portfolio) */}
          <div className="absolute -top-5 sm:-top-7 left-2 sm:left-4 z-20">
            {isEditMode ? (
              <input
                type="text"
                value={personalInfo.displayBadge || 'Pharmacist'}
                onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, displayBadge: e.target.value })}
                className="pill-tag-badge text-xs sm:text-sm font-semibold tracking-wide bg-slate-900 border border-amber-400 text-amber-200 px-2 py-0.5 rounded-full"
                title="Edit Label Badge Atas"
              />
            ) : (
              <span className="pill-tag-badge text-xs sm:text-sm font-semibold tracking-wide">
                {personalInfo.displayBadge || 'Pharmacist'}
              </span>
            )}
          </div>

          {/* Giant Typography: "Port" (Clean Sans) + "folio." (Electric Blue Italic Serif Gradient) */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] xl:text-[13.5rem] font-bold tracking-tight leading-none flex items-baseline justify-center">
            <span className="text-slate-900 dark:text-white font-['Outfit'] font-black transition-colors">
              Port
            </span>
            <span className="text-folio-italic pl-1">
              folio
              <span className="text-sky-500 dark:text-sky-400 not-italic font-['Outfit'] select-none">
                .
              </span>
            </span>
          </h1>

          {/* Floating Pill Badge: [2026] (Bottom Right beside cyan period dot) */}
          <div className="absolute -bottom-3 sm:-bottom-5 right-2 sm:right-6 z-20">
            {isEditMode ? (
              <input
                type="text"
                value={personalInfo.yearBadge || '2026'}
                onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, yearBadge: e.target.value })}
                className="pill-tag-badge text-xs sm:text-sm font-mono font-bold tracking-wider bg-slate-900 border border-amber-400 text-amber-200 px-2 py-0.5 rounded-full w-20 text-center"
                title="Edit Tahun Badge"
              />
            ) : (
              <span className="pill-tag-badge text-xs sm:text-sm font-mono font-bold tracking-wider">
                {personalInfo.yearBadge || '2026'}
              </span>
            )}
          </div>

        </div>

        {/* Subtitle tag (Bersih tanpa Regulatory Affairs atau Sistem Mutu) */}
        {isEditMode ? (
          <div className="w-full max-w-xl mx-auto mt-1 px-4">
            <label className="text-[11px] font-mono text-amber-500 dark:text-amber-300 block mb-1">Edit Subtitle:</label>
            <input
              type="text"
              value={personalInfo.specialization}
              onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, specialization: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-400 text-xs sm:text-sm font-mono text-center text-sky-300 focus:outline-none"
            />
          </div>
        ) : (
          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 tracking-[0.2em] uppercase max-w-xl mx-auto mt-1 transition-colors">
            {personalInfo.specialization}
          </p>
        )}

        {/* Tombol Utama START / Masuk Portofolio (Futuristic Call-to-Action) */}
        <div className="mt-9 sm:mt-12 flex flex-col items-center gap-3.5 z-20">
          <button
            type="button"
            onClick={onStartPortfolio}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 text-black font-extrabold text-sm sm:text-base tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(0,180,255,0.7)] hover:shadow-[0_0_60px_rgba(0,212,255,0.95)]"
          >
            <span className="relative z-10 flex items-center gap-2.5 font-['Outfit']">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-black group-hover:scale-110 transition-transform" />
              <span>{hasEntered ? 'Lanjutkan ke Profil' : 'START · Masuk Portofolio'}</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-y-1 transition-transform" />
            </span>
            {/* Ambient Glow Aura */}
            <span className="absolute -inset-1 rounded-full bg-cyan-400/50 blur-md group-hover:blur-lg transition-all -z-10 animate-pulse" />
          </button>

          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wide transition-colors">
            {hasEntered
              ? 'Portofolio aktif · Klik untuk melompat ke profil'
              : 'Klik tombol di atas untuk membuka seluruh halaman portofolio'}
          </p>
        </div>

        {/* Angular Architectural Glass Frame Line at bottom */}
        <div className="w-full max-w-5xl mx-auto mt-14 sm:mt-16 border-t border-sky-500/35 relative">
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-56 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00d4ff]" />
        </div>

      </section>

      {/* 2. SECTION PERKENALAN: "Hello I'm Andi Al Kahfi" (Hanya dirender saat hasEntered aktif atau dalam Mode Admin) */}
      {(hasEntered || isEditMode) && (
        <section id="profile" className="relative pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
          
          {/* Edit mode active banner */}
          {isEditMode && (
            <div className="mb-8 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-mono flex flex-wrap items-center justify-between gap-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-300 shrink-0" />
                <span><strong>Mode Admin Universal Aktif (PIN 261026)</strong>: Seluruh teks, pendidikan, foto profil, dan pengalaman dapat diedit & disimpan otomatis.</span>
              </div>
              <button
                onClick={onOpenAdminModal}
                className="px-3.5 py-1 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors cursor-pointer text-xs"
              >
                Kelola Admin
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* SISI KIRI: Sapaan "Hello I'm Andi Al Kahfi" */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              
              {/* Sapaan Raksasa: "Hello I'm Andi Al Kahfi" */}
              <div className="space-y-1 w-full">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-['Outfit'] tracking-tight text-slate-900 dark:text-white leading-[1.08] transition-colors">
                  Hello<br />
                  {isEditMode ? (
                    <div className="space-y-1 mt-1">
                      <label className="text-[11px] font-mono text-amber-500 dark:text-amber-300 block font-normal">Edit Sapaan Perkenalan:</label>
                      <input
                        type="text"
                        value={personalInfo.shortGreeting}
                        onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, shortGreeting: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-slate-900 dark:text-white text-2xl sm:text-4xl font-bold focus:outline-none"
                      />
                    </div>
                  ) : (
                    <span>
                      <span className="text-slate-900 dark:text-white transition-colors">I'm </span>
                      <span className="text-sky-600 dark:text-sky-400 font-mono font-medium text-3xl sm:text-4xl lg:text-5xl mr-1.5">apt.</span>
                      <span className="text-slate-900 dark:text-white transition-colors">Andi Al Kahfi Akihito MR</span>
                      <span className="text-sky-600 dark:text-sky-400 font-mono font-medium text-2xl sm:text-3xl lg:text-4xl ml-1.5">, S.Farm</span>
                    </span>
                  )}
                </h2>
              </div>

              {/* Paragraf Pengenalan */}
              {isEditMode ? (
                <div className="w-full space-y-1">
                  <label className="text-[11px] font-mono text-amber-500 dark:text-amber-300 block">Edit Ringkasan Profil:</label>
                  <textarea
                    rows={5}
                    value={personalInfo.summary}
                    onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, summary: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-amber-400 text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-sans focus:outline-none"
                  />
                </div>
              ) : (
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl transition-colors">
                  {personalInfo.summary}
                </p>
              )}

              {/* Bagian Items dengan Pill Badge & Italic Subtitle */}
              <div className="w-full space-y-4 pt-2">
                
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white transition-colors">
                      Pendidikan & Kualifikasi :
                    </h3>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={onAddEducation}
                        className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Tambah Pendidikan</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Education List */}
                <div className="space-y-4">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="relative p-3 rounded-2xl glass-futuristic-card border border-white/10 group space-y-2 text-left">
                      {/* Delete button in admin mode */}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus data pendidikan "${edu.institution}"?`)) {
                              onDeleteEducation(edu.id);
                            }
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600/80 hover:bg-red-500 text-white transition-all cursor-pointer"
                          title="Hapus Pendidikan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {isEditMode ? (
                        <div className="space-y-2 pr-8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-mono text-amber-300 block">Institusi:</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => onUpdateEducation({ ...edu, institution: e.target.value })}
                                className="w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono text-amber-300 block">Gelar / Periode:</label>
                              <input
                                type="text"
                                value={`${edu.degree} · ${edu.period}`}
                                onChange={(e) => {
                                  const parts = e.target.value.split('·');
                                  onUpdateEducation({ 
                                    ...edu, 
                                    degree: parts[0]?.trim() || edu.degree,
                                    period: parts[1]?.trim() || edu.period 
                                  });
                                }}
                                className="w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-amber-300 block">Fokus / Rincian:</label>
                            <input
                              type="text"
                              value={edu.focus}
                              onChange={(e) => onUpdateEducation({ ...edu, focus: e.target.value })}
                              className="w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="pill-tag-badge text-xs font-semibold">
                              {edu.institution}
                            </span>
                            <span className="text-xs sm:text-sm font-['Playfair_Display'] italic text-slate-600 dark:text-slate-300 transition-colors">
                              {edu.degree} · {edu.period}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1 transition-colors">
                            {edu.focus} {edu.gpa ? `(IPK ${edu.gpa} / ${edu.scale})` : ''}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Interactive Button: Lihat Pengalaman PKPA */}
              <div className="pt-6 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('pkpa-works')}
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(56,189,248,0.55)] hover:shadow-[0_0_45px_rgba(56,189,248,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-sky-300/60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Lihat Pengalaman PKPA</span>
                    <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                  {/* Subtle sheen highlight animation on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </button>
              </div>

            </div>

            {/* SISI KANAN: BINGKAI LENGKUNG (ARCH FRAME) IDENTIK DENGAN GAMBAR REFERENSI */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
                
                {/* Luminous Electric Blue Volumetric Ribbon Glow Behind Arch */}
                <div 
                  className="absolute -right-12 sm:-right-20 top-1/4 w-[340px] sm:w-[420px] h-[480px] sm:h-[550px] bg-gradient-to-tr from-blue-700/60 via-sky-500/50 to-blue-500/30 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none -z-10" 
                  aria-hidden="true" 
                />
                <div 
                  className="absolute -bottom-8 left-0 w-[260px] h-[260px] bg-sky-500/30 blur-[80px] rounded-full pointer-events-none -z-10" 
                  aria-hidden="true" 
                />

                {/* Arch Frame (Lengkung Kubah Atas, Tanpa Border Kasar, Background Biru Pekat Sesuai Referensi) */}
                <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/4.1] rounded-t-full overflow-hidden bg-gradient-to-b from-[#0a2f7c] via-[#041a4a] to-[#01091b] shadow-[0_25px_60px_rgba(0,40,130,0.5)] group">
                  
                  {/* Subtle Rim Light on Top Arch Curve */}
                  <div 
                    className="absolute inset-0 rounded-t-full pointer-events-none z-10"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(186, 230, 253, 0.45), inset 0 0 35px rgba(0, 112, 243, 0.3)'
                    }}
                  />

                  {/* Portrait Photo */}
                  <img
                    src={profilePhoto || PROFILE_PHOTO}
                    alt="Foto Profil apt. Andi Al Kahfi Akihito MR, S.Farm"
                    onError={(e) => {
                      if (e.currentTarget.src !== PROFILE_PHOTO) {
                        e.currentTarget.src = PROFILE_PHOTO;
                      }
                    }}
                    className="w-full h-full object-cover object-[center_12%] sm:object-[center_10%] filter contrast-[1.06] brightness-[1.02] transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Studio Blue Mood Shading & Seamless Fade at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-85 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent dark:from-black dark:via-black/80 pointer-events-none transition-colors duration-300" />

                  {/* Photo Change Controls in Admin Mode */}
                  {isEditMode && (
                    <div className="absolute inset-0 z-30 bg-black/65 backdrop-blur-xs flex flex-col items-center justify-center p-4 gap-2.5 transition-opacity">
                      <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 bg-black/85 px-3 py-1 rounded-full border border-amber-500/50">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Ganti Foto Profil</span>
                      </div>

                      <div className="flex flex-col gap-2 w-full max-w-[200px]">
                        {isUploadingPhoto ? (
                          <div className="w-full py-2 px-3 rounded-full bg-sky-950 border border-sky-400 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                            <span>Mengunggah...</span>
                          </div>
                        ) : (
                          <label className="w-full py-2 px-3 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Pilih Foto dari Perangkat</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoFileUpload}
                              className="hidden"
                            />
                          </label>
                        )}

                        <button
                          type="button"
                          onClick={() => setShowPhotoUrlInput(!showPhotoUrlInput)}
                          className="w-full py-1.5 px-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-white font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <LinkIcon className="w-3 h-3" />
                          <span>Gunakan URL Foto</span>
                        </button>

                        {uploadPhotoStatus && (
                          <div className="text-[10px] font-mono text-center text-sky-300 bg-sky-950/90 border border-sky-500/50 px-2 py-1 rounded-full flex items-center justify-center gap-1">
                            <Cloud className="w-3 h-3 text-sky-400" />
                            <span>{uploadPhotoStatus}</span>
                          </div>
                        )}
                      </div>

                      {showPhotoUrlInput && (
                        <form onSubmit={handleSavePhotoUrl} className="w-full max-w-[220px] space-y-1.5 mt-1">
                          <input
                            type="url"
                            placeholder="https://.../foto.jpg"
                            value={photoUrlTemp}
                            onChange={(e) => setPhotoUrlTemp(e.target.value)}
                            className="w-full px-2.5 py-1 text-xs rounded-lg bg-black border border-amber-400 text-white focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="w-full py-1 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Simpan URL</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Teks Nama di Pojok Kanan Bawah */}
                  <div className="absolute bottom-5 right-4 sm:right-6 z-20 text-right select-none pointer-events-auto">
                    {isEditMode ? (
                      <div className="bg-slate-950/95 p-2.5 rounded-xl border border-amber-400/80 space-y-1.5 text-left shadow-2xl backdrop-blur-md">
                        <label className="text-[10px] font-mono text-amber-300 block font-semibold">Edit Nama & Gelar:</label>
                        <input
                          type="text"
                          value={personalInfo.name}
                          onChange={(e) => onUpdatePersonalInfo({ ...personalInfo, name: e.target.value })}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white w-48"
                        />
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <div className="text-xl sm:text-2xl lg:text-[1.85rem] font-bold font-['Outfit'] drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] leading-[1.15] tracking-tight">
                          <span className="text-sky-400 font-mono font-semibold text-lg sm:text-xl lg:text-2xl mr-1.5">apt.</span>
                          <span className="text-white">Andi</span><br />
                          <span className="text-white">Al Kahfi Akihito MR</span>
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-sky-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wider">
                          , S.Farm
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

          </div>

        </section>
      )}

    </div>
  );
};
