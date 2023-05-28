'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { StatusSelect } from './status-select';
import { Button } from './ui/button';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MaskedInput } from './ui/masked-input';

export function NewProject() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>New project</DialogHeader>
        <DialogDescription>Create a new project to start tracking.</DialogDescription>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Project name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manager" className="text-right">
              Manager
            </Label>
            <Input id="manager" placeholder="Project manager" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <div className="col-span-3">
              <StatusSelect name="status" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">
              Start date
            </Label>
            <MaskedInput
              mask="99/99/9999"
              id="start-date"
              placeholder="MM/DD/YYYY"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">
              End date
            </Label>
            <MaskedInput
              mask="99/99/9999"
              id="start-date"
              placeholder="MM/DD/YYYY"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
