'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'video' | 'cta' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'watch') {
          setCursorText('WATCH');
          setCursorVariant('project');
        } else if (type === 'play') {
          setCursorText('PLAY');
          setCursorVariant('video');
        } else if (type === 'open') {
          setCursorText('OPEN');
          setCursorVariant('cta');
        } else if (type === 'drag') {
          setCursorText('DRAG');
          setCursorVariant('drag');
        }
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible || typeof window === 'undefined') return null;

  const isExpanded = cursorVariant !== 'default';

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full text-black font-semibold text-[10px] tracking-widest ${
        isExpanded
          ? 'w-16 h-16 bg-white shadow-2xl backdrop-blur-md'
          : 'w-3 h-3 bg-white/80'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorText}
    </div>
  );
}
