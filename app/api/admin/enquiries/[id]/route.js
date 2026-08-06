import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const { status, isRead } = body;

    const dataToUpdate = {};
    if (status && ['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED'].includes(status)) {
      dataToUpdate.status = status;
    }
    if (typeof isRead === 'boolean') {
      dataToUpdate.isRead = isRead;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid fields provided to update.' },
        { status: 400 }
      );
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry updated successfully.',
      enquiry: updated,
    });
  } catch (error) {
    console.error('Enquiry PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update enquiry.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    await prisma.enquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Enquiry DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete enquiry.' },
      { status: 500 }
    );
  }
}
