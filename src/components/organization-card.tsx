'use client';

import { Organization } from '@prisma/client';
import Link from 'next/link';

import { Button } from './ui/button';
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from './ui/card';

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <Card className="min-w-[350px] h-fit">
      <CardHeader className="flex-row-reverse items-center justify-end p-4">
        <div className="ml-auto mt-2">
          <Button variant="outline" asChild>
            <Link href={`/organizations/${organization.id}`}>View</Link>
          </Button>
        </div>

        <div className="mt-2">
          <CardTitle>{organization.name}</CardTitle>
          <CardDescription>{organization.manager}</CardDescription>
        </div>

        {organization.imgURL && (
          <div className="rounded-full border w-12 h-12 flex items-center justify-center p-2 mr-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={organization.imgURL} width={48} height={48} alt={organization.name} />
          </div>
        )}
      </CardHeader>
      <CardContent className="px-4">
        {organization.description ? (
          <span className="text-muted-foreground text-md">{organization.description}</span>
        ) : (
          <span className="text-muted-foreground text-md">No description</span>
        )}
      </CardContent>
    </Card>
  );
}
