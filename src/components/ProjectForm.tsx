'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { Upload, Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProjectFormProps {
  initialProject?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({ initialProject, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialProject?.title || '',
    slug: initialProject?.slug || '',
    category: initialProject?.category || 'Crime Documentary Editing',
    description: initialProject?.description || '',
    thumbnail: initialProject?.thumbnail || '',
    video: initialProject?.video || '',
    duration: initialProject?.duration || '12:00',
    year: initialProject?.year || new Date().getFullYear().toString(),
    role: initialProject?.role?.join(', ') || 'Lead Editor, Sound Design, Color Grading',
    tools: initialProject?.tools?.join(', ') || 'Adobe Premiere Pro, Adobe After Effects',
    featured: initialProject?.featured ?? true,
    published: initialProject?.published ?? true,
    client: initialProject?.client || '',
    projectType: initialProject?.projectType || 'Investigative Documentary',
    caseStudyOverview: initialProject?.caseStudy?.overview || '',
    caseStudyChallenge: initialProject?.caseStudy?.challenge || '',
    caseStudySolution: initialProject?.caseStudy?.solution || '',
    techniques: initialProject?.caseStudy?.techniques?.join('\n') || 'Pacing tension building\nArchival document 3D animation\nCustom cold color grade',
    beforeMedia: initialProject?.beforeMedia || '/images/rahul.png',
    afterMedia: initialProject?.afterMedia || '/images/rahul.png',
  });

  const [uploading, setUploading] = useState<'video' | 'thumb' | 'before' | 'after' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    'Crime Documentary Editing',
    'Talk Creative Editing',
    'Motion Graphics',
    'Commercial / Brand Ad',
    'YouTube Longform',
    'Social Media / Reels',
  ];

  const handleFileUpload = async (file: File, field: 'video' | 'thumbnail' | 'beforeMedia' | 'afterMedia') => {
    setUploading(field === 'video' ? 'video' : field === 'thumbnail' ? 'thumb' : field === 'beforeMedia' ? 'before' : 'after');
    setStatusMessage(null);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      setFormData((prev) => ({ ...prev, [field]: json.url }));
      setStatusMessage({ type: 'success', text: `Uploaded ${file.name} successfully.` });
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Upload failed.' });
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: formData.category,
      description: formData.description,
      thumbnail: formData.thumbnail,
      video: formData.video,
      duration: formData.duration,
      year: formData.year,
      role: formData.role.split(',').map((s) => s.trim()).filter(Boolean),
      tools: formData.tools.split(',').map((s) => s.trim()).filter(Boolean),
      featured: formData.featured,
      published: formData.published,
      client: formData.client,
      projectType: formData.projectType,
      caseStudy: {
        overview: formData.caseStudyOverview,
        challenge: formData.caseStudyChallenge,
        solution: formData.caseStudySolution,
        techniques: formData.techniques.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      beforeMedia: formData.beforeMedia,
      afterMedia: formData.afterMedia,
    };

    try {
      const url = isEdit ? `/api/projects/${initialProject?.id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      setStatusMessage({ type: 'success', text: isEdit ? 'Project updated successfully.' : 'Project created successfully.' });
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Error saving project' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-[#0c0c10] border border-white/10 p-6 sm:p-10">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <a
          href="/admin"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </a>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="accent-white"
            />
            <span>Featured</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-mono text-emerald-400 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="accent-emerald-500"
            />
            <span>Published</span>
          </label>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 border text-xs flex items-center gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
              : 'bg-red-950/40 border-red-800/40 text-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. The Cold Case Dossier"
            className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#141418] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Custom Slug (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="the-cold-case-dossier"
            className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="14:20"
              className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Year
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="2026"
              className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          Brief Description *
        </label>
        <textarea
          rows={3}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Summary of the editing work, narrative angle, and visual style..."
          className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
        />
      </div>

      {/* Media Uploads / Links */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-300 font-semibold">
          Media Assets &amp; Video File
        </h3>

        {/* Video Asset */}
        <div className="p-4 bg-[#101014] border border-white/5 space-y-3">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Video Source URL or Upload (MP4 / WebM / MOV)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              placeholder="/videos/sample.mp4 or CDN URL"
              className="flex-1 bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
            />
            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading === 'video' ? 'Uploading...' : 'Upload Video'}</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'video');
                }}
              />
            </label>
          </div>
        </div>

        {/* Thumbnail Asset */}
        <div className="p-4 bg-[#101014] border border-white/5 space-y-3">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Poster / Thumbnail Image
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="/images/poster.jpg or URL"
              className="flex-1 bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
            />
            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading === 'thumb' ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'thumbnail');
                }}
              />
            </label>
          </div>
        </div>

        {/* Before / After Case Study Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#101014] border border-white/5 space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Before Frame (Raw Log)
            </label>
            <input
              type="text"
              value={formData.beforeMedia}
              onChange={(e) => setFormData({ ...formData, beforeMedia: e.target.value })}
              placeholder="/images/raw-frame.jpg"
              className="w-full bg-[#141418] border border-white/10 px-3 py-1.5 text-xs text-white font-mono"
            />
            <label className="cursor-pointer block text-center py-1.5 bg-white/5 hover:bg-white/10 text-[10px] uppercase font-mono tracking-wider text-zinc-300">
              <span>{uploading === 'before' ? 'Uploading...' : 'Upload Before Frame'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'beforeMedia');
                }}
              />
            </label>
          </div>

          <div className="p-4 bg-[#101014] border border-white/5 space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              After Frame (Final Color)
            </label>
            <input
              type="text"
              value={formData.afterMedia}
              onChange={(e) => setFormData({ ...formData, afterMedia: e.target.value })}
              placeholder="/images/final-frame.jpg"
              className="w-full bg-[#141418] border border-white/10 px-3 py-1.5 text-xs text-white font-mono"
            />
            <label className="cursor-pointer block text-center py-1.5 bg-white/5 hover:bg-white/10 text-[10px] uppercase font-mono tracking-wider text-zinc-300">
              <span>{uploading === 'after' ? 'Uploading...' : 'Upload After Frame'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'afterMedia');
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Roles & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Roles (Comma separated)
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Story Structure, Sound Design, Motion Graphics"
            className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Tools Used (Comma separated)
          </label>
          <input
            type="text"
            value={formData.tools}
            onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
            placeholder="Premiere Pro, After Effects, DaVinci Resolve"
            className="w-full bg-[#141418] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Case Study Details */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-300 font-semibold">
          Editorial Breakdown &amp; Case Study
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Case Study Overview
            </label>
            <textarea
              rows={2}
              value={formData.caseStudyOverview}
              onChange={(e) => setFormData({ ...formData, caseStudyOverview: e.target.value })}
              placeholder="What this project set out to achieve..."
              className="w-full bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              The Challenge
            </label>
            <textarea
              rows={2}
              value={formData.caseStudyChallenge}
              onChange={(e) => setFormData({ ...formData, caseStudyChallenge: e.target.value })}
              placeholder="Pacing bottlenecks, low quality archival footage..."
              className="w-full bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              The Executed Solution
            </label>
            <textarea
              rows={2}
              value={formData.caseStudySolution}
              onChange={(e) => setFormData({ ...formData, caseStudySolution: e.target.value })}
              placeholder="How Rahul solved the pacing and narrative flow..."
              className="w-full bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Key Techniques (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.techniques}
              onChange={(e) => setFormData({ ...formData, techniques: e.target.value })}
              placeholder="Tension building rhythm&#10;Dynamic kinetic subtitles&#10;Archival document mapping"
              className="w-full bg-[#141418] border border-white/10 px-4 py-2 text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update Project' : 'Publish Project'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
