import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const windowStart = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);

    // Rate limiting & lockout check
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

    // Find admin user
    const admin = await prisma.adminUser.findUnique({
      where: { email: trimmedEmail },
    });

    if (!admin) {
      // Increment failed attempts counter
      await recordFailedAttempt(ip, windowStart);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      await recordFailedAttempt(ip, windowStart);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    await prisma.rateLimit.deleteMany({
      where: { ip, endpoint: 'login_attempt' },
    });

    // Create session token and set httpOnly cookie
    const token = await signToken({ id: admin.id, email: admin.email });
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: { email: admin.email },
    });
  } catch (error) {
    console.error('Login API error:', error);
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
