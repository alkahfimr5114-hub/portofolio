import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCV?: () => void;
  onOpenAdminModal?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdminModal,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'tools', label: 'Tools' },
    { id: 'pkpa-works', label: 'Visual Works' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-black/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 py-3.5 shadow-md dark:shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Brand Badge with Hidden Admin Trigger on 'MR' */}
        <div className="flex items-center gap-1 sm:gap-1.5 select-none text-base sm:text-lg font-['Outfit'] font-bold tracking-tight">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <span className="text-sky-600 dark:text-sky-400 font-semibold font-mono text-sm sm:text-base">apt.</span>
            <span className="text-slate-900 dark:text-white transition-colors">Andi Al Kahfi Akihito</span>
          </button>

          {/* Pemicu Tersembunyi (Hidden Trigger) Mode Admin pada huruf "MR" */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAdminModal?.();
            }}
            className="text-slate-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-300 transition-colors cursor-pointer select-none px-0.5 focus:outline-none focus:ring-1 focus:ring-sky-400 rounded"
            title="Akses Admin"
            aria-label="Akses Admin"
          >
            MR
          </button>

          {/* Gelar S.Farm Berwarna Biru Aksen */}
          <span className="text-[11px] font-mono text-sky-700 dark:text-sky-400 font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/70 border border-sky-300 dark:border-sky-800/80 hidden sm:inline-block ml-1">
            , S.Farm
          </span>
        </div>

        {/* Centered Pill Navigation (Sesuai Referensi Gambar 1 & 2) */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`pill-nav-btn cursor-pointer ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
            title={theme === 'light' ? 'Mode Gelap' : 'Mode Cerah'}
            aria-label={theme === 'light' ? 'Mode Gelap' : 'Mode Cerah'}
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 text-sky-600 transition-transform group-hover:-rotate-12" />
                <span className="text-xs font-semibold hidden lg:inline text-slate-700">Mode Gelap</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-45" />
                <span className="text-xs font-semibold hidden lg:inline text-slate-200">Mode Cerah</span>
              </>
            )}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full border border-slate-300 dark:border-white/20 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 border-b border-slate-200 dark:border-white/15 px-6 py-6 space-y-4 shadow-2xl mt-3 backdrop-blur-md">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.id);
                }}
                className={`text-left px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'pill-badge-active text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Pilihan Tampilan:</span>
            <button
              type="button"
              onClick={() => {
                onToggleTheme();
              }}
              className="px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-slate-900 text-xs font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200"
              title={theme === 'light' ? 'Mode Gelap' : 'Mode Cerah'}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-600" />
                  <span>Beralih ke Mode Gelap</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Beralih ke Mode Cerah</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
