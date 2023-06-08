import { zodResolver } from '@hookform/resolvers/zod';
import { Status } from '@prisma/client';
import { Copy, Loader2 } from 'lucide-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formatDate } from '@/lib/format-date';

import { ProjectCardProps } from './project-card';
import { useProjects } from './projects-provider';
import { Form, FormControl, FormField, FormItem, FormLabel } from './react-hook-form/form';
import { StatusSelect } from './status-select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MaskedInput } from './ui/masked-input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

interface ProjectSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectCardProps;
}

const editProjectFormSchema = z.object({
  name: z.string().nonempty(),
  status: z.string().nonempty(),
  manager: z.string().nonempty(),
  startDate: z.string().nonempty(),
  endDate: z.string().nonempty(),
  description: z.string().optional(),
  imgUrl: z.string().optional(),
});

export function ProjectSheet({ open, setOpen, project }: ProjectSheetProps) {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [newName, setNewName] = React.useState(project.name);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { reload } = useProjects();
  const { toast } = useToast();

  const onSave = async (data: z.infer<typeof editProjectFormSchema>) => {
    setIsSaving(true);

    const response = await fetch(`/api/projects/${project.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: newName ?? project.name,
        description: data.description,
        status: data.status,
        manager: data.manager,
        startDate: data.startDate,
        endDate: data.endDate,
        imgUrl: data.imgUrl,
      }),
    });

    if (response.ok) {
      toast({
        description: 'Project updated successfully',
      });
      reload();
      setOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong while updating the project',
        variant: 'destructive',
      });
    }

    setIsSaving(false);
  };

  const onDelete = async () => {
    setIsDeleting(true);

    const response = await fetch(`/api/projects/${project.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast({
        description: 'Project deleted successfully',
      });
      reload();
      setOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the project',
        variant: 'destructive',
      });
    }

    setIsDeleting(false);
  };

  const statuses = useMemo(() => {
    const value = localStorage.getItem('@project-tiles/statuses');

    if (value) {
      return JSON.parse(value) as Status[];
    } else if (open) {
      toast({
        title: 'Error while fetching statuses',
        description: 'Please reload the page',
        variant: 'destructive',
      });
      return [];
    }

    return [];
  }, [toast, open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.id);
    toast({
      description: `Project ID ${project.id} copied to clipboard`,
      variant: 'default',
    });
  };

  const form = useForm<z.infer<typeof editProjectFormSchema>>({
    resolver: zodResolver(editProjectFormSchema),
    defaultValues: {
      name: project.name,
      status: project.status.id,
      manager: project.manager,
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate),
      description: project?.description,
      imgUrl: project?.imgUrl,
    },
  });

  React.useEffect(() => {
    form.setValue('name', newName);
  }, [newName, form]);

  return (
    <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle>
            <div className="mr-2 flex items-center">
              <div>
                {isEditingTitle ? (
                  <Input
                    autoFocus
                    defaultValue={project.name}
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    onBlur={() => setIsEditingTitle(false)}
                    placeholder="Project name"
                  />
                ) : (
                  <Button
                    onClick={() => setIsEditingTitle(true)}
                    variant="ghost"
                    className="pl-0 pr-0 text-xl hover:bg-background"
                  >
                    {newName ?? project.name}
                  </Button>
                )}
              </div>

              <Badge
                variant="secondary"
                className="cursor-pointer rounded ml-4 mt-[2.5px]"
                onClick={handleCopy}
              >
                {project.id} <Copy className="ml-2 h-3 w-3" />
              </Badge>
            </div>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <Form {...form}>
          <form className="grid gap-4 mt-4" id="editProject" onSubmit={form.handleSubmit(onSave)}>
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel className="text-md">Status</FormLabel>
                  <FormControl>
                    <StatusSelect statuses={statuses} onValueChange={field.onChange} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel className="text-md">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="manager"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel className="text-md">Manager</FormLabel>
                  <FormControl>
                    <Input placeholder="Project manager" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5 w-full">
                    <FormLabel className="text-md">Start date</FormLabel>
                    <FormControl>
                      <MaskedInput mask="99/99/9999" placeholder="DD/MM/YYYY" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5 w-full">
                    <FormLabel className="text-md">End date</FormLabel>
                    <FormControl>
                      <MaskedInput mask="99/99/9999" placeholder="DD/MM/YYYY" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="imgUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5 w-full">
                  <FormLabel className="text-md">Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="mt-4">
          <Button onClick={onDelete} disabled={isDeleting} variant="destructive">
            {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Delete
          </Button>
          <Button disabled={isSaving} type="submit" form="editProject">
            {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
