'use client';

import { Calendar } from 'lucide-react';
import { useMemo, useState } from 'react';

import { formatDate } from '@/lib/format-date';

import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Skeleton } from './ui/skeleton';

interface ProjectCardProps {
  name: string;
  manager: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: {
    id: string;
    name: string;
    color: string;
  };
}

export function ProjectCard({
  name,
  manager,
  startDate,
  endDate,
  progress,
  status,
}: ProjectCardProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const formattedStartDate = useMemo(() => formatDate(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDate(endDate), [endDate]);

  return (
    <>
      <Card className="min-w-96 h-44">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="hover:underline hover:cursor-pointer"
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

      <Sheet open={sheetOpen} onOpenChange={(value) => setSheetOpen(value)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{name}</SheetTitle>
            <SheetDescription>{manager}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
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
