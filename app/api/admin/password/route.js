import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAdminSession, verifyPassword, hashPassword } from '@/lib/auth';

export async function PATCH(request) {
  try {
    const session = await getAdminSession();
    if (!session || !session.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized session.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Current password, new password, and confirmation are required.' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'New password and confirmation do not match.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin user account not found.' },
        { status: 404 }
      );
    }

    const isValidCurrent = await verifyPassword(currentPassword, admin.passwordHash);
    if (!isValidCurrent) {
      return NextResponse.json(
        { success: false, message: 'Incorrect current password.' },
        { status: 400 }
      );
    }

    const newPasswordHash = await hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.error('Password PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update password.' },
      { status: 500 }
    );
  }
}
