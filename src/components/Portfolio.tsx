import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'webapp', label: 'Web App & SaaS' },
    { id: 'mobile', label: 'Mobile Experience' },
    { id: 'design', label: 'Creative Platform' },
    { id: 'ai', label: 'AI & Cloud Tool' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
              <span className="text-[#FAF7EE]">02.</span>
              <span>Portofolio Unggulan</span>
              <span aria-hidden="true">·</span>
              <span>Karya Rekayasa Terpilih</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-white dark:text-white">
              Studi Kasus & Produk Digital
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Setiap proyek dibangun dengan arsitektur bersih, performa terukur, dan pengalaman interaksi yang halus.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional button tabs) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'btn-ivory font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Smooth Lift on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-silver-card rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer transform hover:-translate-y-2.5 transition-all duration-300"
              onClick={() => setActiveProject(project)}
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-700/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Quick Action Preview Floating Pill */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f]/90 border border-slate-600 text-xs font-mono text-[#FAF7EE] shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tinjau Detail</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-3.5">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-[#FAF7EE] font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white group-hover:text-[#FAF7EE] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Project Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs font-mono text-slate-400 self-center">
                        +{project.tags.length - 4} lainnya
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
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FAF7EE] hover:underline cursor-pointer"
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

      {/* Lightbox / Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
