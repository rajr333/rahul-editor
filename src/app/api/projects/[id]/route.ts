import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/storage';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id || p.slug === id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const updates = await request.json();
  const projects = await getProjects();

  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  projects[index] = {
    ...projects[index],
    ...updates,
    id: projects[index].id, // preserve ID
  };

  await saveProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  await saveProjects(filtered);
  return NextResponse.json({ success: true, message: 'Project deleted' });
}
