import { NextRequest } from 'next/server';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const createOrganizationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  manager: z.string().min(1),
  website: z.string().optional(),
  imgURL: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const body = createOrganizationSchema.parse(json);

    const organization = await prisma.organization.create({
      data: {
        name: body.name,
        manager: body.manager,
        description: body.description,
        imgURL: body.imgURL,
        website: body.website,
      },
    });

    return new Response(JSON.stringify(organization), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
