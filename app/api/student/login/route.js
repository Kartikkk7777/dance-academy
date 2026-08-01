import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, signToken, setStudentAuthCookie } from '@/lib/auth';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const windowStart = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);

    // Rate limiting
    const attempts = await prisma.rateLimit.findFirst({
      where: { ip, endpoint: 'student_login', createdAt: { gte: windowStart } },
    });

    if (attempts && attempts.count >= MAX_FAILED_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: 'Too many failed login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
    }

    const { email, password } = body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const student = await prisma.student.findUnique({ where: { email: trimmedEmail } });

    // Generic failure for non-existent or wrong password
    if (!student) {
      await recordFailedAttempt(ip, windowStart);
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, student.passwordHash);
    if (!isValid) {
      await recordFailedAttempt(ip, windowStart);
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

    // Status-specific messages (only after password verified to avoid enumeration)
    if (student.status === 'PENDING') {
      return NextResponse.json(
        { success: false, message: 'Your account is pending admin approval. Please check back soon.' },
        { status: 403 }
      );
    }

    if (student.status === 'REJECTED') {
      return NextResponse.json(
        { success: false, message: 'Your registration could not be approved. Please contact the academy for more information.' },
        { status: 403 }
      );
    }

    // APPROVED — issue session
    await prisma.rateLimit.deleteMany({ where: { ip, endpoint: 'student_login' } });

    const token = await signToken({ id: student.id, email: student.email, role: 'student' });
    await setStudentAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
    });
  } catch (error) {
    console.error('Student login error:', error?.code || 'unknown');
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}

async function recordFailedAttempt(ip, windowStart) {
  try {
    const existing = await prisma.rateLimit.findFirst({
      where: { ip, endpoint: 'student_login', createdAt: { gte: windowStart } },
    });
    if (!existing) {
      await prisma.rateLimit.create({ data: { ip, endpoint: 'student_login', count: 1 } });
    } else {
      await prisma.rateLimit.update({ where: { id: existing.id }, data: { count: { increment: 1 } } });
    }
  } catch {}
}
