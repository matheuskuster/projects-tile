'use client';

import { ProjectCard } from './project-card';
import { useProjects } from './projects-provider';

export function Projects() {
  const { projects, isFetching } = useProjects();

  if (isFetching) {
    return (
      <section
        className="grid overflow-hidden gap-4 p-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(384px, 1fr))',
        }}
      >
        {Array.from({ length: 50 }).map((_, index) => (
          <ProjectCard.Skeleton key={index} />
        ))}
      </section>
    );
  }

  return projects.length > 0 ? (
    <section
      className="grid overflow-hidden gap-4 p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(384px, 1fr))',
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          name={project.name}
          manager={project.manager}
          startDate={project.startDate}
          endDate={project.endDate}
          progress={50}
          status={project.status}
          key={project.id}
        />
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
