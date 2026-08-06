import { getAdminSession, getStudentSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const adminSession = await getAdminSession();
    if (adminSession) {
      return NextResponse.json({ authenticated: true, role: 'admin' });
    }

    const studentSession = await getStudentSession();
    if (studentSession) {
      return NextResponse.json({ authenticated: true, role: 'student' });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
