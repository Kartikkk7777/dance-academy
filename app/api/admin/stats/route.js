import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const [totalEnquiries, newEnquiries, activeEvents] = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.event.count({ where: { isActive: true } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        activeEvents,
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats.' },
      { status: 500 }
    );
  }
}
