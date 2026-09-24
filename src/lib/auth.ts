import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rahul2026';
const AUTH_COOKIE_NAME = 'rahul_editor_admin_session';
const SESSION_SECRET_TOKEN = 'rahul_editor_auth_token_cinematic_2026';

export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return sessionToken === SESSION_SECRET_TOKEN;
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export { AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN };
