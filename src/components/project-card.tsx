'use client';

import { Calendar } from 'lucide-react';
import { useMemo, useState } from 'react';

import { formatDateLong } from '@/lib/format-date';

import { ProjectSheet } from './project-sheet';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';

export interface ProjectCardProps {
  id: string;
  name: string;
  manager: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  imgUrl?: string;
  description?: string;
  status: {
    id: string;
    name: string;
    color: string;
  };
}

export function ProjectCard({
  id,
  name,
  manager,
  startDate,
  endDate,
  progress,
  status,
  description,
  imgUrl,
}: ProjectCardProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const formattedStartDate = useMemo(() => formatDateLong(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDateLong(endDate), [endDate]);

  return (
    <>
      <Card className="min-w-96 h-44">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="hover:underline hover:cursor-pointer text-primary"
              onClick={() => setSheetOpen(true)}
            >
              {name}
            </CardTitle>
            <Badge style={{ backgroundColor: status.color }}>{status?.name}</Badge>
          </div>
          <CardDescription>{manager}</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex-col ">
          <div className="flex items-center justify-between text-muted-foreground text-sm w-full">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedStartDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedEndDate}</span>
            </div>
          </div>
          <Progress className="mt-2 h-2" value={progress} />
        </CardFooter>
      </Card>

      <ProjectSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        project={{
          id,
          name,
          endDate,
          manager,
          progress,
          startDate,
          status,
          description,
          imgUrl,
        }}
      />
    </>
  );
}

ProjectCard.Skeleton = function ProjectCardSkeleton() {
  return (
    <Card className="min-w-96 h-44">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="w-24 h-4" />
      </CardHeader>
      <CardContent />
      <CardFooter className="flex-col ">
        <div className="flex items-center justify-between text-muted-foreground text-sm w-full">
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
        <Skeleton className="w-full mt-2 h-2" />
      </CardFooter>
    </Card>
  );
};
