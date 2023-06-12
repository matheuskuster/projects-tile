'use client';

import { Organization } from '@prisma/client';
import { useEffect, useState } from 'react';

import { OrganizationCard } from '@/components/organization-card';
import { OrganizationsNav } from '@/components/organizations-nav';

async function fetchOrganizations() {
  return fetch('/api/organizations').then((res) => res.json());
}

export default async function Home() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchOrganizations().then((organizations) => {
      setOrganizations(organizations);
    });

    return () => {
      abortController.abort();
    };
  }, []);

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
