import React from 'react';
import { PageView } from '../types';
import { BRAND_INFO } from '../data/collectionData';
import { ExternalLink, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#1f222d] bg-[#090a0d] text-[#8e93a6]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Brand Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h2 className="font-serif-brand text-xl font-bold tracking-[0.2em] text-[#f2f3f7]">
                {BRAND_INFO.name}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                {BRAND_INFO.tagline}
              </p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#9ca1b3]">
              {BRAND_INFO.description}
            </p>

            {/* Instagram Profiles */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#717688] block mb-2 font-semibold">
                Official Instagram Channels
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={BRAND_INFO.socials.instagramMain}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center space-x-1.5 rounded border border-[#232634] bg-[#12141c] px-3 py-1.5 text-xs text-[#a0a5b8] transition hover:border-[#c5a059] hover:text-[#c5a059]"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span>@{BRAND_INFO.socials.instagramMainLabel}</span>
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </a>

                <a
                  href={BRAND_INFO.socials.instagramPersonal}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center space-x-1.5 rounded border border-[#232634] bg-[#12141c] px-3 py-1.5 text-xs text-[#a0a5b8] transition hover:border-[#c5a059] hover:text-[#c5a059]"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#c5a059]" />
                  <span>@{BRAND_INFO.socials.instagramPersonalLabel}</span>
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0e3ed]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav({ name: 'HOME' })}
                  className="transition hover:text-[#f2f3f7]"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ name: 'COLLECTION' })}
                  className="transition hover:text-[#f2f3f7]"
                >
                  Vehicle Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ name: 'VIDEOS' })}
                  className="transition hover:text-[#f2f3f7]"
                >
                  Cinematic Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ name: 'ABOUT' })}
                  className="transition hover:text-[#f2f3f7]"
                >
                  About the Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Archival Standards Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0e3ed]">
              Archival Standards
            </h3>
            <p className="text-xs leading-relaxed text-[#8a8f9f]">
              Exclusively dedicated to authentic scale diecast automotive art, macro studio optical documentation, and bespoke miniature craft.
            </p>
            <div className="rounded-lg border border-[#1f222d] bg-[#0e1017] p-3 text-[11px] text-[#787d90]">
              <span className="text-[#c5a059] font-medium block mb-1">Concourse Spec</span>
              High-resolution focus-stacked macro photography and turntable motion reels.
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#181a22] pt-8 text-xs text-[#6e7384] sm:flex-row">
          <p>© {currentYear} {BRAND_INFO.name}. All miniature rights reserved.</p>
          <p className="mt-4 sm:mt-0 tracking-wider text-[11px] uppercase">
            Private Scale Automobile Museum &amp; Editorial Archive
          </p>
        </div>
      </div>
    </footer>
  );
};
