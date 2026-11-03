import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, BarChart3 } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#071324]/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-silver-card border border-slate-500/30 p-6 sm:p-8 bg-[#0a192f]/95 shadow-2xl z-10 text-left">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-700/60">
          <div>
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span className="text-[#FAF7EE] font-semibold">{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Klien: {project.client}</span>
              <span aria-hidden="true">·</span>
              <span>Tahun {project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela modal"
            className="p-2 rounded-lg border border-slate-700/60 hover:border-slate-400 text-slate-300 hover:text-white bg-slate-800/40 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image in Modal */}
        <div className="mt-6 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 aspect-video max-h-80 w-full relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-left">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mb-1">
                <BarChart3 className="w-3.5 h-3.5 text-[#FAF7EE]" />
                <span>{m.label}</span>
              </div>
              <div className="text-xl font-bold font-mono text-white tabular-nums">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Full Overview */}
        <div className="mt-6 space-y-4">
          <h4 className="text-base font-semibold text-[#FAF7EE] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FAF7EE]" />
            <span>Ikhtisar & Nilai Bisnis</span>
          </h4>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Key Features */}
        <div className="mt-6 space-y-3">
          <h4 className="text-base font-semibold text-[#FAF7EE] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FAF7EE]" />
            <span>Fitur Utama & Implementasi</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7EE] mt-2 shrink-0" aria-hidden="true" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Tech Stack */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 space-y-3">
          <h4 className="text-sm font-semibold text-[#FAF7EE] flex items-center gap-2 font-mono">
            <Cpu className="w-4 h-4 text-[#FAF7EE]" />
            <span>Arsitektur & Tech Stack</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            {project.architectureNotes}
          </p>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Studi Kasus Lengkap Terverifikasi
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-600 hover:border-slate-400 bg-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Repositori</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-ivory text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Kunjungi Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
