'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: 'cinematic' | 'video' | 'square' | 'custom';
}

export default function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
  aspectRatio = 'video',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or user interaction needed
        });
      }
    }
  }, [isPlaying]);

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle fullscreen (with iOS Safari webkit fallback)
  const toggleFullscreen = () => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (container.requestFullscreen) {
      container.requestFullscreen().catch(() => {});
    } else if ((video as any).webkitEnterFullscreen) {
      // iOS Safari video fullscreen
      (video as any).webkitEnterFullscreen();
    }
  };

  // Seek bar change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  // Auto-hide controls on inactivity (desktop & mobile)
  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Pause when scrolled off screen to optimize device CPU & battery
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else if (autoPlay) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const aspectClass =
    aspectRatio === 'cinematic'
      ? 'aspect-[2.39/1]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'custom'
      ? ''
      : 'aspect-video';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className={`relative group bg-black overflow-hidden rounded-none border border-white/10 ${aspectClass} ${className} touch-manipulation`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          setIsBuffering(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onError={() => setHasError(true)}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Error Fallback with fast Reload button */}
      {hasError && (
        <div className="absolute inset-0 bg-[#0c0c0e] flex flex-col items-center justify-center p-6 text-center z-20">
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mb-2 sm:mb-3" />
          <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1">
            Video Loading Paused
          </h4>
          <p className="text-zinc-500 text-[11px] sm:text-xs mb-3 sm:mb-4 max-w-xs">
            Tap below to reload the video player instantly.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setIsBuffering(true);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-[11px] sm:text-xs uppercase text-zinc-200 hover:text-white hover:border-white transition-colors bg-white/5 active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reload Video</span>
          </button>
        </div>
      )}

      {/* Large Center Play Overlay (when paused) */}
      {!isPlaying && !hasError && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-black/65 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-10 shadow-2xl"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current ml-0.5" />
        </button>
      )}

      {/* Buffering Indicator */}
      {isBuffering && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15 bg-black/30 backdrop-blur-[2px]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Controls Bar (fades smoothly on mobile & desktop) */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber with large touch-friendly hit area */}
        <div className="relative mb-2 sm:mb-3 flex items-center py-1">
          <input
            type="range"
            min={0}
            max={100}
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-1.5 sm:h-1 bg-white/25 rounded-none appearance-none cursor-pointer accent-white hover:h-2 transition-all"
            aria-label="Video scrubber"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={togglePlay}
              className="p-1 sm:p-1.5 hover:text-zinc-300 transition-colors focus:outline-none active:scale-90"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1 sm:p-1.5 hover:text-zinc-300 transition-colors focus:outline-none active:scale-90"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-300 tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {title && (
              <span className="hidden lg:inline-block text-zinc-400 text-[11px] uppercase tracking-wider truncate max-w-xs">
                {title}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-1 sm:p-1.5 hover:text-zinc-300 transition-colors focus:outline-none active:scale-90"
              aria-label="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
