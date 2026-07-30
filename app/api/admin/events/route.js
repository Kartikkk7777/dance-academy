import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error('Events GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, date, isActive } = body;

    if (!title || !description || !date) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and date are required.' },
        { status: 400 }
      );
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { success: false, message: 'Invalid event date format.' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim().slice(0, 200),
        description: description.trim().slice(0, 3000),
        date: eventDate,
        isActive: typeof isActive === 'boolean' ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Event created successfully.',
      event,
    });
  } catch (error) {
    console.error('Event POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event.' },
      { status: 500 }
    );
  }
}
