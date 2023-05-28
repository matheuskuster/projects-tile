'use client';

import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Switch } from './ui/switch';

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Primary color</Label>
              <Input id="name" placeholder="#000000" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Secondary color</Label>
              <Input id="name" placeholder="#000000" />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="automatic-slides">Automatic slides</Label>
              <Switch id="automatic-slides" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="hide-navbar">Hide navbar</Label>
              <Switch id="hide-navbar" />
            </div>
          </div>

          <Button>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
