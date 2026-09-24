'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle, Film } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md bg-[#0d0d11] border border-white/10 p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-white">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Rahul Editor Studio
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            Admin Authentication
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Admin Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter studio key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Studio Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-zinc-500 font-mono">
            Default pass: <span className="text-zinc-300">rahul2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
