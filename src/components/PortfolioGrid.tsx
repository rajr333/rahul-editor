'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { Film } from 'lucide-react';

interface PortfolioGridProps {
  projects: Project[];
  initialCategory?: string;
  showFilters?: boolean;
}

export default function PortfolioGrid({
  projects,
  initialCategory = 'Crime Documentary',
  showFilters = true,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const filterTabs = [
    { label: 'CRIME DOCUMENTARY', value: 'Crime Documentary' },
    { label: 'MOTION GRAPHICS', value: 'Motion Graphics' },
  ];

  const filteredProjects = projects.filter((project) => {
    return project.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-white/5 pb-6">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`text-xs uppercase tracking-widest px-4 py-2 transition-all font-medium border ${
                  isActive
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-zinc-400 hover:text-white border-white/5 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty Portfolio State as required by prompt #42 */
        <div className="py-20 text-center border border-dashed border-white/10 px-6 max-w-xl mx-auto my-12 bg-[#0a0a0c]">
          <Film className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
            WORK IN PROGRESS
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider">
            New projects are being added. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
