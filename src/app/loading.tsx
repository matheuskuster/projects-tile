import { OrganizationsNav } from '@/components/organizations-nav';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading() {
  return (
    <main className="overflow-hidden bg-background">
      <OrganizationsNav loading />

      <main className="grid grid-cols-4 gap-4 p-4 h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="min-w-96 h-fit p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>

              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </Card>
        ))}
      </main>
    </main>
  );
}
