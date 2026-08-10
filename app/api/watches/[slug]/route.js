export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const watch = await prisma.watch.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!watch) {
      return NextResponse.json(
        { error: 'الساعة غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json(watch);
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ في السيرفر' },
      { status: 500 }
    );
  }
}