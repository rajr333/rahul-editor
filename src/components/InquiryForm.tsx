'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function InquiryForm({ initialType = '' }: { initialType?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialType || 'Crime Documentary',
    description: '',
    videoLength: '',
    deadline: '',
    budgetRange: '',
    referenceLink: '',
    footageLink: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Crime Documentary',
    'Talk / Podcast',
    'Motion Graphics',
    'YouTube Video',
    'Short-form Content',
    'Social Media',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Crime Documentary',
        description: '',
        videoLength: '',
        deadline: '',
        budgetRange: '',
        referenceLink: '',
        footageLink: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-[#0d0d10] border border-white/10 p-6 sm:p-10 md:p-12 relative overflow-hidden">
      {status === 'success' ? (
        <div className="py-12 text-center space-y-4 max-w-md mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold tracking-tight text-white uppercase">
            Thanks. Your project inquiry has been received.
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Rahul will review your requirements, footage specs, and narrative goals, and respond within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-6 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-red-950/40 border border-red-800/40 flex items-center gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. David Fincher"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Your Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@studio.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Type */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Project Type *
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
              >
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="bg-[#141418] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Video Length */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Estimated Video Length
              </label>
              <input
                type="text"
                placeholder="e.g. 12 minutes, 60s reel"
                value={formData.videoLength}
                onChange={(e) => setFormData({ ...formData, videoLength: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Target Deadline
              </label>
              <input
                type="text"
                placeholder="e.g. Next 2 weeks"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Project Description & Story Goals *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell Rahul about the story, target audience, editing style, tone, and specific challenges..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Budget Range */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Budget Range (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. $500 - $1,500"
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Reference Link */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Reference / Style Link
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                value={formData.referenceLink}
                onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* File / Footage Link */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Footage / Cloud Folder Link
              </label>
              <input
                type="url"
                placeholder="Google Drive, Dropbox, Frame.io..."
                value={formData.footageLink}
                onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              Direct response guaranteed. No spam.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              data-cursor="open"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Project Inquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
