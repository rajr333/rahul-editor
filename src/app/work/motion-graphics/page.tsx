import React from 'react';
import { getProjects } from '@/lib/storage';
import PortfolioGrid from '@/components/PortfolioGrid';
import { Sparkles, Layers, Sliders, Type, ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function MotionGraphicsPage() {
  const allProjects = await getProjects();
  const motionProjects = allProjects.filter(
    (p) => p.published && p.category.toLowerCase().includes('motion')
  );

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16 min-h-screen">
      <div className="space-y-6">
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back To All Work</span>
        </a>

        <div className="border-l-2 border-emerald-500 pl-6 py-2 space-y-3">
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Category 03 • Motion Systems & Animation</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            MOTION GRAPHICS
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light">
            Design, movement and storytelling in motion.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed pt-2">
            Rahul doesn&apos;t just cut footage. He builds movement and visual systems. From 2D vector animation to custom title sequences, infographic visualization, and interface choreography.
          </p>
        </div>
      </div>

      {/* Motion Disciplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Type className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Kinetic Typography
          </h4>
          <p className="text-xs text-zinc-400">
            Speed-graph tuned easing, tracking expansion, and weight transitions that give voice physical form.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Data Visualization
          </h4>
          <p className="text-xs text-zinc-400">
            Converting static spreadsheets, market graphs, and complex telemetry into fluid animated charts.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Lower Thirds & Branding
          </h4>
          <p className="text-xs text-zinc-400">
            Cohesive editorial design packages including title sequences, name lower-thirds, and bug branding.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            UI & Screen Animation
          </h4>
          <p className="text-xs text-zinc-400">
            Simulating digital interfaces, cursor clicks, browser scrolls, and app interactions with 3D depth.
          </p>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">
          Motion Graphics Projects
        </h2>
        <PortfolioGrid projects={motionProjects} showFilters={false} />
      </div>
    </div>
  );
}
