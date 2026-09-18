import React, { useEffect } from 'react';
import { PhotoItem } from '../types';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onSelectIndex]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div
      id="photo-lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 md:p-6 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Bar: Brand, Counter, Close */}
      <div
        className="flex w-full max-w-7xl items-center justify-between py-2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="font-serif-brand text-sm tracking-widest text-[#c5a059]">
            SCALESTUDIO ARCHIVE
          </span>
          <span className="text-xs text-[#6e7384]">|</span>
          <span className="text-xs text-[#a0a5b8]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>

        <button
          id="lightbox-close-btn"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-[#c5a059] hover:text-black transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex flex-1 w-full max-w-7xl items-center justify-center overflow-hidden my-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getAssetUrl(currentPhoto.image)}
          alt={currentPhoto.title}
          className="max-h-[75vh] max-w-full rounded object-contain shadow-2xl transition-all"
        />

        {/* Prev / Next controls */}
        {photos.length > 1 && (
          <>
            <button
              id="lightbox-prev-btn"
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:bg-[#c5a059] hover:text-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              id="lightbox-next-btn"
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:bg-[#c5a059] hover:text-black"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Information Panel */}
      <div
        className="w-full max-w-4xl rounded-lg border border-white/10 bg-[#12141c]/90 px-5 py-3.5 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
              {currentPhoto.category} — {currentPhoto.vehicle}
            </span>
            <h3 className="text-base font-semibold text-[#f2f3f7] font-serif-brand">
              {currentPhoto.title}
            </h3>
            {currentPhoto.caption && (
              <p className="mt-1 text-xs text-[#9aa0b3]">{currentPhoto.caption}</p>
            )}
          </div>

          {currentPhoto.cameraInfo && (
            <div className="flex items-center space-x-2 text-xs text-[#8c91a3] shrink-0 border-t border-white/5 sm:border-t-0 pt-2 sm:pt-0">
              <Camera className="h-3.5 w-3.5 text-[#c5a059]" />
              <span className="font-mono text-[11px]">{currentPhoto.cameraInfo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
