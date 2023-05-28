'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Status } from '@prisma/client';
import { Loader2, Plus } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useProjects } from './projects-provider';
import { Form, FormControl, FormField, FormItem, FormLabel } from './react-hook-form/form';
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
import { MaskedInput } from './ui/masked-input';
import { useToast } from './ui/use-toast';

interface NewProjectProps {
  statuses: Status[];
}

const newProjectFormSchema = z.object({
  name: z.string().min(1),
  manager: z.string().min(1),
  status: z.string().uuid(),
  startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
});

export function NewProject({ statuses }: NewProjectProps) {
  const { reload } = useProjects();
  const { toast } = useToast();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      status: statuses[0].id,
    },
  });

  const onSubmit = async (values: z.infer<typeof newProjectFormSchema>) => {
    setIsCreating(true);

    const [startDay, startMonth, startYear] = values.startDate.split('/');
    const [endDay, endMonth, endYear] = values.endDate.split('/');

    const startDate = new Date(`${startMonth}/${startDay}/${startYear}`);
    const endDate = new Date(`${endMonth}/${endDay}/${endYear}`);

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        startDate,
        endDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast({
        title: 'Project created',
        description: 'Your project has been created successfully.',
      });

      reload();
      form.reset();
      setOpen(false);
    } else {
      toast({
        title: 'Project creation failed',
        description: 'Something went wrong while creating your project.',
        variant: 'destructive',
      });
    }

    setIsCreating(false);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>New project</DialogHeader>
        <DialogDescription>Create a new project to start tracking.</DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" className="col-span-3" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="manager"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Manager</FormLabel>
                  <FormControl>
                    <Input placeholder="Project manager" className="col-span-3" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Status</FormLabel>
                  <FormControl>
                    <div className="col-span-3">
                      <StatusSelect statuses={statuses} onValueChange={field.onChange} {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Start date</FormLabel>
                  <FormControl>
                    <MaskedInput
                      mask="99/99/9999"
                      placeholder="DD/MM/YYYY"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="endDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">End date</FormLabel>
                  <FormControl>
                    <MaskedInput
                      mask="99/99/9999"
                      placeholder="DD/MM/YYYY"
                      className="col-span-3"
                      {...field}
                    />
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
