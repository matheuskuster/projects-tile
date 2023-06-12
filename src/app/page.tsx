'use client';

import { Organization } from '@prisma/client';

import { OrganizationCard } from '@/components/organization-card';
import { OrganizationsNav } from '@/components/organizations-nav';

export default async function Home() {
  const organizations: Organization[] = await fetch('/api/organizations', {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());

  return (
    <main className="overflow-hidden bg-background h-screen">
      <OrganizationsNav />

      <main className="grid grid-cols-4 overflow-hidden gap-4 p-4">
        {organizations.map((organization) => (
          <OrganizationCard organization={organization} key={organization.id} />
        ))}
      </main>
    </main>
  );
}
