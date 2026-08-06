import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
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
