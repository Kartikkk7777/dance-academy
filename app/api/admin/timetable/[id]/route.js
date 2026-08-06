import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { programName, dayOfWeek, startTime, endTime, instructor, isActive } = body;

    const existing = await prisma.timetableSlot.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Timetable slot not found.' },
        { status: 404 }
      );
    }

    const updated = await prisma.timetableSlot.update({
      where: { id },
      data: {
        programName: programName !== undefined ? programName : existing.programName,
        dayOfWeek: dayOfWeek !== undefined ? dayOfWeek : existing.dayOfWeek,
        startTime: startTime !== undefined ? startTime : existing.startTime,
        endTime: endTime !== undefined ? endTime : existing.endTime,
        instructor: instructor !== undefined ? (instructor ? instructor.trim() : null) : existing.instructor,
        isActive: isActive !== undefined ? isActive : existing.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Timetable slot updated successfully.',
      slot: updated,
    });
  } catch (error) {
    console.error('Timetable PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update timetable slot.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existing = await prisma.timetableSlot.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Timetable slot not found.' },
        { status: 404 }
      );
    }

    await prisma.timetableSlot.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Timetable slot deleted successfully.',
    });
  } catch (error) {
    console.error('Timetable DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete timetable slot.' },
      { status: 500 }
    );
  }
}
