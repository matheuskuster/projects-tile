'use client';

import { Status } from '@prisma/client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { useProjects } from './projects-provider';

interface StatusComboboxProps {
  statuses: Status[];
}

export function StatusCombobox({ statuses }: StatusComboboxProps) {
  const { filterByStatusId } = useProjects();
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null);

  React.useEffect(() => {
    if (!selectedStatus) {
      filterByStatusId(null);
    } else {
      filterByStatusId(selectedStatus.id);
    }
  }, [selectedStatus, filterByStatusId]);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-start">
            {selectedStatus ? (
              <>
                <div
                  className="w-4 h-4 rounded mr-2"
                  style={{ background: selectedStatus.color }}
                />
                {selectedStatus.name}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.id}
                    onSelect={(value) => {
                      const found = statuses.find((status) => status.name.toLowerCase() === value);
                      if (found && found?.id === selectedStatus?.id) {
                        setSelectedStatus(null);
                      } else {
                        setSelectedStatus(found ?? null);
                      }
                      setOpen(false);
                    }}
                  >
                    <div
                      style={{ background: status.color }}
                      className={cn(
                        'w-4 h-4 rounded mr-2',
                        status.id === selectedStatus?.id ? 'opacity-100' : 'opacity-40'
                      )}
                    />
                    <span>{status.name}</span>
                    {status.id === selectedStatus?.id && (
                      <span className="text-sm text-muted-foreground ml-auto">Selected</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
