import React, { useState } from 'react';
import { PageView } from '../types';
import { BRAND_INFO } from '../data/collectionData';
import { Menu, X, Search, ChevronRight, Instagram } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'HOME', page: { name: 'HOME' } },
    { label: 'COLLECTION', page: { name: 'COLLECTION' } },
    { label: 'VIDEOS', page: { name: 'VIDEOS' } },
    { label: 'ABOUT', page: { name: 'ABOUT' } },
  ];

  const isActive = (itemPage: PageView) => {
    if (currentPage.name === itemPage.name) return true;
    if (currentPage.name === 'VEHICLE_DETAIL' && itemPage.name === 'COLLECTION') return true;
    return false;
  };

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222530] bg-[#0d0e12]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark Logo */}
        <button
          id="navbar-brand-logo"
          onClick={() => handleNavClick({ name: 'HOME' })}
          className="group flex flex-col text-left focus:outline-none max-w-[calc(100vw-80px)] md:max-w-none mr-2 lg:mr-4"
        >
          <span className="font-serif-brand text-sm sm:text-lg lg:text-xl font-bold tracking-[0.08em] sm:tracking-[0.15em] text-[#f2f3f7] group-hover:text-[#c5a059] transition-colors truncate">
            SCALESTUDIO<span className="text-[#c5a059]">.</span>MODELS
          </span>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.08em] sm:tracking-[0.2em] text-[#8e93a6] truncate max-w-full">
            {BRAND_INFO.tagline}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navItems.map((item) => {
            const active = isActive(item.page);
            return (
              <button
                key={item.label}
                id={`nav-${item.label.toLowerCase()}`}
                onClick={() => handleNavClick(item.page)}
                className={`relative px-3.5 lg:px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                  active
                    ? 'text-[#f2f3f7]'
                    : 'text-[#969ba8] hover:text-[#f2f3f7]'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#c5a059]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-2 ml-1">
          <button
            id="nav-quick-search-btn"
            onClick={() => handleNavClick({ name: 'COLLECTION' })}
            className="flex items-center space-x-1.5 rounded-full border border-[#222530] bg-[#161822] px-3 py-1.5 text-xs text-[#969ba8] hover:border-[#c5a059]/40 hover:text-[#f2f3f7] transition"
            aria-label="Search collection"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="uppercase text-[10px] tracking-wider">Search</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-[#969ba8] hover:bg-white/5 hover:text-[#f2f3f7] focus:outline-none transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-20 z-30 bg-black/60 backdrop-blur-xs md:hidden animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Compact Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="relative z-40 border-b border-[#222530] bg-[#0d0f15]/98 backdrop-blur-xl px-4 py-3 md:hidden shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.page);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                      : 'text-[#9aa0b3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c5a059]" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-[#4a5068]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 border-t border-[#1e212d] pt-2.5 flex items-center justify-between">
            <button
              onClick={() => handleNavClick({ name: 'COLLECTION' })}
              className="flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-[11px] text-[#8e93a6] hover:text-[#c5a059] hover:bg-white/5 transition"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search Catalog</span>
            </button>

            <div className="flex items-center space-x-2">
              <a
                href={BRAND_INFO.socials.instagramMain}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 rounded px-2 py-0.5 text-[10px] text-[#c5a059] hover:bg-[#c5a059]/10 transition"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-3 w-3" />
                <span>@{BRAND_INFO.socials.instagramMainLabel}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
