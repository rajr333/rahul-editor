import React from 'react';
import { Layers, Scissors, Disc, Sparkles, Volume2, Palette, Send, FileVideo } from 'lucide-react';

export default function EditingWorkflow() {
  const steps = [
    {
      num: '01',
      title: 'RAW FOOTAGE',
      description: 'Ingesting and organizing multi-cam, sound tracks, and archival assets with timeline markers.',
      icon: FileVideo,
    },
    {
      num: '02',
      title: 'STORY STRUCTURE',
      description: 'Defining narrative arc, tension hooks, beat sheets, and emotional pacing before touching cuts.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'ROUGH CUT',
      description: 'Assembling primary storyline, establishing narrative rhythm, and selecting standout takes.',
      icon: Scissors,
    },
    {
      num: '04',
      title: 'FINE CUT',
      description: 'Micro-trimming frames, calibrating jump-cuts, pattern interrupts, and seamless visual transitions.',
      icon: Disc,
    },
    {
      num: '05',
      title: 'SOUND DESIGN',
      description: 'Building multi-layer sonic atmosphere, sub-bass tension risers, whooshes, and dialogue sweetening.',
      icon: Volume2,
    },
    {
      num: '06',
      title: 'MOTION GRAPHICS',
      description: 'Integrating kinetic typography, animated subtitles, timeline maps, and evidence callouts.',
      icon: Sparkles,
    },
    {
      num: '07',
      title: 'COLOR',
      description: 'Filmic color grading, contrast curves, highlight preservation, and atmospheric color palettes.',
      icon: Palette,
    },
    {
      num: '08',
      title: 'FINAL DELIVERY',
      description: 'Master export in ProRes/H.265/social aspect ratios (16:9, 9:16, 1:1) with synchronized audio stems.',
      icon: Send,
    },
  ];

  return (
    <section className="py-24 bg-[#070708] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3">
            Workflow Architecture
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
            FROM RAW TO FINAL
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mt-4 max-w-xl">
            A methodical 8-stage post-production pipeline built to ensure narrative clarity, acoustic depth, and visual impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-[#0c0c0f] border border-white/5 hover:border-white/20 p-6 md:p-8 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">
                    {step.num}
                  </span>
                  <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
