import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    const where = {};
    if (status && ['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED'].includes(status)) {
      where.status = status;
    }

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin enquiries GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch enquiries.' },
      { status: 500 }
    );
  }
}
