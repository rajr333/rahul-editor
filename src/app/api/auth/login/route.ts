import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validatePassword, AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!validatePassword(password)) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const cookieStore = await cookies();
    const isHttps = request.url.startsWith('https://');
    cookieStore.set(AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, message: 'Authenticated successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
