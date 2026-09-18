import React, { useState } from 'react';
import { Vehicle, VideoItem } from '../types';
import { ArrowUpRight, Play, RotateCw } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicleId: string) => void;
  onPlayVideo?: (video: VideoItem) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, onPlayVideo }) => {
  const [imgSrc, setImgSrc] = useState(getAssetUrl(vehicle.coverImage));

  return (
    <div
      id={`vehicle-card-${vehicle.id}`}
      onClick={() => onSelect(vehicle.id)}
      className="group cursor-pointer flex flex-col overflow-hidden rounded-lg border border-[#232634] bg-[#13151d] transition-all duration-300 hover:border-[#c5a059]/60 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
    >
      {/* Image Container with 16:10 aspect ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0d12]">
        <img
          src={imgSrc}
          alt={vehicle.name}
          onError={() => {
            setImgSrc('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80');
          }}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] via-transparent to-transparent opacity-80" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className="rounded bg-[#0d0e12]/85 px-2.5 py-1 text-[11px] font-bold tracking-widest text-[#c5a059] backdrop-blur-sm border border-[#c5a059]/30">
            {vehicle.scale}
          </span>
          {vehicle.spin360 && (
            <span className="flex items-center space-x-1 rounded bg-[#0d0e12]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/40 backdrop-blur-sm shadow-sm">
              <RotateCw className="h-2.5 w-2.5" />
              <span>360°</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="rounded bg-[#1c1f2b]/80 px-2 py-1 text-[10px] uppercase tracking-wider text-[#9aa0b3] backdrop-blur-sm">
            {vehicle.category}
          </span>
        </div>

        {/* Reel button on image corner if video exists */}
        {vehicle.videos && vehicle.videos.length > 0 && (
          <div className="absolute bottom-3 right-3 z-10">
            {onPlayVideo ? (
              <button
                type="button"
                id={`card-reel-btn-${vehicle.id}`}
                onClick={(e) => {
                  e.stopPropagation();
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
                className="flex items-center space-x-1.5 rounded-full border border-[#c5a059] bg-[#0d0e12]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#c5a059] backdrop-blur-md transition-all duration-200 hover:bg-[#c5a059] hover:text-black hover:scale-105 shadow-md shadow-black/60 cursor-pointer"
                title="Watch Reel"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-black">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Reel</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5 rounded-full border border-[#c5a059]/40 bg-[#0d0e12]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c5a059] backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 fill-current" />
                <span>Reel</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between text-xs text-[#8c91a3]">
            <span className="uppercase tracking-wider">{vehicle.manufacturer}</span>
            <span>{vehicle.year}</span>
          </div>

          <h3 className="mt-2 font-serif-brand text-lg font-bold text-[#f2f3f7] transition-colors group-hover:text-[#c5a059]">
            {vehicle.name}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#9aa0b3]">
            {vehicle.description}
          </p>
        </div>

        {/* Footer / Action */}
        <div className="mt-5 flex items-center justify-between border-t border-[#1f222d] pt-3.5">
          <span className="text-[11px] uppercase tracking-wider text-[#73788a]">
            {vehicle.generation || vehicle.model}
          </span>
          <div className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-[#c5a059] group-hover:translate-x-0.5 transition-transform">
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
