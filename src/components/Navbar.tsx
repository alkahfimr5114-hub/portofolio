import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCV?: () => void;
  onOpenAdminModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdminModal,
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
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
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
            <span className="text-sky-400 font-semibold font-mono text-sm sm:text-base">apt.</span>
            <span className="text-white">Andi Al Kahfi Akihito</span>
          </button>

          {/* Pemicu Tersembunyi (Hidden Trigger) Mode Admin pada huruf "MR" */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAdminModal?.();
            }}
            className="text-white hover:text-amber-300 transition-colors cursor-pointer select-none px-0.5 focus:outline-none focus:ring-1 focus:ring-sky-400 rounded"
            title="Akses Admin"
            aria-label="Akses Admin"
          >
            MR
          </button>

          {/* Gelar S.Farm Berwarna Biru Aksen */}
          <span className="text-[11px] font-mono text-sky-400 font-semibold px-2.5 py-0.5 rounded-full bg-sky-950/70 border border-sky-800/80 hidden sm:inline-block ml-1">
            , S.Farm
          </span>
        </div>

        {/* Centered Pill Navigation (Sesuai Referensi Gambar 1 & 2) */}
        <nav className="hidden md:flex items-center gap-3">
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

        {/* Right Actions: Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full border border-white/20 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/15 px-6 py-6 space-y-4 shadow-2xl mt-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.id);
                }}
                className={`text-left px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'pill-badge-active text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
