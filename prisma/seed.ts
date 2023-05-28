import prisma from '../src/lib/prisma';

async function seedStatuses() {
  const statuses = [
    {
      name: 'Opportunity',
      color: '#32CD32 ',
    },
    {
      name: 'Sales Proposal',
      color: '#0000FF',
    },
    {
      name: 'Feed',
      color: '#FFA500',
    },
    {
      name: 'Execution',
      color: '#FF0000',
    },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: {
        name: status.name,
      },
      create: status,
      update: status,
    });
  }
}

seedStatuses();
