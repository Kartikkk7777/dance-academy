import { NextResponse } from 'next/server';
import { removeStudentAuthCookie } from '@/lib/auth';

export async function POST() {
  await removeStudentAuthCookie();
  return NextResponse.json({ success: true, message: 'Logged out.' });
}
