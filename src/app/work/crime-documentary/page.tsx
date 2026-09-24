import React from 'react';
import { getProjects } from '@/lib/storage';
import PortfolioGrid from '@/components/PortfolioGrid';
import { ShieldAlert, Compass, Clock, FileText, ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function CrimeDocumentaryPage() {
  const allProjects = await getProjects();
  const crimeProjects = allProjects.filter(
    (p) => p.published && p.category.toLowerCase().includes('crime')
  );

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16 min-h-screen">
      <div className="space-y-6">
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back To All Work</span>
        </a>

        <div className="border-l-2 border-red-600 pl-4 sm:pl-6 py-2 space-y-3">
          <div className="flex items-center gap-2 text-red-500 font-mono text-[11px] sm:text-xs uppercase tracking-widest">
            <ShieldAlert className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Category 01 • Investigative Narratives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            CRIME DOCUMENTARY EDITING
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light">
            Dark stories. Complex information. Precise pacing.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed pt-2">
            Rahul specializes in turning fragmented case files, police transcripts, and historical news archives into gripping investigative documentaries that keep viewers spellbound without sensationalizing trauma.
          </p>
        </div>
      </div>

      {/* Visual Language / Evidence Elements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Compass className="w-5 h-5 text-red-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Geospatial & Map Motion
          </h4>
          <p className="text-xs text-zinc-400">
            Reconstructing suspect routes and location timelines with subtle 2.5D topographic maps.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <FileText className="w-5 h-5 text-red-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Evidence Texture Layers
          </h4>
          <p className="text-xs text-zinc-400">
            Archival newspaper treatments, redacted dossiers, and authentic microfilm scanning effects.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Clock className="w-5 h-5 text-red-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Chronological Pacing
          </h4>
          <p className="text-xs text-zinc-400">
            Slow-burn tension building followed by sharp analytical reveals and forensic scrutiny.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Cold Color Grading
          </h4>
          <p className="text-xs text-zinc-400">
            Desaturated cinematic shadows, steel-blue highlights, and moody low-key lighting balance.
          </p>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">
          Documentary Case Studies
        </h2>
        <PortfolioGrid projects={crimeProjects} showFilters={false} />
      </div>
    </div>
  );
}
