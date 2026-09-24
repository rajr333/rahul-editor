'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface CaseStudySliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function CaseStudySlider({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW FOOTAGE',
  afterLabel = 'FINAL COLOR & EDIT',
  className = '',
}: CaseStudySliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative w-full aspect-video select-none overflow-hidden border border-white/10 cursor-ew-resize bg-black ${className}`}
    >
      {/* After Image (Full Background) with Color grading simulation if same image */}
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt="Final Edited Frame"
          className="w-full h-full object-cover filter contrast-125 saturate-110 brightness-105"
        />
        <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-mono tracking-widest text-emerald-400 border border-emerald-500/30 uppercase">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped Left Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImage}
            alt="Raw Unedited Frame"
            className="w-full h-full object-cover filter grayscale contrast-75 brightness-90"
          />
        </div>
        <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-mono tracking-widest text-zinc-400 border border-white/20 uppercase">
          {beforeLabel}
        </div>
      </div>

      {/* Draggable Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-xl">
          ↔
        </div>
      </div>

      {/* Instruction Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] text-zinc-400 font-mono tracking-widest uppercase border border-white/10">
        Drag to compare
      </div>
    </div>
  );
}
