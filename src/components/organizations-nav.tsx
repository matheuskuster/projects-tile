'use client';

import { useEffect } from 'react';

import { cn } from '@/lib/utils';

import { NewOrganization } from './new-organization';

interface OrganizationsNavProps {
  loading?: boolean;
}

export function OrganizationsNav({ loading }: OrganizationsNavProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--primary', 'var(--primary-default)');
    root.style.setProperty('--secondary', 'var(--secondary-default)');
    root.style.setProperty('--background', 'var(--background-default)');
    root.style.setProperty('--foreground', 'var(--foreground-default)');
  }, []);

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
