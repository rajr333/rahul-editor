import React from 'react';
import { notFound } from 'next/navigation';
import { getProjects } from '@/lib/storage';
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudySlider from '@/components/CaseStudySlider';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Layers, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Navigation & Header */}
        <div className="space-y-6">
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back To Portfolio</span>
          </a>

          <div className="space-y-3">
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3 py-1">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Metadata Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/5 font-mono text-xs text-zinc-400">
            <div>
              <span className="block text-zinc-600 uppercase tracking-widest text-[10px] mb-1">
                Duration
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {project.duration}
              </span>
            </div>
            <div>
              <span className="block text-zinc-600 uppercase tracking-widest text-[10px] mb-1">
                Year
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {project.year}
              </span>
            </div>
            <div>
              <span className="block text-zinc-600 uppercase tracking-widest text-[10px] mb-1">
                Project Format
              </span>
              <span className="text-white font-medium">
                {project.projectType}
              </span>
            </div>
            {project.client && (
              <div>
                <span className="block text-zinc-600 uppercase tracking-widest text-[10px] mb-1">
                  Client / Channel
                </span>
                <span className="text-white font-medium">
                  {project.client}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Large Cinematic Video Player */}
        <div className="space-y-4">
          <div className="border border-white/10 shadow-2xl bg-black">
            <VideoPlayer
              src={project.video}
              poster={project.thumbnail}
              aspectRatio="cinematic"
              title={`${project.title} • Edited by Rahul`}
            />
          </div>
          <p className="text-right text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
            Full Resolution • Master Cut
          </p>
        </div>

        {/* Roles and Software Toolkit */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 border-b border-white/5">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
              Rahul&apos;s Role & Execution
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.role.map((r, i) => (
                <span
                  key={i}
                  className="bg-[#121216] border border-white/10 px-3 py-1.5 text-xs text-zinc-200 uppercase font-mono tracking-wider"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
              Tools & Software
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t, i) => (
                <span
                  key={i}
                  className="bg-[#121216] border border-white/10 px-3 py-1.5 text-xs text-zinc-200 uppercase font-mono tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Editing Breakdown / Case Study Narrative */}
        {project.caseStudy && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Post-Production Case Study
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                EDITING BREAKDOWN
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0c0c0f] border border-white/5 p-6 md:p-8 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  01 / Narrative Arc
                </h4>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {project.caseStudy.overview}
                </p>
              </div>

              <div className="bg-[#0c0c0f] border border-white/5 p-6 md:p-8 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  02 / The Editorial Challenge
                </h4>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="bg-[#0c0c0f] border border-white/5 p-6 md:p-8 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  03 / Executed Solution
                </h4>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Techniques Bullet Breakdown */}
            <div className="bg-[#09090c] border border-white/5 p-6 md:p-8 space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
                Techniques Applied In This Cut:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-300 font-mono">
                {project.caseStudy.techniques.map((tech, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 14 — PROJECT CASE STUDY: BEFORE VS AFTER COMPARISON SLIDER */}
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Frame Comparison
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              RAW FOOTAGE VS FINAL EDIT
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Interactive comparison revealing color grade, shadow recovery, and textural treatment.
            </p>
          </div>

          <CaseStudySlider
            beforeImage={project.beforeMedia || '/images/rahul.png'}
            afterImage={project.afterMedia || '/images/rahul.png'}
            beforeLabel="RAW LOG FOOTAGE"
            afterLabel="FINAL COLOR & EDIT"
          />
        </div>

        {/* 53 — PROJECT PAGE ENDING: NEXT PROJECT & FINAL CTA */}
        <div className="pt-20 border-t border-white/10 space-y-16">
          {/* Next Project Teaser */}
          {nextProject && nextProject.slug !== project.slug && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Next Project
              </p>
              <a
                href={`/work/${nextProject.slug}`}
                className="group block p-8 bg-[#0c0c0f] border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                      {nextProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                      {nextProject.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:translate-x-1 transition-transform">
                    <span>Watch Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Have a project in mind CTA */}
          <div className="p-8 sm:p-12 bg-gradient-to-b from-[#101014] to-[#070708] border border-white/10 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              HAVE A PROJECT IN MIND?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Send your raw footage, brief, or references. Let&apos;s build an edit that commands attention.
            </p>
            <div className="pt-2">
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
      </div>
    </article>
  );
}
