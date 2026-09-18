/**
 * SCALESTUDIO.MODELS — Type Definitions
 * Centralized data contracts for vehicles, photography, and videos.
 */

export type VehicleCategory = string;

export interface VehicleVideoReference {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: string;
}

export interface VehicleSpecs {
  color?: string;
  bodyMaterial?: string;
  openings?: string; // e.g. "Full openings: Hood, Doors, Rear Hatch"
  interiorDetail?: string;
  releaseYear?: number | string;
  editionLimit?: string;
}

export interface Vehicle360Config {
  frames: string[];
  title?: string;
  autoSpinSpeedMs?: number;
  totalAngles?: number;
}

export interface Vehicle {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  generation?: string;
  scale: string; // e.g., "1:18", "1:32", "1:40"
  year: number | string;
  category: string;
  description: string;
  story?: string;
  coverImage: string;
  images: string[];
  videos?: VehicleVideoReference[];
  spin360?: Vehicle360Config;
  specs?: VehicleSpecs;
  featured?: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  vehicle: string;
  image: string;
  category: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  caption?: string;
  cameraInfo?: string;
  dateAdded?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  vehicle: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  duration?: string;
  description: string;
  dateAdded?: string;
}

export type PageView =
  | { name: 'HOME' }
  | { name: 'COLLECTION'; category?: VehicleCategory; search?: string }
  | { name: 'VEHICLE_DETAIL'; vehicleId: string }
  | { name: 'VIDEOS'; videoId?: string }
  | { name: 'ABOUT' };
