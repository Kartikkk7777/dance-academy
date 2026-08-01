import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';

const updateSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'PENDING']),
});

// PATCH /api/admin/students/[id]
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    const updated = await prisma.student.update({
      where: { id },
      data: { status: result.data.status },
      select: { id: true, name: true, status: true },
    });

    return NextResponse.json({ success: true, student: updated });
  } catch (error) {
    console.error('Admin student update error:', error?.code || 'unknown');
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

// DELETE /api/admin/students/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }
    await prisma.student.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin student delete error:', error?.code || 'unknown');
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
