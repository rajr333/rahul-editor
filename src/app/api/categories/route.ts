import { NextResponse } from 'next/server';
import { getCategories, saveCategories } from '@/lib/storage';
import { verifyAdminAuth } from '@/lib/auth';
import { Category } from '@/types';

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const categories = await getCategories();

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      tagline: data.tagline || '',
      description: data.description || '',
      visualKeywords: data.visualKeywords || [],
      techniques: data.techniques || [],
      accentColor: data.accentColor || '#ffffff',
    };

    categories.push(newCategory);
    await saveCategories(categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
