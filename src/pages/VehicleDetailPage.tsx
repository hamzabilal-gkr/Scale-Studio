import React, { useState } from 'react';
import { VideoItem, PhotoItem, PageView } from '../types';
import { vehicles } from '../data/collectionData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { Vehicle360Viewer } from '../components/Vehicle360Viewer';
import {
  ArrowLeft,
  Play,
  Maximize2,
  Share2,
  Camera,
  RotateCw,
  Info
} from 'lucide-react';
import { getAssetUrl } from '../utils';

interface VehicleDetailPageProps {
  vehicleId: string;
  onBack: () => void;
  onNavigate: (page: PageView) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicleId,
  onBack,
  onNavigate,
  onPlayVideo,
}) => {
  const vehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

  // Selected photograph in hero gallery
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  // View mode switcher: Gallery Photos vs 360 Interactive Turntable
  const [viewMode, setViewMode] = useState<'PHOTO' | '360'>('PHOTO');
  const is360Available = Boolean(vehicle.spin360);
  const effectiveViewMode = is360Available ? viewMode : 'PHOTO';

  // Convert vehicle.images into PhotoItems for lightbox compatibility
  const vehiclePhotoItems: PhotoItem[] = (vehicle.images || [vehicle.coverImage]).map(
    (imgUrl, idx) => ({
      id: `${vehicle.id}-photo-${idx}`,
      title: `${vehicle.name} — Angle ${idx + 1}`,
      vehicle: vehicle.name,
      image: imgUrl,
      category: 'Studio Macro',
      caption: `Archival study angle ${idx + 1} of ${vehicle.name} in ${vehicle.scale} scale.`,
      cameraInfo: 'Studio Macro Optical Capture | 4K Concourse Spec'
    })
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation & Breadcrumbs Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#222532] pb-4">
        <Breadcrumbs
          items={[
            { label: 'Collection', page: { name: 'COLLECTION' } },
            { label: vehicle.name },
          ]}
          onNavigate={onNavigate}
        />

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* 360° View Quick Action Button */}
          {is360Available && (
            <button
              id="top-360-btn"
              onClick={() => setViewMode(effectiveViewMode === '360' ? 'PHOTO' : '360')}
              className={`flex items-center space-x-1.5 rounded border px-2.5 py-1.5 sm:px-3 text-xs font-semibold transition ${
                effectiveViewMode === '360'
                  ? 'border-[#c5a059] bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/20'
                  : 'border-[#c5a059]/50 bg-[#151722] text-[#c5a059] hover:bg-[#c5a059]/15'
              }`}
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>{effectiveViewMode === '360' ? 'Photos' : '360° View'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 rounded border border-[#262936] bg-[#14161f] px-2.5 py-1.5 sm:px-3 text-xs text-[#9aa0b3] hover:text-white transition"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            id="back-to-collection-btn"
            onClick={onBack}
            className="flex items-center space-x-1.5 rounded border border-[#c5a059]/40 bg-[#151722] px-3 py-1.5 sm:px-3.5 text-xs font-semibold text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Vehicle Editorial Header */}
      <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12 mb-16">
        {/* Left Column: Gallery, 360 Turntable & Hero Photograph */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222532] pb-3">
            <div className="inline-flex rounded-lg border border-[#262a38] bg-[#0c0d12] p-1 shadow-inner">
              <button
                id="view-mode-photo-tab"
                onClick={() => setViewMode('PHOTO')}
                className={`flex items-center space-x-1.5 sm:space-x-2 rounded-md px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold transition ${
                  effectiveViewMode === 'PHOTO'
                    ? 'bg-[#1b1e2a] text-white shadow-sm'
                    : 'text-[#8c91a3] hover:text-white'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Gallery Photos</span>
              </button>

              {is360Available && (
                <button
                  id="view-mode-360-tab"
                  onClick={() => setViewMode('360')}
                  className={`flex items-center space-x-1.5 sm:space-x-2 rounded-md px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold transition ${
                    effectiveViewMode === '360'
                      ? 'bg-[#c5a059] text-black shadow-md font-bold'
                      : 'text-[#c5a059] hover:text-white'
                  }`}
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>360° Studio</span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              {effectiveViewMode === '360' ? (
                <span className="text-[#c5a059] font-mono font-medium">
                  360° Studio Turntable
                </span>
              ) : (
                <span className="text-[#8c91a3]">
                  {vehicle.images.length} {vehicle.images.length === 1 ? 'Photograph' : 'Photographs'}
                </span>
              )}
            </div>
          </div>

          {effectiveViewMode === '360' ? (
            /* 360° Interactive Turntable Viewer */
            <div className="space-y-3">
              <Vehicle360Viewer
                vehicleId={vehicle.id}
                frames={vehicle.spin360?.frames}
                vehicleName={vehicle.name}
                autoSpinSpeedMs={vehicle.spin360?.autoSpinSpeedMs || 90}
                coverImage={vehicle.coverImage}
                onClose={() => setViewMode('PHOTO')}
              />

              <div className="rounded-lg border border-[#252838] bg-[#0e1017] p-3 text-[11px] text-[#8e93a6] flex items-start space-x-2.5">
                <RotateCw className="h-4 w-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[#d1d5db]">
                    <strong className="text-white font-semibold">Interactive 360° Studio: </strong>
                    Click &amp; drag horizontally or swipe to rotate the {vehicle.name}. Press Space to toggle Auto-Spin or click any degree preset.
                  </p>
                  <p className="text-[10px] text-[#717688]">
                    High-definition 360° turntable presentation with continuous degree compass and speed calibration.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Standard High-Resolution Photo Gallery View */
            <>
              {/* Main Large Hero Photo Container */}
              <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#262a38] bg-[#0c0d12]">
                <img
                  src={getAssetUrl(vehicle.images[activeImageIndex] || vehicle.coverImage)}
                  alt={vehicle.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Click to open Lightbox button */}
                <button
                  id="hero-open-lightbox-btn"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex items-center space-x-1.5 rounded-full bg-black/75 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs text-[#f2f3f7] backdrop-blur-md transition hover:bg-[#c5a059] hover:text-black"
                >
                  <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden xs:inline">Inspect Fullscreen</span>
                  <span className="xs:hidden">Fullscreen</span>
                </button>

                {/* Top Right Controls Overlay: 360 View Button & Watch Reel */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 flex items-center space-x-1.5 sm:space-x-2">
                  {/* 360° View Button on Screen */}
                  <button
                    id="hero-360-view-btn"
                    onClick={() => setViewMode('360')}
                    className="flex items-center space-x-1 sm:space-x-1.5 rounded-full border border-[#c5a059] bg-[#0c0d12]/95 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#c5a059] shadow-lg shadow-black/70 backdrop-blur-md transition-all duration-300 hover:bg-[#c5a059] hover:text-black hover:scale-105 cursor-pointer"
                    title="Launch 360° Turntable View"
                  >
                    <RotateCw className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current shrink-0" />
                    <span>360°</span>
                    <span className="hidden sm:inline">View</span>
                    <span className="flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </button>

                  {/* Watch Reel Button on Image Corner */}
                  {vehicle.videos && vehicle.videos.length > 0 && (
                    <button
                      id="hero-watch-reel-btn"
                      onClick={() => {
                        const vid = vehicle.videos![0];
                        onPlayVideo({
                          id: vid.id,
                          title: vid.title,
                          vehicle: vehicle.name,
                          thumbnail: vid.thumbnail || vehicle.coverImage,
                          videoUrl: vid.videoUrl,
                          category: 'Studio Showcase',
                          duration: vid.duration || '00:10',
                          description: `Cinematic reel showcase of the ${vehicle.name}.`,
                        });
                      }}
                      className="flex items-center space-x-1 sm:space-x-2 rounded-full border border-[#262a38] bg-[#0c0d12]/90 p-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#f0f2f8] shadow-lg shadow-black/60 backdrop-blur-md transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059] hover:scale-105 cursor-pointer"
                      title="Watch Reel"
                    >
                      <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-[#c5a059] text-black">
                        <Play className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-current ml-0.5" />
                      </div>
                      <span className="hidden sm:inline">Watch Reel</span>
                    </button>
                  )}
                </div>

                {/* Scale and category tags */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center space-x-1 sm:space-x-2">
                  <span className="rounded bg-[#0d0e12]/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-[#c5a059] border border-[#c5a059]/40 backdrop-blur-sm">
                    {vehicle.scale}
                  </span>
                  <span className="rounded bg-[#1b1e2a]/90 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] uppercase tracking-wider text-[#a0a5b8] backdrop-blur-sm max-w-[90px] sm:max-w-none truncate">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-md border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#c5a059] ring-2 ring-[#c5a059]/50'
                          : 'border-[#262a38] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getAssetUrl(img)}
                        alt={`${vehicle.name} angle ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Specifications & Museum Story */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Manufacturer & Model Line */}
            <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8c91a3]">
              <span>{vehicle.manufacturer}</span>
              <span>•</span>
              <span>{vehicle.year}</span>
            </div>

            <h1 className="mt-2 font-serif-brand text-3xl sm:text-4xl font-bold text-[#f2f3f7]">
              {vehicle.name}
            </h1>

            {vehicle.generation && (
              <p className="mt-1 text-xs uppercase tracking-wider text-[#c5a059]">
                {vehicle.generation}
              </p>
            )}

            {/* Short Description */}
            <p className="mt-4 text-sm leading-relaxed text-[#b4b9cc]">
              {vehicle.description}
            </p>

            {/* Story / Curatorial Note */}
            {vehicle.story && (
              <div className="mt-6 rounded-lg border border-[#252838] bg-[#12141d] p-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]">
                  Curatorial Archive Story
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#969ba8]">
                  {vehicle.story}
                </p>
              </div>
            )}
          </div>

          {/* Specifications Matrix */}
          <div className="border-t border-[#222532] pt-6">
            <h3 className="font-serif-brand text-xs font-bold uppercase tracking-[0.2em] text-[#f2f3f7]">
              Model Specifications
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                <span className="text-[10px] uppercase text-[#73788a] block">Scale</span>
                <span className="font-bold text-[#f2f3f7] font-mono">{vehicle.scale}</span>
              </div>
              <div className="rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                <span className="text-[10px] uppercase text-[#73788a] block">Model Year</span>
                <span className="font-bold text-[#f2f3f7]">{vehicle.year}</span>
              </div>
              <div className="rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                <span className="text-[10px] uppercase text-[#73788a] block">Manufacturer</span>
                <span className="font-bold text-[#f2f3f7]">{vehicle.manufacturer}</span>
              </div>
              <div className="rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                <span className="text-[10px] uppercase text-[#73788a] block">Classification</span>
                <span className="font-bold text-[#f2f3f7]">{vehicle.category}</span>
              </div>
              {vehicle.specs?.color && (
                <div className="col-span-2 rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                  <span className="text-[10px] uppercase text-[#73788a] block">Factory Finish</span>
                  <span className="font-medium text-[#c5a059]">{vehicle.specs.color}</span>
                </div>
              )}
              {vehicle.specs?.bodyMaterial && (
                <div className="col-span-2 rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                  <span className="text-[10px] uppercase text-[#73788a] block">Construction</span>
                  <span className="text-[#a5abbf]">{vehicle.specs.bodyMaterial}</span>
                </div>
              )}
              {vehicle.specs?.openings && (
                <div className="col-span-2 rounded border border-[#1f222d] bg-[#0e1017] p-2.5">
                  <span className="text-[10px] uppercase text-[#73788a] block">Kinematics &amp; Openings</span>
                  <span className="text-[#a5abbf]">{vehicle.specs.openings}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <PhotoLightbox
        photos={vehiclePhotoItems}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(newIdx) => setActiveImageIndex(newIdx)}
      />
    </div>
  );
};
