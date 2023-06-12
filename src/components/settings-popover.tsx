'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Settings2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Form, FormControl, FormField, FormItem, FormLabel } from './react-hook-form/form';
import { useSlides } from './slide-provider';
import { Switch } from './ui/switch';
import { useToast } from './ui/use-toast';

const settingsFormSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  foregroundColor: z.string().optional(),
  automaticSlides: z.boolean().optional(),
  hideNavbar: z.boolean().optional(),
});

interface SettingsPopoverProps {
  organizationId: string;
}

export function SettingsPopover({ organizationId }: SettingsPopoverProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { turnOffAutomaticSlides, turnOnAutomaticSlides } = useSlides();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      automaticSlides: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 200));
    localStorage.setItem(`@projects-tiles/settings-${organizationId}`, JSON.stringify(values));

    applySettings(values);
    setIsSaving(false);
    setOpen(false);
  };

  const onDelete = async () => {
    setIsDeleting(true);

    const response = await fetch(`/api/organizations/${organizationId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/');
      toast({
        description: 'Organization deleted',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong. Organization not deleted.',
        variant: 'destructive',
      });
    }

    setIsDeleting(false);
  };

  const applySettings = useCallback(
    (settings: z.infer<typeof settingsFormSchema>) => {
      const root = document.documentElement;

      if (settings.primaryColor) {
        root.style.setProperty('--primary', settings.primaryColor.replace(/,/g, ''));
      } else {
        root.style.setProperty('--primary', 'var(--primary-default)');
      }

      if (settings.secondaryColor) {
        root.style.setProperty('--secondary', settings.secondaryColor.replace(/,/g, ''));
      } else {
        root.style.setProperty('--secondary', 'var(--secondary-default)');
      }

      if (settings.backgroundColor) {
        root.style.setProperty('--background', settings.backgroundColor.replace(/,/g, ''));
      } else {
        root.style.setProperty('--background', 'var(--background-default)');
      }

      if (settings.foregroundColor) {
        root.style.setProperty('--foreground', settings.foregroundColor.replace(/,/g, ''));
      } else {
        root.style.setProperty('--foreground', 'var(--foreground-default)');
      }

      if (settings.automaticSlides) {
        turnOnAutomaticSlides();
      } else {
        turnOffAutomaticSlides();
      }
    },
    [turnOffAutomaticSlides, turnOnAutomaticSlides]
  );

  useEffect(() => {
    const settings = localStorage.getItem(`@projects-tiles/settings-${organizationId}`);
    if (settings) {
      form.reset(JSON.parse(settings));
      applySettings(JSON.parse(settings));
    }
  }, [form, applySettings, organizationId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
              <FormField
                name="automaticSlides"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Automatic slides</FormLabel>
                    <FormControl>
                      <Switch
                        id="automaticSlides"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Label htmlFor="hide-navbar">Hide navbar</Label>
                <Switch disabled id="hide-navbar" />
              </div>
            </div>

            <Button variant="destructive" disabled={isDeleting} onClick={onDelete}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Delete organization
            </Button>

            <Button disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
