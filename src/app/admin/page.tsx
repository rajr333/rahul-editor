import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/auth';
import { getProjects, getInquiries } from '@/lib/storage';
import AdminLayout from '@/components/AdminLayout';
import AdminProjectList from '@/components/AdminProjectList';
import { Film, Star, FileText, CheckCircle, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const projects = await getProjects();
  const inquiries = await getInquiries();

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const publishedProjects = projects.filter((p) => p.published).length;
  const draftProjects = totalProjects - publishedProjects;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <AdminLayout title="Studio Dashboard">
      <div className="space-y-10">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#0f0f14] border border-white/5 p-5 space-y-1">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-mono uppercase tracking-wider">Total Work</span>
              <Film className="w-4 h-4" />
            </div>
            <div className="text-3xl font-black text-white">{totalProjects}</div>
          </div>

          <div className="bg-[#0f0f14] border border-white/5 p-5 space-y-1">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-mono uppercase tracking-wider">Featured</span>
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{featuredProjects}</div>
          </div>

          <div className="bg-[#0f0f14] border border-white/5 p-5 space-y-1">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-mono uppercase tracking-wider">Published</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{publishedProjects}</div>
          </div>

          <div className="bg-[#0f0f14] border border-white/5 p-5 space-y-1">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-mono uppercase tracking-wider">Drafts</span>
              <FileText className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-3xl font-black text-zinc-400">{draftProjects}</div>
          </div>

          <div className="bg-[#0f0f14] border border-white/5 p-5 space-y-1">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-mono uppercase tracking-wider">Inquiries</span>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-blue-400">{newInquiries}</div>
          </div>
        </div>

        {/* Projects Management Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
              Manage Portfolio Projects
            </h2>
            <span className="text-xs font-mono text-zinc-500">
              Click edit to modify details, video links, or case studies
            </span>
          </div>

          <AdminProjectList initialProjects={projects} />
        </div>
      </div>
    </AdminLayout>
  );
}
