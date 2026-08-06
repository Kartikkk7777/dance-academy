import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getStudentSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getStudentSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, program: true, status: true, createdAt: true },
    });

    if (!student || student.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch timetable and upcoming events in parallel — they're independent of each other.
    const [timetableSlots, events] = await Promise.all([
      prisma.timetableSlot.findMany({
        where: { programName: student.program, isActive: true },
        orderBy: { dayOfWeek: 'asc' },
      }),
      prisma.event.findMany({
        where: { isActive: true, date: { gte: new Date() } },
        orderBy: { date: 'asc' },
        take: 5,
      }),
    ]);

    return NextResponse.json({ student, timetableSlots, events });
  } catch (error) {
    console.error('Student me error:', error?.code || 'unknown');
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
