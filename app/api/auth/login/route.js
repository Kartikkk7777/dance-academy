import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, signToken, setAuthCookie, setStudentAuthCookie } from '@/lib/auth';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const windowStart = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);

    // Rate limiting & lockout check (using 'login_attempt' as the shared rate limit key)
    const attempts = await prisma.rateLimit.findFirst({
      where: {
        ip,
        endpoint: 'login_attempt',
        createdAt: { gte: windowStart },
      },
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
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const { email, password } = body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Look up in AdminUser
    const admin = await prisma.adminUser.findUnique({
      where: { email: trimmedEmail },
    });

    if (admin) {
      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        await recordFailedAttempt(ip, windowStart);
        return NextResponse.json(
          { success: false, message: 'Invalid email or password.' },
          { status: 401 }
        );
      }

      // Successful Admin Login
      await prisma.rateLimit.deleteMany({
        where: { ip, endpoint: 'login_attempt' },
      });

      const token = await signToken({ id: admin.id, email: admin.email, role: 'admin' });
      await setAuthCookie(token);

      return NextResponse.json({
        success: true,
        message: 'Login successful.',
        redirectTo: '/admin/dashboard',
        user: { email: admin.email, role: 'admin' },
      });
    }

    // 2. Look up in Student
    const student = await prisma.student.findUnique({
      where: { email: trimmedEmail },
    });

    if (student) {
      const isValid = await verifyPassword(password, student.passwordHash);
      if (!isValid) {
        await recordFailedAttempt(ip, windowStart);
        return NextResponse.json(
          { success: false, message: 'Invalid email or password.' },
          { status: 401 }
        );
      }

      // Student found and password is correct. Check status.
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

      // APPROVED Student Login
      await prisma.rateLimit.deleteMany({
        where: { ip, endpoint: 'login_attempt' },
      });

      const token = await signToken({ id: student.id, email: student.email, role: 'student' });
      await setStudentAuthCookie(token);

      return NextResponse.json({
        success: true,
        message: 'Login successful.',
        redirectTo: '/student/dashboard',
        user: { email: student.email, role: 'student' },
      });
    }

    // 3. User not found at all
    await recordFailedAttempt(ip, windowStart);
    return NextResponse.json(
      { success: false, message: 'Invalid email or password.' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Unified login API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}

async function recordFailedAttempt(ip, windowStart) {
  try {
    const existing = await prisma.rateLimit.findFirst({
      where: {
        ip,
        endpoint: 'login_attempt',
        createdAt: { gte: windowStart },
      },
    });

    if (!existing) {
      await prisma.rateLimit.create({
        data: { ip, endpoint: 'login_attempt', count: 1 },
      });
    } else {
      await prisma.rateLimit.update({
        where: { id: existing.id },
        data: { count: { increment: 1 } },
      });
    }
  } catch (err) {
    console.error('Failed to record login attempt:', err);
  }
}
