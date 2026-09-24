'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Film, MessageSquare, Plus, LogOut, ExternalLink, Sliders } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: Film },
    { label: 'Add Project', href: '/admin/projects/new', icon: Plus },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-[#0d0d11] px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="/admin" className="flex items-center gap-2 text-white font-bold tracking-tight uppercase text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Rahul Editor Studio Admin</span>
            </a>

            <nav className="hidden md:flex items-center space-x-1 pl-6 border-l border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            {pathname !== '/admin/projects/new' && (
              <a
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </a>
            )}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
