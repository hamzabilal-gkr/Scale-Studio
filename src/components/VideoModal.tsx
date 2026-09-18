import React, { useEffect } from 'react';
import { VideoItem } from '../types';
import { X, Clock, Film } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface VideoModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed/')) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <div
      id="video-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="video-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl border border-[#2b2f3d] bg-[#12141c] shadow-2xl my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232634] px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-center space-x-2">
            <Film className="h-4 w-4 text-[#c5a059]" />
            <span className="text-[11px] uppercase tracking-widest text-[#a0a5b8] font-medium truncate max-w-[220px]">
              {video.category} — {video.vehicle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#9aa0b3] hover:bg-white/10 hover:text-white transition"
            aria-label="Close video player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Area (9:16 Aspect Ratio) */}
        <div className="relative aspect-[9/16] w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          {isYouTube(video.videoUrl) ? (
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={getAssetUrl(video.videoUrl)}
              poster={getAssetUrl(video.thumbnail)}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser does not support HTML5 video streaming.
            </video>
          )}
        </div>

        {/* Video Details Information */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif-brand text-base font-bold text-[#f2f3f7] truncate">
              {video.title}
            </h3>
            {video.duration && (
              <div className="flex items-center space-x-1 shrink-0 rounded bg-[#1c1f2b] px-2 py-0.5 text-[11px] text-[#c5a059]">
                <Clock className="h-3 w-3" />
                <span>{video.duration}</span>
              </div>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#9ca1b3]">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
