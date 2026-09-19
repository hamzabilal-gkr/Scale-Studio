/**
 * ============================================================================
 * SCALESTUDIO.MODELS — CONTENT / COLLECTION DATA
 * ============================================================================
 * 
 * Centralized repository for vehicles, showcase videos, and brand details.
 * ============================================================================
 */

import { Vehicle, VideoItem } from '../types';

// ============================================================================
// SECTION 1: VEHICLES
// ============================================================================
// [NEW VEHICLE]
// To add a new vehicle, copy one of the objects below, provide a unique 'id',
// fill in specifications, images, and description.
// ============================================================================

/**
 * Helper to generate sequential 360-degree turntable image paths.
 * Automatically handles directory slashes, prefix numbers, and file extensions.
 */
export const generate360Frames = (
  basePath: string,
  count: number = 24,
  extension: string = '.jpg',
  prefix: string = '',
  padZero: boolean = true
): string[] => {
  let formattedBase = basePath.trim();
  if (!formattedBase.endsWith('/') && !formattedBase.endsWith('-') && !formattedBase.endsWith('_')) {
    formattedBase += '/';
  }
  const ext = extension.startsWith('.') ? extension : `.${extension}`;

  return Array.from({ length: count }, (_, i) => {
    const frameNum = padZero ? String(i + 1).padStart(2, '0') : String(i + 1);
    return `${formattedBase}${prefix}${frameNum}${ext}`;
  });
};

export const vehicles: Vehicle[] = [
  {
    id: 'toyota-corolla-gli-2007',
    name: 'Toyota Corolla GLI 2007',
    manufacturer: 'Kyosho Diecast',
    model: 'Corolla GLI',
    generation: '9th Generation (E120/E130)',
    scale: '1:18',
    year: 2007,
    category: 'Sedan',
    featured: true,
    description: 'Highly detailed 1:18 scale diecast model of the 2007 Toyota Corolla GLI in metallic gunmetal grey. Features opening front doors, rear doors, and trunk, along with realistic alloy wheels and interior details.',
    coverImage: '/Scale-Studio/images/corollaold.jpg',
    images: [
      '/Scale-Studio/images/corollaold.jpg',
    ],
    videos: [
      {
        id: 'vid-supra-01',
        title: 'Toyota Corolla GLi 2007 Reel',
        videoUrl: '/Scale-Studio/images/reels/corolla-gli-2007.mp4',
        thumbnail: '/Scale-Studio/images/thumbnails/corolla-2007.jpg',
        duration: '00:10',
      }
    ],
    specs: {
      color: 'Grey Metallic / Gunmetal Grey',
      bodyMaterial: 'Zinc Alloy Diecast & ABS Plastic Parts',
      openings: 'All 4 Doors, Engine Bonnet, and Rear Trunk',
      interiorDetail: 'Detailed dashboard, realistic textured seats, workable steering, and full interior floor flocking',
      releaseYear: '2007',
      editionLimit: 'Standard Production',
    }
  },
  {
    id: 'honda-civic-reborn-fd',
    name: 'Honda Civic Sedan (FD Generation / "Reborn")',
    manufacturer: 'Paudi Model (Dealer Edition)',
    model: 'Civic Sedan',
    generation: '8th Generation (FD)',
    scale: '1:18',
    year: '2005-2011',
    category: 'Sedan',
    featured: true,
    description: 'Highly detailed 1:18 scale replica of the 8th generation Honda Civic sedan (popularly known as "Civic Reborn" in South Asia). Features opening doors, hood, trunk, operable sunroof shade, functional steering, and detailed interior trim',
    story: 'Introduced in 2005 for the 2006 model year, the 8th generation Honda Civic revolutionized compact sedan styling with its Futuristic Mono-Form exterior design and revolutionary two-tier digital dashboard layout.',
    coverImage: '/Scale-Studio/images/civicreborn.jpg',
    images: [
      '/Scale-Studio/images/civicreborn.jpg',
    ],
    videos: [
      {
        id: 'vid-porsche-01',
        title: 'Honda Civic Sedan Reborn Reel',
        videoUrl: '/Scale-Studio/images/reels/civic-reborn.mp4',
        thumbnail: '/Scale-Studio/images/thumbnails/civic-reborn.jpg',
        duration: '00:10'
      }
    ],
    specs: {
      color: 'Taffeta White',
      bodyMaterial: 'Zinc Alloy Diecast metal with ABS plastic components',
      openings: 'All 4 passenger doors, engine hood, trunk lid, working side mirrors, and sliding sunroof cover',
      interiorDetail: 'Detailed beige/tan interior, dual-tier digital dashboard instrument cluster, center console controls, textured bucket seats, and carpeted floor',
      releaseYear: 2008,
      editionLimit: 'Standard Official Dealer Promotional Release'
    }
  },
  {
    id: 'suzuki-liana-sedan',
    name: "Suzuki Liana Sedan",
    manufacturer: "Paudi Model (Dealer Edition)",
    model: "Liana (Life In A New Age)",
    generation: "1st Generation Facelift (RH413/RH416)",
    scale: "1:18",
    year: "2004-2010",
    category: "Sedan",
    featured: true,
    description: "Highly detailed 1:18 scale diecast replica of the Suzuki Liana facelift sedan. Features opening doors, bonnet, boot, functional steering, detailed engine bay, and realistic interior trim.",
    story: "Launched by Suzuki as the successor to the Baleno/Estepo, the Liana (an acronym for 'Life In A New Age') gained international fame as Top Gear's original 'Reasonably Priced Car', driven by numerous celebrities around the Dunsfold Aerodrome track.",
    coverImage: '/Scale-Studio/images/liana.jpg',
    images: [
      '/Scale-Studio/images/liana.jpg',
    ],
    videos: [
      {
        id: 'vid-skyline-01',
        title: 'Suzuki Liana Sedan Reel',
        videoUrl: '/Scale-Studio/images/reels/suzuki-liana.mp4',
        thumbnail: '/Scale-Studio/images/thumbnails/suzuki-liana.jpg',
        duration: '00:10'
      }
    ],
    specs: {
      color: "Pearl Black",
      bodyMaterial: "Zinc Alloy Diecast metal with ABS plastic components",
      openings: "All 4 doors, engine hood, boot lid, fuel filler lid, and folding side mirrors",
      interiorDetail: "Detailed dark grey interior, digital/analog dashboard display, steering wheel controls, textured front and rear seats, and carpeted floor",
      releaseYear: "2006",
      editionLimit: "Official Factory Promotional Dealer Edition"
    }
  },
  {
    id: 'mercedes-benz-e-class-w213',
    name: "Mercedes-Benz E-Class E 200 Sedan",
    manufacturer: "Norev / iScale (Dealer Edition)",
    model: "E 200 (W213)",
    generation: "5th Generation (W213 Pre-Facelift)",
    scale: "1:18",
    year: "2016-2020",
    category: "Sedan",
    featured: true,
    description: "Precision 1:18 scale diecast replica of the Mercedes-Benz E 200 (W213). Features opening passenger doors, hood, boot, detailed interior trim, working steering, and authentic Mercedes-Benz Exclusive Line front grille architecture.",
    story: "Unveiled at the 2016 North American International Auto Show, the W213 generation Mercedes-Benz E-Class marked a huge leap forward in automotive technology, introducing advanced semi-autonomous driving capabilities, aerodynamic body sculpting, and the iconic dual widescreen cockpit display.",
    coverImage: '/Scale-Studio/images/mercedeseclass.jpg',
    images: [
      '/Scale-Studio/images/mercedeseclass.jpg',
    ],
    specs: {
      color: "Obsidian Black Metallic",
      bodyMaterial: "Zinc Alloy Diecast metal with ABS high-grade plastic parts",
      openings: "All 4 passenger doors, engine hood, boot lid, and folding side mirrors",
      interiorDetail: "Detailed black executive interior, dual digital widescreen dashboard display, Ambient light accents, center console touchpad, fine upholstery textures, and soft-flocked carpeted floor",
      releaseYear: "2016",
      editionLimit: "Official Mercedes-Benz Promotional Dealer Edition"
    }
  },
  {
    id: 'toyota-corolla-altis-grande',
    name: "Toyota Corolla Altis Grande Sedan",
    manufacturer: "Paudi Model (Dealer Edition)",
    model: "Corolla Altis Grande 1.8 CVTi",
    generation: "11th Generation Facelift (E170)",
    scale: "1:18",
    year: "2017-2021",
    category: "Sedan",
    featured: true,
    description: "Highly detailed 1:18 scale diecast replica of the 11th generation facelift Toyota Corolla Altis Grande sedan. Features opening doors, hood, boot lid, operable sunroof shade, functional steering, and detailed interior appointments.",
    story: "The facelifted 11th generation Corolla E170 redefined Toyota's flagship compact sedan with sharper LED headlamp styling, upgraded infotainment, and refined CVT performance, cementing its position as one of the most iconic daily drivers globally.",
    coverImage: '/Scale-Studio/images/corollanew.jpg',
    images: [
      '/Scale-Studio/images/corollanew.jpg'
    ],
    specs: {
      color: "Super White",
      bodyMaterial: "Zinc Alloy Diecast metal with ABS plastic components",
      openings: "All 4 doors, engine hood, boot lid, fuel filler door, and sliding sunroof cover",
      interiorDetail: "Detailed beige/black dual-tone interior, touch-screen infotainment console, multi-function steering wheel, detailed dash, and soft carpeted flooring",
      releaseYear: "2018",
      editionLimit: "Official Factory Promotional Dealer Edition"
    }
  },
  {
    id: 'mercedes-amg-g-63-w463',
    name: 'Mercedes-AMG G 63',
    manufacturer: 'Diecast Precision',
    model: 'G 63 (W463)',
    generation: '2nd Generation (W463A)',
    scale: '1:40',
    year: '2018-Present',
    category: 'SUV',
    featured: true,
    description: 'Detailed 1:40 scale diecast model of the Mercedes-AMG G 63 in metallic crimson red. Features opening front doors, pull-back action, Panamericana front grille, and signature twin side-exit exhausts.',
    story: 'The legendary G-Wagon combines military-grade off-road heritage with handcrafted AMG performance, recognized worldwide for its unmistakable boxy silhouette and thunderous twin-turbo V8.',
    coverImage: '/Scale-Studio/images/mercedesgclass.jpg',
    images: [
      '/Scale-Studio/images/mercedesgclass.jpg',
    ],
    spin360: {
      title: '360° Studio Turntable Study',
      frames: [],
      autoSpinSpeedMs: 90,
    },
    videos: [
      {
        id: 'Mercedes-AMG-G-63-(W463)-showcase',
        title: 'Mercedes-AMG G 63 1:40 Showcase Reel',
        videoUrl: '/Scale-Studio/images/reels/Mercedes G63.mp4',
        thumbnail: '/Scale-Studio/images/thumbnails/Mercedes G Class.jfif',
        duration: '00:10',
      }
    ],
    specs: {
      color: 'Metallic Crimson Red',
      bodyMaterial: 'Zinc Alloy Diecast metal with ABS plastic components',
      openings: 'Opening front driver and passenger doors with pull-back motion',
      interiorDetail: 'Detailed black cockpit layout with widescreen display cockpit, multi-spoke AMG wheels, and rear spare tire casing',
      releaseYear: '2020',
      editionLimit: 'Studio Collection',
    }
  },
  {
    id: 'bmw-x6-xdrive50i-e71',
    name: 'BMW X6 xDrive50i',
    manufacturer: 'Diecast Precision',
    model: 'X6 xDrive50i (E71)',
    generation: '1st Generation (E71)',
    scale: '1:38',
    year: '2008-2014',
    category: 'SUV',
    featured: true,
    description: '1:38 scale diecast model of the BMW X6 xDrive50i in deep sapphire black. Celebrated as the pioneer of the Sports Activity Coupé (SAC) segment, featuring opening doors, sculpted fastback roofline, and aggressive kidney grille architecture.',
    story: 'First revealed at the 2008 North American International Auto Show, the E71 BMW X6 pioneered the coupe-SUV genre, blending high ground clearance and all-wheel-drive grip with dramatic sweeping coupe rooflines.',
    coverImage: '/Scale-Studio/images/bmw.jpg',
    images: [
      '/Scale-Studio/images/bmw.jpg',
    ],
    spin360: {
      title: '360° Studio Turntable Study',
      frames: [],
      autoSpinSpeedMs: 90,
    },
    specs: {
      color: 'Black Sapphire Metallic',
      bodyMaterial: 'Diecast Metal Body with ABS trim',
      openings: 'Opening front doors and operable pull-back drive',
      interiorDetail: 'Driver-oriented cockpit, center iDrive console, sport steering wheel, and dual twin exhaust tips',
      releaseYear: '2010',
      editionLimit: 'Studio Collection',
    }
  },
  {
    id: 'shelby-cobra-427-classic',
    name: 'Shelby Cobra 427 S/C',
    manufacturer: 'Kinsmart Diecast',
    model: 'Cobra 427 Semi-Competition',
    generation: 'MK III CSX3000',
    scale: '1:32',
    year: 1965,
    category: 'Sports Car',
    featured: true,
    description: '1:32 scale diecast model of the legendary 1965 Shelby Cobra 427 S/C finished in classic Wimbledon White with dual Le Mans blue racing stripes, side-pipe exhausts, and classic chrome bumperettes.',
    story: 'Carroll Shelby’s masterwork dropped an enormous Ford 427 FE big-block V8 into a lightweight British AC roadster chassis, creating one of the most savage and revered American sports cars in history.',
    coverImage: '/Scale-Studio/images/ford.jpg',
    images: [
      '/Scale-Studio/images/ford.jpg',
    ],
    spin360: {
      title: '360° Studio Turntable Study',
      frames: generate360Frames('/Scale-Studio/images/360/shelbycobra/', 12, '.jpg'),
      autoSpinSpeedMs: 300,
    },
    specs: {
      color: 'Wimbledon White with Guardsman Blue Stripes',
      bodyMaterial: 'Zinc Alloy Diecast metal with ABS details',
      openings: 'Opening doors with operable pull-back mechanism',
      interiorDetail: 'Open cockpit layout with wood-rimmed steering wheel, competition dashboard gauges, and chrome roll hoop',
      releaseYear: '1965 Replica',
      editionLimit: 'Classic Collection',
    }
  },
  {
    id: 'porsche-cayman-s-987c',
    name: 'Porsche Cayman S',
    manufacturer: 'Diecast Precision',
    model: 'Cayman S (987c)',
    generation: '1st Generation (987)',
    scale: '1:34',
    year: '2005-2012',
    category: 'Sports Car',
    featured: true,
    description: '1:34 scale diecast replica of the Porsche Cayman S in Arctic Silver Metallic. Features opening side doors, distinctive mid-engine fastback profile, sculpted rear haunches, and center-mounted dual exhaust.',
    story: 'Named after the agile caiman reptile, the Cayman S derived from the Boxster platform but added a rigid hardtop coupe roof, delivering extraordinary mid-engine balance and legendary cornering dynamics.',
    coverImage: '/Scale-Studio/images/porcha.jpg',
    images: [
      '/Scale-Studio/images/porcha.jpg',
    ],
    spin360: {
      title: '360° Studio Turntable Study',
      frames: [],
      autoSpinSpeedMs: 90,
    },
    specs: {
      color: 'Arctic Silver Metallic',
      bodyMaterial: 'Diecast Metal with ABS plastic components',
      openings: 'Opening doors and rubber-tread tires',
      interiorDetail: 'Detailed black cockpit, three-gauge instrument pod, sports steering wheel, and contoured bucket seating',
      releaseYear: '2008',
      editionLimit: 'Studio Collection',
    }
  },
  {
    id: 'toyota-land-cruiser-prado-j150',
    name: 'Toyota Land Cruiser Prado',
    manufacturer: 'Paudi / Studio Diecast',
    model: 'Land Cruiser Prado (J150 Facelift)',
    generation: '4th Generation (J150 Facelift)',
    scale: '1:40',
    year: '2014-2023',
    category: 'SUV',
    featured: true,
    description: '1:40 scale diecast model of the Toyota Land Cruiser Prado (J150 Facelift) in Pearl White with commemorative side-body decal striping. Features opening passenger doors, roof rails, vertical chrome grille, and tailgate spare tire assembly.',
    story: 'Built on a rugged body-on-frame platform, the Land Cruiser Prado is acclaimed worldwide for enduring extreme terrain across deserts and mountain passes while delivering executive luxury.',
    coverImage: '/Scale-Studio/images/prado.jpg',
    images: [
      '/Scale-Studio/images/prado.jpg',
    ],
    spin360: {
    title: '360° Studio Turntable Study',
    frames: generate360Frames('/Scale-Studio/images/360/Toyota-Land-Cruser/', 24, '.jpg'),
    autoSpinSpeedMs: 90,
    },
    specs: {
      color: 'Pearl White with Adventure Side Graphic Decals',
      bodyMaterial: 'Zinc Alloy Diecast metal with ABS plastic accents',
      openings: 'Opening front passenger doors',
      interiorDetail: 'Realistic dashboard layout, multi-spoke alloy wheels, roof cross rails, and rear mounted spare tire housing',
      releaseYear: '2017',
      editionLimit: 'Studio Collection',
    }
  },
];

// ============================================================================
// SECTION 2: VIDEOS
// ============================================================================
// [NEW VIDEO]
// To add a new video, copy one of the objects below.
// Supports both direct MP4 files and embeddable URLs.
// ============================================================================

export const videos: VideoItem[] = [
  {
    id: 'supra-mk4-cinematic-reel',
    title: 'Toyota Corolla GLi 2007 Reel',
    vehicle: 'Toyota Corolla GLi 2007',
    thumbnail: '/Scale-Studio/images/thumbnails/corolla-2007.jpg',
    videoUrl: '/Scale-Studio/images/reels/corolla-gli-2007.mp4',
    category: 'Cinematic AI',
    duration: '00:10',
    description: 'A cinematic macro study exploring the proportions and aerodynamic lines of the Paudi 1:18 Toyota Corolla GLi 2007.',
    dateAdded: '2026-09-13'
  },
  {
    id: 'porsche-993-gt2-track-glory',
    title: 'Honda Civic FD "Reborn" Reel',
    vehicle: 'Honda Civic Sedan (FD Generation / "Reborn")',
    thumbnail: '/Scale-Studio/images/thumbnails/civic-reborn.jpg',
    videoUrl: '/Scale-Studio/images/reels/civic-reborn.mp4',
    category: 'Cinematic AI',
    duration: '00:10',
    description: 'Dynamic probe-lens camera sweeps capturing the aerodynamic curves, sunroof detail, and pristine two-tier interior of the 1:18 Civic Reborn.',
    dateAdded: '2026-09-13'
  },
  {
    id: 'suzuki-liana-reel-showcase',
    title: 'Suzuki Liana Sedan 1:18 Showcase Reel',
    vehicle: 'Suzuki Liana Sedan',
    thumbnail: '/Scale-Studio/images/thumbnails/suzuki-liana.jpg',
    videoUrl: '/Scale-Studio/images/reels/suzuki-liana.mp4',
    category: 'Studio Showcase',
    duration: '00:10',
    description: 'Cinematic precision macro presentation highlighting the opening doors, detailed engine bay, and dark metallic finish of the 1:18 Suzuki Liana.',
    dateAdded: '2026-09-13'
  },
  {
    id: 'Mercedes-AMG-G-63-(W463)-showcase',
    title: 'Mercedes-AMG G 63 (W463) 1:40 Showcase Reel',
    vehicle: 'Mercedes-AMG G 63 (W463)',
    thumbnail: '/Scale-Studio/images/thumbnails/Mercedes G Class.jfif',
    videoUrl: '/Scale-Studio/images/reels/Mercedes G63.mp4',
    category: 'Studio Showcase',
    duration: '00:10',
    description: 'Cinematic precision macro presentation highlighting the body, detailed engine bay, and dark metallic finish of the 1:40 Mercedes-AMG G 63 (W463).',
    dateAdded: '2026-09-15'
  },
];

// ============================================================================
// ABOUT & BRAND CONFIGURATION
// ============================================================================
export const BRAND_INFO = {
  name: 'SCALESTUDIO.MODELS',
  tagline: 'THE ART OF DIECAST WITH HAMZA BILAL',
  description: 'A curated showcase of miniature automotive craftsmanship, photography and cinematic storytelling.',
  curatorBio: 'Curated by an automotive collector, photographer, and miniature artisan dedicated to preserving and elevating scale model craftsmanship. Every vehicle in the collection is documented with macro optical precision and concourse archival standards.',
  socials: {
    instagramMain: 'https://instagram.com/scalestudio.models',
    instagramMainLabel: 'scalestudio.models',
    instagramPersonal: 'https://instagram.com/prof.hamzabilal',
    instagramPersonalLabel: 'prof.hamzabilal',
  },
  stats: {
    totalVehicles: vehicles.length,
    scalesRepresented: '1:18, 1:36, 1:40, 1:32',
    studioEstablished: '2026',
    archivalStatus: '100% Concourse Documented'
  }
};
