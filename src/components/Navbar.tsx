'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Play, ArrowUpRight, MessageCircle, Mail } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070708]/95 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white group-hover:text-zinc-300 transition-colors uppercase">
              RAHUL EDITOR
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
              Visual Storyteller
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/#showreel"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-white py-2 px-3 border border-white/10 hover:border-white/30 rounded-none transition-all group"
            >
              <Play className="w-3 h-3 text-white fill-current group-hover:scale-110 transition-transform" />
              <span>Showreel</span>
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-white text-black hover:bg-zinc-200 px-4 py-2 transition-all group"
            >
              <span>Let&apos;s Work</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls: WhatsApp Quick Icon + Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="https://wa.me/917488471551"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-400 hover:text-emerald-300 bg-white/5 border border-white/10 active:scale-95 transition-all"
              aria-label="Direct WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-white bg-white/5 border border-white/10 focus:outline-none active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070708]/98 backdrop-blur-xl flex flex-col justify-between px-6 sm:px-8 pt-24 pb-8 md:hidden animate-in fade-in duration-200">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold mb-6">
              Navigation
            </p>
            {navLinks.map((link) => (
              <div key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-light tracking-tight text-white hover:text-zinc-400 transition-colors uppercase block py-1"
                >
                  {link.label}
                </a>
              </div>
            ))}
            <div>
              <a
                href="/#showreel"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-400 hover:text-white transition-colors uppercase block py-1"
              >
                Watch Showreel
              </a>
            </div>
          </div>

          {/* Mobile Bottom Contacts */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="https://wa.me/917488471551"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs uppercase tracking-widest font-semibold active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +91 74884 71551</span>
            </a>

            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-black text-xs uppercase tracking-widest font-bold active:scale-[0.98] transition-all"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <a
                href="mailto:editoroffical71551@gmail.com"
                className="inline-flex items-center gap-1 hover:text-zinc-300 truncate"
              >
                <Mail className="w-3 h-3 text-zinc-400" />
                <span>editoroffical71551@gmail.com</span>
              </a>
              <span className="text-zinc-600 uppercase">Rahul Editor</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
