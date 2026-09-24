'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Menu, X, Play, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            ? 'bg-[#070708]/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors uppercase">
              RAHUL EDITOR
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
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
          <div className="hidden md:flex items-center space-x-5">
            <a
              href="#showreel"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-white py-2 px-3 border border-white/10 hover:border-white/30 rounded-none transition-all group"
            >
              <Play className="w-3 h-3 text-white fill-current group-hover:scale-110 transition-transform" />
              <span>Showreel</span>
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-white text-black hover:bg-zinc-200 px-4 py-2 transition-all group"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070708] flex flex-col justify-between px-8 py-24 md:hidden">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-8">
              Navigation
            </p>
            {navLinks.map((link) => (
              <div key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light tracking-tight text-white hover:text-zinc-400 transition-colors uppercase block"
                >
                  {link.label}
                </a>
              </div>
            ))}
            <div>
              <a
                href="#showreel"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light tracking-tight text-zinc-400 hover:text-white transition-colors uppercase block"
              >
                Watch Showreel
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[11px] text-zinc-600 text-center tracking-wider uppercase">
              Rahul Editor • Cinematic Visuals
            </p>
          </div>
        </div>
      )}
    </>
  );
}
