'use client';

import { Status } from '@prisma/client';
import { SelectProps } from '@radix-ui/react-select';

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
  return (
    <Select {...props}>
      <SelectTrigger className="min-w-[220px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ background: status.color }} />
                {status.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
