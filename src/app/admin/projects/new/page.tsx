import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/auth';
import AdminLayout from '@/components/AdminLayout';
import ProjectForm from '@/components/ProjectForm';

export default async function NewProjectPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout title="Add New Portfolio Project">
      <ProjectForm />
    </AdminLayout>
  );
}
