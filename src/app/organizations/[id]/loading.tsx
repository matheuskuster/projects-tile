import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrganizationProjectsLoading() {
  return (
    <main className="overflow-hidden bg-background h-screen">
      <header className="px-4 h-16 border-b flex items-center justify-between">
        <Skeleton className="w-32 h-8" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </header>

      <main>
        <div className="grid grid-cols-4 overflow-hidden gap-4 p-4">
          {new Array(12).fill(null).map((_, i) => (
            <Card key={i} className="min-w-96 h-44">
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
          ))}
        </div>
      </main>
    </main>
  );
}
