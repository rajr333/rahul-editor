import React from 'react';
import { getProjects, getCategories } from '@/lib/storage';
import VideoPlayer from '@/components/VideoPlayer';
import ProjectCard from '@/components/ProjectCard';
import EditingWorkflow from '@/components/EditingWorkflow';
import ToolkitSection from '@/components/ToolkitSection';
import InquiryForm from '@/components/InquiryForm';
import { ArrowUpRight, Play, Film, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const revalidate = 0; // always fetch latest

export default async function HomePage() {
  const projects = await getProjects();
  const categories = await getCategories();
  const featuredProjects = projects.filter((p) => p.featured && p.published);
  const displayFeatured = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <div className="relative">
      {/* 02 — CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="space-y-5 sm:space-y-6 max-w-4xl z-10">
          <div className="inline-flex items-center gap-2 py-1 px-2.5 sm:px-3 border border-white/10 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-zinc-400 uppercase bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>VIDEO EDITOR • STORYTELLING • MOTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.98]">
            VIDEO EDITOR.<br />
            <span className="text-zinc-400">VISUAL STORYTELLER.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            I turn raw footage into engaging stories through editing, sound design, motion and visual rhythm.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="/work"
              data-cursor="open"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl text-center active:scale-95"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all text-center active:scale-95"
            >
              <span>Let&apos;s Work Together</span>
            </a>
          </div>
        </div>

        {/* Cinematic Video Preview / Showreel in Hero */}
        <div id="showreel" className="mt-10 sm:mt-12 md:mt-16 w-full relative scroll-mt-24">
          <div className="relative border border-white/10 overflow-hidden shadow-2xl bg-black">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>REEL PREVIEW • 2026</span>
            </div>
            <VideoPlayer
              src="/videos/crime-documentary/6.mp4"
              poster="/images/rahul.png"
              autoPlay={true}
              loop={true}
              muted={true}
              aspectRatio="cinematic"
              title="Rahul Editor — Crime Documentary & Visual Rhythm Reel"
            />
          </div>
        </div>
      </section>

      {/* 03 — SHORT INTRODUCTION SECTION */}
      <section className="py-24 bg-[#0a0a0d] border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center md:text-left space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
            Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            EDITING IS MORE THAN CUTTING.
          </h2>
          <div className="space-y-3 text-base md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl">
            <p>Rahul approaches editing as storytelling.</p>
            <p className="text-zinc-400">Every cut should have a reason.</p>
            <p className="text-zinc-400">Every pause should create rhythm.</p>
            <p className="text-zinc-400">Every sound should support the story.</p>
            <p className="text-white font-normal">Every visual should move the viewer forward.</p>
          </div>
        </div>
      </section>

      {/* 04 & 06 — WHAT I EDIT (THE TWO SPECIALIZATIONS) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-2 sm:mb-3">
            Core Focus Areas
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
            WHAT I EDIT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* 01: CRIME DOCUMENTARY EDITING */}
          <div className="group relative bg-[#0d0d10] border border-white/5 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <video
                src="/videos/crime-documentary/1.mp4"
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-2xl font-bold text-red-500">
                01
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                  CRIME DOCUMENTARY EDITING
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                  Dark stories • Complex information • Precise pacing
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-3 sm:mt-4 leading-relaxed font-light">
                  Crafting investigative tension, evidence boards, archival asset integration, map animations, and deep atmospheric soundscapes.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-white/5">
                <a
                  href="/work/crime-documentary"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-red-400 transition-colors"
                >
                  <span>Explore Category</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 02: MOTION GRAPHICS */}
          <div className="group relative bg-[#0d0d10] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <video
                src="/videos/motion-graphics/final.mp4"
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-2xl font-bold text-emerald-500">
                02
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  MOTION GRAPHICS
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                  Design, movement and storytelling in motion
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-3 sm:mt-4 leading-relaxed font-light">
                  Building visual motion systems: kinetic typography, infographics, data visualization, UI animations, and title sequences.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-white/5">
                <a
                  href="/work/motion-graphics"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-emerald-400 transition-colors"
                >
                  <span>Explore Category</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — SELECTED WORK SECTION */}
      <section className="py-20 sm:py-24 bg-[#070708] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-2 sm:mb-3">
                Curated Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                SELECTED WORK
              </h2>
            </div>
            <a
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayFeatured.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 19 — DEDICATED SHOWREEL SECTION */}
      <section id="showreel" className="py-24 bg-[#0a0a0c] border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-2">
                Cinematic Reel
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                WATCH THE REEL
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-400 border border-white/10 px-3 py-1 bg-white/5 uppercase">
              01:00 / SHOWREEL
            </span>
          </div>

          <div className="border border-white/10 shadow-2xl bg-black">
            <VideoPlayer
              src="/videos/crime-documentary/1.mp4"
              poster="/images/rahul.png"
              aspectRatio="cinematic"
              title="Rahul Editor — 2026 Showreel Master"
            />
          </div>
        </div>
      </section>

      {/* 15 — EDITING PROCESS SECTION */}
      <EditingWorkflow />

      {/* 20 — SERVICES SECTION: WHAT I CAN DO */}
      <section className="py-24 bg-[#070708] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              WHAT I CAN DO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'VIDEO EDITING',
                desc: 'Long-form and short-form storytelling cut with deliberate narrative rhythm.',
              },
              {
                title: 'DOCUMENTARY EDITING',
                desc: 'Story-driven documentary editing, investigative pacing, and archival weaving.',
              },
              {
                title: 'MOTION GRAPHICS',
                desc: 'Typography, infographics, logo motion, map tracking, and custom 2D systems.',
              },
              {
                title: 'SOUND DESIGN',
                desc: 'Soley soundscapes, atmosphere, risers, impact cues, and dialogue enhancement.',
              },
              {
                title: 'COLOR GRADING',
                desc: 'Cinematic color treatment, shadow depth, tone curves, and atmospheric LUTs.',
              },
              {
                title: 'SOCIAL MEDIA EDITING',
                desc: 'Shorts, Reels, TikToks, and vertical video structured for immediate hooks.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-[#0c0c0f] border border-white/5 hover:border-white/20 p-8 space-y-3 transition-colors"
              >
                <div className="font-mono text-xs text-zinc-500">0{idx + 1}</div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 48 & 49 — TOOLKIT & SOFTWARE */}
      <ToolkitSection />

      {/* 21 — WHY RAHUL */}
      <section className="py-24 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3">
              Editorial Tenets
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              WHY WORK WITH RAHUL?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                STORY-FIRST EDITING
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Editing decisions are grounded in storytelling and psychological tension, not frivolous visual noise.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                ATTENTION TO DETAIL
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Timing, sound layers, typography, and visual rhythm are calibrated frame-by-frame.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                MULTI-DISCIPLINARY
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                A seamless blend of narrative editing, sound design, motion graphics, and color finishing.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                PLATFORM AWARE
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Edits structured with calculated hook mechanics for YouTube, Reels, long-form broadcast, and web.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                CONSISTENT COMMUNICATION
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Organized milestones from raw ingestion to first cut, revision rounds, and final masters.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/10 pl-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                CLIENT EXPERIENCE
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Timecoded Frame.io reviews, lossless exports, and structured project revisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 24 — ABOUT RAHUL SPOTLIGHT */}
      <section className="py-24 bg-[#070708] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full border border-white/10 bg-black overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/rahul.png"
                  alt="Rahul Editor"
                  className="w-full h-full object-cover filter contrast-110 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Lead Editor
                  </span>
                  <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                    RAHUL
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                About The Editor
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                I&apos;M RAHUL.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                <p className="text-white font-medium">
                  Video Editor + Visual Storyteller + Motion Designer
                </p>
                <p>
                  I approach post-production not as an assembly line of cuts, but as visual architecture. Every frame holds information, every silence creates suspense, and every rhythmic shift commands human attention.
                </p>
                <p>
                  Specializing in Crime Documentary Editing and Motion Graphics, my mission is simple: turn raw footage into stories that stay with the audience long after the screen goes dark.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <a
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-white hover:text-zinc-300 transition-colors"
                >
                  <span>Read Full Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="text-zinc-600">•</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  <span>Start A Project</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 26 & 27 — FINAL CTA & PROJECT INQUIRY FORM */}
      <section className="py-28 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              HAVE A PROJECT IN MIND?
            </h2>
            <p className="text-sm md:text-base text-zinc-400">
              Tell me what you&apos;re working on. Let&apos;s turn the footage into something worth watching.
            </p>
          </div>

          <InquiryForm />
        </div>
      </section>
    </div>
  );
}
