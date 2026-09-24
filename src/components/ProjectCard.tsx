'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy load video only when near viewport to save mobile bandwidth and CPU
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [priority]);

  // Handle hover / touch preview
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <a
      ref={containerRef}
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="watch"
      className="group block relative bg-[#0d0d10] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden active:scale-[0.99] touch-manipulation"
    >
      {/* Video & Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#08080a]">
        {/* Lazy Loaded Video Preview */}
        {isInView ? (
          <video
            ref={videoRef}
            src={project.video ? `${project.video}#t=0.5` : ''}
            poster={project.thumbnail && !project.thumbnail.endsWith('.mp4') ? project.thumbnail : undefined}
            preload="metadata"
            muted
            playsInline
            loop
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              videoLoaded ? 'opacity-100' : 'opacity-80'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-[#111115] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
          </div>
        )}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 pointer-events-none" />

        {/* Duration & Year Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider z-10">
          <span className="bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-zinc-300 border border-white/10 uppercase font-medium">
            {project.category}
          </span>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="bg-black/75 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-zinc-300 border border-white/10 flex items-center gap-1">
              <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-zinc-400" />
              <span>{project.duration}</span>
            </span>
            <span className="bg-black/75 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-zinc-300 border border-white/10 flex items-center gap-1">
              <Calendar className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-zinc-400" />
              <span>{project.year}</span>
            </span>
          </div>
        </div>

        {/* Hover Center Play Pill */}
        <div
          className={`absolute inset-0 m-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 shadow-xl transform ${
            isHovered
              ? 'opacity-100 scale-100'
              : 'opacity-0 md:opacity-0 max-md:opacity-75 scale-90 md:scale-75'
          }`}
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors uppercase leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
          {project.description}
        </p>

        {/* Roles tags */}
        <div className="pt-1.5 sm:pt-2 flex flex-wrap gap-1 sm:gap-1.5">
          {project.role.slice(0, 3).map((r, i) => (
            <span
              key={i}
              className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-zinc-400 border border-white/5 bg-white/[0.02] px-1.5 sm:px-2 py-0.5"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
