'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Settings2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Form, FormControl, FormField, FormItem, FormLabel } from './react-hook-form/form';
import { Switch } from './ui/switch';

const settingsFormSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  foregroundColor: z.string().optional(),
  automaticSlides: z.boolean().optional(),
  hideNavbar: z.boolean().optional(),
});

export function SettingsPopover() {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    setIsSaving(true);
    localStorage.setItem('@projects-tiles/settings', JSON.stringify(values));
    applySettings(values);
    setIsSaving(false);
  };

  const applySettings = (settings: z.infer<typeof settingsFormSchema>) => {
    const root = document.documentElement;

    if (settings.primaryColor) {
      root.style.setProperty('--primary', settings.primaryColor);
    }

    if (settings.secondaryColor) {
      root.style.setProperty('--secondary', settings.secondaryColor);
    }

    if (settings.backgroundColor) {
      root.style.setProperty('--background', settings.backgroundColor);
    }

    if (settings.foregroundColor) {
      root.style.setProperty('--foreground', settings.foregroundColor);
    }
  };

  useEffect(() => {
    const settings = localStorage.getItem('@projects-tiles/settings');
    if (settings) {
      form.reset(JSON.parse(settings));
      applySettings(JSON.parse(settings));
    }
  }, [form]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Settings</h4>
            </div>
            <div className="grid gap-4">
              <FormField
                name="primaryColor"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Primary color (HSL)</FormLabel>
                    <FormControl>
                      <Input placeholder="222.2, 47.4%, 11.2%" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="secondaryColor"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Secondary color (HSL)</FormLabel>
                    <FormControl>
                      <Input placeholder="210, 40%, 96.1%" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="backgroundColor"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Background color (HSL)</FormLabel>
                    <FormControl>
                      <Input placeholder="0, 0%, 100%" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="foregroundColor"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Foreground color (HSL)</FormLabel>
                    <FormControl>
                      <Input placeholder="222.2, 47.4%, 11.2%" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="automatic-slides">Automatic slides</Label>
                <Switch disabled id="automatic-slides" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hide-navbar">Hide navbar</Label>
                <Switch disabled id="hide-navbar" />
              </div>
            </div>

            <Button>Save</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
