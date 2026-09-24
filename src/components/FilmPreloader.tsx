'use client';

import React, { useEffect, useState } from 'react';

export default function FilmPreloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if session has already seen preloader
    const hasSeen = sessionStorage.getItem('rahul_preloader_seen');
    if (hasSeen) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('rahul_preloader_seen', 'true');
      }, 500);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#070708] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-4 px-6">
        <div className="w-12 h-1 bg-white/20 mx-auto overflow-hidden">
          <div className="w-full h-full bg-white animate-[pulse_1s_infinite]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase">
          RAHUL EDITOR
        </h1>
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500">
          EDITING THE EXPERIENCE...
        </p>
      </div>
    </div>
  );
}
