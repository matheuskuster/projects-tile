import { Organization } from '@prisma/client';
import Link from 'next/link';

import prisma from '@/lib/prisma';

import { NewProject } from './new-project';
import { ReloadingIndicator } from './reloading-indicator';
import { SettingsPopover } from './settings-popover';
import { SlideControl } from './slide-control';
import { StatusCombobox } from './status-combobox';
import { Button } from './ui/button';

type ProjectsNavProps = {
  organization: Organization;
};

export async function ProjectsNav({ organization }: ProjectsNavProps) {
  const statuses = await prisma.status.findMany();

  return (
    <header className="px-4 h-16 border-b flex items-center justify-between">
      <section className="flex items-center gap-4">
        <div className="flex items-center">
          <Button variant="link" asChild>
            <Link href="/">Organizations</Link>
          </Button>
          <p>/</p>
          <Button variant="link">{organization.name}</Button>
        </div>
        <SlideControl />
        <ReloadingIndicator />
      </section>

      <section className="flex items-center gap-4">
        <StatusCombobox statuses={statuses} />
        <NewProject statuses={statuses} organizationId={organization.id} />
        <SettingsPopover organizationId={organization.id} />
      </section>
    </header>
  );
}
