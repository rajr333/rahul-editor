import React from 'react';
import { getProjects } from '@/lib/storage';
import PortfolioGrid from '@/components/PortfolioGrid';
import { MessageSquare, Mic, Zap, Eye, ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function TalkCreativePage() {
  const allProjects = await getProjects();
  const talkProjects = allProjects.filter(
    (p) => p.published && p.category.toLowerCase().includes('talk')
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

        <div className="border-l-2 border-blue-500 pl-6 py-2 space-y-3">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest">
            <Mic className="w-4 h-4" />
            <span>Category 02 • High-Retention Conversations</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            TALK CREATIVE EDITING
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light">
            Turning conversations into engaging visual stories.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed pt-2">
            Rahul knows how to turn static talking-head footage into high-retention visual assets. By pairing psychological pattern interrupts with animated typography and punch-in rhythms, viewer retention climbs.
          </p>
        </div>
      </div>

      {/* Editing Mechanics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Zap className="w-5 h-5 text-blue-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Dynamic Punch-Ins & Multi-Cam
          </h4>
          <p className="text-xs text-zinc-400">
            Simulating multi-camera setups from 4K raw footage to break monotonous eye-lines every 4-6 seconds.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Kinetic Subtitles & Type
          </h4>
          <p className="text-xs text-zinc-400">
            Cadence-matched animated typography with colored highlight keywords for effortless audio-free comprehension.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Eye className="w-5 h-5 text-blue-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Contextual B-Roll Fusion
          </h4>
          <p className="text-xs text-zinc-400">
            Carefully curated b-roll and screen recordings illustrating spoken ideas before viewer fatigue sets in.
          </p>
        </div>

        <div className="bg-[#0e0e12] p-5 border border-white/5 space-y-2">
          <Mic className="w-5 h-5 text-blue-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Soley SFX & Audio Sweetening
          </h4>
          <p className="text-xs text-zinc-400">
            Subtle swooshes, clicks, and risers synchronized to visual emphasis points to reset attention spans.
          </p>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">
          Talk Creative Projects
        </h2>
        <PortfolioGrid projects={talkProjects} showFilters={false} />
      </div>
    </div>
  );
}
