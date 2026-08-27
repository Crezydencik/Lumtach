'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_PROJECTS } from '@/modules/projects/defaults';
import { localizeProject } from '@/modules/projects/localize';
import { LocalizedProjectView, ProjectRecord } from '@/modules/projects/types';

export function useProjects(locale: string) {
  const [projects, setProjects] = useState<ProjectRecord[]>(DEFAULT_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(payload?.error || 'Failed to load projects.');
        }

        if (!cancelled) {
          setProjects(payload.projects || DEFAULT_PROJECTS);
          setError(null);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to load projects.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const localizedProjects = useMemo<LocalizedProjectView[]>(
    () => projects.map((project) => localizeProject(project, locale)),
    [locale, projects]
  );

  return {
    projects: localizedProjects,
    isLoading,
    error,
  };
}
