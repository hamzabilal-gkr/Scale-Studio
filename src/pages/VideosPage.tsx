import React, { useState, useMemo } from 'react';
import { VideoItem } from '../types';
import { videos } from '../data/collectionData';
import { VideoModal } from '../components/VideoModal';
import { Play, Clock } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface VideosPageProps {
  initialVideoId?: string;
}

export const VideosPage: React.FC<VideosPageProps> = ({ initialVideoId }) => {
  const initialVideo = initialVideoId ? videos.find((v) => v.id === initialVideoId) || null : null;
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(initialVideo);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(videos.map((v) => v.category)));
    return ['ALL', ...cats];
  }, []);

  const filteredVideos = useMemo(() => {
    if (activeCategory === 'ALL') return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#222532] pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              Cinematic AI &amp; Motion Archives
            </span>
            <h1 className="mt-1 font-serif-brand text-3xl sm:text-4xl font-bold text-[#f2f3f7]">
              Cinematic Videos
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#9aa0b3] max-w-2xl">
              Probe-lens camera movements, analog synth audio soundscapes, turntable showcases, and precision motion studies of iconic scale models.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#8c91a3]">
            <span className="font-serif-brand text-lg font-bold text-[#f2f3f7]">
              {filteredVideos.length}
            </span>
            <span>Archived Video Reels</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'bg-[#c5a059] text-[#0e1015] font-bold shadow-md shadow-[#c5a059]/20'
                    : 'border border-[#252836] bg-[#14161f] text-[#969ba8] hover:border-[#c5a059]/40 hover:text-[#f2f3f7]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Grid (9:16 Reels Format) */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            id={`video-card-${video.id}`}
            onClick={() => setSelectedVideo(video)}
            className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-[#222532] bg-[#12141c] transition duration-300 hover:border-[#c5a059]/60 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Video Thumbnail (9:16 Aspect Ratio) */}
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#090a0e]">
              <img
                src={getAssetUrl(video.thumbnail)}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:via-black/10 transition-colors" />

              {/* Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0d0e12]/80 text-[#c5a059] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#c5a059] group-hover:text-black shadow-lg">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Category Pill */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                <span className="rounded bg-[#0d0e12]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/30 backdrop-blur-sm font-medium">
                  {video.category}
                </span>
              </div>

              {/* Duration Badge */}
              {video.duration && (
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center space-x-1 rounded bg-black/85 px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-[#f2f3f7] backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-[#c5a059]" />
                  <span>{video.duration}</span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8c91a3]">
                  {video.vehicle}
                </span>

                <h3 className="mt-1 font-serif-brand text-xs sm:text-sm font-bold text-[#f2f3f7] group-hover:text-[#c5a059] transition-colors line-clamp-1">
                  {video.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#9ca1b3]">
                  {video.description}
                </p>
              </div>

              <div className="mt-3.5 flex items-center justify-between border-t border-[#1f222d] pt-2.5 text-xs text-[#c5a059]">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Play Reel</span>
                <Play className="h-3 w-3 fill-current" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={selectedVideo}
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};
