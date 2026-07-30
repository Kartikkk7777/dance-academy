import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, date, isActive } = body;

    const dataToUpdate = {};
    if (title && typeof title === 'string') dataToUpdate.title = title.trim().slice(0, 200);
    if (description && typeof description === 'string') dataToUpdate.description = description.trim().slice(0, 3000);
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) dataToUpdate.date = parsedDate;
    }
    if (typeof isActive === 'boolean') dataToUpdate.isActive = isActive;

    const updated = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully.',
      event: updated,
    });
  } catch (error) {
    console.error('Event PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update event.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully.',
    });
  } catch (error) {
    console.error('Event DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event.' },
      { status: 500 }
    );
  }
}
