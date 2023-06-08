import { OrganizationCard } from '@/components/organization-card';
import { OrganizationsNav } from '@/components/organizations-nav';
import prisma from '@/lib/prisma';

export default async function Home() {
  const organizations = await prisma.organization.findMany();

  return (
    <main className="overflow-hidden bg-background h-screen">
      <OrganizationsNav />

      <main className="grid grid-cols-4 overflow-hidden gap-4 p-4 h-full">
        {organizations.map((organization) => (
          <OrganizationCard organization={organization} key={organization.id} />
        ))}
      </main>
    </main>
  );
}
