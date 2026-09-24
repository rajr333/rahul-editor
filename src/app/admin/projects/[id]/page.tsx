import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/auth';
import { getProjects } from '@/lib/storage';
import AdminLayout from '@/components/AdminLayout';
import ProjectForm from '@/components/ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <AdminLayout title={`Edit Project: ${project.title}`}>
      <ProjectForm initialProject={project} isEdit={true} />
    </AdminLayout>
  );
}
