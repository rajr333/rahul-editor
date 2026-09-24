import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/5 pt-20 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand & Positioning */}
          <div className="md:col-span-6 space-y-4">
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white uppercase">
                RAHUL EDITOR
              </span>
            </a>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium">
              Video Editor • Visual Storyteller • Motion
            </p>
            <p className="text-sm text-zinc-400 max-w-md pt-2 leading-relaxed">
              Crafting stories through cuts, sound, motion and visual rhythm. Transforming raw, fragmented footage into compelling, high-retention visual narratives.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-200 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-medium">
              <li>
                <a href="/work" className="hover:text-white transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/work/crime-documentary" className="hover:text-white transition-colors">
                  Crime Documentary
                </a>
              </li>
              <li>
                <a href="/work/motion-graphics" className="hover:text-white transition-colors">
                  Motion Graphics
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Rahul
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Project Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-200 font-semibold mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-medium">
              <li>
                <a
                  href="https://wa.me/917488471551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>WhatsApp: +91 74884 71551</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:editoroffical71551@gmail.com"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors lowercase"
                >
                  <span>editoroffical71551@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Start Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
          <p>© 2026 Rahul Editor. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="text-[11px] tracking-wider uppercase text-zinc-500">
              I edit stories, not just footage.
            </span>
            <a
              href="/admin"
              className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
