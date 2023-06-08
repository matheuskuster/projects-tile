import { Projects } from '@/components/projects';
import { ProjectsNav } from '@/components/projects-nav';
import prisma from '@/lib/prisma';

interface OrganizationProjectsProps {
  params: {
    id: string;
  };
}

export default async function OrganizationProjects({ params }: OrganizationProjectsProps) {
  const organization = await prisma.organization.findUnique({
    where: { id: params.id },
  });

  if (!organization) {
    return null;
  }

  return (
    <main className="overflow-hidden bg-background h-screen">
      {/* @ts-expect-error Async Server Component */}
      <ProjectsNav organization={organization} />

      <main className="h-full">
        <Projects organization={organization} />
      </main>
    </main>
  );
}
