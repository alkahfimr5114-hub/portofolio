import React, { useState } from 'react';
import { 
  ArrowUpRight, Github, ExternalLink, Eye, Sparkles, Plus, 
  Trash2, Edit3, X, Upload, Camera, Loader2 
} from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { uploadImageToSupabaseStorage, compressImageWithCanvas } from '../lib/supabase';

interface PortfolioProps {
  projects?: Project[];
  isEditMode?: boolean;
  onAddProject?: () => void;
  onUpdateProject?: (updated: Project) => void;
  onDeleteProject?: (id: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  projects = PROJECTS_DATA,
  isEditMode = false,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: `Semua Karya (${(projects || []).length})` },
    { id: 'webapp', label: 'Web App & SaaS' },
    { id: 'mobile', label: 'Mobile Experience' },
    { id: 'design', label: 'Creative Platform' },
    { id: 'ai', label: 'AI & Cloud Tool' },
  ];

  const currentProjects = projects || [];
  const filteredProjects = selectedCategory === 'all'
    ? currentProjects
    : currentProjects.filter((p) => p.category === selectedCategory);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setIsUploadingImage(true);
    try {
      const result = await uploadImageToSupabaseStorage(file, 'projects');
      let finalUrl = result.url;
      if (!finalUrl) {
        finalUrl = await compressImageWithCanvas(file, 800, 0.7);
      }
      if (finalUrl) {
        setEditingProject({ ...editingProject, image: finalUrl });
      }
    } catch (err) {
      console.error('Upload project image error:', err);
      try {
        const fallbackUrl = await compressImageWithCanvas(file, 800, 0.7);
        if (fallbackUrl) {
          setEditingProject({ ...editingProject, image: fallbackUrl });
        }
      } catch (canvasErr) {
        console.error('Canvas error:', canvasErr);
      }
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject && onUpdateProject) {
      onUpdateProject(editingProject);
      setEditingProject(null);
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#00d4ff]" />
              <span>Portofolio Unggulan</span>
              <span aria-hidden="true">·</span>
              <span>Karya Rekayasa Terpilih</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-white">
                Studi Kasus & Produk Digital
              </h2>
              {isEditMode && onAddProject && (
                <button
                  type="button"
                  onClick={onAddProject}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Studi Kasus</span>
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Setiap proyek dibangun dengan arsitektur bersih, performa terukur, dan pengalaman interaksi yang halus.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-sky-500 text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-silver-card rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer transform hover:-translate-y-2.5 transition-all duration-300 relative border border-white/10 hover:border-sky-400/50"
              onClick={() => setActiveProject(project)}
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-700/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop') {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop';
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Admin action buttons on project card */}
                  {isEditMode && (
                    <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...project })}
                        className="p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:scale-110 transition-all cursor-pointer"
                        title="Edit Proyek Ini"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {onDeleteProject && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus studi kasus "${project.title}"?`)) {
                              onDeleteProject(project.id);
                            }
                          }}
                          className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg hover:scale-110 transition-all cursor-pointer"
                          title="Hapus Proyek Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Quick Action Preview Floating Pill */}
                  {!isEditMode && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f]/90 border border-slate-600 text-xs font-mono text-sky-200 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Tinjau Detail</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-3.5">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-sky-300 font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Project Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(project.tags || []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {(project.tags || []).length > 4 && (
                      <span className="text-xs font-mono text-slate-400 self-center">
                        +{(project.tags || []).length - 4} lainnya
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:underline cursor-pointer"
                >
                  <span>Eksplorasi Studi Kasus</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Admin Edit Modal for Projects */}
      {editingProject && (
        <div className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-5 text-left max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-sm">
                <Edit3 className="w-4 h-4" />
                <span>Edit Studi Kasus & Proyek</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono text-amber-300 block mb-1">Judul Proyek:</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-amber-300 block mb-1">Kategori:</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => {
                      const cat = e.target.value as Project['category'];
                      const labels: Record<string, string> = {
                        webapp: 'Web App & SaaS',
                        mobile: 'Mobile Experience',
                        design: 'Creative Platform',
                        ai: 'AI & Cloud Tool',
                      };
                      setEditingProject({
                        ...editingProject,
                        category: cat,
                        categoryLabel: labels[cat] || 'Project',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="webapp">Web App & SaaS</option>
                    <option value="mobile">Mobile Experience</option>
                    <option value="design">Creative Platform</option>
                    <option value="ai">AI & Cloud Tool</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-amber-300 block mb-1">Klien / Lembaga:</label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-amber-300 block mb-1">Tahun:</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-amber-300 block mb-1">Ringkasan Proyek:</label>
                <textarea
                  rows={3}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white leading-relaxed focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-amber-300 block mb-1">Demo URL:</label>
                  <input
                    type="url"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-amber-300 block mb-1">GitHub URL:</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Image Controls: Upload from device or input URL */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <label className="text-[11px] font-mono text-amber-300 block">Foto Sampul / Gambar Proyek:</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/20 shrink-0">
                    <img
                      src={editingProject.image}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    {isUploadingImage ? (
                      <div className="py-2 px-3 rounded-xl bg-sky-950 border border-sky-400 text-sky-300 flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                        <span>Mengunggah foto...</span>
                      </div>
                    ) : (
                      <label className="w-full py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Pilih Foto dari Perangkat</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                    <input
                      type="url"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="Atau masukkan tautan URL gambar..."
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold cursor-pointer shadow-lg"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
