import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await prisma.project.deleteMany({
      where: {
        organizationId: context.params.id,
      },
    });

    await prisma.organization.delete({
      where: {
        id: context.params.id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
