'use client';

import { Loader2 } from 'lucide-react';

import { useProjects } from './projects-provider';

export function ReloadingIndicator() {
  const { isReloading } = useProjects();

  return isReloading ? <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /> : null;
}
