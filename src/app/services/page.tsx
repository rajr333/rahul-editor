import React from 'react';
import EditingWorkflow from '@/components/EditingWorkflow';
import { ArrowUpRight, CheckCircle2, Film, Mic, Sparkles, Volume2, Palette, Smartphone, Clock } from 'lucide-react';

export const metadata = {
  title: 'Services | Rahul Editor',
  description:
    'Comprehensive post-production video editing services: Documentary editing, talk & podcast editing, motion graphics, sound design, color grading, and short-form content.',
};

export default function ServicesPage() {
  const services = [
    {
      id: '01',
      title: 'VIDEO EDITING',
      subtitle: 'Long-Form & Narrative Cuts',
      icon: Film,
      description:
        'Comprehensive narrative editing for YouTube documentaries, brand films, and long-form features. Strategic cutting, multi-camera synchronization, and rhythm calibration.',
      deliverables: ['Full Master 4K Cut', 'Clean Archival Integration', 'Multi-Track Audio Mix'],
    },
    {
      id: '02',
      title: 'DOCUMENTARY EDITING',
      subtitle: 'Investigative & Case-Study Storytelling',
      icon: Clock,
      description:
        'Translating complex information, historical records, and police archives into suspenseful narrative arcs with calculated tension and investigative pacing.',
      deliverables: ['Story Arc Beat Sheet', 'Evidence Document Motion', 'Atmospheric Foley Stems'],
    },
    {
      id: '03',
      title: 'TALK & PODCAST EDITING',
      subtitle: 'High-Retention Conversational Edits',
      icon: Mic,
      description:
        'Engineered for maximum viewer retention. Seamless jump cuts, dynamic punch-ins, kinetic subtitle graphics, visual pattern interrupts, and podcast mastering.',
      deliverables: ['Engaging Long-Form Cut', 'Highlight Reel Pulls', 'Synchronized Subtitles'],
    },
    {
      id: '04',
      title: 'MOTION GRAPHICS',
      subtitle: 'Visual Systems & Typography',
      icon: Sparkles,
      description:
        'Bespoke motion design: kinetic typography, custom title sequences, animated infographics, geospatial map animations, and lower-third branding systems.',
      deliverables: ['Custom After Effects Rigs', 'Alpha Channel Overlays', 'Vector Motion Assets'],
    },
    {
      id: '05',
      title: 'SOUND DESIGN & FOLEY',
      subtitle: 'Acoustic Atmosphere & Impact',
      icon: Volume2,
      description:
        'Subtle room tones, tension risers, impact sub-bass, whooshes, noise reduction, dialogue repair, and balanced stereo/surround audio mastering.',
      deliverables: ['Mastered Dialogue Bus', 'Sound Effects Track Stems', 'Lossless WAV Master'],
    },
    {
      id: '06',
      title: 'COLOR GRADING',
      subtitle: 'Filmic Mood & Palette Finishing',
      icon: Palette,
      description:
        'Professional DaVinci Resolve color passes: scene-to-scene matching, shadow density, highlight roll-off, skin-tone isolation, and custom film LUT styling.',
      deliverables: ['ProRes Master Export', 'Custom Look LUTs', 'Rec.709 & HDR Conformance'],
    },
    {
      id: '07',
      title: 'SOCIAL MEDIA EDITING',
      subtitle: 'Shorts, Reels & TikTok Formats',
      icon: Smartphone,
      description:
        'Fast-paced 9:16 vertical cuts designed to hook scrollers in the first 2 seconds. Animated captions, sound effects, punch-ins, and loop timing.',
      deliverables: ['9:16 Optimized Deliveries', 'Hardcoded Kinetic Captions', 'Thumbnail Frame Selects'],
    },
  ];

  return (
    <div className="pt-32 pb-24 space-y-24 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          Production Services
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
          WHAT I CAN DO
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
          From full-scale documentary storytelling to high-velocity short-form content and motion graphics packages. Every service is executed with broadcast-grade precision.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-[#0c0c0f] border border-white/5 hover:border-white/20 p-8 space-y-6 flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">{service.id}</span>
                    <div className="p-2 bg-white/5 rounded text-zinc-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                    Key Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Workflow Section */}
      <EditingWorkflow />

      {/* Client Experience Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Client Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-white tracking-tight">
              HOW WE COLLABORATE
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              No lost emails, vague feedback loops, or missed deadlines. Working with Rahul is a structured creative partnership from ingestion to final delivery.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0e0e12] p-6 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                Cloud Ingestion &amp; Sync
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct uploads via Google Drive, Dropbox, or Frame.io with checksum verification.
              </p>
            </div>

            <div className="bg-[#0e0e12] p-6 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                Timecoded Review Links
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Leave frame-accurate comments directly on the video timeline for seamless revisions.
              </p>
            </div>

            <div className="bg-[#0e0e12] p-6 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                Structured Revisions
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clear revision phases focusing on rough assembly first, then pacing, audio, and color.
              </p>
            </div>

            <div className="bg-[#0e0e12] p-6 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                Multi-Format Mastering
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Final masters tailored to YouTube, broadcast television, Reels, or corporate web standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="p-10 md:p-16 bg-[#0c0c0f] border border-white/10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
            HAVE FOOTAGE READY?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Share your project details and footage links. Let&apos;s turn your material into a compelling final video.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
