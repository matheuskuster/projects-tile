import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        organizationId: context.params.id,
      },
      include: {
        status: true,
        organization: true,
      },
    });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
