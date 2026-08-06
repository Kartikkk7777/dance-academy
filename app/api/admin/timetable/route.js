import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slots = await prisma.timetableSlot.findMany({
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      slots,
    });
  } catch (error) {
    console.error('Timetable GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch timetable slots.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { programName, dayOfWeek, startTime, endTime, instructor, isActive } = body;

    if (!programName || !dayOfWeek || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, message: 'Program name, day, start time, and end time are required.' },
        { status: 400 }
      );
    }

    const slot = await prisma.timetableSlot.create({
      data: {
        programName,
        dayOfWeek,
        startTime,
        endTime,
        instructor: instructor ? instructor.trim() : null,
        isActive: typeof isActive === 'boolean' ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Timetable slot created successfully.',
      slot,
    });
  } catch (error) {
    console.error('Timetable POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create timetable slot.' },
      { status: 500 }
    );
  }
}
