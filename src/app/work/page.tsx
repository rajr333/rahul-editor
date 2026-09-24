import React from 'react';
import { getProjects } from '@/lib/storage';
import PortfolioGrid from '@/components/PortfolioGrid';

export const revalidate = 0;

export default async function WorkPage() {
  const projects = await getProjects();
  const publishedProjects = projects.filter((p) => p.published);

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 sm:space-y-12 min-h-screen">
      <div className="space-y-3 sm:space-y-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          Portfolio Archive
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          SELECTED WORK
        </h1>
        <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed">
          Explore investigative crime documentaries and kinetic motion graphics systems. Every cut engineered with deliberate narrative pacing.
        </p>
      </div>

      <PortfolioGrid projects={publishedProjects} initialCategory="Crime Documentary" showFilters={true} />
    </div>
  );
}
