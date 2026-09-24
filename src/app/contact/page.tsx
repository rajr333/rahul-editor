import React from 'react';
import InquiryForm from '@/components/InquiryForm';
import { Mail, MessageSquare, ArrowUpRight, Clock, ShieldCheck, Globe, Video } from 'lucide-react';

export const metadata = {
  title: 'Contact & Project Inquiry | Rahul Editor',
  description:
    'Start a project inquiry with Rahul Editor. Book video editing for crime documentaries and motion graphics.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 space-y-12 sm:space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-3 sm:space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          Initiate Collaboration
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-tight">
          HAVE A PROJECT IN MIND?
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed">
          Tell me what you&apos;re working on. Let&apos;s turn the footage into something worth watching.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <InquiryForm />
          </div>

          {/* Direct Channels Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0c0c0f] border border-white/10 p-6 md:p-8 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-300 font-semibold">
                Direct Contact
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href="mailto:editoroffical71551@gmail.com"
                  className="p-4 bg-[#141418] border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    <span className="text-white font-mono">editoroffical71551@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                </a>

                <a
                  href="https://wa.me/917488471551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#141418] border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-white font-mono block">+91 74884 71551</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">WhatsApp Direct</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Standard Response Time Info */}
            <div className="p-6 bg-[#0c0c0f] border border-white/5 space-y-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-white font-mono text-[11px] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Response SLA</span>
              </div>
              <p className="leading-relaxed">
                Rahul reviews all project briefs within 24 hours. For urgent documentary deadlines, please indicate in the timeline field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
