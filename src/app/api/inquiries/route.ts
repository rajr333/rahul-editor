import { NextResponse } from 'next/server';
import { getInquiries, addInquiry, saveInquiries } from '@/lib/storage';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.description) {
      return NextResponse.json(
        { error: 'Name, email, and project description are required.' },
        { status: 400 }
      );
    }

    const inquiry = await addInquiry({
      name: data.name,
      email: data.email,
      projectType: data.projectType || 'General Editing',
      description: data.description,
      videoLength: data.videoLength || '',
      deadline: data.deadline || '',
      budgetRange: data.budgetRange || '',
      referenceLink: data.referenceLink || '',
      footageLink: data.footageLink || '',
    });

    if (!inquiry) {
      return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: 'Thanks. Your project inquiry has been received.', inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const inquiries = await getInquiries();
    const item = inquiries.find((i) => i.id === id);
    if (!item) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    item.status = status;
    await saveInquiries(inquiries);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
