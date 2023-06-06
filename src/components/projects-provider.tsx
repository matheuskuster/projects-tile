'use client';

import { Project, Status } from '@prisma/client';
import React, { useEffect } from 'react';

import { useSlides } from './slide-provider';

async function getProjects(abortController?: AbortController) {
  const response = await fetch('/api/projects', { signal: abortController?.signal });
  const projects = await response.json();
  return projects;
}

type ProjectWithStatus = Project & {
  status: Status;
};

type ProjectsContextType = {
  projects: ProjectWithStatus[];
  filterByStatusId: (statusId: string | null) => void;
  isFetching: boolean;
  isReloading: boolean;
  reload: () => void;
};

type ProjectsProviderProps = {
  children: React.ReactNode;
};

const ProjectsContext = React.createContext<ProjectsContextType>({} as ProjectsContextType);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { setTotalCount, startAt, tileCount } = useSlides();

  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isReloading, setIsReloading] = React.useState<boolean>(false);
  const [statusId, setStatusId] = React.useState<string | null>(null);
  const [allProjects, setAllProjects] = React.useState<ProjectWithStatus[]>([]);

  const filteredProjects = React.useMemo(() => {
    if (!statusId) {
      return allProjects;
    }

    return allProjects.filter((project) => project.status.id === statusId);
  }, [allProjects, statusId]);

  const projectsToShow = React.useMemo(() => {
    return filteredProjects.slice(startAt, startAt + tileCount);
  }, [filteredProjects, startAt, tileCount]);

  const reload = () => {
    setIsReloading(true);
    getProjects()
      .then((projects) => {
        setAllProjects(projects);
      })
      .finally(() => {
        setIsReloading(false);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();

    setIsFetching(true);

    getProjects(abortController)
      .then((projects) => {
        setAllProjects(projects);
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.error(error);
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsFetching(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    setTotalCount(filteredProjects.length);
  }, [filteredProjects, setTotalCount]);

  return (
    <ProjectsContext.Provider
      value={{
        projects: projectsToShow,
        filterByStatusId: setStatusId,
        isFetching,
        isReloading,
        reload,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => React.useContext(ProjectsContext);
