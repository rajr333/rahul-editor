import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/storage';
import { verifyAdminAuth } from '@/lib/auth';
import { Project } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const all = searchParams.get('all'); // if 'true', include unpublished (admin)

  let projects = await getProjects();

  // If public request, show only published
  if (all !== 'true') {
    projects = projects.filter((p) => p.published);
  }

  if (category && category !== 'all') {
    projects = projects.filter(
      (p) => p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (featured === 'true') {
    projects = projects.filter((p) => p.featured);
  }

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const projects = await getProjects();

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: data.title,
      slug,
      category: data.category || 'Crime Documentary Editing',
      description: data.description || '',
      thumbnail: data.thumbnail || '',
      video: data.video || '',
      duration: data.duration || '00:00',
      year: data.year || new Date().getFullYear().toString(),
      role: Array.isArray(data.role) ? data.role : (data.role ? [data.role] : ['Video Editor']),
      tools: Array.isArray(data.tools) ? data.tools : (data.tools ? [data.tools] : ['Premiere Pro']),
      featured: Boolean(data.featured),
      published: data.published !== undefined ? Boolean(data.published) : true,
      client: data.client || '',
      projectType: data.projectType || data.category,
      caseStudy: data.caseStudy || {
        overview: '',
        challenge: '',
        solution: '',
        techniques: []
      },
      beforeMedia: data.beforeMedia || '',
      afterMedia: data.afterMedia || '',
      gallery: data.gallery || [],
      createdAt: new Date().toISOString(),
      order: projects.length + 1
    };

    projects.unshift(newProject);
    await saveProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
