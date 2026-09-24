import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  const isAuthenticated = await verifyAdminAuth();
  return NextResponse.json({ authenticated: isAuthenticated });
}
