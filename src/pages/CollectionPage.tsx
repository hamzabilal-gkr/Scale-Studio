import React, { useState, useMemo } from 'react';
import { VehicleCategory, VideoItem } from '../types';
import { vehicles } from '../data/collectionData';
import { VehicleCard } from '../components/VehicleCard';
import { Search, RotateCcw, Car } from 'lucide-react';

interface CollectionPageProps {
  onSelectVehicle: (vehicleId: string) => void;
  onPlayVideo?: (video: VideoItem) => void;
  initialCategory?: VehicleCategory;
  initialSearch?: string;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onSelectVehicle,
  onPlayVideo,
  initialCategory = 'ALL',
  initialSearch = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [scaleFilter, setScaleFilter] = useState<string>('ALL');

  // Available categories dynamically derived from vehicles
  const categories = useMemo(() => {
    const cats = Array.from(new Set(vehicles.map((v) => v.category).filter(Boolean)));
    return ['ALL', ...cats];
  }, []);

  // Available scales in collection
  const availableScales = useMemo(() => {
    const scales = Array.from(new Set(vehicles.map((v) => v.scale)));
    return ['ALL', ...scales];
  }, []);

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Category check
      const matchesCategory =
        activeCategory === 'ALL' || v.category === activeCategory;

      // Scale check
      const matchesScale =
        scaleFilter === 'ALL' || v.scale === scaleFilter;

      // Search query check
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        v.name.toLowerCase().includes(query) ||
        v.manufacturer.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        (v.generation && v.generation.toLowerCase().includes(query)) ||
        v.description.toLowerCase().includes(query);

      return matchesCategory && matchesScale && matchesSearch;
    });
  }, [activeCategory, scaleFilter, searchQuery]);

  const resetFilters = () => {
    setActiveCategory('ALL');
    setScaleFilter('ALL');
    setSearchQuery('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#222532] pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              Permanent Archive
            </span>
            <h1 className="mt-1 font-serif-brand text-3xl sm:text-4xl font-bold text-[#f2f3f7]">
              Vehicle Collection
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#9aa0b3] max-w-2xl">
              An archival catalogue of precision 1:18, 1:43, and 1:12 scale automotive icons, from air-cooled endurance legends to bespoke Japanese GT icons.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#8c91a3] self-start sm:self-auto">
            <span className="font-serif-brand text-lg font-bold text-[#f2f3f7]">
              {filteredVehicles.length}
            </span>
            <span>of {vehicles.length} Models Displayed</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#787d91]" />
            <input
              type="text"
              id="vehicle-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle name, manufacturer, or model..."
              className="w-full rounded-lg border border-[#262936] bg-[#12141c] py-2.5 pl-10 pr-4 text-xs text-[#f2f3f7] placeholder-[#6e7384] transition focus:border-[#c5a059] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8e93a6] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Scale Filter Dropdown/Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[11px] uppercase tracking-wider text-[#7e8395] shrink-0">
              Scale:
            </span>
            <div className="flex space-x-1.5">
              {availableScales.map((scale) => (
                <button
                  key={scale}
                  onClick={() => setScaleFilter(scale)}
                  className={`rounded px-2.5 py-1 text-[11px] font-mono transition ${
                    scaleFilter === scale
                      ? 'bg-[#c5a059] text-black font-bold'
                      : 'border border-[#262936] bg-[#12141c] text-[#8e93a6] hover:text-white'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Main Vehicles Grid */}
      <div className="mt-10">
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                onPlayVideo={onPlayVideo}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="my-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#262936] bg-[#11131a] p-12 text-center">
            <div className="rounded-full bg-[#1b1e2a] p-4 text-[#c5a059]">
              <Car className="h-8 w-8" />
            </div>
            <h3 className="mt-4 font-serif-brand text-lg font-bold text-[#f2f3f7]">
              No Vehicles Found
            </h3>
            <p className="mt-2 max-w-sm text-xs text-[#8c91a3]">
              No models match your current category, scale, or search parameters. Try resetting your filters to explore the entire archive.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 flex items-center space-x-2 rounded bg-[#c5a059] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#dfba6a]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
