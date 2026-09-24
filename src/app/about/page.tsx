import React from 'react';
import ToolkitSection from '@/components/ToolkitSection';
import { ArrowUpRight, Film, Sparkles, MessageSquare, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'About Rahul | Video Editor & Visual Storyteller',
  description:
    'Learn about Rahul Editor: creative philosophy, editing specializations in crime documentary, talk creative editing, and motion graphics.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 space-y-24 min-h-screen">
      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full border border-white/10 bg-black overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rahul.png"
                alt="Rahul - Video Editor & Visual Storyteller"
                className="w-full h-full object-cover filter contrast-110 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 font-mono">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                  Lead Editor & Visual Storyteller
                </span>
                <span className="text-xl font-bold uppercase text-white tracking-wide">
                  RAHUL EDITOR
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#0d0d10] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                Creative Motto
              </span>
              <p className="text-xs text-zinc-300 font-mono italic">
                &ldquo;I edit stories, not just footage.&rdquo;
              </p>
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold block">
                The Creative Behind The Cut
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
                I&apos;M RAHUL.
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 font-light">
                Professional Video Editor, Visual Storyteller &amp; Motion Designer.
              </p>
            </div>

            <div className="space-y-5 text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              <p>
                Editing is not merely placing clips on a timeline. It is the invisible art of controlling human heartbeats through visual rhythm, sound architecture, and psychological pacing.
              </p>
              <p>
                Every raw file contains raw potential. My focus is unearthing the spine of that story, carving away distractions, and building an edit where every second earns its place.
              </p>
              <p>
                Whether reconstructing complex investigations in long-form crime documentaries or crafting dynamic vector motion design, my work is built to be watched, felt, and remembered.
              </p>
            </div>

            {/* Core Disciplines */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
                Two Core Specializations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="/work/crime-documentary"
                  className="p-4 bg-[#0d0d10] border border-white/5 hover:border-red-500/30 transition-colors group block"
                >
                  <ShieldAlert className="w-4 h-4 text-red-500 mb-2" />
                  <h4 className="text-xs font-bold uppercase text-white group-hover:text-red-400 transition-colors">
                    Crime Documentary
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Investigative pacing &amp; archival tension.
                  </p>
                </a>

                <a
                  href="/work/motion-graphics"
                  className="p-4 bg-[#0d0d10] border border-white/5 hover:border-emerald-500/30 transition-colors group block"
                >
                  <Sparkles className="w-4 h-4 text-emerald-500 mb-2" />
                  <h4 className="text-xs font-bold uppercase text-white group-hover:text-emerald-400 transition-colors">
                    Motion Graphics
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Design systems &amp; vector animation.
                  </p>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Software & Toolkit */}
      <ToolkitSection />
    </div>
  );
}
