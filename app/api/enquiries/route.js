import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { enquirySchema } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendEnquiryNotification } from '@/lib/email';

export async function POST(request) {
  try {
    // 1. Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 2. Rate limit check (5 requests per 15 minutes per IP)
    const { allowed } = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // 4. Zod validation (strict shape enforcement — rejects unknown fields)
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 }
      );
    }

    const validated = result.data;

    // 5. Honeypot check — silently accept but don't process bot submissions
    if (validated.botField && validated.botField.length > 0) {
      return NextResponse.json({ success: true, message: 'Thank you for your enquiry!' });
    }

    // 6. Clean fields (no pre-DB HTML escaping required with Prisma + parameterised queries)
    const { botField, ...fieldsToSave } = validated;

    if (fieldsToSave.email === '' || fieldsToSave.email === undefined) {
      fieldsToSave.email = null;
    }

    // 7. Save enquiry to database via Prisma
    const enquiry = await prisma.enquiry.create({
      data: fieldsToSave,
    });

    // 8. Send email notification (non-blocking)
    try {
      await sendEnquiryNotification(fieldsToSave);
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    // 9. Generic success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
