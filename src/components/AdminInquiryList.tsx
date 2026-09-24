'use client';

import React, { useState } from 'react';
import { Inquiry } from '@/types';
import { Mail, Clock, Calendar, ExternalLink, MessageSquare, CheckCircle } from 'lucide-react';

export default function AdminInquiryList({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  const updateStatus = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (inquiries.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-white/10 bg-[#0c0c0f]">
        <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
        <p className="text-sm text-zinc-400">No project inquiries received yet.</p>
        <p className="text-xs text-zinc-600 mt-1">
          When visitors fill out the contact form on your portfolio, inquiries appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <div
          key={inquiry.id}
          className="bg-[#0c0c10] border border-white/10 p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold uppercase text-white tracking-wide">
                  {inquiry.name}
                </h3>
                <span className="bg-white/10 text-white font-mono text-[10px] uppercase px-2 py-0.5 border border-white/10">
                  {inquiry.projectType}
                </span>
              </div>
              <a
                href={`mailto:${inquiry.email}`}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{inquiry.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-500">
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </span>

              <select
                value={inquiry.status}
                onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry['status'])}
                className="bg-[#141418] border border-white/10 text-xs px-2.5 py-1 text-white font-mono uppercase focus:outline-none"
              >
                <option value="new">New</option>
                <option value="in-review">In Review</option>
                <option value="contacted">Contacted</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
              Story Brief &amp; Requirements
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap bg-[#101014] p-4 border border-white/5 font-sans">
              {inquiry.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-zinc-400 pt-2">
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase">Estimated Length</span>
              <span className="text-white">{inquiry.videoLength || 'Not specified'}</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase">Target Deadline</span>
              <span className="text-white">{inquiry.deadline || 'Flexible'}</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase">Budget</span>
              <span className="text-white">{inquiry.budgetRange || 'Open'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="block text-[10px] text-zinc-600 uppercase">Links</span>
              <div className="flex items-center gap-3">
                {inquiry.referenceLink && (
                  <a
                    href={inquiry.referenceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                  >
                    <span>Reference</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {inquiry.footageLink && (
                  <a
                    href={inquiry.footageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Footage</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
