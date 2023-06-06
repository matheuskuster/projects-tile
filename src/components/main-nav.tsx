import prisma from '@/lib/prisma';

import { NewProject } from './new-project';
import { ReloadingIndicator } from './reloading-indicator';
import { SettingsPopover } from './settings-popover';
import { SlideControl } from './slide-control';
import { StatusCombobox } from './status-combobox';

export async function MainNav() {
  const statuses = await prisma.status.findMany();

  return (
    <header className="px-4 h-16 border-b flex items-center justify-between">
      <section className="flex items-center gap-4">
        <StatusCombobox statuses={statuses} />
        <SlideControl />
        <ReloadingIndicator />
      </section>

      <section className="flex items-center gap-4">
        <NewProject statuses={statuses} />
        <SettingsPopover />
      </section>
    </header>
  );
}
