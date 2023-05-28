'use client';

import { Status } from '@prisma/client';
import { SelectProps } from '@radix-ui/react-select';
import { Dot } from 'lucide-react';

import { useProjects } from './projects-provider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface StatusSelectProps extends SelectProps {
  statuses: Status[];
}

export function StatusSelect({ statuses, ...props }: StatusSelectProps) {
  const { filterByStatusId } = useProjects();

  return (
    <Select onValueChange={(value) => filterByStatusId(value)} {...props}>
      <SelectTrigger className="min-w-[220px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              <div className="flex items-center">
                <Dot className="w-8 h-8" color={status.color} />
                {status.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
