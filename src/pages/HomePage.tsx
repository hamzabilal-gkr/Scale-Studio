import React from 'react';
import { PageView, VideoItem } from '../types';
import { vehicles, videos } from '../data/collectionData';
import { VehicleCard } from '../components/VehicleCard';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectVehicle: (vehicleId: string) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectVehicle,
  onPlayVideo,
}) => {
  // Featured vehicles (up to 3)
  const featuredVehicles = vehicles.filter((v) => v.featured).slice(0, 3);
  // Latest 3 videos
  const latestVideos = videos.slice(0, 3);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[calc(100vh-5rem)] sm:min-h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-[#1f222d] bg-[#0c0d12]">
        {/* Cinematic Backdrop Image with Vignette & Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl(vehicles[0]?.coverImage)}
            alt="Hero Diecast Silhouette"
            className="h-full w-full object-cover object-center brightness-[0.42] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-[#0e1015]/40 to-black/70" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0e1015]/50 to-[#0e1015]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:py-16 md:py-20 text-center sm:px-6 lg:px-8 w-full">
          {/* Subtle Brand Tagline Eyebrow */}
          <div className="inline-flex max-w-[95%] items-center justify-center space-x-2 rounded-full border border-[#c5a059]/30 bg-[#161822]/85 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5a059]" />
            <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.25em] text-[#c5a059] text-center">
              PROF.HAMZABILAL
            </span>
          </div>

          {/* Main Brand Title */}
          <h1 className="mt-4 sm:mt-6 font-serif-brand text-[1.65rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.05em] sm:tracking-[0.18em] text-[#f4f5f8] uppercase drop-shadow-lg leading-tight">
            SCALESTUDIO<span className="text-[#c5a059]">.</span>MODELS
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 sm:mt-5 max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-[#b4b9cc] font-light px-2">
            A curated collection of miniature automotive craftsmanship, photography and cinematic storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            <button
              id="hero-explore-collection-btn"
              onClick={() => onNavigate({ name: 'COLLECTION' })}
              className="group flex w-full sm:w-auto items-center justify-center space-x-2 rounded bg-[#c5a059] px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#dfba6a] hover:shadow-lg hover:shadow-[#c5a059]/20 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-watch-reels-btn"
              onClick={() => onNavigate({ name: 'VIDEOS' })}
              className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded border border-[#2b2f3d] bg-[#12141c]/90 px-6 py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#e2e5f0] backdrop-blur-md transition hover:border-[#c5a059] hover:text-[#f4f5f8] cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 text-[#c5a059] fill-[#c5a059]" />
              <span>Watch Cinematic Videos</span>
            </button>
          </div>

          {/* Editorial Specs Bar */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8 text-center text-xs w-full max-w-2xl mx-auto">
            <div className="p-1">
              <span className="block font-serif-brand text-base sm:text-lg font-bold text-[#f2f3f7]">Up to 1:18</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e93a6]">Precision Scales</span>
            </div>
            <div className="p-1">
              <span className="block font-serif-brand text-base sm:text-lg font-bold text-[#f2f3f7]">{vehicles.length}+ Models</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e93a6]">Archived Vehicles</span>
            </div>
            <div className="p-1">
              <span className="block font-serif-brand text-base sm:text-lg font-bold text-[#f2f3f7]">Macro 4K</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e93a6]">Optical Photography</span>
            </div>
            <div className="p-1">
              <span className="block font-serif-brand text-base sm:text-lg font-bold text-[#f2f3f7]">Concourse</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e93a6]">Archival Spec</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED VEHICLES */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-[#1f222d]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              Editorial Highlight
            </span>
            <h2 className="mt-1 font-serif-brand text-2xl sm:text-3xl font-bold text-[#f2f3f7]">
              Featured Masterpieces
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'COLLECTION' })}
            className="mt-4 sm:mt-0 flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfba6a] transition cursor-pointer"
          >
            <span>View All Vehicles</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Featured Showcase Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
              onPlayVideo={onPlayVideo}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LATEST VIDEOS */}
      {/* ========================================================================= */}
      <section className="border-y border-[#1f222d] bg-[#0b0c10] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-[#1f222d]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                Motion &amp; Sound
              </span>
              <h2 className="mt-1 font-serif-brand text-2xl sm:text-3xl font-bold text-[#f2f3f7]">
                Latest Videos
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ name: 'VIDEOS' })}
              className="mt-4 sm:mt-0 flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfba6a] transition cursor-pointer"
            >
              <span>View All Videos</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* 3 Cinematic 9:16 Video Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {latestVideos.map((video) => (
              <div
                key={video.id}
                id={`home-video-${video.id}`}
                onClick={() => onPlayVideo(video)}
                className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-[#222532] bg-[#12141c] transition duration-300 hover:border-[#c5a059]/60 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#090a0e]">
                  <img
                    src={getAssetUrl(video.thumbnail)}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:via-black/10 transition-colors" />

                  {/* Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0d0e12]/80 text-[#c5a059] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#c5a059] group-hover:text-black shadow-lg">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {video.duration && (
                    <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono text-[#f2f3f7] backdrop-blur-sm">
                      {video.duration}
                    </div>
                  )}

                  <div className="absolute top-3 left-3 rounded bg-[#0d0e12]/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/30 backdrop-blur-sm font-medium">
                    {video.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="text-[10px] text-[#8c91a3] uppercase tracking-wider">
                      {video.vehicle}
                    </span>
                    <h3 className="mt-1 font-serif-brand text-sm font-bold text-[#f2f3f7] group-hover:text-[#c5a059] transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#1f222d] pt-2 text-[11px] text-[#c5a059]">
                    <span className="uppercase tracking-wider font-semibold text-[10px]">Play Video</span>
                    <Play className="h-3 w-3 fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
