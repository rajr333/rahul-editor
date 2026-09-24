'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { Edit2, Trash2, Star, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminProjectList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleFeatured = async (project: Project) => {
    setLoadingId(project.id);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects(
          projects.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const togglePublished = async (project: Project) => {
    setLoadingId(project.id);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !project.published }),
      });
      if (res.ok) {
        setProjects(
          projects.map((p) =>
            p.id === project.id ? { ...p, published: !p.published } : p
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-white/10 bg-[#0c0c0f]">
        <p className="text-sm text-zinc-400 mb-4">No projects in portfolio yet.</p>
        <a
          href="/admin/projects/new"
          className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider inline-block"
        >
          Add First Project
        </a>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-[#0d0d11] overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-white/10 bg-[#121217] uppercase font-mono tracking-wider text-zinc-400">
          <tr>
            <th className="p-4">Project</th>
            <th className="p-4">Category</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Year</th>
            <th className="p-4 text-center">Featured</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((project) => {
            const isLoading = loadingId === project.id;
            return (
              <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-white uppercase text-sm">
                    {project.title}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    /{project.slug}
                  </div>
                </td>

                <td className="p-4">
                  <span className="bg-white/5 border border-white/5 px-2 py-1 text-zinc-300 font-mono text-[10px] uppercase">
                    {project.category}
                  </span>
                </td>

                <td className="p-4 font-mono text-zinc-400">
                  {project.duration}
                </td>

                <td className="p-4 font-mono text-zinc-400">
                  {project.year}
                </td>

                <td className="p-4 text-center">
                  <button
                    disabled={isLoading}
                    onClick={() => toggleFeatured(project)}
                    className={`p-1.5 transition-colors ${
                      project.featured
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                    title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                  </button>
                </td>

                <td className="p-4 text-center">
                  <button
                    disabled={isLoading}
                    onClick={() => togglePublished(project)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-none border transition-colors ${
                      project.published
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40 hover:bg-emerald-900/50'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700'
                    }`}
                  >
                    {project.published ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Live</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>
                </td>

                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <a
                      href={`/work/${project.slug}`}
                      target="_blank"
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={`/admin/projects/${project.id}`}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </a>

                    <button
                      disabled={isLoading}
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete Project"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
