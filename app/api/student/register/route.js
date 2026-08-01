import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

const MAX_ATTEMPTS = 10;
const LOCKOUT_MINUTES = 15;

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  password: z.string().min(8).max(72),
  program: z.enum([
    'Classical Dance',
    'Semi-Classical',
    'Bollywood',
    'Zumba',
    'Yoga',
    'Vocal Music',
    'Guitar',
    'Tabla',
    'Wedding Choreography',
  ]),
});

export async function POST(request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const windowStart = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);

    // Rate limiting
    const attempts = await prisma.rateLimit.findFirst({
      where: { ip, endpoint: 'student_register', createdAt: { gte: windowStart } },
    });

    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
    }

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const message = result.error.issues[0]?.message || 'Validation failed.';
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const { name, email, phone, password, program } = result.data;
    const trimmedEmail = email.trim().toLowerCase();

    // Check for existing email — generic message to avoid enumeration
    const existing = await prisma.student.findUnique({ where: { email: trimmedEmail } });
    if (existing) {
      // Record attempt to prevent enumeration abuse
      await recordAttempt(ip, windowStart, 'student_register');
      return NextResponse.json(
        { success: false, message: 'If this email is not already registered, your account will be created.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.student.create({
      data: {
        name: name.trim(),
        email: trimmedEmail,
        phone: phone.trim(),
        passwordHash,
        program,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration submitted. Your account is pending admin approval.',
    });
  } catch (error) {
    // No PII logged
    console.error('Student register error:', error?.code || 'unknown');
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

async function recordAttempt(ip, windowStart, endpoint) {
  try {
    const existing = await prisma.rateLimit.findFirst({
      where: { ip, endpoint, createdAt: { gte: windowStart } },
    });
    if (!existing) {
      await prisma.rateLimit.create({ data: { ip, endpoint, count: 1 } });
    } else {
      await prisma.rateLimit.update({ where: { id: existing.id }, data: { count: { increment: 1 } } });
    }
  } catch {}
}
