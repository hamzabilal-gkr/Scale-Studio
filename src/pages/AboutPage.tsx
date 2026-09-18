import React from 'react';
import { BRAND_INFO } from '../data/collectionData';
import { Camera, Film, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center border-b border-[#222532] pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
          Curator's Manifesto
        </span>
        <h1 className="mt-2 font-serif-brand text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f3f7]">
          About the Collection
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8e93a6]">
          {BRAND_INFO.name} • {BRAND_INFO.tagline}
        </p>
      </div>

      {/* Main Philosophy & Narrative */}
      <div className="mt-12 space-y-8 text-sm leading-relaxed text-[#b0b5c7]">
        <p className="text-base text-[#f2f3f7] font-light leading-relaxed">
          Welcome to <strong className="text-[#c5a059] font-semibold">{BRAND_INFO.name}</strong>, an editorial portfolio and digital museum archive dedicated to the appreciation of miniature automotive craftsmanship, high-resolution optical studio macro photography, and cinematic automotive storytelling.
        </p>

        <p>
          Every scale model—whether a hand-assembled 1:18 resin endurance homologation special, a zinc-alloy Japanese touring icon, or a classic roadster—is treated with the same reverence as a full-size concourse automobile. Through disciplined studio lighting, focus-stacked macro optics, and cinematic sound telemetry, we highlight the obsessive artistry required to capture legendary automotive design in miniature.
        </p>

        {/* Pillars / Studio Attributes */}
        <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-xl border border-[#232636] bg-[#12141c] p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#c5a059]/10 text-[#c5a059]">
              <Camera className="h-5 w-5" />
            </div>
            <h3 className="font-serif-brand text-xs font-bold uppercase tracking-wider text-[#f2f3f7]">
              Optical Macro Studio
            </h3>
            <p className="mt-2 text-xs text-[#8c91a3] leading-relaxed">
              Focus-stacked 4K photography capturing microscopic badges, cockpit dials, and engine bay plumbing.
            </p>
          </div>

          <div className="rounded-xl border border-[#232636] bg-[#12141c] p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#c5a059]/10 text-[#c5a059]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif-brand text-xs font-bold uppercase tracking-wider text-[#f2f3f7]">
              Archival Standards
            </h3>
            <p className="mt-2 text-xs text-[#8c91a3] leading-relaxed">
              Strict museum curation, verifiable manufacturer lineage, and concourse environmental preservation.
            </p>
          </div>

          <div className="rounded-xl border border-[#232636] bg-[#12141c] p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#3b82f6]/10 text-[#60a5fa]">
              <Film className="h-5 w-5" />
            </div>
            <h3 className="font-serif-brand text-xs font-bold uppercase tracking-wider text-[#f2f3f7]">
              Cinematic Motion
            </h3>
            <p className="mt-2 text-xs text-[#8c91a3] leading-relaxed">
              Dynamic turntable showcases, authentic engine audio telemetry, and precision tracking reels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
