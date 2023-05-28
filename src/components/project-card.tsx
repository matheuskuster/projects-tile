'use client';

import { Calendar } from 'lucide-react';
import { useState } from 'react';

import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

export function ProjectCard() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Card className="min-w-96 h-44">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="hover:underline hover:cursor-pointer"
              onClick={() => setSheetOpen(true)}
            >
              Project name
            </CardTitle>
            <Badge>In Progress</Badge>
          </div>
          <CardDescription>Vinicius dos Santos</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex-col ">
          <div className="flex items-center justify-between text-muted-foreground text-sm w-full">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>2021-08-01</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>2021-08-01</span>
            </div>
          </div>
          <Progress className="mt-2 h-2" value={50} />
        </CardFooter>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={(value) => setSheetOpen(value)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Project name</SheetTitle>
            <SheetDescription>Vinicius dos Santos</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
