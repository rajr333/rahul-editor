import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/auth';
import { getInquiries } from '@/lib/storage';
import AdminLayout from '@/components/AdminLayout';
import AdminInquiryList from '@/components/AdminInquiryList';

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const inquiries = await getInquiries();

  return (
    <AdminLayout title="Client Project Inquiries">
      <div className="space-y-6">
        <p className="text-xs text-zinc-400">
          Inquiries received directly from potential clients through the portfolio contact form.
        </p>

        <AdminInquiryList initialInquiries={inquiries} />
      </div>
    </AdminLayout>
  );
}
