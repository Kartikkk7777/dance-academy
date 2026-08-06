import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          phone1: '+918604415736',
          phone2: '+917905766423',
          email: 'shivangikamkalakendra@gmail.com',
          instagram: '@Shivangikam_kala_kendra',
          address: 'New Colony, Kakarmatta, Near I.A.I.T College, BLW, Varanasi, Uttar Pradesh',
        },
      });
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch site settings.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { phone1, phone2, email, instagram, address } = body;

    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          phone1: phone1 || '',
          phone2: phone2 || '',
          email: email || '',
          instagram: instagram || '',
          address: address || '',
        },
      });
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          phone1: phone1?.trim().slice(0, 20),
          phone2: phone2?.trim().slice(0, 20),
          email: email?.trim().slice(0, 254),
          instagram: instagram?.trim().slice(0, 100),
          address: address?.trim().slice(0, 500),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully.',
      settings,
    });
  } catch (error) {
    console.error('Settings PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update site settings.' },
      { status: 500 }
    );
  }
}
