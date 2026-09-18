export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryslug = searchParams.get('category');

    const where = categoryslug ? { category: { slug: categoryslug } } : {};

    const watches = await prisma.watch.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(watches, { status: 200 });
  } catch (error) {
    console.error('Prisma Error Details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}