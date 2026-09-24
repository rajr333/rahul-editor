import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export default function ToolkitSection() {
  const coreDisciplines = [
    {
      title: 'Storytelling & Arc',
      detail: 'Building narrative tension, multi-act documentary flow, and emotional catharsis.',
    },
    {
      title: 'Rhythm & Pacing',
      detail: 'Calculated cuts, breathing pauses, micro-beats, and viewer retention dynamics.',
    },
    {
      title: 'Sound Design & Mastering',
      detail: 'Acoustic world-building, dialogue cleaning, tension swells, and stereo spatialization.',
    },
    {
      title: 'Motion & Kinetic Type',
      detail: 'Dynamic subtitle animation, map tracking, evidence callouts, and vector motion graphics.',
    },
    {
      title: 'Filmic Color Grading',
      detail: 'Mood setting, shadow separation, skin-tone preservation, and documentary cold hues.',
    },
    {
      title: 'B-Roll & Archival Fusion',
      detail: 'Seamlessly weaving documentary archives, 3D photo parallax, and contextual b-roll.',
    },
  ];

  const tools = [
    { name: 'Adobe Premiere Pro', category: 'NLE / Narrative Cutting & Pacing' },
    { name: 'Adobe After Effects', category: 'Motion Graphics, VFX & Animation' },
  ];

  return (
    <section className="py-24 bg-[#0a0a0c] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: The Editing Toolkit */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3">
                Core Competencies
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                THE EDITING TOOLKIT
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 mt-2">
                Pure editorial craftsmanship without gimmicks or arbitrary percentage bars.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreDisciplines.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#101014] border border-white/5 p-5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2 text-white font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tools I Use */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3">
                Production Environment
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                TOOLS I USE
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 mt-2">
                Industry-standard toolset calibrated for precision and broadcast fidelity.
              </p>
            </div>

            <div className="divide-y divide-white/5 border-t border-b border-white/5">
              {tools.map((t, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between group">
                  <span className="text-sm font-medium text-white group-hover:text-zinc-300 transition-colors">
                    {t.name}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#101014] border border-white/5 p-5 flex items-start gap-3">
              <Terminal className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed">
                Workstations equipped with calibrated color monitoring, lossless ProRes codecs, and cloud sync (Frame.io) for frictionless collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
