'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel } from './react-hook-form/form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const newOrganizationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  manager: z.string().min(1),
  website: z.string().optional(),
  imgURL: z.string().optional(),
});

export function NewOrganization() {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newOrganizationSchema>>({
    resolver: zodResolver(newOrganizationSchema),
  });

  const onSubmit = async (data: z.infer<typeof newOrganizationSchema>) => {
    setIsCreating(true);

    const response = await fetch('/api/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast({
        title: `${data.name} created`,
        description: 'Your organization has been created.',
      });

      form.reset();
      setOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the organization.',
        variant: 'destructive',
      });
    }

    setIsCreating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New organization
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>New organization</DialogHeader>
        <DialogDescription>Create a new organization to start tracking projects.</DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="manager"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization manager" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="website"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="imgURL"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isCreating} type="submit">
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
