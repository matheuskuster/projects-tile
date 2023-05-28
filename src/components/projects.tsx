'use client';

import { useEffect } from 'react';

import { ProjectCard } from './project-card';
import { useSlides } from './slide-provider';

const projectsCount = 0;

export function Projects() {
  const { setTotalCount, startAt, totalCount } = useSlides();

  useEffect(() => {
    setTotalCount(projectsCount);
  }, [setTotalCount]);

  return totalCount > 0 ? (
    <section
      className="grid overflow-hidden gap-4 p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(384px, 1fr))',
      }}
    >
      {Array.from({ length: totalCount - startAt }, (_, i) => (
        <ProjectCard key={i} />
      ))}
    </section>
  ) : (
    <section className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-normal text-center text-muted-foreground/70">
        No projects found
      </h1>
    </section>
  );
}
