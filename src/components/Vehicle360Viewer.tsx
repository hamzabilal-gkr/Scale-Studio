import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera
} from 'lucide-react';
import { getAssetUrl } from '../utils';

interface Vehicle360ViewerProps {
  vehicleId?: string;
  frames?: string[];
  vehicleName: string;
  autoSpinSpeedMs?: number;
  coverImage?: string;
  onClose?: () => void;
}

export const Vehicle360Viewer: React.FC<Vehicle360ViewerProps> = ({
  vehicleId: _vehicleId = 'default-vehicle',
  frames = [],
  vehicleName,
  autoSpinSpeedMs = 90,
  coverImage,
  onClose,
}) => {
  const activeFrames = frames;

  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [spinSpeed] = useState<number>(autoSpinSpeedMs);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [showDragHint, setShowDragHint] = useState<boolean>(true);
  const [customAngle, setCustomAngle] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number>(0);
  const dragStartFrameRef = useRef<number>(0);
  const autoSpinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasFrames = activeFrames && activeFrames.length > 0;
  const totalFrames = hasFrames ? activeFrames.length : 24;

  // Preload frames for smooth scrubbing
  useEffect(() => {
    if (!hasFrames) return;
    let mounted = true;
    let count = 0;

    activeFrames.forEach((frameUrl) => {
      const img = new Image();
      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
      };
      img.src = getAssetUrl(frameUrl);
    });

    return () => {
      mounted = false;
    };
  }, [activeFrames, hasFrames]);

  // Auto-spin logic
  useEffect(() => {
    if (isAutoSpinning) {
      autoSpinIntervalRef.current = setInterval(() => {
        if (hasFrames) {
          setCurrentFrameIndex((prev) => (prev + 1) % totalFrames);
        } else {
          setCustomAngle((prev) => (prev + 5) % 360);
        }
      }, spinSpeed);
    } else {
      if (autoSpinIntervalRef.current) {
        clearInterval(autoSpinIntervalRef.current);
        autoSpinIntervalRef.current = null;
      }
    }

    return () => {
      if (autoSpinIntervalRef.current) {
        clearInterval(autoSpinIntervalRef.current);
      }
    };
  }, [isAutoSpinning, totalFrames, spinSpeed, hasFrames]);

  // Step frame forward or backward
  const stepFrame = useCallback((delta: number) => {
    if (hasFrames) {
      setCurrentFrameIndex((prev) => {
        const next = (prev + delta) % totalFrames;
        return next < 0 ? next + totalFrames : next;
      });
    } else {
      setCustomAngle((prev) => {
        const next = (prev + delta * 15) % 360;
        return next < 0 ? next + 360 : next;
      });
    }
  }, [totalFrames, hasFrames]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsAutoSpinning(false);
    setShowDragHint(false);
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = hasFrames ? currentFrameIndex : Math.round((customAngle / 360) * totalFrames);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const pxPerFrame = Math.max(6, Math.round(360 / totalFrames));
    const frameShift = Math.floor(deltaX / pxPerFrame);
    
    if (hasFrames) {
      const newIndex = (dragStartFrameRef.current - frameShift) % totalFrames;
      setCurrentFrameIndex(newIndex < 0 ? newIndex + totalFrames : newIndex);
    } else {
      const newDeg = ((dragStartFrameRef.current - frameShift) * (360 / totalFrames)) % 360;
      setCustomAngle(newDeg < 0 ? newDeg + 360 : newDeg);
    }
  }, [isDragging, totalFrames, hasFrames]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsAutoSpinning(false);
      setShowDragHint(false);
      dragStartXRef.current = e.touches[0].clientX;
      dragStartFrameRef.current = hasFrames ? currentFrameIndex : Math.round((customAngle / 360) * totalFrames);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const pxPerFrame = Math.max(6, Math.round(360 / totalFrames));
    const frameShift = Math.floor(deltaX / pxPerFrame);
    
    if (hasFrames) {
      const newIndex = (dragStartFrameRef.current - frameShift) % totalFrames;
      setCurrentFrameIndex(newIndex < 0 ? newIndex + totalFrames : newIndex);
    } else {
      const newDeg = ((dragStartFrameRef.current - frameShift) * (360 / totalFrames)) % 360;
      setCustomAngle(newDeg < 0 ? newDeg + 360 : newDeg);
    }
  }, [isDragging, totalFrames, hasFrames]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach global mouse and touch listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        stepFrame(-1);
      } else if (e.key === 'ArrowRight') {
        stepFrame(1);
      } else if (e.key === ' ' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        setIsAutoSpinning((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepFrame]);

  const currentDegrees = hasFrames
    ? Math.round((currentFrameIndex / totalFrames) * 360)
    : Math.round(customAngle);

  const isLoading = hasFrames && loadedCount < totalFrames && loadedCount > 0;
  const currentFrameUrl = hasFrames ? (activeFrames[currentFrameIndex] || activeFrames[0]) : (coverImage || '');

  return (
    <div
      ref={containerRef}
      id="vehicle-360-viewer"
      tabIndex={0}
      className={`relative flex flex-col select-none rounded-xl border border-[#262a38] bg-[#0c0d12] overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4 md:p-8 bg-black/95' : 'w-full shadow-2xl'
      }`}
    >
      {/* Top HUD Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2330] bg-[#10121a]/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059]">
            <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold tracking-wider uppercase text-white">360° Studio Turntable</span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-[#787f95]">
              Drag horizontally or use controls to inspect all 360° angles
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Fullscreen button */}
          <button
            id="360-fullscreen-toggle"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262a38] bg-[#141622] text-[#8e93a6] hover:text-white hover:border-[#c5a059]/50 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262a38] bg-[#141622] text-[#8e93a6] hover:text-white hover:border-red-400/50 transition"
              title="Close 360 View"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div
        className={`relative flex items-center justify-center w-full cursor-grab active:cursor-grabbing overflow-hidden ${
          isFullscreen ? 'flex-1' : 'aspect-[16/10]'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Subtle Studio Turntable Ground Ring & Lighting Grid */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-[80%] h-[35%] bottom-6 rounded-[100%] border border-[#c5a059]/15 bg-radial from-[#c5a059]/5 via-transparent to-transparent opacity-60" />
          <div className="absolute w-[50%] h-[20%] bottom-8 rounded-[100%] border border-[#c5a059]/25 opacity-40" />
        </div>

        {/* Active Frame Image */}
        {hasFrames ? (
          <img
            src={getAssetUrl(currentFrameUrl)}
            alt={`${vehicleName} 360 degree angle ${currentDegrees}°`}
            className="h-full w-full object-contain pointer-events-none transition-none select-none z-0"
            draggable={false}
            onError={(e) => {
              const img = e.currentTarget;
              const currentSrc = img.src;
              // Try alternate variations: unpadded/padded numbers, or png/jpeg/jpg
              if (currentSrc.includes('.png')) {
                img.src = currentSrc.replace('.png', '.jpeg');
              } else if (currentSrc.includes('.jpeg')) {
                img.src = currentSrc.replace('.jpeg', '.jpg');
              } else if (currentSrc.includes('.jpg')) {
                img.src = currentSrc.replace('.jpg', '.png');
              } else if (/\/\d\.(png|jpeg|jpg)/i.test(currentSrc)) {
                img.src = currentSrc.replace(/\/(\d)\.(png|jpeg|jpg)/i, '/0$1.$2');
              } else if (/\/0(\d)\.(png|jpeg|jpg)/i.test(currentSrc)) {
                img.src = currentSrc.replace(/\/0(\d)\.(png|jpeg|jpg)/i, '/$1.$2');
              }
            }}
          />
        ) : (
          /* Interactive 3D Perspective Orbit fallback for vehicles with single photo */
          <div
            className="relative h-full w-full flex items-center justify-center p-6 perspective-[1000px]"
            style={{
              perspective: '1200px',
            }}
          >
            <div
              className="relative transition-transform duration-75 flex items-center justify-center max-h-[85%] max-w-[85%]"
              style={{
                transform: `rotateY(${currentDegrees * 0.4}deg) scale(${1 + Math.sin((currentDegrees * Math.PI) / 180) * 0.05})`,
                filter: `drop-shadow(0 20px 25px rgba(0,0,0,0.8)) brightness(${0.9 + Math.cos((currentDegrees * Math.PI) / 180) * 0.15})`,
              }}
            >
              <img
                src={getAssetUrl(coverImage || '')}
                alt={`${vehicleName} 360° Studio Orbit`}
                className="max-h-full max-w-full object-contain pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>
        )}

        {/* Loading Progress Indicator */}
        {isLoading && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 rounded-full bg-black/80 px-3 py-1 text-xs text-[#a0a5b8] backdrop-blur-md border border-[#252838] pointer-events-none z-10">
            <div className="h-2 w-2 rounded-full bg-[#c5a059] animate-ping" />
            <span>Buffering 360° frames: {Math.round((loadedCount / totalFrames) * 100)}%</span>
          </div>
        )}

        {/* First-interaction Drag Hint Badge */}
        {showDragHint && (
          <div className="absolute bottom-6 flex items-center space-x-2 rounded-full border border-[#c5a059]/40 bg-[#0d0e14]/90 px-4 py-2 text-xs font-semibold text-[#f0f2f8] shadow-2xl backdrop-blur-md pointer-events-none animate-pulse z-10">
            <RotateCw className="h-4 w-4 text-[#c5a059]" />
            <span>Click &amp; Drag horizontally or swipe to rotate</span>
          </div>
        )}
      </div>

      {/* Bottom Control Bar & Angle Scrubbing */}
      <div className="border-t border-[#1f2330] bg-[#10121a]/95 px-4 py-3 space-y-3 z-10">
        {/* Angle Slider + Step Controls */}
        <div className="flex items-center space-x-3">
          <button
            id="360-step-left"
            onClick={() => stepFrame(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262a38] bg-[#141622] text-[#8e93a6] hover:text-white hover:border-[#c5a059]/50 transition"
            title="Rotate Left (ArrowLeft)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Interactive Scrub Range */}
          <div className="flex-1 flex items-center space-x-2">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#717688]">0°</span>
            <input
              type="range"
              min={0}
              max={totalFrames - 1}
              value={hasFrames ? currentFrameIndex : Math.round((customAngle / 360) * (totalFrames - 1))}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIsAutoSpinning(false);
                if (hasFrames) {
                  setCurrentFrameIndex(val);
                } else {
                  setCustomAngle((val / (totalFrames - 1)) * 360);
                }
              }}
              id="360-angle-slider"
              className="w-full h-1.5 bg-[#1f2230] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
            />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#717688]">360°</span>
          </div>

          <button
            id="360-step-right"
            onClick={() => stepFrame(1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262a38] bg-[#141622] text-[#8e93a6] hover:text-white hover:border-[#c5a059]/50 transition"
            title="Rotate Right (ArrowRight)"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Auto-Spin Button */}
          <button
            id="360-auto-spin-btn"
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              isAutoSpinning
                ? 'border-[#c5a059] bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/20'
                : 'border-[#262a38] bg-[#141622] text-[#c5a059] hover:bg-[#1a1d2c] hover:border-[#c5a059]/50'
            }`}
            title="Toggle Auto Spin (Space)"
          >
            {isAutoSpinning ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Auto Spin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
