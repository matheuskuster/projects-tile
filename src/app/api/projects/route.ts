import { NextRequest } from 'next/server';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const projectCreateSchema = z.object({
  name: z.string().min(1),
  manager: z.string().min(1),
  status: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const body = projectCreateSchema.parse(json);

    const project = await prisma.project.create({
      data: {
        name: body.name,
        manager: body.manager,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        imgURL: '',
        status: {
          connect: {
            id: body.status,
          },
        },
      },
    });

    return new Response(JSON.stringify(project), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        status: true,
      },
    });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
