import React, { useState, useEffect } from 'react';
import { PageView, VideoItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { VideosPage } from './pages/VideosPage';
import { AboutPage } from './pages/AboutPage';
import { VideoModal } from './components/VideoModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>({ name: 'HOME' });
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // Parse URL hash on mount or hashchange to enable deep-linking & browser history
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');

      if (!parts[0] || parts[0] === 'home') {
        setCurrentPage({ name: 'HOME' });
      } else if (parts[0] === 'collection') {
        setCurrentPage({ name: 'COLLECTION' });
      } else if (parts[0] === 'vehicle' && parts[1]) {
        setCurrentPage({ name: 'VEHICLE_DETAIL', vehicleId: parts[1] });
      } else if (parts[0] === 'photos') {
        setCurrentPage({ name: 'COLLECTION' });
      } else if (parts[0] === 'videos') {
        setCurrentPage({ name: 'VIDEOS', videoId: parts[1] });
      } else if (parts[0] === 'about') {
        setCurrentPage({ name: 'ABOUT' });
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update hash when navigating
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let hash = '';
    switch (page.name) {
      case 'HOME':
        hash = '#/home';
        break;
      case 'COLLECTION':
        hash = '#/collection';
        break;
      case 'VEHICLE_DETAIL':
        hash = `#/vehicle/${page.vehicleId}`;
        break;
      case 'VIDEOS':
        hash = page.videoId ? `#/videos/${page.videoId}` : '#/videos';
        break;
      case 'ABOUT':
        hash = '#/about';
        break;
    }
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  };

  const handleSelectVehicle = (vehicleId: string) => {
    handleNavigate({ name: 'VEHICLE_DETAIL', vehicleId });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#0e1015] text-[#e2e4ea] selection:bg-[#c5a059] selection:text-[#0e1015]">
      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content View with Smooth Transition */}
      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentPage.name === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onSelectVehicle={handleSelectVehicle}
                onPlayVideo={(v) => setPlayingVideo(v)}
              />
            </motion.div>
          )}

          {currentPage.name === 'COLLECTION' && (
            <motion.div
              key="collection"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CollectionPage
                onSelectVehicle={handleSelectVehicle}
                onPlayVideo={(v) => setPlayingVideo(v)}
                initialCategory={currentPage.category}
                initialSearch={currentPage.search}
              />
            </motion.div>
          )}

          {currentPage.name === 'VEHICLE_DETAIL' && (
            <motion.div
              key={`vehicle-${currentPage.vehicleId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <VehicleDetailPage
                vehicleId={currentPage.vehicleId}
                onBack={() => handleNavigate({ name: 'COLLECTION' })}
                onNavigate={handleNavigate}
                onPlayVideo={(v) => setPlayingVideo(v)}
              />
            </motion.div>
          )}

          {currentPage.name === 'VIDEOS' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <VideosPage initialVideoId={currentPage.videoId} />
            </motion.div>
          )}

          {currentPage.name === 'ABOUT' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <AboutPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Video Player Modal */}
      <VideoModal
        video={playingVideo}
        isOpen={playingVideo !== null}
        onClose={() => setPlayingVideo(null)}
      />

      {/* Museum Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
