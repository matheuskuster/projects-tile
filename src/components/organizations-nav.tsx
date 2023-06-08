import { cn } from '@/lib/utils';

import { NewOrganization } from './new-organization';

interface OrganizationsNavProps {
  loading?: boolean;
}

export function OrganizationsNav({ loading }: OrganizationsNavProps) {
  return (
    <header
      className={cn(
        'px-4 h-16 border-b flex items-center justify-between',
        loading ? 'cursor-none' : ''
      )}
    >
      <NewOrganization />
    </header>
  );
}
