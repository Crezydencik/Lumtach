'use client';

import { useEffect, useMemo, useState } from 'react';
import { localizeProject } from '@/modules/projects/localize';
import { LocalizedProjectView, ProjectRecord } from '@/modules/projects/types';

export function useProjects(locale: string) {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects(showLoading = false) {
      if (showLoading) {
        setIsLoading(true);
      }

      try {
        const response = await fetch(`/api/projects?ts=${Date.now()}`, { cache: 'no-store' });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(payload?.error || 'Failed to load projects.');
        }

        if (!cancelled) {
          setProjects(payload.projects || []);
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

    function refreshWhenVisible() {
      if (document.visibilityState === 'visible') {
        loadProjects();
      }
    }

    loadProjects(true);
    window.addEventListener('focus', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    const refreshInterval = window.setInterval(refreshWhenVisible, 15000);

    return () => {
      cancelled = true;
      window.removeEventListener('focus', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      window.clearInterval(refreshInterval);
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
