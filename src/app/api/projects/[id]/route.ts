import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { z } from 'zod';

import prisma from '@/lib/prisma';

interface Context {
  params: {
    id: string;
  };
}

const projectUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  manager: z.string().optional(),
  status: z.string().uuid().optional(),
  imgURL: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export async function PATCH(request: NextRequest, context: Context) {
  const json = await request.json();
  const body = projectUpdateSchema.parse(json);

  const { id } = context.params;

  const data: Prisma.ProjectUpdateInput = {};

  if (body.name) {
    data.name = body.name;
  }

  if (body.description) {
    data.description = body.description;
  }

  if (body.manager) {
    data.manager = body.manager;
  }

  if (body.imgURL) {
    data.imgURL = body.imgURL;
  }

  if (body.startDate) {
    data.startDate = new Date(body.startDate);
  }

  if (body.endDate) {
    data.endDate = new Date(body.endDate);
  }

  if (body.status) {
    data.status = {
      connect: {
        id: body.status,
      },
    };
  }

  const project = await prisma.project.update({
    where: { id },
    data,
  });

  return new Response(JSON.stringify(project), { status: 200 });
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = context.params;

  await prisma.project.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}
