'use client';

import React, { useRef, useState } from 'react';
import { Play, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
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
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="watch"
      className="group block relative bg-[#0d0d10] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Video & Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {/* Video Preview on hover */}
        <video
          ref={videoRef}
          src={project.video ? `${project.video}#t=0.5` : ''}
          poster={project.thumbnail && !project.thumbnail.endsWith('.mp4') ? project.thumbnail : undefined}
          preload="metadata"
          muted
          playsInline
          loop
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

        {/* Duration & Year Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono tracking-wider z-10">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 text-zinc-300 border border-white/10 uppercase">
            {project.category}
          </span>
          <div className="flex items-center space-x-2">
            <span className="bg-black/70 backdrop-blur-md px-2 py-1 text-zinc-300 border border-white/10 flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{project.duration}</span>
            </span>
            <span className="bg-black/70 backdrop-blur-md px-2 py-1 text-zinc-300 border border-white/10 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-400" />
              <span>{project.year}</span>
            </span>
          </div>
        </div>

        {/* Hover Center Play Pill */}
        <div
          className={`absolute inset-0 m-auto w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 transform ${
            isHovered
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors uppercase">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
        </div>

        <p className="text-xs md:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Roles tags */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {project.role.slice(0, 3).map((r, i) => (
            <span
              key={i}
              className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 border border-white/5 px-2 py-0.5"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
